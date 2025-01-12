'use client';

import type { Level } from '@tiptap/extension-heading';
import { type ColorResult, SketchPicker } from 'react-color';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  LucideIcon,
  Undo2Icon,
  Redo2Icon,
  PrinterIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListTodoIcon,
  RemoveFormattingIcon,
  ChevronDownIcon,
  HighlighterIcon,
  Link2Icon,
  ImageIcon,
  UploadIcon,
  SearchIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  ListIcon,
  ListOrderedIcon,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useEditorStore } from '@/store/use-editor-store';

interface ToolbarButtonProps {
  icon: LucideIcon;
  isActive?: boolean;
  onClick: () => void;
};

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
    >
      <Icon className="size-4" />
    </button>
  )
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Verdana', value: 'Verdana' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 w-[120px] shrink-0 flex items-center justify-between hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>
            { editor?.getAttributes('textStyle').fontFamily || fonts[0].label }
          </span>
          <ChevronDownIcon className='ml-2 size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {fonts.map(({ label, value }) => (
          // https://tiptap.dev/docs/editor/extensions/functionality/fontfamily
          <button
            key={value}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.getAttributes('textStyle').fontFamily === value && 'bg-neutral-200/80'
            )}
            style={{ fontFamily: value }}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
          >
            <span className='text-sm'>{ label }</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: 'Normal text', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16px' },
  ];

  const getCurrectHeading = () => {
    for (let level = 1; level < 5; level++) {
      if (editor?.isActive('heading', { level })) {
        return `Heading ${level}`;
      }
    }

    return 'Normal text';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex items-center justify-between hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='truncate'>
            { getCurrectHeading() }
          </span>
          <ChevronDownIcon className='ml-2 size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              ((value === 0 && !editor?.isActive('heading')) || editor?.isActive('heading', { level: value })) && 'bg-neutral-200/80'
            )}
            style={{ fontSize }}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor?.chain().focus().toggleHeading({ level: value as Level }).run();
              }
            }}
          >
            { label }
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

const TextColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes('textStyle').color || '#000000';

  const onChange = ( color: ColorResult ) => {
    editor?.chain().focus().setColor(color.hex).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <span className='text-xs'>A</span>
          <div className='h-0.5 w-full' style={{ backgroundColor: value }}></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes('highlight').color || '#ffffff';

  const onChange = ( color: ColorResult ) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <HighlighterIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-0'>
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [link, setLink] = useState('');

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
  }

  return (
    <DropdownMenu onOpenChange={(open) => open && setLink(editor?.getAttributes('link').href || '')}>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <Link2Icon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2 flex items-center gap-x-2'>
        <Input
          placeholder='https://example.com'
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button onClick={() => onChange(link)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [imgUrl, setImgUrl] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  }

  const onUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imgUrl = URL.createObjectURL(file);
        onChange(imgUrl);
      }
    }

    input.click();
  }

  const handleImgUrlSubmit = () => {
    if (imgUrl) {
      onChange(imgUrl);
    }
    setImgUrl('');
    setIsDialogOpen(false);
  }
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
            <ImageIcon className='size-4' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className='mr-2 size-4' />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className='mr-2 size-4' />
            Paste Image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder='https://example.com/image.jpg'
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleImgUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
};

const AlignButton = () => {
  const { editor } = useEditorStore();
  const alignments = [
    {
      label: 'Align Left',
      value: 'left',
      icon: AlignLeftIcon,
    },
    {
      label: 'Align Center',
      value: 'center',
      icon: AlignCenterIcon,
    },
    {
      label: 'Align Right',
      value: 'right',
      icon: AlignRightIcon,
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <AlignLeftIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            key={value}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80'
            )}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

const ListButton = () => {
  const { editor } = useEditorStore();
  const lists = [
    {
      label: 'Bullet List',
      value: 'bulletList',
      icon: ListIcon,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: 'Ordered List',
      value: 'orderedList',
      icon: ListOrderedIcon,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='h-7 min-w-7 shrink-0 flex flex-col items-center justify-center hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm'>
          <ListIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        {lists.map(({ label, value, icon: Icon, onClick }) => (
          <button
            key={value}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              editor?.isActive({ list: label })  && 'bg-neutral-200/80'
            )}
            onClick={onClick}
          >
            <Icon className='size-4' />
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        // https://tiptap.dev/docs/collaboration/documents/history
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editor?.isActive('bold'),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editor?.isActive('italic'),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: editor?.isActive('underline'),
        // https://tiptap.dev/docs/editor/extensions/marks/underline
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        isActive: editor?.isActive('taskList'),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      }
    ],
  ];

  return (
    <div className="bg-[#F1F4F9] px-2 py-0.5 min-h-[40px] flex items-center gap-x-0.5 rounded overflow-x-auto">
      {sections[0].map(item => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className='h-6 mx-2 bg-neutral-300' />
      <FontFamilyButton />
      <Separator orientation='vertical' className='h-6 mx-2 bg-neutral-300' />
      <HeadingLevelButton />
      <Separator orientation='vertical' className='h-6 mx-2 bg-neutral-300' />
      {sections[1].map(item => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation='vertical' className='h-6 mx-2 bg-neutral-300' />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <ListButton />
      {sections[2].map(item => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
}