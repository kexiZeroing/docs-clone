'use client'

// https://tiptap.dev/docs/editor/getting-started/install/nextjs
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        // Pass classes to the element that contains the editor
        class: "focus: outline-none bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] py-10 pr-14 cursor-text",
        style: "padding-left: 56px; padding-right: 56px;",
      }
    },
    // https://tiptap.dev/docs/editor/extensions/functionality/starterkit
    extensions: [StarterKit],
    content: '<p>Hello Tiptap</p>',
    immediatelyRender: false,
  })

  return (
    <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4'>
      <div className='min-w-max flex justify-center w-[816px] py-4 mx-auto'>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
};