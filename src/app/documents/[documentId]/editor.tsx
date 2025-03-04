'use client';

// https://tiptap.dev/docs/editor/getting-started/install/nextjs
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';

import { useEditorStore } from '@/store/use-editor-store';

export const Editor = () => {
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    editorProps: {
      attributes: {
        // Pass classes to the element that contains the editor
        class: "focus: outline-none bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] py-10 px-[56px] cursor-text",
      }
    },
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    // To make sure the toolbar will be updated with the editor state
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    // https://tiptap.dev/docs/editor/extensions/functionality/starterkit
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Underline,
      FontFamily,
      TextStyle,
      Color,
      // https://tiptap.dev/docs/editor/extensions/marks/highlight
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    immediatelyRender: false,
  });

  return (
    <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4'>
      <div className='min-w-max flex justify-center w-[816px] py-4 mx-auto'>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
};