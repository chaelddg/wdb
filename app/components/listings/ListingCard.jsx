'use client';

import Image from 'next/image';
import React from 'react';
import Button from '../Button';

const ListingCard = ({
  data
}) => {
  return (
    <div
      onClick={() => {}}
      className='
        col-span-1
        cursor-pointer
        group
      '
    >
      <div
        className='
          flex 
          flex-col 
          gap-2
          w-full
        '
      >
        <div
          className='
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
          '
        >
          <Image 
            fill
            alt="listing"
            src={data?.imageSrc || '/images/logo.png'}
            className='
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
            '
          />
          {/* Heart Button here */}
        </div>
        <div className='font-semibold text-lg'>
          location label
        </div>
        <div className='font-light text-neutral-500'>
          5/20/2024 5:30PM
        </div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold'>
            Php 15
          </div>
        </div>
        <Button
          disabled={false}
          small
          label={'Discover'}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ListingCard;