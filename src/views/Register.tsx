import clsx from 'clsx';
import React, { useState } from 'react';
import { IUser, PageProps } from '../../typings';
import { isValidEmail, isValidPassword } from '../util/utils';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { usePostRegisterMutation } from '../app/slices/authApiSlice';
import { classNames } from '../styles';
import { DefaultWidth } from '../components/atoms';

const Register: React.FC<{ props?: PageProps }> = () => {
  const [register] = usePostRegisterMutation();

  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [viewPassword, setViewPassword] = useState(false);

  // Error
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Response
  const [registerResponse, setRegisterResponse] = useState<{
    message: string;
    status: 'success' | 'failed' | undefined;
  }>({ message: '', status: undefined });
  const [registerError, setRegisterError] = useState<{
    message: string;
    isError: boolean;
  }>({
    message: '',
    isError: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isValidEmail(email)) {
      setIsLoading(false);
      setEmailError(true);

      setTimeout(() => {
        setEmailError(false);
      }, 3700);
      return;
    }

    if (!isValidPassword(password)) {
      setIsLoading(false);
      setPasswordError(true);

      setTimeout(() => {
        setPasswordError(false);
      }, 8000);
    }

    const registerData: IUser = {
      username: username.toLowerCase().trim(),
      fullname,
      email: email.trim(),
      password: password.trim(),
      imgUri: 'placeholder',
    };

    register(registerData)
      .then((res) => {
        if ('data' in res) {
          setRegisterResponse({
            message: 'Account created successfully.',
            status: 'success',
          });

          setTimeout(() => {
            setRegisterResponse({ message: '', status: undefined });

            setTimeout(() => {
              localStorage.setItem('email', email);
              window.location.assign('/login');
            }, 600);
          }, 3700);
        } else {
          const resError = res.error as {
            data: { message: string; statusCode: number; success: boolean };
          };
          if ('data' in resError) {
            if (resError.data.message === 'user with email exists!') {
              setRegisterError({
                message: 'User already exists with email',
                isError: true,
              });

              setTimeout(() => {
                setRegisterError({ message: '', isError: false });
              }, 3700);
            } else if (resError.data.message === 'user with username exists!') {
              setRegisterError({
                message: 'User already exists with username',
                isError: true,
              });

              setTimeout(() => {
                setRegisterError({ message: '', isError: false });
              }, 3700);
            } else if (resError.data.message === 'invalid password!') {
              setPasswordError(true);

              setTimeout(() => {
                setPasswordError(false);
              }, 8000);
            } else {
              setRegisterError({
                message: 'Register user failed. Please try again.',
                isError: true,
              });

              setTimeout(() => {
                setRegisterError({ message: '', isError: false });
              }, 3700);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <DefaultWidth>
      <div className="pt-12 flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full">
          <h2 className={classNames.heroText}>Welcome</h2>
          <p className={classNames.subHeroText}>Create an account</p>
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
              or sign up with
            </p>

            {/*  */}
            <div className="w-1/3 h-[0.7px] bg-[#E5E5E5]"></div>
          </div>

          <form className="space-y-6 w-full" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-mx-black"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  disabled={isLoading}
                  required
                  className="block w-full rounded-md border border-[#0708083f] focus:border-[#0708083f] focus:outline-none py-1.5 text-gray-900 shadow-sm focus:shadow-md placeholder:text-gray-400 ring-0 focus:ring-0 sm:text-sm sm:leading-6 duration-300"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-mx-black"
              >
                Full name
              </label>
              <div className="mt-2">
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  autoComplete="fullname"
                  disabled={isLoading}
                  required
                  className="block w-full rounded-md border border-[#0708083f] focus:border-[#0708083f] focus:outline-none py-1.5 text-gray-900 shadow-sm focus:shadow-md placeholder:text-gray-400 ring-0 focus:ring-0 sm:text-sm sm:leading-6 duration-300"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-mx-black"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={isLoading}
                  required
                  className="block w-full rounded-md border border-[#0708083f] focus:border-[#0708083f] focus:outline-none py-1.5 text-gray-900 shadow-sm focus:shadow-md placeholder:text-gray-400 ring-0 focus:ring-0 sm:text-sm sm:leading-6 duration-300"
                />
                {emailError ? (
                  <p className="text-xs text-red-500 opacity-60 pt-2">
                    Please provide a valid email!
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-mx-black"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={viewPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={isLoading}
                  required
                  className="block w-full rounded-md border border-[#0708083f] focus:border-[#0708083f] focus:outline-none py-1.5 text-gray-900 shadow-sm focus:shadow-md placeholder:text-gray-400 ring-0 focus:ring-0 sm:text-sm sm:leading-6 duration-300"
                />
                {password.length > 1 ? (
                  <button
                    type="button"
                    className="absolute right-5 bottom-2 text-indigo-700"
                    disabled={isLoading}
                    onClick={() => setViewPassword(!viewPassword)}
                  >
                    {viewPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </button>
                ) : null}
              </div>
              {passwordError ? (
                <div className="pt-1.5" data-aos="fade-right">
                  <ul className="list-disc text-xs text-red-400 font-inter pl-6">
                    <li>
                      Must contain special characters: #, @, {'('}, {')'},
                    </li>
                    <li>Must contain small letters</li>
                    <li>Must contain at least one capital letter</li>
                    <li>Must contain numbers, 0 - 9</li>
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="pt-6 sm:pt-4 flex flex-row-reverse items-center text-start justify-end gap-x-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="accept-terms"
                  className="block text-sm font-medium leading-6 text-mx-black"
                >
                  I agree to the{' '}
                  <a href="#" className="text-mx-primary">
                    Terms and Condition
                  </a>
                </label>
              </div>
              <div>
                <input
                  id="accept-terms"
                  name="accept-terms"
                  type="checkbox"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="block rounded-md border border-gray-900 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-lg sm:leading-6 w-[17px] h-[17px]"
                />
              </div>
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className={clsx([
                  classNames.authFormBtn,
                  {
                    'bg-indigo-600': !isLoading,
                    'bg-indigo-400': isLoading,
                  },
                ])}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Sign up'}
              </button>
              {registerResponse.status !== undefined ? (
                <div className="pt-3 font-medium font-inter text-xs text-center">
                  {registerResponse.status === 'success' ? (
                    <p className="text-emerald-500">
                      Account creation successful. You&lsquo;re one step closer
                      to getting started.
                    </p>
                  ) : null}
                </div>
              ) : null}

              {registerError.isError ? (
                <div className="pt-3 font-medium font-inter text-xs text-center">
                  <p className="text-red-600">{registerError.message}</p>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </DefaultWidth>
  );
};

export default Register;
