'use client';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Landing from './Landing'
import Header from './Header'

function Overlay() {
  const isMobile = window.innerWidth < 768;
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <a href="/" style={{ position: 'absolute', bottom: 40, left: 40, fontSize: '13px' }}> <br /> </a>
      <a style={{ position: 'absolute', top: isMobile ? 60 : 40, left: 40, fontSize: '15px'}}>wasted potential —</a>
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

