import clsx from 'clsx'
import { TRoute } from '../../../../typings'
import { useAppDispatch, useAppSelector } from '../../../app'
import { TInsideView } from '../../../app/slices/appUIStateSlice'
import { setActiveRoute } from '../../../app/slices/internalRouteSlice'
import useLogOutUser from 'src/app/hooks/useLogOutUser'

interface IChangeViewItem {
  title: string
  route?: TRoute
  icon: { active: string; inactive: string }
  val: TInsideView
}

const views: IChangeViewItem[] = [
  {
    title: 'chats',
    route: 'chats',
    icon: {
      active: '/svg/active/chat-view-icon.svg',
      inactive: '/svg/inactive/chat-view-icon.svg',
    },
    val: 'chats',
  },
  {
    title: 'groups',
    route: 'groups',
    icon: {
      active: '/svg/active/groups-view-icon.svg',
      inactive: '/svg/inactive/groups-view-icon.svg',
    },
    val: 'groups',
  },
  {
    title: 'settings',
    route: 'settings',
    icon: {
      active: '/svg/active/settings-view-icon.svg',
      inactive: '/svg/inactive/settings-view-icon.svg',
    },
    val: 'settings',
  },
  {
    title: 'logout',
    icon: {
      active: '/svg/active/logout-icon.svg',
      inactive: '/svg/inactive/logout-icon.svg',
    },
    val: 'logout',
  },
]

const ChangeViewComponent = () => {
  const dispatch = useAppDispatch()
  const { handleLogOutUser } = useLogOutUser()

  const handleChangeInView = (route: TRoute) => {
    dispatch(setActiveRoute(route))
  }

  return (
    <section className="w-full h-full bg-mx-primary-9 pt-10">
      <div className="w-full h-full flex flex-col items-center justify-start gap-16 bg-transparent">
        {views.slice(0, 3).map((view, index) => (
          <ViewItem
            key={index}
            props={view}
            callback={() => handleChangeInView(view.route as TRoute)}
          />
        ))}

        {/* Log out */}
        <ViewItem props={views[3]} callback={handleLogOutUser} />
      </div>
    </section>
  )
}

const ViewItem: React.FC<{ props: IChangeViewItem; callback?: () => void }> = ({
  props,
  callback,
}) => {
  const activeInternalRoute = useAppSelector(
    (state) => state.internalRouteReduce.active,
  )

  return (
    <div
      className={clsx([
        'w-[170px] h-fit flex items-center justify-center duration-500',
        {
          'border-r-4 border-mx-primary-5': activeInternalRoute === props.route,
        },
      ])}
    >
      <button
        onClick={callback}
        type="button"
        className={clsx([
          'group w-[75px] h-[75px] hover:bg-mx-primary-5 flex items-center justify-center rounded-md duration-500',
          {
            'bg-mx-primary-5':
              activeInternalRoute && activeInternalRoute === props.route,
          },
        ])}
      >
        <img
          src={
            activeInternalRoute && activeInternalRoute === props.route
              ? props.icon.active
              : props.icon.inactive
          }
          alt={props.val}
          className={clsx([
            'h-[25px] w-[25px] duration-300',
            {
              'group-hover:invert': activeInternalRoute !== props.route,
            },
          ])}
        />
      </button>
    </div>
  )
}

export default ChangeViewComponent
