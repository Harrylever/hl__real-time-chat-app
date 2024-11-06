import { jwtDecode } from 'jwt-decode'
import { IAccount, IOnlineUser } from 'typings'

export function isNumeric(value: any) {
  return isNaN(Number(value))
}

/**
 * Decode an access token and return an object
 * @param token
 * @returns
 */
export function buildJWTDecode<T>(token: string): T {
  return jwtDecode(token)
}

export function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email,
  )
}

export function isValidPassword(password: string): boolean {
  const validPasswordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).+$/
  return validPasswordRegEx.test(password)
}

export function generatePassword() {
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

export function handleRememberMe(email: string, rememberMe: boolean) {
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

export function userIsPresent(user: IAccount | undefined) {
  if (user && user.email && user.email.length > 0) return true
  return false
}

export function truncateText(text: string) {
  let shortText = text.substring(0, 20)

  if (text.length > 20) {
    shortText = shortText + '...'
  }
  return shortText
}

export function userIsOnline(accountId: string, onlineUsers: IOnlineUser[]) {
  return onlineUsers.some((user) => user.email === accountId)
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
