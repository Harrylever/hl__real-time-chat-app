import { Fragment, useState } from 'react'
import { IUser } from 'typings'
import { MdClose } from 'react-icons/md'

interface MobileViewPropsHeaderProps {
  label: string
  user: IUser
  userQuery: string
  updateUserQuery: (user: string) => void
}

const MobileViewPropsHeader: React.FC<MobileViewPropsHeaderProps> = ({
  user,
  label,
  userQuery,
  updateUserQuery,
}) => {
  const [inputMode, setInputMode] = useState(false)

  const handleClose = () => {
    updateUserQuery('')
    setInputMode(!inputMode)
  }

  return (
    <div className="w-full flex items-center justify-between py-5 px-10">
      {inputMode ? (
        <div className="relative w-full">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => updateUserQuery(e.target.value)}
            className="w-full py-2 pl-5 pr-8 border border-mx-stroke focus:outline-none rounded-md"
          />

          <button
            name="close-mobile-chat-header-button"
            className="absolute top-1/2 -translate-y-1/2 right-3"
            onClick={handleClose}
          >
            <MdClose />
          </button>
        </div>
      ) : (
        <Fragment>
          <button
            name="search-chats-button"
            onClick={() => setInputMode(!inputMode)}
          >
            <img
              width={0}
              height={0}
              src="/svg/search-icon.svg"
              alt="search-chats-button"
              className="relative w-[23px] h-auto"
            />
          </button>

          <p className="text-mx-primary text-xl font-medium">{label}</p>

          <img
            width={0}
            height={0}
            src={user.profileImage}
            alt={`${user.fullname} profile image`}
            className="relative w-[42px] h-auto"
          />
        </Fragment>
      )}
    </div>
  )
}

export default MobileViewPropsHeader
