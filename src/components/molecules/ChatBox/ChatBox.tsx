import { useCallback, useEffect, useMemo, useState } from 'react';
import { IChat, IMessage, IUser } from '../../../../typings';
import { PrivateRequestConstruct } from '../../../app/features/requests';
import { useAxiosPrivate } from '../../../app';

interface IChatBoxProps {
  messsagesIsLoading?: boolean;
  messages?: Array<IMessage>;
  currentChat?: IChat;
  user?: IUser;
}

const ChatBox: React.FC<{ props: IChatBoxProps }> = ({
  props: { currentChat, user },
}) => {
  const axiosInstance = useAxiosPrivate();
  const privateRequestInstance = useMemo(
    () => new PrivateRequestConstruct(axiosInstance),
    [axiosInstance]
  );

    
  const [recipientUser, setRecipientUser] = useState<IUser | undefined>(
    undefined
  );

  const getRecipientUser = useCallback(() => {
    const fetch = privateRequestInstance.useGetRecipientUserQuery(
      currentChat?.members as string[],
      user as IUser
    );

    fetch
      .then((res) => {
        console.log(res);
        if (res.success) {
          const recipientUser = res.data as IUser; 
          setRecipientUser(recipientUser);          
        } else {
          console.log('Unexpected error occured!');
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {})
  }, [currentChat, privateRequestInstance, user]);

  useEffect(() => {
    if (currentChat && currentChat.members!.length > 0) {
      console.log('Whats good')
      getRecipientUser()
    } else {
      console.log('Not good')
    }
  }, [currentChat, user, getRecipientUser])

  return (
    <div>
      {recipientUser && <ChatView />}
      {!recipientUser && <p>No conversation to show</p>}
    </div>
  );
};

const ChatView = (): JSX.Element => {
  return (
    <div></div>
  )
}

export default ChatBox;
