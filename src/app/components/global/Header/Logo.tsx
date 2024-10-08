import React from 'react';
import LOGO from "../../../../public/assets/Global/urbantires.svg";
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div>
      <Link href="/" aria-label="Tasty Eats Logo">
        <Image src={LOGO} alt="Tasty Eats Logo" width={150} height={100} />
      </Link>
    </div>
  );
};

export default Logo;
