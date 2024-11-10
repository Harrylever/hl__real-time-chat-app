import { IMessage } from 'typings'
import { decryptMessages } from './decrypt'
// import { useQuery } from '@tanstack/react-query'

export type IPlainMessage = Omit<IMessage, 'aesKey' | 'iv'>

const useDecryptMessage = () => {
  return { decryptMessages }
}

export default useDecryptMessage
