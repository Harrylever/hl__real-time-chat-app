import { useNavigate } from 'react-router-dom'

const useLogOut = () => {
  const navigate = useNavigate()

  const handleLogOutUser = async () => {
    window.localStorage.clear()
    navigate('/')
  }

  return { handleLogOutUser }
}

export default useLogOut
