import axios from 'axios';
import { IUser } from '../../../typings';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app';
import React, { useEffect, useState } from 'react';
import LoadingPlayer from '../atoms/LoadingPlayer';
import { NavBarComponent, SideBarChatList } from '../sections';

export default function Layout() {
  const user = useAppSelector((state) => state.userReduce);
  const sideBarChatListIsOpen = useAppSelector(
    (state) => state.appUIStateReduce.sideBarChatOpen
  );

  const [localuser, setLocalUser] = useState<IUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && user._id !== '') {
      setLocalUser(user);
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      const handleGetAPIIndex = async () => {
        const BASE_URL = import.meta.env.VITE_BE_URL;
        const fetch = await axios.get(BASE_URL);
        return fetch.data;
      };

      const response = await handleGetAPIIndex();
      if (response.success) {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingPlayer />
      ) : (
        <div className="w-full">
          <div className="w-full relative">
            {/*  */}
            {sideBarChatListIsOpen && <SideBarChatList />}

            <div className="relative z-[20] w-full bg-mx-white shadow-md">
              <div className="mx-auto px-6 sm:px-8 flex justify-center">
                <NavBarComponent props={{ user: localuser }} />
              </div>
            </div>
            <div className="relative z-[10] w-full">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
