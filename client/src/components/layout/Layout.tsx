import { Outlet } from 'react-router-dom'
import { NavBarComponent } from '../sections';
import { useEffect, useState } from 'react';
import { IUser } from '../../../typings';
import { useAppSelector } from '../../app';

export default function Layout() {
  const user = useAppSelector((state) => state.userReduce);

  const [localuser, setLocalUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    if (user && user._id !== '') {
      setLocalUser(user);
    }
  }, [user])

  return (
    <div className="w-full text-white font-nunito">
      <div className="w-full">
        <div className="w-full bg-slate-900 shadow-xl">
          <div className="mx-auto px-6 sm:px-8">
            <NavBarComponent user={localuser} />
          </div>
        </div>
        <div className="w-full pt-5">
          <div className=" max-w-6xl mx-auto px-6 sm:px-8 lg:px-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
