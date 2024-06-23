import { PageProps } from 'typings'
import { classNames } from 'src/styles'
import { Link } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { AuthRequests, useAxiosPrivate } from 'src/app'
import React, { useEffect, useMemo, useState } from 'react'
import DefaultWidth from 'src/components/layout/DefaultWidth'
import { buildJWTDecode, handleRememberMe } from 'src/util/utils'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const Login: React.FC<{ props?: PageProps }> = () => {
  const { toast } = useToast()
  const axiosPrivate = useAxiosPrivate()
  const authRequests = useMemo(
    () => new AuthRequests(axiosPrivate),
    [axiosPrivate],
  )

  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMeChecked, setRememberMeChecked] = useState(false)

  const [viewPassword, setViewPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    handleRememberMe(email, rememberMeChecked)

    const loginData = {
      email: email.trim(),
      password: password.trim(),
    }

    try {
      const response = await authRequests.login(loginData)
      if (
        response.token &&
        response.message.toLowerCase() === 'user logged in'
      ) {
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Logged in successfully!',
        })

        const decoded = buildJWTDecode<{ email: string; _id: string }>(
          response.token,
        )
        const token = {
          _id: decoded._id,
          token: response.token,
        }
        window.localStorage.setItem('auth', JSON.stringify(token))

        setTimeout(() => {
          window.location.href = '/app'
        }, 500)
        return
      }

      if (response.message.toLowerCase() === 'invalid credentials!') {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong',
          description: 'Wrong/Invalid credentials!',
        })
        return
      }

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong',
        description: 'Wrong/Invalid credentials!',
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong',
        description: 'Login failed. Please try again!',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const storedEmailFromRegister = window.localStorage.getItem('email')

    if (storedEmailFromRegister) {
      setEmail(storedEmailFromRegister)
    } else {
      const storedRememberMeEmail =
        window.localStorage.getItem('rememberMeEmail')
      if (storedRememberMeEmail) {
        setEmail(storedRememberMeEmail)
      }
    }
  }, [])

  return (
    <DefaultWidth>
      <div className="pt-12 flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-screen-sm">
          <h2 className={classNames.heroText}>Welcome Back!</h2>
          <p className={classNames.subHeroText}>Sign in to your account</p>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm w-full flex flex-col items-start justify-start">
          <div className="w-full flex items-center justify-center">
            <button type="button">
              <img
                src="/svg/google-auth-icon.svg"
                alt="Google Sign up"
                className="w-[65px] h-auto"
              />
            </button>
          </div>

          <div className="w-full flex items-center justify-center py-6 gap-5">
            {/*  */}
            <div className="w-1/3 h-[0.7px] bg-[#E5E5E5]"></div>

            <p className="w-1/3 font-normal text-xs text-[#808080] text-center">
              or sign in with
            </p>

            {/*  */}
            <div className="w-1/3 h-[0.7px] bg-[#E5E5E5]"></div>
          </div>

          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className={classNames.labelText}>
                Email address
              </label>
              <div className="mt-2">
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  disabled={isLoading}
                  placeholder="johndoe@gmail.com"
                  className={classNames.authFormInput}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className={classNames.labelText}>
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  required
                  id="password"
                  name="password"
                  value={password}
                  placeholder="*****"
                  disabled={isLoading}
                  autoComplete="current-password"
                  className={classNames.authFormInput}
                  type={viewPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password.length > 1 ? (
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setViewPassword(!viewPassword)}
                    className="absolute top-1/2 -translate-y-1/2 right-5 text-indigo-700"
                  >
                    {viewPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </button>
                ) : null}
              </div>
            </div>

            <div className="flex flex-row items-center justify-between text-sm pt-6 sm:pt-4">
              <div className="flex flex-row-reverse items-center justify-end gap-x-2">
                <div>
                  <label
                    htmlFor="remember-me"
                    className={classNames.accentText}
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="remember-me"
                    name="remember-me"
                    disabled={isLoading}
                    checked={rememberMeChecked}
                    onChange={() => setRememberMeChecked(!rememberMeChecked)}
                    className="block border border-mx-stroke bg-mx-white py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-lg sm:leading-6 w-[25px] h-[25px]"
                  />
                </div>
              </div>

              <div>
                <p className="block text-sm font-medium leading-6 text-mx-primary">
                  <Link to={'#'}>Forgot password?</Link>
                </p>
              </div>
            </div>

            <div className="mt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={classNames.authFormBtn}
              >
                {isLoading ? 'Loading...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultWidth>
  )
}

export default Login
