'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';
import { getSession } from 'next-auth/react';


const Book = () => {
    const loginModal = useLoginModal();
    const searchParams = useSearchParams();
    const spa = searchParams.get('spaname');
    const image = searchParams.get('image');
    const spaId = searchParams.get('listingId');
    const spaNumber = searchParams.get('spaNumber');
    const gcashName = searchParams.get('gcashname');
    const router = useRouter();

    const [type, setType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedMassageType, setSelectedMassageType] = useState('0');
    const [address, setAddress] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [user, setUser] = useState(null);
    const [voucher, setVoucher] = useState(50);

    const handleMassageTypeChange = (event) => {
        setSelectedMassageType(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleImageUpload = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const session = await getSession();
        //const user = session.user;

        if (!session) {
            // Show the login modal if no session
            loginModal.onOpen();
        } else {
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
                try {
                    const formData = new FormData();
                    formData.append('spaId', spaId);
                    formData.append('massageId', selectedMassageType);
                    formData.append('status', 0);
                    formData.append('address', address);
                    //formData.append('image', selectedImage);

                    const formDataJSON = {};
                    for (const [key, value] of formData.entries()) {
                        formDataJSON[key] = value;
                    }

                    const response = await fetch('/api/booking', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // Set Content-Type header to indicate JSON data
                        },
                        body: JSON.stringify(formDataJSON),
                    });

                    if (response.ok) {
                        console.log('Booking successful!');
                        toast.success("BOOKED");
                        router.push(`/bookdetails?spaId=${spaId}&spaname=${spa}&type=${selectedMassageType}&address=${address}&user=${user.id}`);
                        // Redirect or handle success as needed
                    } else {
                        console.error('Failed to book:', response.statusText);
                        toast.error('something went wrong');
                        // Handle error
                    }
                } catch (error) {
                    console.error('Error booking:', error);
                    // Handle error
                }
            } else {
                // If user cancels the confirmation, do nothing
                console.log('Booking canceled!');
            }
        }
    };

    useEffect(() => {
        const fetchType = async () => {
            try {
                const response = await fetch(`/api/massage/${selectedMassageType}`);
                const typeData = await response.json();

                setType(typeData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching massage data:', error);
                setLoading(false);
            }
        };
        fetchType();
    }, [selectedMassageType]);

    useEffect(() => {
        const fetchType = async () => {
            const session = await getSession();
            const user1 = session.user;
            try {
                const response = await fetch(`/api/currentuser/${user1.email}`);
                const Data = await response.json();

                console.log(user1.email);
                setUser(Data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching massage data:', error);
                setLoading(false);
            }
        };
        fetchType();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (

        <div style={{ backgroundColor: "#E2D9D2" }} className=''>
            <div className="min-h-screen flex flex-col items-center place-content-center">
                <h1 className="text-3xl mb-4">{spa}</h1>
                <div className='flex flex-row items-center gap-1 mb-3'>
                    <div className='font-semibold'>
                        Rating - 4.5(37 Reviews)
                    </div>
                </div>
                <div className="grid md:grid-cols-3 w-full max-w-5xl">
                    <img className="col-span-1 rounded-lg" src={"/images/" + (image || "placeholder.jpg")} alt="image" />
                    <div className="col-span-2 pl-2">
                        <div className='font-light text-sm text-neutral-500 mb-3'>
                            <div className="max-w-md mx-auto">
                                <div className="mb-4">
                                    <label htmlFor="massage-type" className="block text-gray-700 text-sm font-bold mb-2">Massage Type</label>
                                    <div className="relative">
                                        <select
                                            id="massage-type"
                                            name="massage-type"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={selectedMassageType}
                                            onChange={handleMassageTypeChange}>
                                            <option value="0"></option>
                                            <option value="1">Whole body massage</option>
                                            <option value="2">Half body massage</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full max-w-5xl">
                                    <h1 className="font-bold text-lg mt-3"> {type ? (<div>Duration: {type.duration}mins.</div>) : (
                                        <div>Duration:</div>
                                    )}</h1>
                                </div>
                                <div className="mb-4 mt-3">
                                    <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                                        Address
                                    </label>
                                    <input id="address"
                                        name="address" type="text"
                                        placeholder="Enter your address"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={address}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div className="w-full max-w-5xl">
                                    <h1 className="font-bold text-lg mt-5">Additional Fee: ₱00.00</h1>
                                </div>
                                <div className="w-full max-w-5xl">
                                    <h1 className="font-bold text-lg mt-5"> {type ? (<div>Subtotal: ₱{parseFloat(type.price).toFixed(2)}</div>) : (
                                        <div>Subtotal: ₱0.00</div>
                                    )}</h1>
                                </div>
                                <div className="w-full max-w-5xl">
                                    <h1 className="font-bold text-lg mt-5"> {type ? (<div>total: ₱{(parseFloat(type.price)-voucher).toFixed(2)}</div>) : (
                                        <div>total: ₱0.00</div>
                                    )}</h1>
                                </div>
                                <div className="w-full max-w-5xl">
                                    <h1 className="font-semibold text-lg mt-5">Gcash Number: {spaNumber}</h1>
                                </div>
                                <div className="w-full max-w-5xl">
                                    <h1 className="font-semibold text-lg mt-1">Gcash Name: {gcashName}</h1>
                                </div>
                                <div className="w-full max-w-5xl">
                                    <h1 className="font-semibold text-lg mt-1">Proof of Payment:</h1>
                                </div>
                                <input
                                    type="file"
                                    id="image-upload"
                                    name="image-upload"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={handleImageUpload}
                                />

                                {selectedImage && (
                                    <img src={URL.createObjectURL(selectedImage)} alt="Uploaded image" />
                                )}
                                <div className='mt-5'>
                                    <Button
                                        disabled={false}
                                        small
                                        label={'BOOK NOW'}
                                        //onClick={{}}
                                        onClick={handleFormSubmit}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Book