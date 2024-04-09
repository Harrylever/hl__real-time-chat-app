import React, { useMemo } from 'react';
import { IPotentialChatWrapProps } from '../../../../typings';
import PotentialChat from './PotentialChat';
import { useAppSelector, useAxiosPrivate } from '../../../app';
import { ChatRequests } from '../../../app/features/requests';

const PotentialChatWrap: React.FC<{ props: IPotentialChatWrapProps, updatePotentialChatsCb?: () => void }> = ({
  props,
  updatePotentialChatsCb
}): JSX.Element => {
  const axiosInstance = useAxiosPrivate();
  const chatRequests = useMemo(
    () => new ChatRequests(axiosInstance),
    [axiosInstance]
  );

  const user = useAppSelector(state => state.userReduce);

  const createChatProcess = (id: string) => {
    const createChatObj = { userOneId: user._id as string, userTwoId: id };
    const fetch = chatRequests.useCreateChatMutation(createChatObj);

    fetch
      .then(() => {
        if (updatePotentialChatsCb !== undefined) updatePotentialChatsCb();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }

  return (
    <div className="flex flex-row items-start justify-center gap-x-3 h-[55px]">
      {props.length > 0 && props.map((chat, _) => (
        <PotentialChat
          key={_}
          chat={chat}
          cb={() => createChatProcess(chat._id as string)}
        />
      ))}
      {props.length < 1 && <p>No chats active.</p>}
    </div>
  );
};

export default PotentialChatWrap;
