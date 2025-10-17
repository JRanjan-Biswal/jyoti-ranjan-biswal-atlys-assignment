import React, { useState } from 'react';
import { EditorContent } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { ToolbarButton, ToolbarGroup, ToolbarDivider } from '@/components/ui/toolbar-button';
import boldIcon from '/bold.svg';
import italicIcon from '/italic.svg';
import underlineIcon from '/underline.svg';
import bulletPointsIcon from '/bullet-points.svg';
import numberPointsIcon from '/number-points.svg';
import quotesIcon from '/quotes.svg';
import codesIcon from '/codes.svg';
import trashIcon from '/trash.svg';
import smile from '/smile.svg';
import plus from '/plus.svg';
import mic from '/mic.svg';
import camera from '/camera.svg';
import send from '/send.svg';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/toaster';
import { GreyContainer } from './ui/greyContainer';
import { useEditor } from '@/hooks/useEditor';
import { cn } from '@/lib/utils';
import { EmojiPicker } from './ui/emoji-picker';

interface PostEditorProps {
  onPostCreated?: () => void;
}

const textStyleOptions = [
  { value: "paragraph", label: "Paragraph" },
  { value: "heading", label: "Heading" },
];

export const PostEditor: React.FC<PostEditorProps> = ({ onPostCreated }) => {
  const { user } = useAuth();
  const {
    editor,
    textStyle,
    isSubmitting,
    setTextStyle,
    toggleFormat,
    clearContent,
    handleSubmit,
    insertEmoji
  } = useEditor(onPostCreated);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const { toast } = useToast();

  const handleToolbarClick = (format: string) => {
    if (!user) {
      toast('Please sign in to use this feature', 'error');
      return;
    }
    toggleFormat(format);
  };

  const handleTextStyleChange = (value: string) => {
    if (!user) {
      toast('Please sign in to use this feature', 'error');
      return;
    }
    setTextStyle(value as 'paragraph' | 'heading');
  };

  const handleClearClick = () => {
    clearContent();
    setSelectedEmoji(null);
  };

  const handleSubmitClick = async () => {
    if (!editor?.getText().trim()) {
      toast('Please enter some content before posting', 'error');
      return;
    }

    try {
      await handleSubmit(user?.id, user?.username, selectedEmoji || '😊');
      toast('Post published!', 'success');
      setSelectedEmoji(null); // Reset emoji after posting
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Failed to publish post', 'error');
    }
  };

  const handleNotImplemented = () => {
    toast('Function not implemented', 'info');
  };

  if (!editor) {
    return null;
  }

  return (
    <GreyContainer>
      <div className="bg-white border border-secondaryGrey rounded-medium shadow-sm">
        <div className="p-2 border-b border-secondaryGrey">
          {/* Toolbar */}
          <div className='flex items-center justify-between'>
            <GreyContainer className='rounded-xSmall p-1 flex items-center gap-6 w-max'>
              <Select
                options={textStyleOptions}
                value={textStyle}
                onChange={handleTextStyleChange}
                className="w-24"
              />

              <ToolbarGroup>
                <ToolbarButton
                  icon={boldIcon}
                  alt="Bold"
                  onClick={() => handleToolbarClick('bold')}
                  format="bold"
                  isActive={editor.isActive('bold')}
                />
                <ToolbarButton
                  icon={italicIcon}
                  alt="Italic"
                  onClick={() => handleToolbarClick('italic')}
                  format="italic"
                  isActive={editor.isActive('italic')}
                />
                <ToolbarButton
                  icon={underlineIcon}
                  alt="Underline"
                  onClick={() => handleToolbarClick('underline')}
                  format="underline"
                  isActive={editor.isActive('underline')}
                />
                <ToolbarDivider />
                <ToolbarButton
                  icon={bulletPointsIcon}
                  alt="Bullet Points"
                  onClick={() => handleToolbarClick('bulletList')}
                  format="bulletList"
                  isActive={editor.isActive('bulletList')}
                />
                <ToolbarButton
                  icon={numberPointsIcon}
                  alt="Number Points"
                  onClick={() => handleToolbarClick('numberList')}
                  format="orderedList"
                  isActive={editor.isActive('orderedList')}
                />
                <ToolbarDivider />
                <ToolbarButton
                  icon={quotesIcon}
                  alt="Quotes"
                  onClick={() => handleToolbarClick('quote')}
                  format="quote"
                  isActive={editor.isActive('blockquote')}
                />
                <ToolbarButton
                  icon={codesIcon}
                  alt="Code"
                  onClick={() => handleToolbarClick('code')}
                  format="code"
                  isActive={editor.isActive('codeBlock')}
                />
              </ToolbarGroup>
            </GreyContainer>

            <Button
              variant="destructive"
              size="tiny"
              hoverEffect="red"
              className="rounded-xSmall h-10 w-10"
              onClick={handleClearClick}
            >
              <img src={trashIcon} alt="Trash" className="h-4 w-4" />
            </Button>
          </div>

          {/* Content Input */}
          <div className="flex gap-2 items-start py-4">
            <div className="relative">
              <Button
                variant="empty"
                className="rounded-xSmall"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {selectedEmoji ? (
                  <span className="text-lg leading-none">{selectedEmoji}</span>
                ) : (
                  <img src={smile} alt="Emoji" className="h-4 w-4" />
                )}
              </Button>
              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiSelect={(emoji) => {
                    setSelectedEmoji(emoji.native);
                    setShowEmojiPicker(false);
                  }}
                  onClickOutside={() => setShowEmojiPicker(false)}
                />
              )}
            </div>
            <EditorContent
              editor={editor}
              className={cn(
                "min-h-24 w-[calc(100%-40px)] focus:outline-none",
                textStyle === 'heading' && "text-xl font-semibold"
              )}
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between px-2 py-[6px]">
          <div className="flex items-center gap-2">
            <Button
              variant="noBackground"
              size="icon"
              hoverEffect="grey"
              className="h-[30px] w-[30px] rounded-xSmall border-none hover:bg-quaternaryGrey"
              onClick={handleNotImplemented}
            >
              <img src={plus} alt="Plus" className="h-[10.5px] w-[10.5px]" />
            </Button>
            <Button
              variant="noBackground"
              size="icon"
              hoverEffect="grey"
              className="h-[30px] w-[30px] rounded-xSmall border-none hover:bg-quaternaryGrey"
              onClick={handleNotImplemented}
            >
              <img src={mic} alt="Mic" className="h-[15px] w-35" />
            </Button>
            <Button
              variant="noBackground"
              size="icon"
              hoverEffect="grey"
              className="h-[30px] w-[30px] rounded-xSmall border-none hover:bg-quaternaryGrey"
              onClick={handleNotImplemented}
            >
              <img src={camera} alt="Camera" className="h-[13.5px] w-[18px]" />
            </Button>
          </div>

          <Button
            onClick={handleSubmitClick}
            disabled={isSubmitting || !editor?.getText().trim()}
            variant="noBackground"
            size="icon"
            className="rounded-xSmall h-[30px] w-[30px] hover:bg-primary/10 cursor-pointer"
          >
            <img src={send} alt="Send" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </GreyContainer>
  );
};