import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../../app';
import { IOnlineUser } from '../../../typings';
import { updateOnlineUsers } from '../../app/slices/socketSlice';

const SocketClient = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReduce);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
  }, [user]);

  useEffect(() => {
    if (socket && user && user._id !== '') {
      console.log('Yoo!!')
      // Emit Current user id
      socket.emit('addNewUser', user._id);
      
      // Get active users
      socket.on('getOnlineUsers', (res) => {
        const onlineUsersResponse = res as Array<IOnlineUser>;
        dispatch(
          updateOnlineUsers({
            onlineUsers: onlineUsersResponse,
          })
        );
      })
    } else {
      console.log('UnYoo!!')
    }
  }, [dispatch, socket, user]);

  return null;
}

export default SocketClient;