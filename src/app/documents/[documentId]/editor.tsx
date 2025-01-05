'use client'

// https://tiptap.dev/docs/editor/getting-started/install/nextjs
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'

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
    ],
    content: `
        <p>Hello Tiptap</p>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
      `,
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