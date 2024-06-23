import clsx from 'clsx'
import { useState } from 'react'
import { PageProps } from '../../../typings'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ComingSoon } from 'src/components/ui'

type TabType = 'profile' | 'application'

const TabButton = ({
  tab,
  cb,
  isActive,
}: {
  tab: string
  cb: () => void
  isActive: boolean
}) => {
  return (
    <button
      type="button"
      onClick={cb}
      className={clsx([
        'relative hover:bg-mx-primary-8 py-2.5 px-6 rounded-sm text-base text-mx-black font-medium duration-300',
        {
          'bg-mx-primary-8': isActive,
          'bg-mx-primary-9': !isActive,
        },
      ])}
    >
      {tab}
    </button>
  )
}

const SettingsInView: React.FC<{ props?: PageProps }> = () => {
  const comingSoon = true
  const [activeTab, setActiveTab] = useState<TabType>('profile')

  const renderTab = (tab: TabType) => {
    switch (tab) {
      case 'profile':
        return <ProfileSection />
      case 'application':
        return <ApplicationSection />
      default:
        return <ProfileSection />
    }
  }

  return comingSoon ? (
    <div className="relative w-full h-full">
      <ComingSoon text="Settings coming soon" />
    </div>
  ) : (
    <div className="relative w-full h-full flex flex-col items-start justify-start">
      <div className="w-full flex flex-row items-center justify-start gap-5 px-5 pt-10 sm:p-10">
        <TabButton
          tab="Profile"
          cb={() => setActiveTab('profile')}
          isActive={activeTab === 'profile'}
        />
        <TabButton
          tab="Application"
          cb={() => setActiveTab('application')}
          isActive={activeTab === 'application'}
        />
      </div>

      <div className="w-full h-full">
        <ScrollArea>{renderTab(activeTab)}</ScrollArea>
      </div>
    </div>
  )
}

const ProfileSection = () => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row items-start justify-start">
      <div></div>
      <div></div>
    </div>
  )
}

const ApplicationSection = () => {
  return <div className="w-full h-full"></div>
}

export default SettingsInView
