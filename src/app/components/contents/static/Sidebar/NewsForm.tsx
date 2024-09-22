import React from 'react'
import { BiSend } from 'react-icons/bi'

const NewsForm = () => {
  return (
    <div className='w-full'>
        <form action="" className='flex justify-center items-center'>
            <input type="email" className='my-2 w-full border border-slate-200 bg-white font-semibold text-black px-3 text-sm py-2.5 outline-none placeholder:text-slate-300' placeholder='Enter your email' />
            <button className="px-4 py-2.5 text-sm bg-amber-600 border border-amber-600 transition-all hover:bg-amber-600 hover:border-amber-600 text-white font-bold" type='button'><BiSend className='size-5' /></button>
        </form>
    </div>
  )
}

export default NewsForm