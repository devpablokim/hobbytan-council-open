import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import initialized auth

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 243, 255, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(0, 243, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 243, 255, 0); }
`;

const Container = styled.div`
  min-height: 100dvh;
  background: #000;
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  padding: 20px;
`;

const BackgroundLogo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15vw;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.03);
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
  user-select: none;
`;

const ChatContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 40px;
  z-index: 1;
`;

const Bubble = styled(motion.div)`
  background: ${props => props.isUser ? 'transparent' : 'rgba(20, 20, 20, 0.8)'};
  border: 1px solid ${props => props.isUser ? '#00f3ff' : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(5px);
  padding: 15px 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  color: ${props => props.isUser ? '#00f3ff' : '#eee'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  max-width: 85%;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  font-size: 1rem;
  line-height: 1.5;
  
  @media (max-width: 600px) {
    font-size: 0.95rem;
    padding: 12px 16px;
  }
`;

const Speaker = styled.div`
  font-size: 0.75rem;
  color: ${props => props.color};
  margin-bottom: 5px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ActionButton = styled(motion.button)`
  background: #00f3ff;
  color: #000;
  border: none;
  padding: 18px 40px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.4);
  animation: ${pulse} 2s infinite;
  
  &:hover {
    background: #fff;
    box-shadow: 0 0 40px rgba(0, 243, 255, 0.8);
    animation: ${glitch} 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 20px;
    font-size: 1rem;
    position: fixed;
    bottom: 40px;
    left: 20px;
    right: 20px;
    width: auto;
  }
`;

const LandingPage = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const script = [
    { speaker: 'DEO-TAN', color: '#fff', text: 'Representative, you are finally here.' },
    { speaker: 'PO-TAN', color: '#007bff', text: 'The market waits for no one.' },
    { speaker: 'UX-TAN', color: '#e83e8c', text: 'Your Sanctuary is prepared.' },
    { speaker: 'DEO-TAN', color: '#fff', text: 'Shall we begin?' }
  ];

  useEffect(() => {
    if (step < script.length) {
      const timer = setTimeout(() => setStep(step + 1), 800 + (step * 100));
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleLogin = async () => {
    console.log("Attempting login...");
    try {
        if (!auth) throw new Error("Auth not initialized");
        const result = await signInWithPopup(auth, new GoogleAuthProvider());
        if (result.user) {
            console.log("Login success:", result.user.uid);
            navigate('/dashboard'); 
        }
    } catch (e) {
        console.error("Login failed:", e);
        alert("Login failed: " + e.message);
    }
  };

  return (
    <Container>
      <BackgroundLogo>HOBBYTAN</BackgroundLogo>
      <ChatContainer>
        <AnimatePresence>
          {script.slice(0, step).map((msg, i) => (
            <Bubble
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Speaker color={msg.color}>{msg.speaker}</Speaker>
              {msg.text}
            </Bubble>
          ))}
        </AnimatePresence>
      </ChatContainer>
      
      {step >= script.length && (
        <ActionButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleLogin}
        >
            ENTER THE BOARDROOM
        </ActionButton>
      )}
    </Container>
  );
};

export default LandingPage;
