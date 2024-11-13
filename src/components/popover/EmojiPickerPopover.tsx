import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'

import React from 'react'

const EmojiPickerPopover: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Popover modal={true}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent side="top" align="end">
        Emoji is coming soon
      </PopoverContent>
    </Popover>
  )
}

export default EmojiPickerPopover
