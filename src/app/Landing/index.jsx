'use client';
import React from 'react';
import * as THREE from 'three';
import { useRef, useEffect,  useState } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { useFBO, useGLTF, useScroll, Text, Image, Scroll, Preload, ScrollControls, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';


export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (i.e., running in the browser environment)
    if (typeof window !== 'undefined') {
      // Access window.innerWidth only in the browser environment
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
        <ScrollControls damping={0.2} pages={[isMobile ? 2: 4]} distance={0.2}>
          <Lens>
            <Scroll>
              <Typography />
              <Typography2/>
              <Images />
            </Scroll>
            <Scroll html>
              <Footer/>
              <div style={{ transform: 'translate3d(65vw, 192vh, 0)' }}>
                <br />
                <br />
                <br />
              </div>
            </Scroll>
            <Preload />
          </Lens>
        </ScrollControls>
      </Canvas>
    </div>
  );
}



function Lens({ children, damping = 0.15, ...props }) {
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
        <Typography />
        <Images/>
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

function Images() {
  const group = useRef();
  const data = useScroll();
  const { width, height } = useThree((state) => state.viewport);
  const isMobile = window.innerWidth < 768;
  useFrame(() => {
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[5].material.grayscale = 1 - data.range(1.6 / 3, 1 / 3);
    group.current.children[6].material.zoom = 1 + (1 - data.range(2 / 3, 1 / 3)) / 3;
  });
  return (
    <>
    <group >
    <group ref={group}>
      <Image position-x={0} position-y={isMobile ? 0 : -12} position-z={isMobile ? 0 :0} scale={[width, height, 0]} url="/images/img7.jpg" alt="img" />
      <Image position-x={isMobile ? 0 :-2} position-y={0} position-z={0} scale={[4, height, 1]} url="/images/img1.jpg" alt="img" />
      <Image position-x={isMobile ? 3 : 2} position-y={0} position-z={3} scale={3} url="/images/img6.jpg" alt="img"/>
      <Image position={[ isMobile ? 10: -2.05, isMobile ? -height: -height, isMobile ? 8 :6]} scale={[1, 2, 1]} url="/images/trip2.jpg" alt="img"/>
      <Image position={[isMobile ? 2 : -0.6, isMobile ? -height/1.6 : -height, 9]} scale={[1, 2, 1]} url="/images/img3.jpg"alt="img" />
      <Image position={[isMobile ? 2 : 0.75, -height, 10.5]} scale={1.5} url="/images/trip7.jpg" alt="img"/>
      <Image position={[isMobile ? 2: 0, -height * 1.5, 7.5]} scale={[1.5, 3, 1]} url="/images/trip8.jpg" alt="img" />
    </group>
    </group>
    </>
  );
}

function Typography() {
  const state = useThree();
  const { width, height } = state.viewport.getCurrentViewport(state.camera, [0, 0, 12]); 
  const shared = { font: '/Inter-Regular.woff', letterSpacing: -0.1, color: 'black' };
  const isMobile = window.innerWidth < 768;

  return (
    <>
    <group>
      <Text anchorX="left" fontSize={isMobile ? 0.7 :1} position={[ isMobile ? -0.9 : -width / 2.5, isMobile ? 1 : -height / 10, isMobile ? 0: 12]} {...shared}>
        Wasted
      </Text>
      <Text anchorX="right" fontSize={isMobile ? 0.7 :1} position={[ isMobile ? 1.1 : width / 2.30, isMobile ? 0 : -height * 2, isMobile? 0: 12]} {...shared}>
        Potential
      </Text>
      <Text fontSize={isMobile ? 0.7 :1}  position={[ isMobile ? 0.1 : 0, isMobile ? -1 : -height * 4.624, isMobile ? 0 :12]} {...shared}>
        Studio
      </Text>
    </group>
    </>
  );
}

function Typography2() {
  const state = useThree();
  const { width, height } = state.viewport.getCurrentViewport(state.camera, [0, 0, 12]);
  const shared = { font: '/Inter-Regular.woff', letterSpacing: -0.05, color: 'black', };
  const isMobile = window.innerWidth < 768;
  return (
      <>
          <Text anchorX="left" position={[isMobile ? -width/3:-width / 11.1, isMobile ? -height * 2.97 : -height * 7.97, 12]} fontSize={0.03} {...shared}>
              @ 2024 Wasted Potential Studio. All rights reserved.
          </Text>
      </>
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
  const isMobile = window.innerWidth < 768;
  
  return(
    <>
    <div style={{ position: 'absolute', top: '100vh', display: 'flex', alignItems: 'center', justifyContent:'space-evenly' }}>
    <div style={{fontSize: '1.125em'}}>
    <a href="" style={{ position: 'absolute', top: '238vh', left: '4vw', opacity:[isMobile ? 0.0 : 0.3]}}>Check&nbsp;out&nbsp;some of&nbsp;our&nbsp;award&nbsp;winning projects</a>
    <a href="" style={{ position: 'absolute', top: '238vh', left: '23vw', opacity:[isMobile ? 0.0 : 0.3]}}>Or&nbsp;just&nbsp;take&nbsp;a&nbsp;look&nbsp;around. Our&nbsp;Work&nbsp;is&nbsp;usually&nbsp;a good&nbsp;start</a>
    <group style={{position: 'absolute',top:[isMobile ? "-440vw" : "0vw"], left:[isMobile ? '30vw' :'0vw'] }}>
    <a
        href="/"
        style={{
          position: "absolute",
          top: ['265vh'],
          left: ["23vw"],
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
        href="/about"
        style={{
          position: "absolute",
          top: ["267.5vh"],
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
        href="/expertise"
        style={{
          position: "absolute",
          top: ["270vh"],
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
        href="/contact"
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
      </group>
    <group style={{position:"absolute", top:[isMobile ? "-440vw" : "0vw"], left: [isMobile ? "-45vw" : "0vw"]}}>
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
        href="https://twitter.com/wastedpotentiaX"
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
        href="https://www.instagram.com/wastedpotentialstudio/"
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
        href="https://www.tumblr.com/"
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
        href="https://vimeo.com/watch"
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
        href="https://www.behance.net/"
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
        href="https://dribbble.com/"
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
        href="https://medium.com/"
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
      </group> 
    </div>
    

    <footer>
    <div style={{ position: 'absolute', right: [isMobile ? "0vw" : "-95.4vw"], height: [isMobile ? "420vh" : "521vh"], display: 'flex', alignItems: 'center', justifyContent:'space-evenly'}}>
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
    </>
  )
}
