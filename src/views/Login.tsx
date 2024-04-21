import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePostLoginMutation } from '../app/slices/authApiSlice';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { buildJWTDecode } from '../util/utils';
import { LoginResValues, PageProps } from '../../typings';
import { setToken, useAppDispatch } from '../app';
import { classNames } from '../styles';
import { DefaultWidth } from '../components/atoms';

const Login: React.FC<{ props?: PageProps }> = () => {
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
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={isLoading}
                  required
                  className={classNames.authFormInput}
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
                  id="password"
                  name="password"
                  type={viewPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={isLoading}
                  required
                  className={classNames.authFormInput}
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
                    name="remember-me"
                    id="remember-me"
                    className="block border border-mx-stroke bg-mx-white py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-lg sm:leading-6 w-[30px] h-[30px]"
                    disabled={isLoading}
                    checked={rememberMeChecked}
                    onChange={() => setRememberMeChecked(!rememberMeChecked)}
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
            </div>
          </form>
        </div>
      </div>
    </DefaultWidth>
  );
};

export default Login;