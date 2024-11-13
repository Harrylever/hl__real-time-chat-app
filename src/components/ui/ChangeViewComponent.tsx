import clsx from 'clsx'
import { TRoute } from '../../../typings'
import { useAppDispatch } from '../../app'
import { TInsideView } from '../../app/slices/appUIStateSlice'
import { setActiveRoute } from '../../app/slices/internalRouteSlice'
import useLogOut from 'src/hooks/useLogOutUser'

interface IChangeViewItem {
  activeRoute: TRoute
  route?: TRoute
  icon: { active: string; inactive: string }
  val: TInsideView
}

const views = (activeRoute: TRoute): IChangeViewItem[] => [
  {
    activeRoute,
    route: 'chats',
    icon: {
      active: '/svg/active/chat-view-icon.svg',
      inactive: '/svg/inactive/chat-view-icon.svg',
    },
    val: 'chats',
  },
  {
    activeRoute,
    route: 'groups',
    icon: {
      active: '/svg/active/groups-view-icon.svg',
      inactive: '/svg/inactive/groups-view-icon.svg',
    },
    val: 'groups',
  },
  {
    activeRoute,
    route: 'settings',
    icon: {
      active: '/svg/active/settings-view-icon.svg',
      inactive: '/svg/inactive/settings-view-icon.svg',
    },
    val: 'settings',
  },
  {
    activeRoute,
    icon: {
      active: '/svg/active/logout-icon.svg',
      inactive: '/svg/inactive/logout-icon.svg',
    },
    val: 'logout',
  },
]

interface ChangeViewComponentProps {
  activeRoute: TRoute
}

const ChangeViewComponent: React.FC<ChangeViewComponentProps> = ({
  activeRoute,
}) => {
  const dispatch = useAppDispatch()
  const { handleLogOut } = useLogOut()

  const handleChangeInView = (route: TRoute) => {
    dispatch(setActiveRoute(route))
  }

  return (
    <aside className="hidden lg:block max-w-[160px] xl:max-w-[190px] w-full h-full bg-mx-primary-9 pt-10">
      <div className="w-full h-full flex flex-col items-center gap-16 bg-transparent">
        {views(activeRoute)
          .slice(0, 3)
          .map((view, index) => (
            <ViewItem
              key={index}
              props={view}
              callback={() => handleChangeInView(view.route as TRoute)}
            />
          ))}

        {/* Log out */}
        <ViewItem props={views(activeRoute)[3]} callback={handleLogOut} />
      </div>
    </aside>
  )
}

const ViewItem: React.FC<{ props: IChangeViewItem; callback?: () => void }> = ({
  props,
  callback,
}) => {
  return (
    <div
      className={clsx([
        'w-[140px] xl:w-[170px] h-fit flex items-center justify-center duration-500',
        {
          'border-r-4 border-mx-primary-5': props.activeRoute === props.route,
        },
      ])}
    >
      <button
        onClick={callback}
        type="button"
        className={clsx([
          'group w-[75px] h-[75px] hover:bg-mx-primary-5 flex items-center justify-center rounded-md duration-500',
          {
            'bg-mx-primary-5': props.activeRoute === props.route,
          },
        ])}
      >
        <img
          src={
            props.activeRoute === props.route
              ? props.icon.active
              : props.icon.inactive
          }
          alt={props.val}
          className={clsx([
            'h-[25px] w-[25px] duration-300',
            {
              'group-hover:invert': props.activeRoute !== props.route,
            },
          ])}
        />
      </button>
    </div>
  )
}

export default ChangeViewComponent
