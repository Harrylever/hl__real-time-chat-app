import { useEffect } from 'react'
import { LoadingPlayer } from '../ui'
import { useAppDispatch } from 'src/app'
import { setUser } from 'src/app/slices/userSlice'
import { useGetActiveUserQuery } from 'src/app/api/hooks'
import { useLocation, useNavigate } from 'react-router-dom'

const publicRoutes = ['/', '/auth/login', '/auth/register', '/terms']

export default function AuthRouteController({
  children,
}: {
  children: React.ReactNode
}) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const pathname = useLocation().pathname
  const { data, error, isFetching } = useGetActiveUserQuery()

  useEffect(() => {
    if (error) {
      if (
        (error?.response?.data as any)?.message.toLowerCase() ===
        'no token provided'
      ) {
        if (!publicRoutes.includes(pathname)) navigate('/auth/login')
      }
    }
    if (data?.data) {
      const { _id, profileImage, username, email, fullname } = data.data
      dispatch(
        setUser({
          _id,
          email,
          username,
          fullname,
          profileImage,
        }),
      )
      if (publicRoutes.includes(pathname)) navigate('/app')
    }
  }, [data?.data, dispatch, error, navigate, pathname])

  return isFetching ? <LoadingPlayer /> : children
}
