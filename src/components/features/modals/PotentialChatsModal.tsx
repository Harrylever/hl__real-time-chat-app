import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { IUser } from 'typings'
import { PotentialChatWrap } from 'src/components/molecules'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useUpdateCurrentChatHandler } from 'src/components/hooks'
import { addPotentialChat } from 'src/app/slices/potentialChatsSlice'
import {
  useAppDispatch,
  useAppSelector,
  useAxiosPrivate,
  UserRequests,
} from 'src/app'
import { useToast } from '@/components/ui/use-toast'
import { setPotentialChatsModalIsOpen } from 'src/app/slices/appUIStateSlice'

const PotentialChatsModal = () => {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const axiosInstance = useAxiosPrivate()
  const user = useAppSelector((state) => state.userReduce)
  const [pChatsIsLoading, setPChatsIsLoading] = useState(false)

  const userRequests = useMemo(
    () => new UserRequests(axiosInstance),
    [axiosInstance],
  )

  const potentialChatModalIsOpen = useAppSelector(
    (state) => state.appUIStateReduce.potentialChatsModalIsOpen,
  )

  const handleSetPotentialChatsModalIsOpen = (value: boolean) => {
    dispatch(setPotentialChatsModalIsOpen(value))
  }

  // Memoize Important Values - potentialChats
  const potentialChats = useAppSelector(
    (state) => state.potentialChatsReduce.users,
  )
  const memoizedPotentialChats = useMemo(() => potentialChats, [potentialChats])

  const getAllPotentialChatsHandler = useCallback(async () => {
    try {
      setPChatsIsLoading(true)
      const response = (await userRequests.useGetAllUsersQuery()) as {
        success: boolean
        data: IUser[]
      }

      if (response.success) {
        const pChats = response.data
        const filteredChats = pChats.filter((chat) => chat._id !== user._id)
        dispatch(addPotentialChat({ users: filteredChats }))
      } else {
        //
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Failed to get users',
      })
    } finally {
      setPChatsIsLoading(false)
    }
  }, [dispatch, toast, user._id, userRequests])

  useEffect(() => {
    getAllPotentialChatsHandler()
  }, [getAllPotentialChatsHandler])

  const [updateCurrentChatHandler] = useUpdateCurrentChatHandler()

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

          <div className="flex flex-row gap-x-2 pb-5">
            {pChatsIsLoading ? (
              <p>Loading chats...</p>
            ) : (
              // Potential-Chats-Wrap Component
              // the potentialChats Array is being passed as the props from THE REDUX REDUCER
              <PotentialChatWrap
                props={memoizedPotentialChats}
                updatePotentialChatsCb={(chat) =>
                  updateCurrentChatHandler(chat)
                }
              />
            )}
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PotentialChatsModal
