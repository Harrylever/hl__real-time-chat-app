import { useGetRecipientUserQuery } from 'src/app/api/hooks'

const useRecipientUser = ({
  email,
  members,
}: {
  email: string
  members: string[]
}) => {
  const { data, error, isFetching } = useGetRecipientUserQuery({
    accountId: email,
    members,
  })

  const recipientUser = data?.data
  const loading = isFetching

  return { recipientUser, error, loading }
}

export default useRecipientUser
