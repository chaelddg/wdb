'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';


const details = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('user');
  const spaName = searchParams.get('spaname');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const router = useRouter();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchType = async () => {
      const session = await getSession();

      if (session) {
        const response = await fetch(`/api/bookdetail/${userId}`);
        const Data = await response.json();
        if (session.user.email === Data?.user?.email) {
          try {
            const response = await fetch(`/api/bookdetail/${userId}`);
            const Data = await response.json();
            
            setEmail(session.user.email);
            setData(Data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching massage data:', error);
            setLoading(false);
          }
        } else {
          router.push(`/`);
        }
      } else {
        router.push(`/`);
      }
    };
    const interval = setInterval(fetchType, 1000); // Refresh every 1 seconds

    return () => clearInterval(interval);
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-content-center place-content-center h-screen w-screen" style={{ backgroundColor: '#9E7E6F' }}>
      {data.booking ? (
        <div className="w-fit	m-auto mt-20 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-300">
          <div className="w-full max-w-5xl flex items-center text-neutral-900">
            <h1 className="font-bold text-lg text-neutral-950">Order #{data.booking.id}</h1>
          </div>
          <div className="w-full max-w-5xl flex items-center text-neutral-900">
            <label className='w-64'>Your PA-HEALOT order from:</label><h1 className="font-bold text-lg text-neutral-950">{spaName}</h1>
          </div>
          <div className="w-full max-w-5xl flex items-center text-neutral-900">
            <label className='w-64'>Service Delivery Address:</label><h1 className="font-bold text-lg text-neutral-950">{data.booking.address}</h1>
          </div>
          <div className="w-full max-w-5xl flex items-center text-neutral-900">
            <label className='w-64'>Your E-mail:</label><h1 className="font-bold text-lg text-neutral-950">{email}</h1>
          </div>
          <div className="w-full max-w-5xl flex items-center text-neutral-900 mt-7">
            <label className='w-64'>Subtotal:</label><h1 className=" text-lg text-neutral-950">Php {data.massage.price}</h1>
          </div>
          <div className="w-full max-w-5xl flex items-center text-neutral-900 mt-7">
            <label className='w-64 font-bold  '>Total:</label><h1 className="font-bold text-lg text-neutral-950">Php {data.massage.price}</h1>
          </div>
          {data.booking.status === 0 ? (<div className="w-full max-w-5xl flex items-center text-neutral-900 mt-7">
            <label className='w-64 font-bold'>You can still cancel this Pending request</label><button className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded">
              Cancel this Order
            </button>
          </div>) : (<div className="w-full max-w-5xl flex items-center text-neutral-900 mt-7">
            <label className='w-64 font-bold'>You can no longer cancel this order, service is on its way.</label><button className="bg-amber-800 text-white font-bold py-2 px-4 rounded">
              disabled
            </button>
          </div>)}
        </div>
      ) : (
        <div>NO ACTIVE ORDER</div>
      )}
    </div>
  )
}

export default details