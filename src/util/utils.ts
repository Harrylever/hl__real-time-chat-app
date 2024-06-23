import { jwtDecode } from 'jwt-decode'
import { IUser } from 'typings'

export function checkIsNum(value: string): boolean {
  const isNum = /^\d+$/
  return isNum.test(value)
}

/**
 * Decode an access token and return an object
 * @param token
 * @returns
 */
function buildJWTDecode<T>(token: string): T {
  return jwtDecode(token)
}

function isValidEmail(email: string): boolean {
  const validEmailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return validEmailRegEx.test(email)
}

function isValidPassword(password: string): boolean {
  const validPasswordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).+$/
  return validPasswordRegEx.test(password)
}

function generatePassword() {
  const length = 13
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const digitChars = '0123456789'
  const specialChars = '!@#$%^&*()_+'

  const allChars = uppercaseChars + lowercaseChars + digitChars + specialChars

  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length)
    password += allChars.charAt(randomIndex)
  }

  if (isValidPassword(password)) {
    return password
  } else {
    generatePassword()
  }
}

function goToLocation(pathname: string) {
  window.location.href = pathname
}

function handleRememberMe(email: string, rememberMe: boolean) {
  if (rememberMe) {
    const rememberMeEmail = window.localStorage.getItem('rememberMeEmail')

    if (typeof rememberMeEmail === 'string' && rememberMeEmail !== '') {
      window.localStorage.removeItem('rememberMeEmail')
    }
    window.localStorage.setItem('rememberMeEmail', email)
  } else {
    window.localStorage.removeItem('rememberMeEmail')
    window.localStorage.removeItem('email')
  }
}

function userIsPresent(user: IUser | undefined) {
  if (user && user._id && user._id.length > 0) return true
  return false
}

export {
  goToLocation,
  isValidEmail,
  userIsPresent,
  buildJWTDecode,
  isValidPassword,
  generatePassword,
  handleRememberMe,
}
