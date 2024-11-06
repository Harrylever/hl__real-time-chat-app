import ChatBox from 'src/components/ui/ChatBox/ChatBox'
import UserChatsBox from 'src/components/ui/UserChat/UserChatsBox'

const ChatView = () => {
  return (
    <div className="relative w-full h-full flex flex-row gap-4 pt-8 px-5 sm:px-10 lg:px-0 pb-10">
      <UserChatsBox />
      <ChatBox />
    </div>
  )
}

export default ChatView
