import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePostLoginMutation } from '../app/slices/authApiSlice';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { buildJWTDecode } from '../util/utils';
import { LoginResValues, PageProps } from '../../typings';
import { setToken, useAppDispatch } from '../app';

const Login: React.FC<{ props: PageProps }> = () => {
  const dispatch = useAppDispatch();
  const [login] = usePostLoginMutation();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMeChecked, setRememberMeChecked] = useState(false);

  const [viewPassword, setViewPassword] = useState(false);

  // Response
  const [loginResponse, setLoginResponse] = useState<{
    message: string;
    status: 'success' | 'failed' | undefined;
  }>({ message: '', status: undefined });
  const [loginError, setLoginError] = useState<{
    message: string;
    isError: boolean;
  }>({
    message: '',
    isError: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (rememberMeChecked) {
      const rememberMeEmail = window.localStorage.getItem('rememberMeEmail');

      if (typeof rememberMeEmail === 'string' && rememberMeEmail !== '') {
        window.localStorage.removeItem('rememberMeEmail');
      }
      window.localStorage.setItem('rememberMeEmail', email);
    } else {
      window.localStorage.removeItem('rememberMeEmail');
      window.localStorage.removeItem('email');
    }

    const loginData = {
      email: email.trim(),
      password: password.trim(),
    };

    login(loginData)
      .then((res) => {
        if ('data' in res) {
          if (res.data.success) {
            const decodedData = buildJWTDecode<LoginResValues>(
              res.data.data.access
            );
            const { email, _id } = decodedData;
            const token = {
              email: email,
              _id,
              access: res.data.data.access,
              refresh: res.data.data.refresh,
            };
            dispatch(setToken(token));
            window.localStorage.setItem('auth', JSON.stringify(token));

            setLoginResponse({
              message: 'Logged in successfully',
              status: 'success',
            });

            setTimeout(() => {
              setLoginResponse({ message: '', status: undefined });
            }, 3700);
          } else {
            const resError = res;
            if ('data' in resError) {
              if (resError.data.message === 'user not found!') {
                setLoginError({
                  message: 'Invalid credentials!',
                  isError: true,
                });

                setTimeout(() => {
                  setLoginError({ message: '', isError: false });
                }, 3700);
              } else if (resError.data.message === 'invalid credentials!') {
                setLoginError({
                  message: 'Invalid credentials!',
                  isError: true,
                });

                setTimeout(() => {
                  setLoginError({ message: '', isError: false });
                }, 3700);
              } else {
                setLoginError({
                  message: 'Login failed. Please try again.',
                  isError: true,
                });

                setTimeout(() => {
                  setLoginError({ message: '', isError: false });
                }, 3700);
              }
            }
          }
        } else {
          const resError = res.error as {
            data: { message: string; statusCode: number; success: boolean };
          };
          if ('data' in resError) {
            if (resError.data.message === 'user not found!') {
              setLoginError({ message: 'Invalid credentials!', isError: true });

              setTimeout(() => {
                setLoginError({ message: '', isError: false });
              }, 3700);
            } else if (resError.data.message === 'invalid credentials!') {
              setLoginError({ message: 'Invalid credentials!', isError: true });

              setTimeout(() => {
                setLoginError({ message: '', isError: false });
              }, 3700);
            } else {
              setLoginError({
                message: 'Login failed. Please try again.',
                isError: true,
              });

              setTimeout(() => {
                setLoginError({ message: '', isError: false });
              }, 3700);
            }
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const storedEmailFromRegister = window.localStorage.getItem('email');

    if (storedEmailFromRegister) {
      setEmail(storedEmailFromRegister);
    } else {
      const storedRememberMeEmail =
        window.localStorage.getItem('rememberMeEmail');
      if (storedRememberMeEmail) {
        setEmail(storedRememberMeEmail);
      }
    }
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-wide text-slate-200">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
            </div>

            <div className="flex flex-row items-center justify-between text-sm mt-4">
              <div className="flex flex-row-reverse items-center justify-end gap-x-2">
                <div>
                  <label
                    className="font-semibold text-gray-500"
                    htmlFor="remember-me"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    disabled={isLoading}
                    checked={rememberMeChecked}
                    onChange={() => setRememberMeChecked(!rememberMeChecked)}
                  />
                </div>
              </div>

              <div>
                <p className="font-semibold text-indigo-600">
                  <Link to={'#'}>Forgot password?</Link>
                </p>
              </div>
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Log in'}
              </button>
              {loginResponse.status !== undefined ? (
                <div className="pt-3 font-medium font-inter text-xs text-center">
                  {loginResponse.status === 'success' ? (
                    <p className="text-emerald-500">{loginResponse.message}</p>
                  ) : null}
                </div>
              ) : null}

              {loginError.isError ? (
                <div className="pt-3 font-medium font-inter text-xs text-center">
                  <p className="text-red-600">{loginError.message}</p>
                </div>
              ) : null}

              <div className="sm:hidden text-sm mt-4 text-center">
                <p className="font-semibold text-white">
                  Don&rsquo;t have an account?
                  <Link
                    to="/register"
                    className="ml-1 text-indigo-600 hover:text-indigo-500"
                  >
                    Create an account
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
            title="Not yet available"
            type="button"
            disabled
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
};

export default Login;