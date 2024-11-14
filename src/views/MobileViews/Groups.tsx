import { useState } from 'react'
import { useAppSelector } from 'src/app'
import { Navigate } from 'react-router-dom'
import MobileViewPropsHeader from 'src/components/ui/MobileViewPropsHeader'

const GroupsView = () => {
  const { user } = useAppSelector((state) => state.userReduce)
  const [groupQuery, setGroupQuery] = useState('')

  if (!user) {
    return <Navigate to="/auth/login" />
  }

  return (
    <div className="h-full w-full pt-4 flex flex-col gap-3">
      <MobileViewPropsHeader
        label="Groups"
        user={user}
        userQuery={groupQuery}
        updateUserQuery={setGroupQuery}
      />

      <div className="h-full w-full flex-1 border border-black/10 px-6 py-6 rounded-t-[2.5rem] shadow-inner bg-mx-white">
        <p className="mt-5 ml-3 italic">Groups are coming soon</p>
      </div>
    </div>
  )
}

export default GroupsView
