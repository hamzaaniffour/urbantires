import React from 'react';
import { BiSend } from 'react-icons/bi';

const Newsletter = () => {
  return (
    <form className='flex justify-center items-center'>
      <input
        type="email"
        className='my-2 w-full border border-slate-200 bg-white font-semibold text-blue-950 px-3 text-sm py-2.5 outline-none placeholder:text-slate-300'
        placeholder='Enter your email'
        required
      />
      <button type='submit' className="px-4 py-2.5 text-sm bg-blue-800 border border-blue-800 transition-all hover:bg-blue-700 text-white font-bold">
        <BiSend className='size-5' />
      </button>
    </form>
  );
};

export default Newsletter;
