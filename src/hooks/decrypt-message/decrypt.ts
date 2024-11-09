import { IMessage } from 'typings'
import * as Comlink from 'comlink'
import { CipherUtil } from '../../util/cipher.util'
import { IPlainMessage } from './useDecryptMessage'

const cipherUtil = new CipherUtil()

export const decryptMessages = async (
  messages: IMessage[],
): Promise<IPlainMessage[]> => {
  return await Promise.all(
    messages.map(async ({ text, aesKey, iv, ...rest }) => {
      const decryptedData = await cipherUtil.decryptData(text, { aesKey, iv })
      return { ...rest, text: decryptedData }
    }),
  )
}

Comlink.expose(decryptMessages)
