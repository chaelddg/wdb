'use client';
import React from 'react';
import backgroundImage from "../public/images/home.jpeg";

export default async function Home() {
  
  return (
    <div
      style={{
        // use the src property of the image object
        backgroundImage: `url(${backgroundImage.src})`,
        // other styles
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        display: 'flex',
        flexDirection: 'column', // Updated to column layout
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{fontSize: 140, fontWeight: 'bold', color: 'white'}}>Beyond Vision, Embrace the Healing Touch.</h1>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: '#6F4E37',  // You can set the background color
            color: 'white',              // You can set the text color
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          BOOK AN APPOINTMENT
        </button>
      </div>
    </div>
  );
}
