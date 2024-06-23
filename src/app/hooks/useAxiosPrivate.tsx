import { useEffect, useMemo } from 'react'
import { AuthRequests } from '../actions/auth'
import { axiosInstance } from '../constants/const'
import { useNavigate } from 'react-router-dom'

const useAxiosPrivate = () => {
  const navigate = useNavigate()
  const authRequests = useMemo(() => new AuthRequests(axiosInstance), [])

  useEffect(() => {
    const requestInterceptors = axiosInstance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => Promise.reject(error),
    )

    const responseInterceptors = axiosInstance.interceptors.response.use(
      (response) => response,

      async (error) => {
        console.log(error)
        if (
          error.response.status === 401 &&
          error.response.data.message.toLowerCase() ===
            'not authorized, sign in to continue'
        ) {
          const response = await authRequests.logout()
          if (
            response.message.toLowerCase() === 'user logged out successfully'
          ) {
            navigate('/login')
          }
        }
        return Promise.reject(error)
      },
    )

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptors)
      axiosInstance.interceptors.response.eject(responseInterceptors)
    }
  }, [authRequests, navigate])

  return axiosInstance
}

export default useAxiosPrivate
