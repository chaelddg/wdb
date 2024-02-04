
import React from 'react';
import Image from 'next/image';
import CardGridSection from '../components/CardGridSection';

function About(props) {
    return (
        <>
            <section id=''>
                <div name='home' className='h-screen w-full bg-slate-100'>
                    <div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row'>
                        <div className='flex flex-col justify-center h-full'>
                            <h2 className='text-4xl sm:text-7xl font-bold text-amber-950'>Welcome to Pa-Healot</h2>
                            <p className='text-amber-950 py-4 max-w-md'>
                                at Pa-Healot, we believe in the power of healing touch and the extraordinary abilities that come from within. Our mission is to redefine wellness by offering a unique and enriching experience through the skilled hands of our blind masseurs.
                            </p>
                        </div>
                        <div>
                            <Image
                                src="/images/unsplash.png"
                                alt='my profile'
                                className='rounded-2xl mx-auto w-full md:w-full'
                                height="100"
                                width="2000" />
                        </div>
                    </div>
                </div>
            </section>
            <section id=''>
                <div name='home' className='h-screen w-full' style={{ backgroundColor: '#9E7E6F' }}>
                    <div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row'>
                        <div>
                            <Image
                                src="/images/unsplash2.png"
                                alt='my profile'
                                className='rounded-2xl mx-auto w-full md:w-full'
                                height="100"
                                width="500"
                                style={{ padding: '10px' }} />
                        </div>
                        <div className='flex flex-col justify-center h-full'>
                            <h2 className='text-4xl sm:text-7xl font-bold text-white'>Our Vision</h2>
                            <p className='text-orange-100 py-4 max-w-md'>
                                Pa-Healot envisions  a world where healing is not limited by sight. We aspire to create a sanctuary of relaxtion and rejuvenation, where the art of massage is elevated by the intuitive touch and deep empathy of our blind masseurs.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
            <section id='' style={{ paddingBottom: '35px' }}>
                <div>
                    {/* Other content or components */}
                    <CardGridSection />
                </div>
            </section>
            <section id=''>
                <div name='home' className='h-screen w-full' style={{ backgroundColor: '#9E7E6F' }}>
                    <div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row'>
                        <div className='flex flex-col justify-center h-full'>
                            <h2 className='text-4xl sm:text-7xl font-bold text-white'>Book Your Healing Experience</h2>
                            <p className='text-orange-100 py-4 max-w-md'>
                                Pa-Healot invites you to immerse yourself in a world where touch knows no bounds. Book your appointment today and embark on a journey to wellness with Pa-Healot, where every touch tells a story of resilience and renewal.
                            </p>
                        </div>
                        <div>
                            <Image
                                src="/images/unsplash2.png"
                                alt='my profile'
                                className='rounded-2xl mx-auto w-full md:w-full'
                                height="100"
                                width="2000"
                                style={{ padding: '10px' }} />
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default About;