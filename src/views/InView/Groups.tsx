import { PageProps } from '../../../typings'
import ComingSoon from 'src/components/ui/ComingSoon'

const GroupsInView: React.FC<{ props?: PageProps }> = () => {
  return (
    <div className="relative w-full h-full">
      <ComingSoon text="Groups coming soon" />
    </div>
  )
}

export default GroupsInView
