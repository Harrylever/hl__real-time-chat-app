import React from 'react'
import { IUser } from 'typings'

interface UserProfileIconProps {
  user: IUser
}

const UserProfileIcon: React.FC<UserProfileIconProps> = ({ user }) => {
  return (
    <div className="relative ml-4">
      <div className="relative flex max-w-xs items-center rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-400">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <img
          className="h-12 w-12 rounded-full"
          src={user.profileImage}
          alt={`${user.firstname} ${user.lastname} Profile Picture`}
        />
      </div>
    </div>
  )
}

export default UserProfileIcon
