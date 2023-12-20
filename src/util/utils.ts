import {jwtDecode} from 'jwt-decode';

export function checkIsNum(value: string): boolean {
  const isNum = /^\d+$/;
  return isNum.test(value);
}

/**
 * Decode an access token and return an object
 * @param token
 * @returns
 */
function buildJWTDecode<T>(token: string): T {
  return jwtDecode(token);
}

function isValidEmail(email: string): boolean {
  const validEmailRegEx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validEmailRegEx.test(email);
}

function isValidPassword(password: string): boolean {
  const validPasswordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).+$/;
  return validPasswordRegEx.test(password);
}

function generatePassword() {
  const length = 13;
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const digitChars = '0123456789';
  const specialChars = '!@#$%^&*()_+';

  const allChars = uppercaseChars + lowercaseChars + digitChars + specialChars;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }

  if (isValidPassword(password)) {
    return password;
  } else {
    generatePassword()
  }
}

export { buildJWTDecode, isValidEmail, isValidPassword, generatePassword};
