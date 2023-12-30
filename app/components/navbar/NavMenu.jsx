'use client';

import React, { useState, useCallback } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import NavMenuItem from './NavMenuItem';
import Avatar from '../Avatar';
import UserMenuItem from './MenuItem';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <NavMenuItem item="Home" />
        <NavMenuItem item="Spa" />
        <NavMenuItem item="Services" />
        <NavMenuItem item="About Us" />
        <NavMenuItem item="Contact Us" />
        <div
          onClick={toggleOpen}
          className='
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          '
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar
              src="/images/placeholder.jpg"
            />
          </div>
        </div>
      </div>


      {isOpen && (
        <div
          className='
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          '
        >
          <div className='flex flex-col cursor-pointer'>
            <>
              <UserMenuItem label="Login" />
              <UserMenuItem label="Sign up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMenu;