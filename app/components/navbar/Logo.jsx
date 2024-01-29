'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Logo = () => {
  const router = useRouter();

  return (
    <Image 
      onClick={() => {}}
      alt="logo"
      className="hidden md:block cursor-pointer"
      height="100"
      width="150"
      src="/images/logo.png"
      priority
    />
  );
};

export default Logo;