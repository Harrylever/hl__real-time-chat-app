import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useEffect } from 'react'
import { LoadingPlayer } from 'src/components/ui'
import { useAppDispatch, useAppSelector } from 'src/app'
import { PotentialChatWrap } from 'src/components/molecules'
import { useGetAllUsersQuery } from 'src/app/api/hooks/useAccounts'
import { addPotentialChat } from 'src/app/slices/potentialChatsSlice'
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
  const dispatch = useAppDispatch()
  const { data, isFetching, isLoading, error, refetch } = useGetAllUsersQuery()
  const user = useAppSelector((state) => state.userReduce.user)

  const loading = isFetching || isLoading

  if (error) {
    return (
      <div>
        <p>Failed to get users</p>

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

  useEffect(() => {
    if (data && user) {
      const filteredChats = data.data.filter(
        (chat) => chat.email?.trim() !== user.email?.trim(),
      )
      dispatch(addPotentialChat({ users: filteredChats }))
    }
  }, [data, dispatch, user])

  return (
    <div className="flex flex-row gap-x-2 pb-5">
      {loading && <LoadingPlayer />}
      {data && data.success && <PotentialChatWrap />}
    </div>
  )
}

export default PotentialChatsModal
