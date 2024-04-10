/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito']
      },
      colors: {
        'primary-purple': '#1E293B',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

