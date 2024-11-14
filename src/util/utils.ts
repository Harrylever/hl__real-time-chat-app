import { IOnlineUser } from 'typings'
import { jwtDecode } from 'jwt-decode'

/**
 * Decode an access token and return an object
 * @param token
 * @returns
 */
export function buildJWTDecode<T>(token: string): T {
  return jwtDecode(token)
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
