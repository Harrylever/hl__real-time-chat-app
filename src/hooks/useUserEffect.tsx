import { useEffect } from 'react'
import { useAppDispatch } from 'src/app'
import PageError from 'src/views/PageError'
import { setUser } from 'src/app/slices/userSlice'
import { useGetActiveUserQuery } from 'src/app/api/hooks'
import LoadingPlayer from 'src/components/ui/LoadingPlayer'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const publicRoutes = ['/', '/auth/login', '/auth/register', '/terms']

export default function useUserEffect() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data, error, isFetching, refetch } = useGetActiveUserQuery()

  useEffect(() => {
    if (data) {
      dispatch(setUser({ ...data.data }))
      if (
        data.message === 'User found' &&
        publicRoutes.includes(location.pathname)
      ) {
        navigate('/app', { replace: true })
      }
    }
  }, [data, dispatch, location.pathname, navigate])

  if (isFetching) {
    return <LoadingPlayer />
  }

  if (error) {
    if ((error.response?.data as any)?.message !== 'Unauthorized') {
      return <PageError refetch={() => refetch()} />
    } else {
      if (!publicRoutes.includes(location.pathname)) {
        return <Navigate to="/auth/login" replace />
      }
    }
  }
}
