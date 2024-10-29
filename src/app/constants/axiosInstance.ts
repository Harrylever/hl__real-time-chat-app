import axios from 'axios'
import { BASE_URL } from '../../../typings'

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true,
  timeout: 1000 * 60 * 1, // 1 minute
})

export default axiosInstance
