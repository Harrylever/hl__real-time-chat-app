import axios from 'axios'
import {
  names,
  adjectives,
  NumberDictionary,
  uniqueNamesGenerator,
} from 'unique-names-generator'
import { useState } from 'react'
import LoadingPlayer from './LoadingPlayer'
import { IUseGoogleAuthValues } from 'typings'
import { toast } from '@/components/ui/use-toast'
import { useGoogleLogin } from '@react-oauth/google'
import { POST_REQUEST_MESSAGE_RESPONSE } from 'src/app'
import { useGoogleAuthMutation } from 'src/app/api/hooks'

const GoogleAuth = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const username = uniqueNamesGenerator({
    dictionaries: [adjectives, names, NumberDictionary.generate()],
    separator: '',
    length: 3,
  })

  const { mutateAsync: googleAuth } = useGoogleAuthMutation()

  const authCallback = async (values: IUseGoogleAuthValues) => {
    try {
      const response = await googleAuth(values)

      if (response.message === POST_REQUEST_MESSAGE_RESPONSE.USER_LOGIN) {
        toast({
          variant: 'success',
          title: 'Hooray 🎉',
          description: 'Google sign-in successful',
        })

        setTimeout(() => {
          window.location.href = '/app'
        }, 500)
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong',
        description: error?.message,
      })
    } finally {
      setIsAuthenticating(false)
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data)

      const credentials = {
        email: userInfo.email,
        username: username.toLowerCase(),
        profileImage: userInfo.picture,
        fullname: `${userInfo.family_name} ${userInfo.given_name}`,
      }
      await authCallback(credentials)
    },
  })

  const handleOnClick = () => {
    setIsAuthenticating(true)
    googleLogin()
  }

  return isAuthenticating ? (
    <LoadingPlayer />
  ) : (
    <button type="button" name="google-auth-button" onClick={handleOnClick}>
      <img
        src="/svg/google-auth-icon.svg"
        alt="Google Sign up"
        className="w-[65px] h-auto"
      />
    </button>
  )
}

export default GoogleAuth
