import { useAppSelector } from 'src/app'
import { IChat } from 'typings'
import UserChat from '.'

interface UserChatsWrapProps {
  userChats: IChat[]
}

const UserChatsWrap: React.FC<UserChatsWrapProps> = ({ userChats }) => {
  const { user } = useAppSelector((state) => state.userReduce)

  return (
    <div className="flex flex-col gap-y-2 sm:gap-y-1.5">
      {user &&
        userChats.map((chat, index) => (
          <div key={index}>
            <UserChat chat={chat} user={user} />
          </div>
        ))}
    </div>
  )
}

export default UserChatsWrap
