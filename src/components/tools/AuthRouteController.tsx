import { LoadingPlayer } from '../ui'
import { IUser } from '../../../typings'
import { goToLocation } from 'src/util/utils'
import { setUser } from 'src/app/slices/userSlice'
import { useToast } from '@/components/ui/use-toast'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthRequests, useAppDispatch, useAxiosPrivate } from '../../app'

export default function AuthRouteController({
  children,
}: {
  children: React.ReactNode
}) {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const axiosPrivate = useAxiosPrivate()
  const authRequests = useMemo(
    () => new AuthRequests(axiosPrivate),
    [axiosPrivate],
  )

  const [canRender, setCanRender] = useState(false)

  const handleGetLoginStatus = useCallback(async () => {
    try {
      const response = await authRequests.loginStatus()
      return response
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: 'Could not login',
      })
    }
  }, [authRequests, toast])

  const main = useCallback(async () => {
    const res = await handleGetLoginStatus()

    if (
      res &&
      res.message &&
      res.message.toLowerCase() === 'you are logged in'
    ) {
      const user = res.data as IUser
      dispatch(
        setUser({
          _id: user._id,
          email: user.email,
          imgUri: user.imgUri,
          username: user.username,
          fullname: user.fullname,
        }),
      )
      setCanRender(true)
    } else {
      if (
        window.location.pathname === '/' ||
        window.location.pathname === '/login' ||
        window.location.pathname === '/register' ||
        window.location.pathname === '/terms'
      ) {
        setCanRender(true)
        return
      } else {
        goToLocation('/login')
      }
    }
  }, [dispatch, handleGetLoginStatus])

  useEffect(() => {
    main()
  }, [main])

  return canRender ? children : <LoadingPlayer />
}
