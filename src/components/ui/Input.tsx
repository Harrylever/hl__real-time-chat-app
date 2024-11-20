import { HTMLInputTypeAttribute, useState } from 'react'
import { classNames } from 'src/styles'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface InputProps {
  id?: string
  register: any
  label: string
  labelText: string
  required: boolean
  type?: HTMLInputTypeAttribute
  placeholder?: string
  error?: any
}

const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  label,
  labelText,
  register,
  required,
  error,
  placeholder,
}) => {
  const [canViewPassword, setCanViewPassword] = useState(false)

  return (
    <div>
      <label htmlFor={id} className={classNames.labelText}>
        {labelText}
      </label>
      <div className="mt-2 relative">
        <input
          id={id}
          placeholder={placeholder}
          type={canViewPassword ? 'text' : type}
          {...register(label, { required })}
          className={classNames.authFormInput}
        />
        {label === 'password' && (
          <button
            type="button"
            name="toggle-password-visibility-button"
            onClick={() => setCanViewPassword(!canViewPassword)}
            className="absolute top-1/2 -translate-y-1/2 right-5 text-indigo-700"
          >
            {canViewPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 ml-2 text-red-600 text-xs font-normal">
          {error.message}
        </p>
      )}
    </div>
  )
}

interface AcceptTermsInputProps {
  register: any
  label: string
  error?: any
}

export const AcceptTermsInput: React.FC<AcceptTermsInputProps> = ({
  // label,
  register,
  error,
}) => {
  return (
    <div>
      <div className="pt-6 sm:pt-4 flex flex-row-reverse items-center text-start justify-end gap-x-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="accept-terms"
            className="block text-sm font-medium leading-6 text-mx-black"
          >
            I agree to the
            <a
              href="/terms"
              className="text-mx-primary underline opacity-80 hover:opacity-100 duration-200"
            >
              Terms and Condition
            </a>
          </label>
        </div>
        <input
          id="accept-terms"
          type="checkbox"
          {...register('acceptTerms', { required: true })}
          className="block border border-mx-stroke bg-mx-white py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-lg sm:leading-6 w-[25px] h-[25px]"
        />
      </div>
      {error && (
        <p className="mt-2 ml-0.5 text-red-600/70 text-xs font-medium">
          Confirm you accept our terms
        </p>
      )}
    </div>
  )
}

export default Input
