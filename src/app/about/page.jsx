'use client';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { useFBO, useGLTF, useScroll, Text, Image, Scroll, Preload, ScrollControls, MeshTransmissionMaterial,  Html  } from '@react-three/drei';
import { easing } from 'maath';
import Header from '../Header';
import { color } from 'framer-motion';



export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
        <ScrollControls damping={0.2} pages={2.90} distance={0.2}>
          <Lens>
            <Scroll >
              <Typography/>
              <Images/>
            </Scroll>
            <Scroll html>
            <Footer/>
            </Scroll>
            <Preload />
          </Lens>
        </ScrollControls>
      </Canvas>
      <Header/>
      <Overlay/>
    </div>
  );
}

function Lens({ children, damping = 0.14, ...props }) {
  const ref = useRef();
  const { nodes } = useGLTF('/lens-transformed.glb');
  const buffer = useFBO();
  const viewport = useThree((state) => state.viewport);
  const [scene] = useState(() => new THREE.Scene());
  useFrame((state, delta) => {
    const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 15]);
    easing.damp3(
      ref.current.position,
      [(state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 15],
      0.15,
      delta
    );
    state.gl.setRenderTarget(buffer);
    state.gl.setClearColor('#d8d7d7');
    state.gl.render(scene, state.camera);
    state.gl.setRenderTarget(null);
  });
  return (
    <>
      <Scroll>
        {createPortal(children, scene)}
      </Scroll>
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry/>
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh scale={0.25} ref={ref} rotation-x={Math.PI / 2} geometry={nodes.Cylinder.geometry}>
        <MeshTransmissionMaterial buffer={buffer.texture} ior={1.2} thickness={1.5} anisotropy={0.1} chromaticAberration={0.04} />
      </mesh>
    </>
  );
}

function Overlay() {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
        <a href="/" style={{ position: 'absolute', bottom: 40, left: 40, fontSize: '13px' }}>  <br /> </a>
        <a href="/" style={{ position: 'absolute', top: 40, left: 40, fontSize: '15px' }}>wasted potential —</a>
        <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>   </div>
      </div>
    );
  }


function Footer() {
  const [isInstagramHovered, setIsInstagramHovered] = useState(false);
  const [isTumblrHovered, setIsTumblrHovered] = useState(false);
  const [isVimeoHovered, setIsVimeoHovered] = useState(false);
  const [isBehanceHovered, setIsBehanceHovered] = useState(false);
  const [isDribbleHovered, setIsDribbleHovered] = useState(false);
  const [isMediumHovered, setIsMediumHovered] = useState(false);
  const [isTwitterHovered, setIsTwitterHovered] = useState(false);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isHomeHovered, setIsHomeHovered] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isWorkHovered, setIsWorkHovered] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);

  return(
    
    <div style={{ position: 'absolute', top: '-10vh'}}>
    <div style={{fontSize: '1.125em' }}>
    <a href="" style={{ position: 'absolute', top: '238vh', left: '4vw', opacity:0.3}}>Check&nbsp;out&nbsp;some of&nbsp;our&nbsp;award&nbsp;winning projects</a>
    <a href="" style={{ position: 'absolute', top: '238vh', left: '23vw', opacity:0.3}}>Or&nbsp;just&nbsp;take&nbsp;a&nbsp;look&nbsp;around. Our&nbsp;Work&nbsp;is&nbsp;usually&nbsp;a good&nbsp;start</a>
    <a
        href=""
        style={{
          position: "absolute",
          top: "265vh",
          left: "23vw",
          transition: "opacity 0.1s",
          opacity: isHomeHovered ? 0.5 : 1,
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsHomeHovered(true)}
        onMouseLeave={() => setIsHomeHovered(false)}
      >
        Home
      </a>
      <a
        href=""
        style={{
          position: "absolute",
          top: "267.5vh",
          left: "23vw",
          transition: "opacity 0.1s",
          opacity: isAboutHovered ? 0.5 : 1,
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsAboutHovered(true)}
        onMouseLeave={() => setIsAboutHovered(false)}
      >
        About
      </a>
      <a
        href=""
        style={{
          position: "absolute",
          top: "270vh",
          left: "23vw",
          transition: "opacity 0.1s",
          opacity: isWorkHovered ? 0.5 : 1,
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsWorkHovered(true)}
        onMouseLeave={() => setIsWorkHovered(false)}
      >
        Work
      </a>
      <a
        href=""
        style={{
          position: "absolute",
          top: "272.5vh",
          left: "23vw",
          transition: "opacity 0.1s",
          opacity: isContactHovered ? 0.5 : 1,
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsContactHovered(true)}
        onMouseLeave={() => setIsContactHovered(false)}
      >
        Contact
      </a>
    <a href="" style={{ position: 'absolute', top: '238vh', left: '47vw', opacity:0.3}}>Studio&nbsp;hours&nbsp;are from&nbsp;9:00&nbsp;to&nbsp;5:00 IST, Mon&nbsp;to&nbsp;Sat</a>
    <a href="" style={{ position: 'absolute', top: '252vh', left: '47vw', opacity:0.3}}>General&nbsp;questions</a>
    <a
        href="tel:+918956887367"
        style={{
          position: "absolute",
          top: "255vh",
          left: "47vw",
          transition: "opacity 0.1s",
          opacity: isPhoneHovered ? 0.5 : 1,
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsPhoneHovered(true)}
        onMouseLeave={() => setIsPhoneHovered(false)}
      >(M)&nbsp;+91&nbsp;895&nbsp;688&nbsp;7367
      
      </a>
     
      <a
        href="mailto:wastedpotentialstudio@gmail.com"
        style={{
          position: "absolute",
          top: "257.5vh",
          left: "47vw",
          transition: "opacity 0.1s",
          opacity: isEmailHovered ? 0.5 : 1,
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsEmailHovered(true)}
        onMouseLeave={() => setIsEmailHovered(false)}
      >(E)&nbsp;wastedpotentialstudio@gmail.com
      </a>
    <a
        href=""
        style={{
          position: "absolute",
          top: "265vh",
          left: "47vw",
          transition: "opacity 0.1s",
          opacity: isTwitterHovered ? 0.5 : 1,
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsTwitterHovered(true)}
        onMouseLeave={() => setIsTwitterHovered(false)}
      >
        Twitter
      </a>
    <a
        href=""
        style={{
          position: "absolute",
          top: "267.5vh",
          left: "47vw",
          transition: "opacity 0.1s",
          opacity: isInstagramHovered ? 0.5 : 1,
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsInstagramHovered(true)}
        onMouseLeave={() => setIsInstagramHovered(false)}
      >
        Instagram
      </a>
      <a
        href=""
        style={{
          position: "absolute",
          top: "270vh",
          left: "47vw",
          transition: "opacity 0.1s",
          opacity: isTumblrHovered ? 0.5 : 1,
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsTumblrHovered(true)}
        onMouseLeave={() => setIsTumblrHovered(false)}
      >
        Tumblr
      </a>
      <a
        href=""
        style={{
          position: "absolute",
          top: "272.5vh",
          left: "47vw",
          transition: "opacity 0.1s",
          opacity: isVimeoHovered ? 0.5 : 1,
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsVimeoHovered(true)}
        onMouseLeave={() => setIsVimeoHovered(false)}
      >
        Vimeo
      </a>
      <a
        href=""
        style={{
          position: "absolute",
          top: "275vh",
          left: "47vw",
          transition: "opacity 0.1s",
          opacity: isBehanceHovered ? 0.5 : 1,
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsBehanceHovered(true)}
        onMouseLeave={() => setIsBehanceHovered(false)}
      >
        Behance
      </a>
      <a
        href=""
        style={{
          position: "absolute",
          top: "277.5vh",
          left: "47vw",
          transition: "opacity 0.1s",
          opacity: isDribbleHovered ? 0.5 : 1,
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsDribbleHovered(true)}
        onMouseLeave={() => setIsDribbleHovered(false)}
      >
        Dribble
      </a>
      <a
        href=""
        style={{
          position: "absolute",
          top: "280vh",
          left: "47vw",
          transition: "opacity 0.1s",
          opacity: isMediumHovered ? 0.5 : 1,
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsMediumHovered(true)}
        onMouseLeave={() => setIsMediumHovered(false)}
      >
        Medium
      </a>
    </div>

    <footer>
    <div style={{ position: 'absolute', right: '-95.4vw', height: '521vh', display: 'flex', alignItems: 'center', justifyContent:'space-evenly'}}>
        <form action="https://api.web3forms.com/submit" method="POST" class="contact-left" style={{display:'flex', flexDirection: 'column', alignItems:'start', gap:'20px'}}>
          <div class="contact-left-title">
            <h2  style={{fontWeight:'600', fontSize:'40px', marginBottom:'5px'}}>Get in touch</h2>
            <hr style={{border:'none', width:'120px', height:'5px', backgroundColor:'black', borderRadius:'10px', marginBottom:'20px'}}></hr>
          </div>
          <input type="hidden" name="access_key" value="7993c76d-d551-45d9-8dac-556a52e98c56"></input>
          <input type="text" name="name" placeholder="Your Name" class="contact-inputs" required style={{width:'400px', height:'50px', border:'none', outline:'none', paddingLeft:'25px', fontWeight:'500', borderRadius:'50px'}}/>
          <input type="email" name="email" placeholder="Your Email" class="contact-inputs" required style={{width:'400px', height:'50px', border:'none', outline:'none', paddingLeft:'25px', fontWeight:'500', borderRadius:'50px'}}/>
          <textarea name="message" placeholder="Your Message" class="contact-inputs" required style={{width:'400px', height:'140px', border:'none', outline:'none', paddingTop:'15px' ,paddingLeft:'25px', fontWeight:'500', borderRadius:'20px'}}></textarea>
          <button type="submit" style={{display:'flex', alignItems:'center', padding:'15px 30px', fontSize:'16px', gap:'10px', border:'none', borderRadius:'50px', background:'linear-gradient(270deg,#ff994f,#fa6d86'}}>Submit </button>
        </form>
        <div class="contact-right">
        </div>
    </div>
     
    </footer>

    </div>
  )
}

function Typography() {
    const state = useThree();
    const { width, height } = state.viewport.getCurrentViewport(state.camera, [0, 0, 12]);
    const shared = { font: '/Inter-Regular.woff' };
    return (
      <>
        <Text anchorX="left" position={[-width / 2, -height * -0.20, 12]} {...shared} letterSpacing= "-0.1"  color= "black">
        About
        </Text>
        <Text anchorX="right" position={[width / 2.5, -height * 0.23, 12]} {...shared} letterSpacing= "-0.1"  color= "black">
        ↓ Us
        </Text>
        <Text anchorX="right" position={[width / 2.5, -height * 2.2, 12]} {...shared} letterSpacing= "-0.1"  color= "black" >
         Team
        </Text>
        <Text anchorX="left" position={[-width / 2.1, -height * 0.70, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.10'>
        WE ARE A CREATIVE STUDIO FOR ARTISTS BY ARTISTS
        </Text>
        <Text anchorX="left" position={[-width / 2.1, -height * 0.75, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.10'>
        CREATING IMMERSIVE DIGITAL EXPERIENCES FOR BRANDS AND PEOPLE
        </Text>
        <Text anchorX="left" position={[-width / 2.15, -height * 3.02, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.10'>
        Rohit
        </Text>
        <Text anchorX="left" position={[-width / 2.15, -height * 3.08, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.10'>
        Creative Director
        </Text>
        <Text anchorX="left" position={[-width / 2.15, -height * 3.30, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.06'>
        What we do
        </Text>
        <Text anchorX="left" position={[-width / 90, -height * 3.33, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.07'>
        Experience
        </Text>
        <Text anchorX="left" position={[-width / 90, -height * 3.38, 12]} {...shared} letterSpacing="-0.05" color='gray' fontSize='0.05' >
        Web design
        </Text>
        <Text anchorX="left" position={[-width / 90, -height * 3.415, 12]} {...shared} letterSpacing="-0.05" color='gray' fontSize='0.05' >
        Front-end development
        </Text>
        <Text anchorX="left" position={[-width / 90, -height * 3.45, 12]} {...shared} letterSpacing="-0.05" color='gray' fontSize='0.05' >
        Back-end development
        </Text>
        <Text anchorX="left" position={[-width / 90, -height * 3.485, 12]} {...shared} letterSpacing="-0.05" color='gray' fontSize='0.05' >
        Art direction
        </Text>
        <Text anchorX="left" position={[-width / 90, -height * 3.52, 12]} {...shared} letterSpacing="-0.05" color='gray' fontSize='0.05' >
        User Experience
        </Text>
        <Text anchorX="left" position={[-width / 90, -height * 3.555, 12]} {...shared} letterSpacing="-0.05" color='gray' fontSize='0.05' >
        Concept development
        </Text>
        <Text anchorX="left" position={[-width / 90, -height * 3.59, 12]} {...shared} letterSpacing="-0.05" color='gray' fontSize='0.05' >
        Brand development
        </Text>
        <Text anchorX="left" position={[-width / 90, -height * 3.625, 12]} {...shared} letterSpacing="-0.05" color='gray' fontSize='0.05' >
        Brand identity
        </Text>
        <Text anchorX="left" position={[-width / 90, -height * 3.66, 12]} {...shared} letterSpacing="-0.05" color='gray' fontSize='0.05' >
        ...
        </Text>
        
        
        <Text anchorX="left" position={[-width / 2.15, -height * 3.36, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.10'>
        We work with artists and brands,
        </Text>
        <Text anchorX="left" position={[-width / 2.15, -height * 3.42, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.10'>
        big or small, commercial or indie
        </Text>
        <Text anchorX="left" position={[-width / 2.15, -height * 3.48, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.10'>
        to tell their stories through code
        </Text>
        <Text anchorX="left" position={[-width / 2.15, -height * 3.54, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.10'>
        and creative design to give an
        </Text>
        <Text anchorX="left" position={[-width / 2.15, -height * 3.60, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.10'>
        immersive web experience.
        </Text>
        
        <Text anchorX="left" position={[-width / 7.8, -height * 3.02, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.10'>
        Stitch
        </Text>
        <Text anchorX="left" position={[-width / 7.8, -height * 3.08, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.10'>
        Recreational Officer
        </Text>
        <Text anchorX="left" position={[width / 4.9, -height * 3.02, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.10'>
        Surabhi
        </Text>
        <Text anchorX="left" position={[width / 4.9, -height * 3.08, 12]} {...shared} letterSpacing="-0.05" color='black' fontSize='0.10'>
        Brand Director
        </Text>
        <Text anchorX="left" position={[-width / 11.1, -height * 5.22, 12]} fontSize={0.03} {...shared} letterSpacing='-0.05' color= 'black'>
                @ 2024 Wasted Potential Studio. All rights reserved.
        </Text>
      </>
    );
  }


function Images() {
    const state = useThree();
    const { width, height } = state.viewport.getCurrentViewport(state.camera, [0, 0, 12]);
    return (
      <group>
        <Image position={[-width / 70000, -height * 1.4, 12]} scale={[width, height]} url="/images/trip5.jpg" alt="img" />
        <Image anchorX='left' position={[-width / 3, -height * 2.74, 12]}url="/images/IMG_1168.jpeg" alt="img"/>
        <Image anchorX='left' position={[width / 280, -height * 2.74, 12]}url="/images/IMG_2621.JPG" alt="img"/>
        <Image anchorX='left' position={[width / 3, -height * 2.74, 12]}url="/images/Surabhi_Personal Photo.jpg" alt="img"/>
      </group>
    );
  }




