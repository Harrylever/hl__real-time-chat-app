import React from 'react'
import { useAppSelector } from '../../../app'
import { IPotentialChatProps } from '../../../../typings'

const PotentialChat: React.FC<IPotentialChatProps> = ({
  cb,
  chat,
}): JSX.Element => {
  const onlineUsers = useAppSelector((state) => state.socketReduce.onlineUsers)

  return (
    <button
      onClick={cb}
      title={chat.username}
      // className="group w-full flex flex-row items-center justify-start cursor-pointer hover:bg-mx-primary-9 py-0.5 duration-200"
      className="group flex flex-row gap-2.5 items-center justify-start w-full max-w-full border-b border-[#ffffff2d] py-0.5 sm:py-2 pl-1 pr-3 rounded-lg hover:bg-mx-primary-8 duration-150"
    >
      <div className="w-fit border-2 border-[#ffffff73] rounded-full hover:border-white relative">
        <img
          src={chat.imgUri}
          alt={chat.username}
          className="rounded-full h-[50px] w-[50px] shadow-lg overflow-hidden"
        />
        {onlineUsers &&
          onlineUsers.some((user) => user.userId === chat._id) && (
            <div className="rounded-full h-[10px] w-[10px] bg-mx-primary-4 absolute bottom-[8%] left-[75%]"></div>
          )}
      </div>

      <div className="flex flex-col gap-2.5 items-start justify-center mt-1">
        <div>
          <p className="text-mx-black font-medium text-sm/[0.6rem] sm:text-sm/[0.7rem] tracking-wide capitalize">
            {(chat.username as string).length > 9
              ? `${chat.username?.substring(0, 9)}..`
              : chat.username}
          </p>
        </div>

        <div>
          <p className="text-[0.7rem]/[0.5rem] sm:text-xs/[0.7rem] font-normal text-mx-grey-2">{`~${chat._id}`}</p>
        </div>
      </div>
    </button>
  )
}

export default PotentialChat
