import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
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
            type="button"
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
