import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

interface IToastMeta {
  title: string
  description: string
  callback?: (args?: unknown) => void
}

const useToastNotifier = () => {
  const { toast } = useToast()

  const defaultToast = ({ title, description, callback }: IToastMeta) => {
    return toast({
      title,
      description,
      variant: 'default',
      action: callback ? (
        <ToastAction altText="Try again" onClick={callback}>
          Try again
        </ToastAction>
      ) : undefined,
    })
  }

  const successToast = ({ title, description }: IToastMeta) => {
    return toast({
      title,
      description,
      variant: 'success',
    })
  }

  const destructiveToast = ({ title, description, callback }: IToastMeta) => {
    return toast({
      title,
      description,
      variant: 'destructive',
      action: callback ? (
        <ToastAction altText="Try again" onClick={callback}>
          Try again
        </ToastAction>
      ) : undefined,
    })
  }

  return [defaultToast, successToast, destructiveToast]
}

export default useToastNotifier
