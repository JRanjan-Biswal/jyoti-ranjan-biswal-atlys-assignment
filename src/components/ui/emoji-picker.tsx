import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: any) => void;
  onClickOutside: () => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  onClickOutside,
}) => {
  return (
    <div className="absolute top-0 left-0 z-50">
      <div className="fixed inset-0" onClick={onClickOutside} />
      <Picker
        data={data}
        onEmojiSelect={onEmojiSelect}
        theme="light"
        previewPosition="none"
        skinTonePosition="none"
      />
    </div>
  );
};
