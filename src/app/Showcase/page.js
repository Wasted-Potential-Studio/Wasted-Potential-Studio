'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'
import { useTransform, useScroll, motion } from 'framer-motion';
import Header from "../Header"

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
]

export default function Showcase() {
  
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({width:0, height:0});

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect( () => {
    const lenis = new Lenis()

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight})
    }

    window.addEventListener("resize", resize)
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  return (
    <main className={styles.main}>
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y}/>
        <Column images={[images[3], images[4], images[5]]} y={y2}/>
        <Column images={[images[6], images[7], images[8]]} y={y3}/>
        <Column images={[images[9], images[10], images[11]]} y={y4}/>
      </div>
      <div className={styles.spacer}>
        <a href="/About" style={{ position: 'absolute', top: '333vh', left: '6.6vw', fontSize: '1.5em' }}>About</a>
        <a href="/expertise" style={{ position: 'absolute', top: '339vh', left: '6.4vw', fontSize: '1.5em' }}>Feature</a>
        <a href="/expertise" style={{ position: 'absolute', top: '345vh', left: '6.4vw', fontSize: '1.5em' }}>Projects</a>
        <a href="/contact" style={{ position: 'absolute', top: '351vh', left: '6.4vw', fontSize: '1.5em' }}>Contacts</a>
        <a href="/" style={{ position: 'absolute', top: '357vh', left: '6.4vw', fontSize: '1.5em' }}>LearnMore</a>
        <a href="/contact" style={{ position: 'absolute', top: '333vh', right: '36.5vw', fontSize: '1.5em' }}>Contact</a>
        <a href="https://twitter.com/wastedpotentiaX" style={{ position: 'absolute', top: '339vh', right: '36.5vw', fontSize: '1.5em' }}>Twitter</a>
        <a href="https://www.instagram.com/wastedpotentialstudio/" style={{ position: 'absolute', top: '345vh', right: '36.5vw', fontSize: '1.5em' }}>Instagram</a>
        <a href="/" style={{ position: 'absolute', top: '351vh', right: '36.5vw', fontSize: '1.5em' }}>Facebook</a>
        <a href="/Showcase" style={{ position: 'absolute', top: '357vh', right: '36.5vw', fontSize: '1.5em' }}>Showcase</a>
        <a href="/" style={{ position: 'absolute', top: '371vh', right: '41vw', fontSize: '0.75em' }}>@ 2024 Wasted Potential Studio. All rights reserved.</a>
      </div>
      <footer>
        <div style={{ position: 'absolute', top: '320.5vh', left: '71.5vw', display: 'flex', alignItems: 'center', justifyContent:'space-evenly'}}>
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
      <Header/>
      
    </main>
  )
}

const Column = ({images, y}) => {
  return (
    <motion.div 
      className={styles.column}
      style={{y}}
      >
      {
        images.map( (src, i) => {
          return <div key={i} className={styles.imageContainer}>
            <Image 
              src={`/images/${src}`}
              alt='image'
              fill
            />
          </div>
        })
      }
    </motion.div>
  )
}

