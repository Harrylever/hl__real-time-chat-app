import { classNames } from 'src/styles'
import PotentialChat from './PotentialChat'
import { useToast } from '@/components/ui/use-toast'
import { ScrollArea } from '@/components/ui/scroll-area'
import { IChat, IPotentialChatWrapProps, IUser } from 'typings'
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import {
  ChatRequests,
  useAppDispatch,
  useAppSelector,
  useAxiosPrivate,
} from 'src/app'
import { addUserChat } from 'src/app/slices/userChatsSlice'
import { setPotentialChatsModalIsOpen } from 'src/app/slices/appUIStateSlice'

const PotentialChatWrap: React.FC<{
  props: IPotentialChatWrapProps
  updatePotentialChatsCb: (chat: IChat) => void
}> = ({ props, updatePotentialChatsCb }): JSX.Element => {
  //
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  const axiosInstance = useAxiosPrivate()
  const chatRequests = useMemo(
    () => new ChatRequests(axiosInstance),
    [axiosInstance],
  )

  const user = useAppSelector((state) => state.userReduce)
  const userChats = useAppSelector((state) => state.userChatsReduce.chats)

  const getUserChatsHandler = async () => {
    try {
      const response = (await chatRequests.useGetUserChatsQuery(
        user._id as string,
      )) as { success: boolean; message: string; data: IChat[] }
      return response
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Failed to update chats list',
      })
      console.log(err)
    }
  }

  const createChatProcess = (id: string) => {
    const chat = userChats.find(
      (el) =>
        el.members?.includes(user._id as string) && el.members.includes(id),
    )
    if (chat) {
      updatePotentialChatsCb(chat)
      dispatch(setPotentialChatsModalIsOpen(false))
      return
    }
    const createChatObj = { userOneId: user._id as string, userTwoId: id }
    const fetch = chatRequests.useCreateChatMutation(createChatObj)

    fetch
      .then(async (res) => {
        const newChatResponse = res as {
          data: IChat
          message: string
          success: boolean
        }
        if (
          newChatResponse.success &&
          newChatResponse.message.toLowerCase() === 'chat created successfully'
        ) {
          const resTwo = await getUserChatsHandler()
          if (
            resTwo?.message &&
            resTwo.message.toLowerCase() === 'chats retrieved successfully'
          ) {
            dispatch(
              addUserChat({
                chats: resTwo.data,
              }),
            )
            updatePotentialChatsCb(newChatResponse.data)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        console.log('Done')
        dispatch(setPotentialChatsModalIsOpen(false))
      })
  }

  const [searchValue, setSearchValue] = useState('')
  const [searchedPotentialChats, setSearchedPotentialChats] = useState<IUser[]>(
    [],
  )
  const memoizedSearchedPotentialChats = useMemo(
    () => searchedPotentialChats,
    [searchedPotentialChats],
  )

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setSearchValue(text)

    if (text === '') {
      setSearchedPotentialChats(props)
      return
    }

    const filteredValues = props.filter((chat) => {
      return (
        chat.username?.toLowerCase().includes(text.toLowerCase()) ||
        chat.fullname?.toLowerCase().includes(text.toLowerCase())
      )
    })
    setSearchedPotentialChats(filteredValues)
  }

  useEffect(() => {
    setSearchedPotentialChats(props)
  }, [props])

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="mt-2">
          <label htmlFor="search-chat">
            <input
              className={classNames.authFormInput}
              type="text"
              placeholder="Search name or username"
              name="search-chat"
              id="search-chat"
              aria-label="search-chat"
              value={searchValue}
              onChange={handleSearchValueChange}
            />
          </label>
        </div>

        <ScrollArea className="mt-4 h-[350px] w-full">
          <div className="flex flex-col gap-y-2 sm:gap-y-1.5">
            {memoizedSearchedPotentialChats.map((chat, _) => (
              <PotentialChat
                key={_}
                chat={chat}
                cb={() => createChatProcess(chat._id as string)}
              />
            ))}
            {props.length < 1 && <p className="ml-3">No chats found.</p>}
          </div>
        </ScrollArea>
      </div>
    </React.Fragment>
  )
}

export default PotentialChatWrap
