import { useEffect } from 'react'
import { useAppDispatch } from 'src/app'
import { setUser } from 'src/app/slices/userSlice'
import { useGetActiveUserQuery } from 'src/app/api/hooks'
import { useNavigate, useLocation } from 'react-router-dom'

const publicRoutes = ['/', '/auth/login', '/auth/register', '/terms']

export default function useUserEffect() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data, isFetching } = useGetActiveUserQuery()

  useEffect(() => {
    if (data && data.message === 'User found') {
      dispatch(setUser({ ...data.data }))
      if (publicRoutes.includes(location.pathname)) {
        navigate('/app')
      }
    }
  }, [data, dispatch, location.pathname, navigate])

  return { loading: isFetching }
}
