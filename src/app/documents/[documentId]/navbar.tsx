'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Menubar,
  MenubarMenu,
  MenubarItem,
  MenubarContent,
  MenubarTrigger,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar"
import {
  FileIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  Redo2Icon,
  TrashIcon,
  Undo2Icon,
} from 'lucide-react';

import { useEditorStore } from '@/store/use-editor-store';
import { DocumentInput } from './document-input';

export const Navbar = () => {
  const { editor } = useEditorStore();

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const html = editor?.getHTML() || '';
    const blob = new Blob([html], { type: 'text/html' });
    onDownload(blob, 'document.html');
  };

  const onSaveText = () => {
    if (!editor) return;

    const text = editor?.getText() || '';
    const blob = new Blob([text], { type: 'text/plain' });
    onDownload(blob, 'document.txt');
  };

  return (
    <nav className='flex items-center justify-between'>
      <div className="flex gap-2 items-center">
        <Link href='/'>
          <Image src='/logo.svg' alt='Logo' width={32} height={32} className='cursor-pointer' />
        </Link>
        <div className='flex flex-col'>
          <DocumentInput />
          <div className='flex'>
            <Menubar className='border-none shadow-none bg-transparent h-auto p-0'>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted'>
                  File
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className='size-4 mr-2' />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveHTML}>
                        <GlobeIcon className='size-4 mr-2' />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className='size-4 mr-2' />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlusIcon className='size-4 mr-2' />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePenIcon className='size-4 mr-2' />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon className='size-4 mr-2' />
                    Remove
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted'>
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                    <Undo2Icon className='size-4 mr-2' />
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                    <Redo2Icon className='size-4 mr-2' />
                    Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted'>
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>1 x 1</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>2 x 2</MenubarItem>
                      <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>4 x 4</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  )
};