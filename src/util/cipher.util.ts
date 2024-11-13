import forge from 'node-forge'
import { VITE_MX_CHAT_PRIVATE_KEY, VITE_MX_CHAT_PUBLIC_KEY } from 'src/config'

export class CipherUtil {
  #generateAesKeyAndIV() {
    const key = forge.random.getBytesSync(16)
    const iv = forge.random.getBytesSync(16)
    return { key, iv }
  }

  toUnicodePoints(text: string) {
    return text.replace(/[\s\S]/g, (char) => {
      const codePoint = char.codePointAt(0) ?? 0
      const codePointString = codePoint !== 0 ? codePoint.toString(16) : ''
      return '\\u' + codePointString
    })
  }

  fromUnicodePoints(text: string) {
    return text.replace(/\\u[\dA-F]{4}/gi, (match) =>
      String.fromCodePoint(parseInt(match.replace('\\u', ''), 16)),
    )
  }

  async encryptData(data: string) {
    const base64Data = forge.util.encode64(data)
    const { key, iv } = this.#generateAesKeyAndIV()

    const cipher = forge.cipher.createCipher('AES-CBC', key)
    cipher.start({ iv })
    cipher.update(forge.util.createBuffer(base64Data))
    cipher.finish()

    const encryptedAesKey = this.#encryptWithPublicKey(key)
    const encryptedIV = this.#encryptWithPublicKey(iv)

    return {
      encryptedData: cipher.output,
      secure: { aesKey: encryptedAesKey, iv: encryptedIV },
    }
  }

  async decryptData(
    encryptedData: string,
    secure: { aesKey: string; iv: string },
  ) {
    const encryptedDataBuffer = this.#hexToByteStringBuffer(encryptedData)
    const decryptedAesKey = this.#decryptWithPrivateKey(secure.aesKey)
    const decryptedIV = this.#decryptWithPrivateKey(secure.iv)

    const decipher = forge.cipher.createDecipher('AES-CBC', decryptedAesKey)
    decipher.start({ iv: decryptedIV })
    decipher.update(encryptedDataBuffer)
    decipher.finish()
    return forge.util.decode64(decipher.output.toString())
  }

  #hexToByteStringBuffer(hexString: any) {
    const encryptedDataBytes = forge.util.hexToBytes(hexString)
    return forge.util.createBuffer(encryptedDataBytes)
  }

  parseEmailPayload(decryptedData: string) {
    return JSON.parse(decryptedData)
  }

  #encryptWithPublicKey(data: string) {
    const publicKey = forge.pki.publicKeyFromPem(VITE_MX_CHAT_PUBLIC_KEY)
    const encrypted = publicKey.encrypt(data, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: forge.mgf.mgf1.create(forge.md.sha256.create()),
    })
    return forge.util.encode64(encrypted)
  }

  #decryptWithPrivateKey(data: string) {
    const privateKey = forge.pki.privateKeyFromPem(VITE_MX_CHAT_PRIVATE_KEY)

    const encrypted = forge.util.decode64(data)

    const decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: forge.mgf.mgf1.create(forge.md.sha256.create()),
    })

    return decrypted
  }
}
