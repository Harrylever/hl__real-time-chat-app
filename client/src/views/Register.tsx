import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { isValidEmail, isValidPassword } from '../util/utils';
import clsx from 'clsx';
import { usePostRegisterMutation } from '../app/slices/authApiSlice';

export default function Register() {
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
  const [registerError, setRegisterError] = useState<{ message: string, isError: boolean }>({
    message: '',
    isError: false
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

    const registerData = {
      username: username.toLowerCase().trim(),
      fullname,
      email: email.trim(),
      password: password.trim(),
    }

    register(registerData).then((res) => {
      if ('data' in res) {
        setRegisterResponse({
          message: 'Account created successfully.',
          status: 'success',
        });

        setTimeout(() => {
          setRegisterResponse({ message: '', status: undefined });

          setTimeout(() => {
            localStorage.setItem('email', email);
            window.location.assign('/login')
          }, 600);
        }, 3700);
      } else {
        const resError = res.error as {
          data: { message: string, statusCode: number, success: boolean }
        };
        if ('data' in resError) {
          if (resError.data.message === 'user with email exists!') {
            setRegisterError({ message: 'User already exists with email', isError: true });

            setTimeout(() => {
              setRegisterError({ message: '', isError: false })
            }, 3700);
          }
          else if (resError.data.message === 'user with username exists!') {
            setRegisterError({ message: 'User already exists with username', isError: true });

            setTimeout(() => {
              setRegisterError({ message: '', isError: false })
            }, 3700);
          } else if (resError.data.message === 'invalid password!') {
            setPasswordError(true);

            setTimeout(() => {
              setPasswordError(false)
            }, 8000);
          } else {
            setRegisterError({ message: 'Register user failed. Please try again.', isError: true });

            setTimeout(() => {
              setRegisterError({ message: '', isError: false })
            }, 3700);
          }
        }
      }
    }).finally(() => {
      setIsLoading(false)
    })
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-wide text-slate-200">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 lowercase"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
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
                  className="block text-sm font-medium leading-6 text-white"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
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

            <div className="flex flex-row-reverse items-center text-start justify-end gap-x-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="accept-terms"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  I agree to the{' '}
                  <a href="#" className="text-indigo-600">
                    Terms and Condition
                  </a>
                </label>
              </div>
              <div className="">
                <input
                  id="accept-terms"
                  name="accept-terms"
                  type="checkbox"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                  className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className={clsx([
                  'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                  {
                    'bg-indigo-600': !isLoading,
                    'bg-indigo-400': isLoading,
                  },
                ])}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Create an account'}
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

              {/*  */}
              <div className="sm:hidden text-sm mt-4 text-center">
                <p className="font-semibold text-white">
                  Already have an account?
                  <Link
                    to="/login"
                    className="ml-1 text-indigo-600 hover:text-indigo-500"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </form>

          <div className="mt-4 sm:mt-7 mb-7 flex flex-row items-center justify-between gap-x-3.5 text-xs font-medium">
            <div className="h-[1px] w-full bg-[#ffffff4a]"></div>
            <p>Or</p>
            <div className="h-[1px] w-full bg-[#ffffff4a]"></div>
          </div>

          <button
            type="button"
            disabled={isLoading}
            className="flex flex-row items-center justify-center gap-x-3.5 w-full py-1.5 bg-white rounded-md shadow-md"
          >
            <img src="/svg/google.svg" alt="" className="w-[1.3rem]" />
            <p className="text-slate-800 font-bold text-sm md:text-lg mt-0.5">
              Google
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
