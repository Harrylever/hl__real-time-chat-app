import { Outlet } from 'react-router-dom'
import { NavBarComponent } from '../sections';

export default function Layout() {
  return (
    <div className="w-full text-white font-nunito">
      <div className="w-full">
        <div className="w-full bg-slate-900 shadow-xl">
          <div className="mx-auto px-6 md:px-0">
            <NavBarComponent />
          </div>
        </div>
        <div className="w-full pt-5">
          <div className=" max-w-6xl mx-auto px-6 md:px-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
