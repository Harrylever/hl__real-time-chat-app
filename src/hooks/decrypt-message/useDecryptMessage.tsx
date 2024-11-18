import { IMessage } from 'typings'
import { decryptMessages } from './decrypt'

export type IPlainMessage = Omit<IMessage, 'aesKey' | 'iv'>

const useDecryptMessage = () => {
  return { decryptMessages }
}

export default useDecryptMessage
