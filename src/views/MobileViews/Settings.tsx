import { ScrollArea } from '@/components/ui/scroll-area'
import clsx from 'clsx'
import MobileViewNoPropsHeader from 'src/components/ui/MobileViewNoPropsHeader'
import useLogOut from 'src/hooks/useLogOutUser'

interface ISettingsAction {
  name: string
  action: () => void
}

const SettingsView = () => {
  const { handleLogOut } = useLogOut()

  const settingsActions: ISettingsAction[] = [
    { name: 'Profile', action: () => {} },
    { name: 'Logout', action: handleLogOut },
  ]

  return (
    <div className="h-full w-full pt-4 flex flex-col gap-3">
      <MobileViewNoPropsHeader />
      <div className="h-full w-full flex-1 border border-black/10 px-6 py-6 rounded-t-[2.5rem] shadow-inner bg-mx-white">
        <ScrollArea className="mt-4 w-full h-full">
          <div className="flex flex-col gap-y-5">
            {settingsActions.map((action, index) => (
              <button
                key={index}
                className={clsx(
                  'w-full h-12 bg-mx-white text-base text-mx-primary-1 font-semibold flex items-center justify-center rounded-lg border border-black/10 duration-200',
                  {
                    'hover:bg-red-400 focus:bg-red-400 hover:text-white focus:text-white':
                      action.name.toLowerCase() === 'logout',
                  },
                )}
                onClick={action.action}
              >
                {action.name}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default SettingsView
