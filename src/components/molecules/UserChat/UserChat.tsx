import clsx from 'clsx';
import moment from 'moment';
import { FetchLatestMessage } from '../../tools';
import { UserRequests } from '../../../app/features/requests';
import { updateCurrentChat } from '../../../app/slices/chatSlice';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { setSideBarChatDisplay } from '../../../app/slices/appUIStateSlice';
import { setReduxNotifications } from '../../../app/slices/notificationSlice';
import { useAppDispatch, useAppSelector, useAxiosPrivate } from '../../../app';
import { UnreadNotificationsFunc } from '../../../util/manipulate-notification';
import {
  IChat,
  INotification,
  IUser,
  IUserChatProps,
} from '../../../../typings';

const UserChat: React.FC<{ props: IUserChatProps }> = ({
  props: { user, chat },
}) => {
  const dispatch = useAppDispatch();
  const axiosInstance = useAxiosPrivate();
  const userRequests = useMemo(
    () => new UserRequests(axiosInstance),
    [axiosInstance]
  );

  const sideBarChatListIsOpen = useAppSelector(
    (state) => state.appUIStateReduce.sideBarChatOpen
  );

  const [recipientUser, setRecipientUser] = useState<IUser | undefined>(
    undefined
  );
  const [unReadNotifications, setUnReadNotifications] = useState<
    INotification[]
  >([]);
  const [thisUserNotifications, setThisUserNotifications] = useState<
    INotification[]
  >([]);

  const [, setIsLoading] = useState(false);

  const getRecipientUserProcess = useCallback(() => {
    setIsLoading(true);
    const recipientId = chat?.members?.find((id) => id !== user?._id);

    if (!recipientId) return null;
    const fetch = userRequests.useGetUserByIdQuery(recipientId);
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
  }, [chat?.members, user?._id, userRequests]);

  useEffect(() => {
    getRecipientUserProcess();
  }, [getRecipientUserProcess]);

  const onlineUsers = useAppSelector((state) => state.socketReduce.onlineUsers);
  const isOnline =
    onlineUsers &&
    onlineUsers.some((user) => user.userId === recipientUser?._id);

  const notifications = useAppSelector(
    (state) => state.notificationReduce.notifications
  );

  // Update all unread messages
  useEffect(() => {
    const newUnReadNotifications = UnreadNotificationsFunc(notifications);
    setUnReadNotifications(newUnReadNotifications);
  }, [notifications]);

  // Update User Notification for Specific Sender
  useEffect(() => {
    const newThisUserNotifications = unReadNotifications.filter(
      (notif) => notif.senderId._id === recipientUser?._id
    );
    setThisUserNotifications(newThisUserNotifications);
  }, [recipientUser?._id, unReadNotifications]);

  // Mark All Notifications for Specific sender
  const markThisUserNotfications = useCallback(
    (
      notificationsParam: INotification[],
      thisUserNotificationsParam: INotification[]
    ) => {
      const mNotifications = notificationsParam.map((el) => {
        let notification: INotification | undefined = undefined;

        thisUserNotificationsParam.forEach((notif) => {
          if (notif.senderId._id === el.senderId._id) {
            notification = {
              ...notif,
              isRead: true,
            };
          } else {
            notification = el;
          }
        });

        return notification as unknown as INotification;
      });

      dispatch(
        setReduxNotifications({
          notifications: mNotifications,
        })
      );
    },
    [dispatch]
  );

  // Update the current chat reducer
  const updateCurrentChatHandler = (chat: IChat) => {
    dispatch(
      updateCurrentChat({
        chat,
      })
    );

    if (thisUserNotifications.length > 0) {
      markThisUserNotfications(notifications, thisUserNotifications);
    }

    if (sideBarChatListIsOpen) {
      setTimeout(() => {
        dispatch(
          setSideBarChatDisplay({
            sideBarChatOpen: false,
          })
        );
      }, 500);
    }
  };

  const latestMessage = FetchLatestMessage(chat as IChat);

  const truncateText = (text: string) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + '...';
    }
    return shortText;
  };

  return (
    <button
      type="button"
      onClick={() => updateCurrentChatHandler(chat as IChat)}
      className="flex flex-row items-center justify-between w-full lg:w-[300px] border-b border-[#ffffff2d] py-2 px-2 rounded-sm"
    >
      <div className="flex flex-row items-center justify-center gap-x-2.5">
        <div className="relative">
          <img
            src={recipientUser?.imgUri}
            alt={recipientUser?.username}
            className="rounded-full h-[45px] w-[45px] shadow-lg border border-[#cccccc36]"
          />
          <div
            className={clsx([
              'rounded-full h-[10px] w-[10px] absolute bottom-[8%] left-[75%]',
              {
                'bg-green-500': isOnline,
                ' bg-transparent': !isOnline,
              },
            ])}
          ></div>
        </div>
        <div className="flex flex-col gap-2.5 items-start justify-center mt-1">
          <div className="">
            <p className="text-base/[0.6rem] sm:text-lg/[0.7rem] tracking-wide capitalize">
              {recipientUser?.username}
            </p>
          </div>
          <div className="font-normal text-gray-400">
            <p className="text-[0.7rem]/[0.5rem] sm:text-xs/[0.7rem]">
              {latestMessage
                ? truncateText(latestMessage.text)
                : 'Send a message'}
            </p>
          </div>
        </div>
      </div>

      <div
        className={clsx([
          'flex flex-col items-end justify-between mt-2',
          {
            'gap-0.5': thisUserNotifications.length > 0,
            'gap-4': thisUserNotifications.length === 0,
          },
        ])}
      >
        <div>
          <p className="text-[0.7rem] text-slate-300">
            {latestMessage
              ? moment(latestMessage.createdAt as string).calendar()
              : ''}
          </p>
        </div>

        <div className="">
          {thisUserNotifications.length > 0 && (
            <div className="bg-white h-[16px] w-[16px] rounded-full flex items-center justify-center">
              <span className="text-primary-purple text-xs font-bold">
                {thisUserNotifications.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default UserChat;
