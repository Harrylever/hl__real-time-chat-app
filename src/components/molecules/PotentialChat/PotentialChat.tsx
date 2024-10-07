import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app'
import { useToast } from '@/components/ui/use-toast'
import { PotentialChatProps } from '../../../../typings'
import { useCreateChatMutation } from 'src/app/api/hooks'
import { addUserChat } from 'src/app/slices/userChatsSlice'
import { updateCurrentChat } from 'src/app/slices/chatSlice'
import { setPotentialChatsModalIsOpen } from 'src/app/slices/appUIStateSlice'

const PotentialChat: React.FC<PotentialChatProps> = ({
  chat,
  chatIsLoading,
  setChatIsLoading,
}) => {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const { mutateAsync: createChatRequest, isPending } = useCreateChatMutation()
  const user = useAppSelector((state) => state.userReduce.user)
  const userChats = useAppSelector((state) => state.userChatsReduce.chats)
  const onlineUsers = useAppSelector((state) => state.socketReduce.onlineUsers)

  const handleCreateChat = async () => {
    if (!user) return
    const chatExists = userChats.find((el) =>
      el.members?.includes(chat.email as string),
    )

    if (chatExists) {
      dispatch(updateCurrentChat(chatExists))
      dispatch(setPotentialChatsModalIsOpen(false))
      return
    }

    try {
      const response = await createChatRequest({
        userOneEmail: user.email as string,
        userTwoEmail: chat.email as string,
      })

      if (response.success) {
        if (response.message.toLowerCase() === 'chat created successfully') {
          dispatch(
            addUserChat({
              chats: userChats.concat({ ...response.data }),
            }),
          )
        }
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

  const formattedUsername =
    (chat.username as string).length > 9
      ? `${chat.username?.substring(0, 9)}..`
      : chat.username

  useEffect(() => {
    setChatIsLoading(isPending)
  }, [isPending, setChatIsLoading])

  return (
    <button
      disabled={chatIsLoading}
      title={chat.username}
      onClick={handleCreateChat}
      className="group flex flex-row gap-2.5 items-center justify-start w-full max-w-full border-b border-[#ffffff2d] py-0.5 sm:py-2 pl-1 pr-3 rounded-lg hover:bg-mx-primary-8 duration-150"
    >
      <div className="w-fit border-2 border-[#ffffff73] rounded-full hover:border-white relative">
        <img
          src={chat.imgUri}
          alt={chat.username}
          className="rounded-full h-[50px] w-[50px] shadow-lg overflow-hidden"
        />
        {onlineUsers &&
          onlineUsers.some((user) => user.email === chat.email) && (
            <div className="rounded-full h-[10px] w-[10px] bg-mx-primary-4 absolute bottom-[8%] left-[75%]"></div>
          )}
      </div>

      <div className="flex flex-col gap-2.5 items-start justify-center mt-1">
        <div>
          <p className="text-mx-black font-medium text-sm/[0.6rem] sm:text-sm/[0.7rem] tracking-wide capitalize">
            {isPending
              ? `Creating new chat with ${formattedUsername}`
              : formattedUsername}
          </p>
        </div>

        <div>
          <p className="text-[0.7rem]/[0.5rem] sm:text-xs/[0.7rem] font-normal text-mx-grey-2">{`~${chat.email}`}</p>
        </div>
      </div>
    </button>
  )
}

export default PotentialChat
