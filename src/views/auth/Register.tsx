import { classNames } from 'src/styles'
import GoogleAuth from 'src/components/ui/GoogleAuth'
import DefaultWidth from 'src/components/ui/DefaultWidth'
import RegisterPageForm from 'src/components/ui/RegisterForm'

const RegisterPage = () => {
  return (
    <DefaultWidth>
      <div className="pt-12 flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full">
          <h2 className={classNames.heroText}>Welcome</h2>
          <p className={classNames.subHeroText}>Create an account</p>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm w-full flex flex-col items-start justify-start">
          <div className="w-full flex items-center justify-center">
            <GoogleAuth />
          </div>

          <div className="w-full flex items-center justify-center py-6 gap-5">
            {/*  */}
            <div className="w-1/3 h-[0.7px] bg-[#E5E5E5]"></div>

            <p className="w-1/3 font-normal text-xs text-[#808080] text-center">
              or sign up with
            </p>

            {/* Seperator */}
            <div className="w-1/3 h-[0.7px] bg-[#E5E5E5]"></div>
          </div>

          {/* Form */}
          <RegisterPageForm />
        </div>
      </div>
    </DefaultWidth>
  )
}

export default RegisterPage
