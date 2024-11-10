import React from 'react'
import { TRoute } from 'typings'
import NavigationButton from './NavigationButton'

interface ViewItemProps {
  route: TRoute
  activeRoute: TRoute
  icon: {
    active: string
    inactive: string
  }
  val: string
}

interface AppMobileNavigationProps {
  activeRoute: TRoute
}

const AppMobileNavigation: React.FC<AppMobileNavigationProps> = ({
  activeRoute,
}) => {
  const views = (activeRoute: TRoute): ViewItemProps[] => [
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
      route: 'contacts',
      icon: {
        active: '/svg/active/settings-view-icon.svg',
        inactive: '/svg/inactive/settings-view-icon.svg',
      },
      val: 'contacts',
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
  ]

  return (
    <section id="app-mobile-navigation">
      <nav className="relative z-20 h-[12vh] w-full bg-mx-white py-6 flex items-center justify-evenly shadow-inner">
        {views(activeRoute)
          .slice(0, 3)
          .map((view, index) => (
            <NavigationButton key={index} {...view} />
          ))}

        <NavigationButton {...views(activeRoute)[3]} />
      </nav>
    </section>
  )
}

export default AppMobileNavigation
