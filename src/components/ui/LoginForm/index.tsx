import { useState } from 'react'
import clsx from 'clsx'
import * as z from 'zod'
import Input from '../Input'
import { classNames } from 'src/styles'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginUserMutation } from 'src/app/api/hooks'
import { toast } from '@/components/ui/use-toast'
import { POST_REQUEST_MESSAGE_RESPONSE } from 'src/app'

const formSchema = z.object({
  email: z.string().email({ message: 'Required' }),
  password: z.string().min(1, { message: 'Required' }),
})

const LoginPageForm = () => {
  const { mutateAsync: login, isPending } = useLoginUserMutation()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [rememberMeChecked, setRememberMeChecked] = useState(false)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await login(values)

      if (response.message === POST_REQUEST_MESSAGE_RESPONSE.USER_LOGIN) {
        toast({
          variant: 'success',
          title: 'Hooray 🎉',
        })

        setTimeout(() => {
          window.location.href = '/app'
        }, 500)
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong',
        description: error?.response?.data?.message ?? '',
      })
    }
  }

  return (
    <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input
        required
        label="email"
        labelText="Email Address"
        register={register}
        error={errors.email}
      />

      <Input
        required
        type="password"
        label="password"
        labelText="Password"
        register={register}
        error={errors.password}
      />

      <div className="flex flex-row items-center justify-between text-sm pt-6 sm:pt-4">
        <div className="flex flex-row-reverse items-center justify-end gap-x-2">
          <label htmlFor="remember-me" className={classNames.accentText}>
            Remember me
          </label>

          <div>
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              checked={rememberMeChecked}
              onChange={() => setRememberMeChecked(!rememberMeChecked)}
              className="block border border-mx-stroke bg-mx-white py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-lg sm:leading-6 w-[25px] h-[25px]"
            />
          </div>
        </div>

        <p className="block text-sm font-medium leading-6 text-mx-primary">
          <Link to={'#'}>Forgot password?</Link>
        </p>
      </div>

      <button
        type="submit"
        className={clsx([
          classNames.authFormBtn,
          'mt-2',
          {
            'bg-indigo-600 hover:bg-indigo-800': !isPending,
            'bg-indigo-400': isPending,
          },
        ])}
      >
        Sign in
      </button>
    </form>
  )
}

export default LoginPageForm
