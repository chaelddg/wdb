// CardGridSection.js

import React from 'react';
import CardReview from './listings/CardReview';
import { FaRegCheckCircle } from "react-icons/fa";


const CardGridReview = () => {
    const cards = [
        {
            name: 'Kay Two Limbaga'
            ,
            content: 'Our blind masseurs possess a heightened sense of empathy, transforming each session into a personalized, deeply connected experience'
            ,
            icon: <FaRegCheckCircle style={{ fontSize: '50px' }} />,
        },
        {
            name: 'Aldzy Bee'
            ,
            icon: <FaRegCheckCircle style={{ fontSize: '50px' }} />
            ,
            content: 'Experience massage therapies designed to address your specific needs, guided by the intuitive touch of our skilled masseurs.',
        },
        {
            name: 'Kharlwin Zen CabbarRubio'
            ,
            icon: <FaRegCheckCircle style={{ fontSize: '50px' }} />
            ,
            content: 'Pa-Healot is committed to inclusivity, creating a space where everyone, regardless of visual abilities, can embrace the healing power of touch.',
        },
    ];

    return (
        <div className="container mx-auto mt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cards.map((card, index) => (
                <CardReview key={index} name={card.name} content={card.content} icon={card.icon} />
            ))}
        </div>
    );
};

export default CardGridReview;
