import { PageProps } from '../../typings';
import { ChatSection } from '../components/sections';

const Chat: React.FC<{ props: PageProps }> = () => {
  return (
    <div>
      <ChatSection />
    </div>
  )
}

export default Chat;