import { useMemo } from 'react'
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import LoadingPlayer from '../ui/LoadingPlayer'
import { useAppDispatch, useAppSelector } from 'src/app'
import { useGetAllUsersQuery } from 'src/app/api/hooks/useAccounts'
import PotentialChatBox from '../ui/PotentialChat/PotentialChatBox'
import { setPotentialChatsModalIsOpen } from 'src/app/slices/appUIStateSlice'

const PotentialChatsModal = () => {
  const dispatch = useAppDispatch()

  const potentialChatModalIsOpen = useAppSelector(
    (state) => state.appUIStateReduce.potentialChatsModalIsOpen,
  )

  const handleSetPotentialChatsModalIsOpen = (value: boolean) => {
    dispatch(setPotentialChatsModalIsOpen(value))
  }

  return (
    <AlertDialog
      open={potentialChatModalIsOpen}
      onOpenChange={handleSetPotentialChatsModalIsOpen}
    >
      <AlertDialogTrigger asChild>
        <button
          type="button"
          name="potential-chat-modal-trigger-button"
          className="group hover:bg-mx-primary-8 border-2 border-transparent hover:border-mx-primary-9 p-2.5 duration-300 rounded-md"
        >
          <img
            src="/svg/search-icon.svg"
            alt={'Search ico'}
            style={{ width: '23px', height: 'auto' }}
          />
        </button>
      </AlertDialogTrigger>

      {/*  */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New Chat</AlertDialogTitle>

          <PotentialChatsList />
        </AlertDialogHeader>

        {/*  */}
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const PotentialChatsList = () => {
  const { user } = useAppSelector((state) => state.userReduce)
  const { data, isFetching, error, refetch } = useGetAllUsersQuery()

  const loading = isFetching

  if (error) {
    return (
      <div>
        <p className="italic">Failed to get users</p>

        <button
          name="try-again-button"
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

  const hasChats = potentialChats.length > 0

  return (
    <div className="flex flex-row gap-x-2 pb-5">
      {loading && <LoadingPlayer />}
      {hasChats ? (
        <PotentialChatBox potentialChats={potentialChats} />
      ) : (
        <p className="italic">No chats available</p>
      )}
    </div>
  )
}

export default PotentialChatsModal
