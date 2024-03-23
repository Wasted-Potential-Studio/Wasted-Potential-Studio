'use client';
import styles from './style.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { links, footerLinks } from './data';
import { perspective, slideIn } from "./anim";
import Link from "next/link";

export default function index({Component, pageProps, router}) {
  return (
    
    <div className={styles.nav}>
       <div className={styles.body}>
        {
            links.map( (link, i) => {
                const { title, href } = link;
                return (
                    
                    <div key={`b_${i}`} className={styles.linkContainer}>
                        <Link href={href}>
                        <motion.div
                          href={href}
                          custom={i}
                          variants={perspective}
                          initial="initial"
                          animate="enter"
                          exit="exit">
                            <a> {title} </a>
                        </motion.div>
                        </Link>
                    </div>
                
                )
            })
        }
       </div>
       <AnimatePresence mode="wait">
        {router && <Component key={router.route} {...pageProps} />} {/* Check if router is defined before accessing its route property */}
      </AnimatePresence>

       <motion.div className={styles.footer}>
            {
                footerLinks.map( (link, i) => {
                    const { title, href } = link;
                    return (
                        <div key={`b_${i}`} className={styles.linkContainer}>
                          <Link href={href}> 
                        <motion.a 
                            variants={slideIn}
                            custom={i} 
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            key={`f_${i}`}
                        >
                            {title}
                        </motion.a>
                        </Link> 
                        </div>
                    )
                })
            }
       </motion.div>
    </div>
  )
}
