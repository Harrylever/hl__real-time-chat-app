import React, { useEffect, useMemo } from 'react'
import {
  useAppDispatch,
  useAppSelector,
  POST_REQUEST_MESSAGE_RESPONSE,
} from '../../../app'
import { IUser } from 'typings'
import UserAvatar from './UserAvatar'
import { useToast } from '@/components/ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateChatMutation } from 'src/app/api/hooks'
import { updateCurrentChat } from 'src/app/slices/chatSlice'
import { setPotentialChatsModalIsOpen } from 'src/app/slices/appUIStateSlice'

interface PotentialChatProps {
  chat: IUser
  chatIsLoading: boolean
  setChatIsLoading: (value: boolean) => void
}

const PotentialChat: React.FC<PotentialChatProps> = ({
  chat,
  chatIsLoading,
  setChatIsLoading,
}) => {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const { user } = useAppSelector((state) => state.userReduce)
  const onlineUsers = useAppSelector((state) => state.socketReduce.onlineUsers)
  const { mutateAsync: createChatRequest, isPending } = useCreateChatMutation()

  useEffect(() => {
    setChatIsLoading(isPending)
  }, [isPending, setChatIsLoading])

  const isOnline = useMemo(
    () =>
      (onlineUsers ?? []).some((onlineUser) => onlineUser.email === chat.email),
    [chat.email, onlineUsers],
  )

  const formattedUsername =
    chat.username.length > 9
      ? `${chat.username.substring(0, 8)}..`
      : chat.username

  const handleCreateChat = async () => {
    if (!user) return

    try {
      const response = await createChatRequest({
        emailOne: user.email,
        emailTwo: chat.email,
      })

      if (response.message === POST_REQUEST_MESSAGE_RESPONSE.CHAT_CREATED) {
        queryClient.invalidateQueries({
          queryKey: ['user-chats'],
        })
        dispatch(updateCurrentChat(response.data))
        dispatch(setPotentialChatsModalIsOpen(false))
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something happened 😕',
        description: 'An error occurred while creating chat',
      })
    }
  }

  return (
    <button
      name="potential-chat-button"
      disabled={chatIsLoading}
      title={chat.username}
      onClick={handleCreateChat}
      className="group flex flex-row gap-2.5 items-center justify-start w-full max-w-full border-b border-[#ffffff2d] py-0.5 sm:py-2 pl-1 pr-3 rounded-lg hover:bg-mx-primary-8 duration-150"
    >
      <UserAvatar
        image={chat.profileImage}
        alt={chat.username}
        isOnline={isOnline}
      />
      <div className="flex flex-col gap-2.5  justify-center mt-1">
        <p className="text-mx-black font-medium text-sm/[0.6rem] sm:text-sm/[0.7rem] tracking-wide capitalize text-start">
          {isPending
            ? `Creating new chat with ${formattedUsername}`
            : formattedUsername}
        </p>

        <p className="text-[0.7rem]/[0.5rem] sm:text-xs/[0.7rem] font-normal text-mx-grey-2/50 text-start">{`~${chat.fullname}`}</p>
      </div>
    </button>
  )
}

export default PotentialChat
