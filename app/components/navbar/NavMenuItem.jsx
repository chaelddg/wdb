'use client';

import React from 'react';

const NavMenuItem = ({ item }) => {
  return (
    <div
      className='
        hidden
        md:block
        text-sm
        font-semibold
        py-3
        px-4
        hover:text-[#c7b198]
        transition
        cursor-pointer
        uppercase
      '
    >
      {item}
    </div>    
  );
};

export default NavMenuItem;