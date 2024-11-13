import clsx from 'clsx'
import debounce from 'lodash/debounce'
import { useAppDispatch } from 'src/app'
import { setActiveRoute } from 'src/app/slices/internalRouteSlice'
import { TRoute } from 'typings'

interface NavigationButtonProps {
  route: TRoute
  activeRoute: TRoute
  icon: {
    active: string
    inactive: string
  }
  val: string
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  route,
  activeRoute,
  icon,
  val,
}) => {
  const dispatch = useAppDispatch()

  const handleChangeInView = debounce(() => {
    if (activeRoute === route) return
    dispatch(setActiveRoute(route))
  }, 700)

  return (
    <button
      name={val + '-route-btn'}
      onClick={handleChangeInView}
      className={clsx(
        'group/nav-button w-fit flex flex-col items-center justify-center gap-1 py-2 sm:py-3 px-3 sm:px-5 rounded-lg sm:hover:bg-mx-primary-5',
        {
          'bg-mx-primary-5': activeRoute === route,
        },
      )}
    >
      <img
        src={icon.active}
        alt={val}
        width={0}
        height={0}
        className={clsx('w-[18px] sm:w-[23px] h-auto', {
          'invert sm:group-hover/nav-button:invert-0': activeRoute !== route,
        })}
      />

      <p
        className={clsx('text-xs sm:text-sm capitalize', {
          'text-mx-white': activeRoute === route,
          'text-mx-black sm:group-hover/nav-button:text-mx-white':
            activeRoute !== route,
        })}
      >
        {val}
      </p>
    </button>
  )
}

export default NavigationButton
