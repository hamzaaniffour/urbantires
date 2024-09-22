import React from 'react'
import LOGO from "../../../../public/assets/logo.svg"
import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <div>
        <Link href="/">
            <Image src={LOGO} alt="Logo" width={120} className='relative -top-[2px]' height={100} />
        </Link>
    </div>
  )
}

export default Logo