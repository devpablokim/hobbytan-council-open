import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import playBleep from '../utils/sound';

const overlayFade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const IntroContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  color: #00f3ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  font-family: 'JetBrains Mono', monospace;
  animation: ${overlayFade} 1s ease-in;
`;

const TerminalText = styled.div`
  font-size: 1.2rem;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
  white-space: pre-wrap;
  text-align: left;
  line-height: 1.5;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 20px;
  background: #00f3ff;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const AccessButton = styled.button`
  background: transparent;
  border: 1px solid #00f3ff;
  color: #00f3ff;
  padding: 15px 40px;
  font-size: 1.2rem;
  font-family: inherit;
  cursor: pointer;
  margin-top: 30px;
  opacity: 0;
  animation: ${overlayFade} 2s ease-in forwards;
  animation-delay: 4s; /* Wait for text */
  
  &:hover {
    background: rgba(0, 243, 255, 0.2);
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.4);
  }
`;

const InteractiveIntro = ({ onComplete }) => {
  const [text, setText] = useState('');
  const fullText = `> DETECTING USER...\n> IDENTITY VERIFIED: CEO (Representative)\n> COUNCIL STATUS: ONLINE\n> ESTABLISHING SECURE CONNECTION...`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        if (fullText[i] !== '\n' && fullText[i] !== ' ') {
            playBleep();
        }
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <IntroContainer>
      <TerminalText>
        {text}<Cursor />
      </TerminalText>
      <AccessButton onClick={onComplete}>ENTER BOARDROOM</AccessButton>
    </IntroContainer>
  );
};

export default InteractiveIntro;
