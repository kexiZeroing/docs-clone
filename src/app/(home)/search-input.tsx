'use client';

import { useState, useRef } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchParam } from '@/hooks/use-search-param';

export const SearchInput = () => {
  const [search, setSearch] = useSearchParam('search');
  const [searchValue, setSearchValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const handleClear = () => {
    setSearchValue('');
    setSearch('');
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchValue);
    inputRef.current?.blur();
  }

  return (
    <div className='flex-1 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='relative max-w-[720px] w-full'
      >
        <Input
          value={searchValue}
          onChange={handleChange}
          ref={inputRef}
          placeholder='Search...'
          className='placeholder:text-neutral-800 px-14 w-full h-[40px] bg-[#F0F4F8] rounded-full'
        />
        <Button
          type='submit'
          variant={'ghost'}
          size={'icon'}
          className='absolute left-3 top-1/2 -translate-y-1/2 rounded-full'
        >
          <SearchIcon className='size-4' />
        </Button>
        {searchValue && (
          <Button
            type='button'
            variant={'ghost'}
            size={'icon'}
            className='absolute right-3 top-1/2 -translate-y-1/2 rounded-full'
            onClick={handleClear}
          >
            <XIcon className='size-4' />
          </Button>
        )}
      </form>
    </div>
  )
}