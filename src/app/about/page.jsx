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
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
        <ScrollControls damping={0.2} pages={2.90} distance={0.2}>
          <Lens>
            <Scroll >
              <Typography/>
              <Typography2/>
              <Typography3/>
              <Footer/>
              <Images/>
            </Scroll>
            <Scroll html>
        <a href="/about" style={{ position: 'absolute', top: '248vh', left: '6.6vw', fontSize: '1.5em' }}>About</a>
        <a href="/expertise" style={{ position: 'absolute', top: '254vh', left: '6.4vw', fontSize: '1.5em' }}>Feature</a>
        <a href="/expertise" style={{ position: 'absolute', top: '260vh', left: '6.4vw', fontSize: '1.5em' }}>Projects</a>
        <a href="/contact" style={{ position: 'absolute', top: '266vh', left: '6.4vw', fontSize: '1.5em' }}>Contacts</a>
        <a href="/" style={{ position: 'absolute', top: '272vh', left: '6.4vw', fontSize: '1.5em' }}>LearnMore</a>
        <a href="/contact" style={{ position: 'absolute', top: '248vh', right: '-63.4vw', fontSize: '1.5em' }}>Contact</a>
        <a href="https://twitter.com/wastedpotentiaX" style={{ position: 'absolute', top: '254vh', right: '-63.4vw', fontSize: '1.5em' }}>Twitter</a>
        <a href="https://www.instagram.com/wastedpotentialstudio/" style={{ position: 'absolute', top: '260vh', right: '-63.4vw', fontSize: '1.5em' }}>Instagram</a>
        <a href="" style={{ position: 'absolute', top: '266vh', right: '-63.4vw', fontSize: '1.5em' }}>Facebook</a>
        <a href="/Showcase" style={{ position: 'absolute', top: '272vh', right: '-63.4vw', fontSize: '1.5em' }}>Showcase</a>

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

function Typography() {
    const state = useThree();
    const { width, height } = state.viewport.getCurrentViewport(state.camera, [0, 0, 12]);
    const shared = { font: '/Inter-Regular.woff', letterSpacing: -0.1, color: 'black' };
    return (
      <>
        <Text anchorX="left" position={[-width / 2, -height * -0.20, 12]} {...shared}>
          About
        </Text>
        <Text anchorX="right" position={[width / 2.5, -height * 0.23, 12]} {...shared}>
        ↓ Us
        </Text>
      </>
    );
  }

  function Typography3() {
    const state = useThree();
    const { width, height } = state.viewport.getCurrentViewport(state.camera, [0, 0, 12]);
    const shared = { font: '/Inter-Regular.woff', letterSpacing: -0.1, color: 'black' };
    return (
      <>
        <Text anchorX="left" position={[-width / 2, -height * 2.2, 12]} {...shared}>
        </Text>
        <Text anchorX="right" position={[width / 2.5, -height * 2.2, 12]} {...shared}>
         Team
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

function Typography2() {
    const state = useThree();
    const { width, height } = state.viewport.getCurrentViewport(state.camera, [0, 0, 12]);
    const shared = { font: '/Inter-Regular.woff', letterSpacing: -0.05, color: 'black', fontSize:'0.10' };
    return (
      <>
        <Text anchorX="left" position={[-width / 2.1, -height * 0.65, 12]} {...shared}>
        
        </Text>
        <Text anchorX="left" position={[-width / 2.1, -height * 0.70, 12]} {...shared}>
        WE ARE A CREATIVE STUDIO FOR ARTISTS BY ARTISTS
        </Text>
        <Text anchorX="left" position={[-width / 2.1, -height * 0.75, 12]} {...shared}>
        CREATING IMMERSIVE DIGITAL EXPERIENCES FOR BRANDS AND PEOPLE
        </Text>
        <Text anchorX="left" position={[-width / 2.15, -height * 3.02, 12]} {...shared}>
        Rohit
        </Text>
        <Text anchorX="left" position={[-width / 2.15, -height * 3.08, 12]} {...shared}>
        Creative Director
        </Text>
        <Text anchorX="left" position={[-width / 7.8, -height * 3.02, 12]} {...shared}>
        Stitch
        </Text>
        <Text anchorX="left" position={[-width / 7.8, -height * 3.08, 12]} {...shared}>
        Recreational Officer
        </Text>
        <Text anchorX="left" position={[width / 4.9, -height * 3.02, 12]} {...shared}>
        Surabhi
        </Text>
        <Text anchorX="left" position={[width / 4.9, -height * 3.08, 12]} {...shared}>
        Brand Director
        </Text>
      </>
    );
  }


function Footer() {
    const state = useThree();
    const { width, height } = state.viewport.getCurrentViewport(state.camera, [0, 0, 12]);
    const shared = { font: '/Inter-Regular.woff', letterSpacing: -0.05, color: 'black', };
    const linkStyle = { ...shared, marginTop: '0.05' }; // Adjust spacing between links
    return (
        <>
            <Text anchorX="left" position={[-width / 2.3, -height * 5.09, 12]} fontSize={0.05} {...linkStyle} >
                
            </Text>
            <Text href='/about' anchorX="left" position={[-width / 2.3, -height * 5.03, 12]} fontSize={0.05} {...linkStyle}  >
                
            </Text>
            <Text anchorX="left" position={[-width / 2.3, -height * 4.97, 12]} fontSize={0.05} {...linkStyle}>
                
            </Text>
            <Text anchorX="left" position={[-width / 2.3, -height * 4.91, 12]} fontSize={0.05} {...linkStyle} >
                
            </Text>
            <Text style={{ position: 'absolute', top: '250vh', left: '9vw' }} anchorX="left"  fontSize={0.05}  {...linkStyle} >
                
            </Text>
            <Text anchorX="left" position={[-width / 5, -height * 5.09, 12]} fontSize={0.05} fontWeight={600} {...shared}>
                
            </Text>
            <Text anchorX="left" position={[-width / 5, -height * 5.03, 12]} fontSize={0.05} {...linkStyle}>
                
            </Text>
            <Text anchorX="left" position={[-width / 5, -height * 4.97, 12]} fontSize={0.05} {...linkStyle}>
                
            </Text>
            <Text anchorX="left" position={[-width / 5, -height * 4.91, 12]} fontSize={0.05} {...linkStyle}>
                
            </Text>
            <Text anchorX="left" position={[-width / 5, -height * 4.85, 12]} fontSize={0.05}  {...linkStyle}>
                
            </Text>
            <Text anchorX="right" position={[width / 2.3, -height * 5.09, 12]} fontSize={0.05} fontWeight={600} {...shared}>
                
            </Text>
            <Text anchorX="right" position={[width / 2.3, -height * 5.03, 12]} fontSize={0.05} {...linkStyle}>
                
            </Text>
            <Text anchorX="right" position={[width / 2.3, -height * 4.97, 12]} fontSize={0.05} {...linkStyle}>
                
            </Text>
            <Text anchorX="right" position={[width / 2.3, -height * 4.91, 12]} fontSize={0.05} {...linkStyle}>
                
            </Text>
            <Text anchorX="right" position={[width / 2.3, -height * 4.85, 12]} fontSize={0.05}  {...linkStyle}>
                
            </Text>
            <Text anchorX="left" position={[-width / 11.1, -height * 5.22, 12]} fontSize={0.03} {...shared}>
                @ 2024 Wasted Potential Studio. All rights reserved.
            </Text>
        </>
    );
}