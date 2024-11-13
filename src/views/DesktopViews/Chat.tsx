import { useAppSelector } from 'src/app'
import ChatBox from 'src/components/ui/ChatBox/ChatBox'
import UserChatsBox from 'src/components/ui/UserChat/UserChatsBox'

const ChatView = () => {
  const { user } = useAppSelector((state) => state.userReduce)
  const currentChat = useAppSelector((state) => state.chatReduce.chat)

  return (
    <div className="relative w-full h-full flex flex-row gap-4 pt-8 px-5 sm:px-10 lg:px-0 pb-10">
      <UserChatsBox />

      <>
        {user && currentChat ? (
          <ChatBox user={user} currentChat={currentChat} />
        ) : (
          <GetStarted />
        )}
      </>
    </div>
  )
}

const GetStarted = () => {
  return (
    <div className="relative w-full h-full bg-mx-primary-9 border border-mx-stroke rounded-lg shadow-md">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-3">
        <img
          src={'/svg/message-text-icon.svg'}
          alt="Get Chatting"
          className="relative w-[92.5px] h-auto opacity-90"
        />
        <p className="font-bold text-mx-primary-7 text-4xl">Get Chatting</p>
      </div>
    </div>
  )
}

export default ChatView
