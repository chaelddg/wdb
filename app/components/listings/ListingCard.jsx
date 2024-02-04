'use client'
import Image from 'next/image';
import React from 'react';
import Button from '../Button';

const ListingCard = ({ listings }) => {
  return (
    <div>
    {listings.map((listing) => (
      <div
        key={listing.id}
        className='
          col-span-1
          cursor-pointer
          group
        '
        //onClick={() => {}}
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
              src={`/images/${listing?.image || 'logo.png'}`}
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
          <div className='font-bold text-lg'>
          {listing.name}
          </div>
          <div className='font-light text-neutral-500'>
          {listing.desc}
          </div>
          <div className='font-light text-sm text-neutral-500'>
          {listing.address}
          </div>
          <div className='flex flex-row items-center gap-1'>
            <div className='font-semibold'>
              Rating - 4.5(37 Reviews)
            </div>
          </div>
          <Button
            disabled={false}
            small
            label={'Discover'}
            //onClick={() => {}}       
          />
        </div>
      </div>
    ))}
    </div>
  );
};

export default ListingCard;