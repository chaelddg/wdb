//'use client'
import Image from 'next/image';
import React from 'react';
import Button from '../Button';

const ListingCard = async ({ data }) => {
  // Use Prisma query to fetch data based on the provided ID or any relevant criteria
  const listingData = await prisma.spa.findMany()
  return (
    <div>
    {listingData.map((listing) => (
    <div
      key={listing.spa_id}
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
            src={`/images/${listing?.spa_image || 'logo.png'}`}
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
        {listing.spa_name}
        </div>
        <div className='font-light text-neutral-500'>
        {listing.spa_desc}
        </div>
        <div className='font-light text-sm text-neutral-500'>
        {listing.spa_address}
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