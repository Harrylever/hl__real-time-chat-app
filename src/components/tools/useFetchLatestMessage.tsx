import { IChat, IMessage } from '../../../typings';
import { useAppSelector, useAxiosPrivate } from '../../app';
import { MessageRequests } from '../../app/features/requests';
import { useCallback, useEffect, useMemo, useState } from 'react';

const FetchLatestMessage = (chat: IChat): IMessage => {
  const axiosInstance = useAxiosPrivate();
  const messageRequests = useMemo(
    () => new MessageRequests(axiosInstance),
    [axiosInstance]
  );
  const newMessage = useAppSelector((state) => state.socketReduce.newMessage);
  const notifications = useAppSelector(
    (state) => state.notificationReduce.notifications
  );
  const [latestMessage, setLatestMessage] = useState<IMessage | undefined>(
    undefined
  );

  const getMessages = useCallback(async () => {
    if (!chat._id) return;
    const response = (await messageRequests.useGetLastChatMessage(
      chat._id as string
    )) as { success: boolean; data: IMessage };
    setLatestMessage(response.data);
  }, [chat._id, messageRequests]);

  useEffect(() => {
    getMessages();
  }, [getMessages, newMessage, notifications]);

  return latestMessage as IMessage;
};

export default FetchLatestMessage;
