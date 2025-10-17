import { useEditor as useTipTapEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback, useState } from 'react';

export type TextStyle = 'paragraph' | 'heading';

interface EditorState {
  textStyle: TextStyle;
}

export const useEditor = (onPostCreated?: () => void) => {
  const [state, setState] = useState<EditorState>({
    textStyle: 'paragraph',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useTipTapEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1],
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder: 'How are you feeling today?',
        emptyEditorClass: 'is-editor-empty',
        emptyNodeClass: 'is-empty',
        showOnlyWhenEditable: false,
      }),
    ],
    editable: false,
    editorProps: {
      attributes: {
        class: 'min-h-24 w-full focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      // Update text style based on current state
      if (editor.isActive('heading', { level: 1 })) {
        setState(prev => ({ ...prev, textStyle: 'heading' }));
      } else {
        setState(prev => ({ ...prev, textStyle: 'paragraph' }));
      }
    },
  });

  const setTextStyle = useCallback((textStyle: TextStyle) => {
    setState(prev => ({ ...prev, textStyle }));
    if (textStyle === 'heading') {
      editor?.chain().focus().setHeading({ level: 1 }).run();
    } else {
      editor?.chain().focus().setParagraph().run();
    }
  }, [editor]);

  const toggleFormat = useCallback((format: string) => {
    if (!editor) return;

    switch (format) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'underline':
        editor.chain().focus().toggleUnderline().run();
        break;
      case 'bulletList':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'numberList':
        editor.chain().focus().toggleOrderedList().run();
        break;
      case 'quote':
        editor.chain().focus().toggleBlockquote().run();
        break;
      case 'code':
        editor.chain().focus().toggleCodeBlock().run();
        break;
    }
  }, [editor]);

  const insertEmoji = useCallback((emoji: any) => {
    editor?.chain().focus().insertContent(emoji.native).run();
  }, [editor]);

  const clearContent = useCallback(() => {
    editor?.commands.clearContent();
  }, [editor]);

  const handleSubmit = useCallback(async (userId?: string, username?: string, emoji?: string) => {
    if (!editor?.getHTML()) {
      throw new Error('Please enter some content');
    }

    if (!userId || !username) {
      throw new Error('Please sign in to create a post');
    }

    setIsSubmitting(true);

    try {
      // Store posts in localStorage
      const postsKey = 'forum_posts';
      const existingPosts = localStorage.getItem(postsKey);
      const posts = existingPosts ? JSON.parse(existingPosts) : [];

      const newPost = {
        id: `post-${Date.now()}`,
        user_id: userId,
        username: username,
        content: editor.getHTML(),
        created_at: new Date().toISOString(),
        text_style: state.textStyle,
        emoji: emoji,
      };

      posts.unshift(newPost);
      localStorage.setItem(postsKey, JSON.stringify(posts));

      clearContent();
      onPostCreated?.();
      return newPost;
    } finally {
      setIsSubmitting(false);
    }
  }, [editor, state.textStyle, clearContent, onPostCreated]);

  return {
    editor,
    textStyle: state.textStyle,
    isSubmitting,
    setTextStyle,
    toggleFormat,
    clearContent,
    handleSubmit,
    insertEmoji,
  };
};