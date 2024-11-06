import { toast } from '@/components/ui/use-toast'
import { useLogoutUser } from 'src/app/api/hooks'
import { POST_REQUEST_MESSAGE_RESPONSE } from '../app/constants/const'

const useLogOut = () => {
  const { mutateAsync: logout, isPending } = useLogoutUser()

  const handleLogOut = async () => {
    try {
      const response = await logout()

      if (response.message === POST_REQUEST_MESSAGE_RESPONSE.USER_LOGOUT) {
        window.localStorage.clear()
        window.location.href = '/auth/login'
      }
    } catch (error: any) {
      toast({
        variant: 'success',
        title: 'Oh no! Something went wrong',
        description: error.message,
      })
    }
  }

  return { handleLogOut, isPending }
}

export default useLogOut
