import axios from 'axios'
import { BASE_URL } from '../../../typings'

const publicRoutes = ['/', '/auth/login', '/auth/register', '/terms']

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true,
  timeout: 1000 * 60 * 1, // 1 minute
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!publicRoutes.includes(window.location.pathname)) {
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
