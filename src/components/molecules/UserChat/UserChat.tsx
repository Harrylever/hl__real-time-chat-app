import { useCallback, useEffect, useMemo, useState } from 'react';
import { IUser, IUserChatProps } from '../../../../typings';
import { useAppSelector, useAxiosPrivate } from '../../../app';
import { PrivateRequestConstruct } from '../../../app/features/requests';
import clsx from 'clsx';

const UserChat: React.FC<{ props: IUserChatProps }> = ({
  props: { user, chat },
}) => {
  const axiosInstance = useAxiosPrivate();
  const privateRequestInstance = useMemo(
    () => new PrivateRequestConstruct(axiosInstance),
    [axiosInstance]
  );

  const [recipientUser, setRecipientUser] = useState<IUser | undefined>(
    undefined
  );

  const [, setIsLoading] = useState(false);

  const getRecipientUserProcess = useCallback(() => {
    setIsLoading(true);
    const recipientId = chat?.members?.find((id) => id !== user?._id);

    if (!recipientId) return null;
    const fetch = privateRequestInstance.useGetUserByIdQuery(recipientId);
    fetch
      .then((res) => {
        if (res.success) {
          setRecipientUser(res.data as IUser);
        } else {
          console.log('Unexpected error occured');
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [chat?.members, privateRequestInstance, user?._id]);

  useEffect(() => {
    getRecipientUserProcess();
  }, [getRecipientUserProcess]);

  const onlineUsers = useAppSelector((state) => state.socketReduce.onlineUsers);
  const isOnline =
    onlineUsers &&
    onlineUsers.some((user) => user.userId === recipientUser?._id);

  return (
    <button
      type="button"
      className="flex flex-row items-center justify-between w-full lg:w-[300px] border-b border-[#ffffff2d] py-2 px-2 rounded-sm"
    >
      <div className="flex flex-row items-center justify-center gap-x-2.5">
        <div className="">
          <img
            src={recipientUser?.imgUri}
            alt={recipientUser?.username}
            className="rounded-full h-[45px] w-[45px] shadow-lg border border-[#cccccc36]"
          />
        </div>
        <div className="flex flex-col gap-2.5 items-start justify-center mt-1">
          <div className="">
            <p className="text-base/[0.6rem] sm:text-lg/[0.7rem] tracking-wide capitalize">
              {recipientUser?.username}
            </p>
          </div>
          <div className="font-normal text-gray-400">
            <p className="text-[0.7rem]/[0.5rem] sm:text-xs/[0.7rem]">
              Text message
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between gap-2 mt-2">
        <div>
          <p className="text-[0.7rem] text-slate-300">12/12/2023</p>
        </div>

        <div
          className={clsx([
            'rounded-full h-[10px] w-[10px] ',
            {
              'bg-green-500': isOnline,
              ' bg-transparent': !isOnline,
            },
          ])}
        ></div>
      </div>
    </button>
  );
};

export default UserChat;
