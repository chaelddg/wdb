'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '../components/Button';

const book = () => {
    const searchParams = useSearchParams();
    const spa = searchParams.get('spaname');
    const image = searchParams.get('image');

    const [type, setType] = useState(null);

    const [loading, setLoading] = useState(true);
    const [selectedMassageType, setSelectedMassageType] = useState('0');
    const handleMassageTypeChange = (event) => {
        setSelectedMassageType(event.target.value);
    };

    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageUpload = (event) => {
        setSelectedImage(event.target.files[0]);
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

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <form>
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
                                    <div className="mb-4">
                                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                                        <input id="address" name="address" type="text" placeholder="Enter your address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="w-full max-w-5xl">
                                        <h1 className="font-bold text-lg mt-5">Additional Fee: 00.00</h1>
                                    </div>
                                    <div className="w-full max-w-5xl">
                                        <h1 className="font-bold text-lg mt-5"> {type ? (<div>Total Fee: {parseFloat(type.price).toFixed(2)}</div>) : (
                                            <div>Total Fee: 0.00</div>
                                        )}</h1>
                                    </div>
                                    <div className="w-full max-w-5xl">
                                        <h1 className="font-semibold text-lg mt-5">Gcash Number: 09227489111</h1>
                                    </div>
                                    <div className="w-full max-w-5xl">
                                        <h1 className="font-semibold text-lg mt-1">Gcash Name: Crystal Maiden</h1>
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
                                    />
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default book