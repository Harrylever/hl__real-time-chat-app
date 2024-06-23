import { useMemo } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { AuthRequests, useAxiosPrivate } from 'src/app'

const useLogOutUser = () => {
  const { toast } = useToast()
  const axiosPrivate = useAxiosPrivate()
  const authRequests = useMemo(
    () => new AuthRequests(axiosPrivate),
    [axiosPrivate],
  )

  const getlogOut = async () => {
    try {
      const response = await authRequests.logout()
      return response
    } catch (err) {
      console.log(err)
      toast({
        variant: 'destructive',
        title: 'Error logging out',
      })
    }
  }

  const handleLogOutUser = async () => {
    const res = await getlogOut()
    if (
      res &&
      res.message &&
      res.message.toLowerCase() === 'user logged out successfully'
    ) {
      window.localStorage.removeItem('auth')
      window.location.href = '/'
    }
  }

  return [handleLogOutUser]
}

export default useLogOutUser
