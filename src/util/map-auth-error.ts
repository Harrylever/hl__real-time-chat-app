const errorResponse = {
  401: 'Incorrect Email/Password 😭',
  404: 'User not found. Registration needed',
}

export function mapAuthError(status: keyof typeof errorResponse): string {
  return errorResponse[status]
}
