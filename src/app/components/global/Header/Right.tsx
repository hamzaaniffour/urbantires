import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import Search from './Search'

const Right = () => {
  return (
    <div className='flex justify-center items-center gap-6'>
        <div><button className='bg-amber-200 transition-all hover:bg-amber-300 text-amber-600 font-semibold px-4 py-1 rounded'>Newsletter</button></div>
        <div><button className='py-1'><Search /></button></div>
    </div>
  )
}

export default Right