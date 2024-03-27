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
  const [dimension, setDimension] = useState({width:0, height:1});

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
    <main>
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y}/>
        <Column images={[images[3], images[4], images[5]]} y={y2}/>
        <Column images={[images[6], images[7], images[8]]} y={y3}/>
        <Column images={[images[9], images[10], images[11]]} y={y4}/>
      </div>
      <Footer/>
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
    
    <div style={{ position: 'absolute', top: '60vh' }}>
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

      <a
        href=""
        style={{
          position: "absolute",
          top: "298vh",
          left: "42vw",
          transition: "opacity 0.1s",
          opacity: 1,
          fontSize: 12
        }}
      >
        @&nbsp;2024&nbsp;Wasted&nbsp;Potential&nbsp;Studio.&nbsp;All&nbsp;right&nbsp;reserved
      </a>
    </div>

    <footer>
    <div style={{ position: 'absolute', right: '-95.4vw', top: '235.5vh', display: 'flex', alignItems: 'center', justifyContent:'space-evenly'}}>
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
