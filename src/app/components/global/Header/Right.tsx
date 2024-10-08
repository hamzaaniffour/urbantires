import React from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import Search from './Search';

const Right = () => {
  return (
    <div className='flex justify-center items-center gap-6'>
      <div>
        <button className='bg-blue-200 transition-all hover:bg-blue-300 text-blue-800 font-semibold px-4 py-1 rounded'>Newsletter</button>
      </div>
      <div>
        <button className='py-1' aria-label="Search">
          <Search />
        </button>
      </div>
    </div>
  );
};

export default Right;
