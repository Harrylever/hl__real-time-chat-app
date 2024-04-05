import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { IMessage, IOnlineUser } from '../../../typings';
import { useAppDispatch, useAppSelector } from '../../app';
import { updateOnlineUsers } from '../../app/slices/socketSlice';
import { addMessages } from '../../app/slices/messagesSlice';

const SocketClient = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReduce);
  const activeChat = useAppSelector((state) => state.chatReduce.chat);
  const allMessages = useAppSelector((state) => state.messageReduce.messages);
  const newMessage = useAppSelector((state) => state.socketReduce.newMessage);

  const [, setSocketId] = useState<string | undefined>(undefined);
  const [socket, setSocket] = useState<Socket | undefined>(undefined); 

  const socketUri = import.meta.env.VITE_SOCKET_URL;
  
  useEffect(() => {
    if (user && user._id !== '') {
      const newSocket = io(socketUri);

      if (newSocket) {
        newSocket.on('connect', () => {
          setSocket(newSocket);
          setSocketId(newSocket.id);
          
          // Emit Current user id
          newSocket.emit('add-new-user', user._id);
        });

        newSocket.on('disconnect', () => {
          setSocket(undefined);
          setSocketId(undefined);
          console.log('Disconnected');
        });
      }
    }
  }, [user]);

  // Get active users
  useEffect(() => {
    if (socket) {
      const handleGetOnlineUsers = (res: IOnlineUser[]) => {
        const onlineUsersResponse = res;
        dispatch(
          updateOnlineUsers({
            onlineUsers: onlineUsersResponse,
          })
        );
      }

      socket.on('get-online-users', handleGetOnlineUsers);

      return () => {
        if (socket) {
          socket.off('get-online-users', handleGetOnlineUsers);
        }
      }
    }
  }, [dispatch, socket]);

  // Add Message
  useEffect(() => {
    if (socket) {
      if (newMessage && activeChat) {
        const recipientId = activeChat.members?.find((id) => id !== user._id);
        socket.emit('send-message', { ...newMessage, recipientId });
      }
    }
  }, [activeChat, newMessage, socket, user]);

  // Receive message
  useEffect(() => {
    if (socket) {
      const handleGetMessage = (res: IMessage & { recipientId: string }) => {
        if (activeChat._id !== res.chatId) return;
        dispatch(addMessages({ messages: [...allMessages, res] }));
      }

      socket.on('get-message', handleGetMessage);
      
      return () => {
        socket.off('get-message', handleGetMessage);
      }
    }
  }, [activeChat, allMessages, dispatch, socket]);

  return null;
};

export default SocketClient;
