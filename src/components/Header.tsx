'use client';

import Image from 'next/image';
import Auth from './Auth';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='bg-white px-[20px] py-[7px] h-[80px] flex justify-between items-center gap-2'>
      <Link href='/'>
        <Image
          src='/logo.svg'
          alt='Izumi it company'
          className='object-contain h-[30px] md:h-[46px]'
          width={100}
          height={100}
          priority
        />
      </Link>
      <Auth />
    </header>
  );
}
