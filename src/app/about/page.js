'use client';
import React, { Suspense } from "react";
import { Provider, atom, useAtom } from "jotai";
import { a, useSpring } from "@react-spring/web";
import Header from '/Users/rohit/wps/src/components/Header';
import styled, { createGlobalStyle } from "styled-components";

// Import Inter font
const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');
`;

// Define global styles
const GlobalStyles = () => <GlobalStyle />;

// Define styled components for UI elements
const PageWrapper = styled.div`
  margin-top: 100px; 
  height: 90vh;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
`;

const PostContainer = styled.div`
  padding: 50px 20px;
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
  padding: 50px 0px 0px 20px;
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
    by: "About Us —",
    title: "",
    url: "Welcome to Wasted Potential Studio",
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
    <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', width: '100%', height: '100%' }}>
      <a href="/" style={{ position: 'absolute', bottom: 40, left: 40, fontSize: '13px' }}> <br /> </a>
      <a href="/" style={{ position: 'absolute', top: 40, left: 40, fontSize: '15px' }}>wasted potential —</a>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}></div>
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
      <Overlay />
    </>
  );
}
