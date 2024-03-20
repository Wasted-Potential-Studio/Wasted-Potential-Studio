'use client';
import React, { Suspense } from "react";
import { Provider, atom, useAtom } from "jotai";
import { a, useSpring } from "@react-spring/web";
import Header from '../Header';
import styled, { createGlobalStyle } from "styled-components";

// Import Inter font
const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');
`;

// Define global styles
const GlobalStyles = () => <GlobalStyle />;

// Define styled components for UI elements
const PageWrapper = styled.div`
  margin-top: 0px; 
  height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  overflow: hidden; /* Prevent scrolling */
`;

const PostContainer = styled.div`
  padding: 120px 20px;
  overflow: hidden;
  word-wrap: break-word;
  position: relative;
`;

const StyledH1 = styled(a.h1)`
  writing-mode: tb-rl;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: 10em;
  letter-spacing: -10px;
  text-align: left;
  margin: 0;
  padding: 120px 0px 0px 20px;
`;

const StyledButton = styled.button`
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: "Inter", sans-serif;
  font-weight: 200;
  font-size: 6em;
  padding: 0px 30px 20px 0px;
  display: flex;
  align-items: flex-end;
  color: inherit;

  &:focus {
    outline: 0;
  }
`;

// Define atoms for state management
const postId = atom(9000001);
const postData = atom({
    by: "Contact Us—",
    title: "",
    url: "",
    text: "",
    time: Date.now() / 1000, // Current timestamp in seconds
  });

// Define components
function Id() {
  const [id] = useAtom(postId);
  const props = useSpring({ from: { id: 0 }, id, reset: true });
  return <StyledH1>{props.id.to(Math.round)}</StyledH1>;
}

function Next() {
  const [, set] = useAtom(postId);
  return (
    <StyledButton onClick={() => set((x) => x + 1)}>
      <div>→</div>
    </StyledButton>
  );
}

function PostTitle() {
  const [{ by, title, url, text, time }] = useAtom(postData);
  return (
    <>
      <h2>{by}</h2>
      <h6>{new Date(time * 1000).toLocaleDateString("en-US")}</h6>
      {title && <h4>{title}</h4>}
      <a href={url}>{url}</a>
      <p>{text}</p>
    </>
  );
}

function Overlay() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <a href="/" style={{ position: 'absolute', top: 40, left: 40, fontSize: '15px' }}>wasted potential —</a>
      <a href="/" style={{ position: 'absolute', top: '75vh', left: '16.7vw', fontSize: '1.5em' }}>About</a>
      <a href="/" style={{ position: 'absolute', top: '80vh', left: '16.7vw', fontSize: '1.5em' }}>Feature</a>
      <a href="/" style={{ position: 'absolute', top: '85vh', left: '16.7vw', fontSize: '1.5em' }}>Projects</a>
      <a href="/" style={{ position: 'absolute', top: '90vh', left: '16.7vw', fontSize: '1.5em' }}>LearnMore</a>
      <a href="/" style={{ position: 'absolute', top: '75vh', right: '16.5vw', fontSize: '1.5em' }}>Twitter</a>
      <a href="/" style={{ position: 'absolute', top: '80vh', right: '16.5vw', fontSize: '1.5em' }}>Instagram</a>
      <a href="/" style={{ position: 'absolute', top: '85vh', right: '16.5vw', fontSize: '1.5em' }}>Facebook</a>
      <a href="/" style={{ position: 'absolute', top: '90vh', right: '16.5vw', fontSize: '1.5em' }}>Showcase</a>
      <a href="" style={{ position: 'absolute', top: '96vh', right: '40.5vw', fontSize: '0.78em' }}>@ 2024 Wasted Potential Studio. All rights reserved.</a>

      <footer>
        <div style={{ position: 'absolute', left: '16.5vw', top: '20vh', display: 'flex', alignItems: 'center', justifyContent:'space-evenly'}}>
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
    
  );
}



export default function Page() {
  return (
    <>
      <PageWrapper>
        <Provider>
          <Container>
            <Id />
            <PostContainer>
              <Suspense fallback={<h2>Loading...</h2>}>
                <PostTitle />
                
              </Suspense>
            </PostContainer>
            <Next />
          </Container>
        </Provider>
      </PageWrapper>
      <Header/>
      <Overlay/>
    </>
  );
}
