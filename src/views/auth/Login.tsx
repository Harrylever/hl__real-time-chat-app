import { classNames } from 'src/styles'
import GoogleAuth from 'src/components/ui/GoogleAuth'
import LoginPageForm from 'src/components/ui/LoginForm'
import DefaultWidth from 'src/components/ui/DefaultWidth'

const LoginPage = () => {
  return (
    <DefaultWidth>
      <div className="pt-12 flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-screen-sm">
          <h2 className={classNames.heroText}>Welcome Back!</h2>
          <p className={classNames.subHeroText}>Sign in to your account</p>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm w-full flex flex-col items-start justify-start">
          <div className="w-full flex items-center justify-center">
            {/* Google Login button */}
            <GoogleAuth />
          </div>
          <div className="w-full flex items-center justify-center py-6 gap-5">
            <div className="w-1/3 h-[0.7px] bg-[#E5E5E5]"></div>

            <p className="w-1/3 font-normal text-xs text-[#808080] text-center">
              or sign in with
            </p>

            {/* Seperator */}
            <div className="w-1/3 h-[0.7px] bg-[#E5E5E5]"></div>
          </div>

          {/* Form */}
          <LoginPageForm />
        </div>
      </div>
    </DefaultWidth>
  )
}

export default LoginPage
