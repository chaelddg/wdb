import React from 'react'

const CardReview = ({ name, content, icon }) => {
    return (
        <div className="p-4 shadow-md rounded-md" style={{ backgroundColor: '#E2D9D2' }}>
            <h2 className="text-md font-semibold mb-2">{name}</h2>
            <div style={{ height: '100px', margin: 'auto' }}>
                <p className='italic text-gray-600'> {content.length > 130 ? content.substring(0, 100) + "..." : content} </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h2>{icon}</h2>
            </div>
        </div>
    );
};

export default CardReview