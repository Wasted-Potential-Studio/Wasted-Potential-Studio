'use client';
import React from 'react';
import Landing from './Landing'
import Header from './Header'
import { useEffect, useState } from 'react';

function Overlay() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (i.e., running in the browser environment)
    if (typeof window !== 'undefined') {
      // Access window.innerWidth only in the browser environment
      setIsMobile(window.innerWidth < 768);
    }
  }, []);
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <a href="/" style={{ position: 'absolute', bottom: 40, left: 40, fontSize: '13px' }}> <br /> </a>
      <a style={{ position: 'absolute', top: isMobile ? 50 : 40, left: 40, fontSize: '15px'}}>wasted potential —</a>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}></div>
    </div>
  );
}

export default function Home(){

  return (
    <main>
        <Landing />
        <Header/>
        <Overlay/>
    </main>
  );
}

