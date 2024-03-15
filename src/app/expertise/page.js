'use client';
import styles from './page.module.scss'
import { useState } from 'react';
import Project from "../project"
import Showcase from "../Showcase"
import Modal from "../modal"
import Header from "../Header"


export default function About() {


    const projects = [
        {
          title: "Project 1",
          src: "c2montreal.png",
          color: "#000000"
        },
        {
          title: "Project 2",
          src: "officestudio.png",
          color: "#8C8C8C"
        },
        {
          title: "Project 3",
          src: "locomotive.png",
          color: "#EFE8D3"
        },
        {
          title: "Project 4",
          src: "silencio.png",
          color: "#706D63"
        }
      ]

    const [modal, setModal] = useState({active: false, index:0})

    return (
        <main className={styles.main}>
          <Showcase/>
          <div className={styles.body}>
            {projects.map((project, index) => (
              <Project key={index} index={index} title={project.title} setModal={setModal} />
            ))}
          </div>
          <Modal modal={modal} projects={projects} />
          <Header/>
          <Overlay/>
          <br/>
        </main>
      );
    }

    function Overlay() {
      return (
        <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
          <a href="/" style={{ position: 'absolute', bottom: 40, left: 40, fontSize: '13px' }}> <br /> </a>
          <a href="/" style={{ position: 'absolute', top: 40, left: 40, fontSize: '15px', color: "white"}}>wasted potential —</a>
          <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}></div>
        </div>
      );
    }
