import { IAuthState, LoginResValues } from '../../../typings'
import { buildJWTDecode } from '../../util/utils'
import useAxiosInstance, {
  getLocalStorageValueForAuth,
} from '../constants/const'
import { setToken } from '../slices/authSlice'
import { useAppDispatch } from './hooks'

interface IResponse {
  data: {
    access: string
    refresh: string
    email: string
    fullname: string
    userId: string
  }
}

const useRefreshToken = () => {
  const dispatch = useAppDispatch()
  const { refresh } = getLocalStorageValueForAuth() as IAuthState

  const RefreshSync = async () => {
    // Fetch New Access and Refresh Tokens using the Current Refresh Token
    const response = await useAxiosInstance<IResponse>('POST', 'auth/refresh', {
      refresh: refresh,
    })

    // Get the Decoded data using the access token gotten from the response
    const decodedData = buildJWTDecode<LoginResValues>(response.data.access)
    const { email, _id } = decodedData
    const tokenDetails = {
      email: email,
      _id: _id.toString(),
      access: response.data.access,
      refresh: response.data.refresh,
    }
    dispatch(setToken(tokenDetails))
    //
    setTimeout(() => {
      window.localStorage.setItem('auth', JSON.stringify(tokenDetails))
    }, 20)

    return response
  }
  return RefreshSync
}

export default useRefreshToken
