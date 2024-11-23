import React, { useMemo } from 'react'
import clsx from 'clsx'
import moment from 'moment'
import { useAppSelector } from 'src/app'
import { useGetUserLastActive } from 'src/app/api/hooks'
import { userIsOnline } from 'src/util/utils'

interface ActiveNowTextProps {
  email: string
}

const ActiveNowText: React.FC<ActiveNowTextProps> = ({ email }) => {
  const { data, isFetching, error } = useGetUserLastActive(email)
  const onlineUsers = useAppSelector((state) => state.socketReduce.onlineUsers)

  const isOnline = useMemo(
    () => userIsOnline(email ?? '', onlineUsers ?? []),
    [onlineUsers, email],
  )

  const classStyles = {
    active: 'text-mx-primary-4 font-normal text-xs',
    offline: 'text-mx-grey-2 font-normal text-xs opacity-55',
  }

  if (isFetching)
    return (
      <p className={clsx([classStyles.active, 'opacity-55 animate-pulse'])}>
        Loading...
      </p>
    )

  if (error) return <p className={classStyles.offline}>Offline</p>

  if (isOnline) {
    return <p className={classStyles.active}>Active now</p>
  } else if (data?.data && data?.data?.lastActive) {
    return (
      <p className={classStyles.offline}>
        Last active {moment(data?.data?.lastActive).calendar()}
      </p>
    )
  } else {
    return <p className={classStyles.offline}>Offline</p>
  }
}

export default ActiveNowText
