import { useMemo, useState } from 'react'
import { useAppSelector } from 'src/app'
import { Navigate } from 'react-router-dom'
import { useGetAllUsersQuery } from 'src/app/api/hooks'
import MobileViewPropsHeader from 'src/components/ui/MobileViewPropsHeader'
import MobileContactViewChatsWrap from 'src/components/ui/MobileContactViewComponent/MobileContactViewChatsWrap'

const Contacts = () => {
  const { user } = useAppSelector((state) => state.userReduce)
  const [userQuery, setUserQuery] = useState('')
  const { data, isFetching, error, refetch } = useGetAllUsersQuery()

  if (error) {
    return (
      <div>
        <p className="italic">Failed to get users</p>

        <button
          type="button"
          onClick={() => refetch()}
          className="bg-mx-primary-2 py-3 px-5 rounded-lg text-white text-sm"
        >
          Try again
        </button>
      </div>
    )
  }

  const potentialChats = useMemo(
    () =>
      data?.data.filter((chat) => chat.email.trim() !== user?.email.trim()) ??
      [],
    [data?.data, user?.email],
  )

  if (!user) {
    return <Navigate to="/auth/login" />
  }

  return (
    <div className="h-full w-full pt-4 flex flex-col gap-3">
      <MobileViewPropsHeader
        label="Contacts"
        user={user}
        userQuery={userQuery}
        updateUserQuery={setUserQuery}
      />

      <MobileContactViewChatsWrap
        isLoading={isFetching}
        searchValue={userQuery}
        potentialChats={potentialChats}
      />
    </div>
  )
}

export default Contacts
