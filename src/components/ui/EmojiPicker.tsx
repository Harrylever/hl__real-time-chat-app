import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import React from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FaceSmileIcon } from '@heroicons/react/24/outline'

interface EmojiPickerProps {
  hideButton?: boolean
  onChange: (value: string) => void
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ hideButton, onChange }) => {
  return hideButton ? (
    <FaceSmileIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition" />
  ) : (
    <Popover>
      <PopoverTrigger>
        <FaceSmileIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition" />
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <Picker
          emojiSize={18}
          theme="light"
          data={data}
          maxFrequentRows={1}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  )
}

export default EmojiPicker
