import debounce from 'lodash/debounce'
import { useAppDispatch } from 'src/app'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { setActiveRoute } from 'src/app/slices/internalRouteSlice'

const MobileViewNoPropsHeader = () => {
  const dispatch = useAppDispatch()

  const goToChats = debounce(() => {
    dispatch(setActiveRoute('chats'))
  }, 500)

  return (
    <div className="w-full flex items-center justify-between pt-6 pb-5 px-10">
      <button name="goto-chats-button" onClick={goToChats}>
        <MdOutlineArrowBackIos size={20} className="text-mx-primary-2" />
      </button>

      <p className="text-mx-primary text-xl font-medium">Settings</p>

      <div className="h-[20px] w-[20px]"></div>
    </div>
  )
}

export default MobileViewNoPropsHeader
