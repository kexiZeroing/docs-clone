'use client';

import Link from "next/link";

const template = {
  id: 'blank',
  label: 'Blank Document',
  imageUrl: '/blank-doc.svg'
};

export const Templates = () => {
  return (
    <div className='bg-[#F1F3F4]'>
      <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4'>
        <h3 className='font-medium'>Start a new document</h3>
        <div className="flex items-center">
          <div className='basis-1/6 aspect-[3/4] flex flex-col gap-y-2.5'>
            <Link
              href="/documents/1"
              style={{
                backgroundImage: `url(${template.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className='size-full rounded-sm border hover:border-blue-500 hover:bg-blue-50'
            />
            <p className='text-sm font-medium'>{template.label}</p>
          </div>
        </div>
      </div>
    </div>
  )
}