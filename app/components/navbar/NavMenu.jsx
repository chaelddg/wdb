'use client';

import React, { useState, useCallback } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import NavMenuItem from './NavMenuItem';
import Avatar from '../Avatar';
import UserMenuItem from './MenuItem';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useRouter } from 'next/navigation';


const NavMenu = ({
  currentUser
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const router = useRouter()
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <NavMenuItem item="Home" url=" " />
        <NavMenuItem item="Spa" url="spa" />
        <NavMenuItem item="Services" url="services" />
        <NavMenuItem item="About Us" url="about" />
        <NavMenuItem item="Contact Us" url="contact" />
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
          <div>
            <AiOutlineMenu />
          </div>
          <div className='hidden md:block'>
            <Avatar
              src={currentUser?.image}
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
            md:w-1/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          '
        >
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <UserMenuItem
                  onClick={() => { router.push(`profile`) }}
                  label='Profile'
                />
                <UserMenuItem
                  onClick={() => { router.push(`details`) }}
                  label='My Order'
                />
                <UserMenuItem
                  onClick={() => { router.push(`settings`) }}
                  label='Settings'
                />
                <hr />
                <UserMenuItem
                  onClick={() => signOut()}
                  label='Logout'
                />
              </>
            ) : (
              <>
                <UserMenuItem label="Login" onClick={loginModal.onOpen} />
                <UserMenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMenu;