// components/SpaProfile.jsx
'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useLoginModal from '@/app/hooks/useLoginModal';
import { getSession } from 'next-auth/react';
import ReviewsDisplay from './ReviewsDisplay';
import CardGridReview from '../CardGridReview';
import ReviewsInput from '../ReviewsInput';

const SpaProfile = () => {
    const router = useRouter();
    const [spa, setSpa] = useState(null);
    const [loading, setLoading] = useState(true);
    const loginModal = useLoginModal();
    const searchParams = useSearchParams();
    const search = searchParams.get('listingId');
    const userId = searchParams.get('user');
    const [data, setData] = useState(null);
    const [data2, setData2] = useState(null);
    const [therapist, setTherapist] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [submitPressed, setSubmitPressed] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [session, setSession] = useState(true);
    const [user, setUser] = useState('');


    const toggleReviews = () => {
        setShowReviews(!showReviews);
    };

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();

            if (!session) {
                // Reroute to main page if no session
                setSession(false);
                router.push('/spa');
                
            }
        };

        checkSession();
    }, []);

    useEffect(() => {
        const fetchType = async () => {
            const session = await getSession();
            
            if (session) {
                const user1 = session.user;
                try {
                    const response = await fetch(`/api/currentuser/${user1?.email}`);
                    const Data = await response.json();

                    console.log(user1.email);
                    
                    setUser(Data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                }
            }
        };
        fetchType();
    }, []);

    useEffect(() => {
        const fetchSpa = async () => {
            try {
                const response = await fetch(`/api/spa/${search}`);
                const spaData = await response.json();

                setSpa(spaData);
                setReviews(spaData.reviews);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching spa data:', error);
                setLoading(false);
            }
        };

        // Fetch spa data initially
        fetchSpa();

        // Set interval to fetch spa data every 5 seconds
        const interval = submitPressed && setInterval(fetchSpa, 1000);
        setSubmitPressed(false);

        // Cleanup function to clear interval when component unmounts or changes
        return () => clearInterval(interval);
    }, [search, submitPressed]);


    useEffect(() => {
        const fetchType = async () => {
            try {
                const response = await fetch(`/api/bookdetail/${userId}`);
                const Data = await response.json();

                setData(Data.booking);
                setData2(Data.spa);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching massage data:', error);
                setLoading(false);
            }
        };
        fetchType();
    }, [userId]);

    useEffect(() => {
        const fetchTherapist = async () => {
            try {
                const response = await fetch(`/api/searchTherapist/${search}`);
                const Data = await response.json();

                setTherapist(Data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching therapist data:', error);
                setLoading(false);
            }
        };
        fetchTherapist();
    }, [search]);

    const handleClick = async (spa) => {

        const session = await getSession();

        if (!session) {
            // Show the login modal if no session
            loginModal.onOpen();
        } else {
            // Proceed to the route with session information
            if (data) {
                router.push(`/bookdetails?spaId=${data.spaId}&spaname=${data2.name}&type=${data.massageId}&address=${data.address}&user=${data.userId}`);
            } else {
                router.push(`/bookform?listingId=${spa.spa.id}&spaname=${spa.spa.name}&image=${spa.spa.image}&spaNumber=${spa.spa.phoneNum}&gcashname=${spa.spa.gcashname}`);
            }

        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ backgroundColor: "#E2D9D2" }} className=''>
            {spa ? (

                <div className="min-h-screen flex flex-col items-center place-content-center">
                    <h1 className="text-3xl mb-8 pt-5">{spa.spa.name}</h1>

                    <div className="grid md:grid-cols-3 w-full max-w-5xl">
                        <img className="col-span-1 rounded-lg" src={"/images/" + (spa.spa.image || "placeholder.jpg")} alt="image" />
                        <div className="col-span-2 pl-2">
                            <p className="text-gray-600 mb-8">
                                Discover a new level of relaxation at "Blind Wellness Massage Services," where blind masseurs redefine the massage experience. Let heightened senses guide you through personalized sessions, creating a unique and immersive escape. Welcome to a world where touch is a transformative journey towards unparalleled serenity.
                            </p>
                            <div className='font-light text-md text-neutral-500 mb-3'>
                                {spa.address}
                            </div>
                            <div className='flex flex-row items-center gap-1 mb-3'>
                                <div className='font-semibold'>
                                    Rating - 4.5(37 Reviews)

                                </div>
                            </div>
                            <div>
                                {therapist ? (<button className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded" onClick={() => handleClick(spa)} >
                                    Book Here
                                </button>) : (<div>{data?.userId == userId && data?.spaId == spa?.spa.id ? (<button className="bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded" onClick={() => handleClick(spa)} >
                                    You have an existing booking
                                </button>) : (<div><button className="bg-amber-800 text-white font-bold py-2 px-4 rounded" >
                                    Unavailable right now
                                </button><p className='font-light text-sm text-neutral-500 mb-3'>Sorry, there is no available therapist right now. Please come back later.</p></div>)}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-5xl">
                        {/* Other content or components */}
                        <h1 className="font-semibold text-lg mt-5">Reviews:</h1>
                        <CardGridReview reviews={reviews} />
                    </div>
                    <div className="w-full max-w-5xl">
                        <div className='text-right text-sky-900 hover:text-sky-500'>
                            <button onClick={toggleReviews}>
                                {showReviews ? 'Hide Reviews' : 'Show More Reviews'}
                            </button>
                        </div>
                        {showReviews && <ReviewsDisplay reviews={reviews} spaId={search} userId={userId} />}
                    </div>
                    <div className="w-full max-w-5xl mt-11 pb-6">
                        {/* Other content or components */}
                        {session && <ReviewsInput spaId={search} userId={user.id} setSubmitPressed={setSubmitPressed} />}
                    </div>
                </div>
            ) : (
                <div>No spa data found</div>
            )}
        </div>
    );
};

export default SpaProfile;
