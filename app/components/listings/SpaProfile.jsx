// components/SpaProfile.js
'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import CardGridReview from '../CardGridReview';

const SpaProfile = () => {
    const [spa, setSpa] = useState(null);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const search = searchParams.get('listingId');

    useEffect(() => {
        const fetchSpa = async () => {
            try {
                const response = await fetch(`/api/spa/${search}`);
                const spaData = await response.json();

                setSpa(spaData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching spa data:', error);
                setLoading(false);
            }
        };

        fetchSpa();
    }, [search]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ backgroundColor: "#E2D9D2" }} className=''>
            {spa ? (

                <div className="min-h-screen flex flex-col items-center place-content-center">
                <h1 className="text-3xl mb-8">{spa.name}</h1>
                    <div className="grid md:grid-cols-3 w-full max-w-5xl">
                        <img className="col-span-1 rounded-lg" src={"/images/" + (spa.image || "placeholder.jpg")} alt="image" />
                        <div className="col-span-2 pl-2">
                            <p className="text-gray-600 mb-8">
                                Discover a new level of relaxation at "Blind Wellness Massage Services," where blind masseurs redefine the massage experience. Let heightened senses guide you through personalized sessions, creating a unique and immersive escape. Welcome to a world where touch is a transformative journey towards unparalleled serenity.
                            </p>
                            <div className='font-light text-sm text-neutral-500 mb-3'>
                                {spa.address}
                            </div>
                            <div className='flex flex-row items-center gap-1 mb-3'>
                                <div className='font-semibold'>
                                    Rating - 4.5(37 Reviews)
                                </div>
                            </div>
                            <button className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded">
                                Book Here
                            </button>
                        </div>  
                    </div>
                    <div className="w-full max-w-5xl">
                        {/* Other content or components */}
                        <h1 className="font-semibold text-lg mt-5">Reviews:</h1>
                        <CardGridReview />
                    </div>
                </div>
            ) : (
                <div>No spa data found</div>
            )}
        </div>
    );
};

export default SpaProfile;
