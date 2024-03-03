'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const ListingCard = ({ listings }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const handleDiscoveryClick = (listingId) => {
    if(user){
    router.push(`/spaProfile?listingId=${listingId}&user=${user.id}`);
    }else{
      toast.error('Login to Discover');
    }
  };

  useEffect(() => {
    const fetchType = async () => {
      const session = await getSession();
      if (session) {
        const user1 = session.user;
        try {
          const response = await fetch(`/api/currentuser/${user1.email}`);
          const Data = await response.json();

          
          setUser(Data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching massage data:', error);
          setLoading(false);
        }
      }
    };
    fetchType();
  }, []);

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
          onClick={() => handleDiscoveryClick(listing.id)}
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
              onClick={() => handleDiscoveryClick(listing.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingCard;