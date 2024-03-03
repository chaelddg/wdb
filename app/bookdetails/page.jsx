'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import toast from 'react-hot-toast';


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

  const handleFormSubmit = async (event) => {
    try {
      console.log('asdasd')
      const response = await fetch(`/api/assignTherapist/${userId}`);
    } catch (error) {
      console.error('Error booking:', error);
      // Handle error
    }
  };

  const handleCancel = async () => {
    const isConfirmed = window.confirm(
      'Do you agree to the terms and conditions?\n\n' +
      'Terms and conditions:\n' +
      '1. This booking is subject to availability.\n' +
      '2. You agree to pay the required fees.\n' +
      '3. Cancellation may incur charges.\n' +
      '4. No cancelation once the book is accepted.\n\n' +
      'Are you sure you want to proceed?'
    );
    if (isConfirmed) {
      router.push(`/`);
      toast.success("BOOK CANCELED");
      try {
        const response = await fetch(`/api/cancelBook/${data.booking.id}`);
      } catch (error) {
        console.error('Error booking:', error);
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-content-center place-content-center h-screen w-screen" style={{ backgroundColor: '#9E7E6F' }}>
      {data ? (
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
            <label className='w-64'>Subtotal:</label><h1 className=" text-lg text-neutral-950">₱{parseFloat(data.massage.price).toFixed(2)}</h1>
          </div>
          <div className="w-full max-w-5xl flex items-center text-neutral-900 mt-7">
            <label className='w-64 font-bold  '>Total:<p className='text-sm font-thin'>(Incl. Service Tax)</p></label><h1 className="font-bold text-lg text-neutral-950">₱{parseFloat(data.massage.price).toFixed(2)}</h1>
          </div>
          {data.booking.status === 0 ? (<div className="w-full max-w-5xl flex items-center text-neutral-900 mt-7">
            <label className='w-64 font-bold'>You can still cancel this Pending request</label><button className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded" onClick={handleCancel}>
              Cancel this Order
            </button><div className="w-full max-w-5xl flex items-center text-neutral-900 mt-7">
              <label className='w-64 font-bold'>test</label><button className="bg-amber-800 text-white font-bold py-2 px-4 rounded" onClick={handleFormSubmit}>
                accept book test button
              </button>
            </div>
          </div>) : (<div>
            <div className="w-full max-w-5xl flex items-center text-neutral-900 mt-7">
              <label className='w-64 font-bold'>You can no longer cancel this order, service is on its way.</label><button className="bg-amber-800 text-white font-bold py-2 px-4 rounded">
                disabled
              </button>
            </div>
            <div className='m-auto w-64 text-lg'>
              <div className="w-full items-center text-neutral-900 text-center mt-5 m-auto">
                <div className='w-64 text-slate-900'>Your PA-HEALOT Therapist <p className='font-bold'>{data.therapist.fname} {data.therapist.mname} {data.therapist.lname}</p> is on its way.</div>
              </div>
            </div>

          </div>

          )}
        </div>
      ) : (
        <div>NO ACTIVE ORDER</div>
      )}
    </div>
  )
}

export default details