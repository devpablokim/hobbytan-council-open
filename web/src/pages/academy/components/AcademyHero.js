// AcademyHero.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const HeroContainer = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* Removed external image to prevent loading errors */
  background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
  background-size: cover;
  background-position: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.7);
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChatWindow = styled.div`
  width: 100%;
  max-width: 600px;
  height: 400px;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 40px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Bubble = styled(motion.div)`
  background: ${props => props.role === 'CEO' ? 'rgba(0, 243, 255, 0.15)' : '#222'};
  border: 1px solid ${props => props.role === 'CEO' ? 'rgba(0, 243, 255, 0.3)' : '#444'};
  padding: 12px 18px;
  border-radius: 12px;
  border-bottom-right-radius: ${props => props.role === 'CEO' ? '0' : '12px'};
  border-bottom-left-radius: ${props => props.role !== 'CEO' ? '0' : '12px'};
  margin-bottom: 12px;
  align-self: ${props => props.role === 'CEO' ? 'flex-end' : 'flex-start'};
  max-width: 85%;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #eee;
  
  strong {
    display: block;
    font-size: 0.75rem;
    margin-bottom: 4px;
    color: ${props => props.role === 'CEO' ? '#00f3ff' : props.color || '#aaa'};
  }
`;

const MainTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 900;
  text-align: center;
  line-height: 1.1;
  margin-bottom: 20px;
  background: linear-gradient(to right, #fff, #aaa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  span {
    display: block;
    font-size: 1.5rem;
    font-weight: 500;
    color: #00f3ff;
    -webkit-text-fill-color: #00f3ff;
    margin-bottom: 10px;
    letter-spacing: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    span { font-size: 1rem; }
  }
`;

const SubText = styled(motion.p)`
  color: #ccc;
  font-size: 1.2rem;
  text-align: center;
  max-width: 700px;
  line-height: 1.6;
`;

const ScrollDown = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: #666;
  font-size: 0.8rem;
  z-index: 2;
  
  &::after {
    content: '↓';
    display: block;
    text-align: center;
    margin-top: 5px;
    font-size: 1.2rem;
  }
`;

const messages = [
    { role: 'CEO', text: "내일 투자 미팅인데... IR 자료 디자인이 너무 구려. 어떡하지?" },
    { role: 'UX-TAN', color: '#e83e8c', text: "걱정 마세요. 1분만 기다리세요. 미드저니로 고퀄리티 이미지 뽑아옵니다." },
    { role: 'PO-TAN', color: '#007bff', text: "데이터 장표도 약합니다. 2025년 시장 전망 차트, 제가 새로 그렸습니다." },
    { role: 'MKT-TAN', color: '#6f42c1', text: "발표 스크립트도 밋밋해요. 심금을 울리는 오프닝 멘트 3가지 준비했습니다." },
    { role: 'CEO', text: "와... 너네 진짜 미쳤다. 나 혼자 했으면 3일 밤샜을 텐데." },
    { role: 'DEO-TAN', color: '#fff', text: "이게 바로 'AI 스터디그룹'의 힘입니다. 대표님은 결정만 하십시오." }
];

const AcademyHero = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < messages.length) {
      const timer = setTimeout(() => setIdx(idx + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [idx]);

  return (
    <HeroContainer>
      <ContentWrapper>
        <ChatWindow>
          <AnimatePresence>
            {messages.slice(0, idx).map((m, i) => (
              <Bubble
                key={i}
                role={m.role}
                color={m.color}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {m.role !== 'CEO' && <strong>{m.role}</strong>}
                {m.text}
              </Bubble>
            ))}
          </AnimatePresence>
        </ChatWindow>
        
        <MainTitle
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 2, duration: 1 }}
        >
          <span>HOBBYTAN AI STUDY GROUP</span>
          혼자 일하는 시대는<br/>끝났습니다.
        </MainTitle>
        
        <SubText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
        >
            당신이 3일 밤낮으로 하던 일, AI Council은 3분 만에 끝냅니다.<br/>
            6주간 TAN 활용법을 마스터하고, <strong>평생 당신을 위해 일할 AI 임원진을 구축하십시오.</strong>
        </SubText>
      </ContentWrapper>
      
      <ScrollDown
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 4, duration: 1.5, repeat: Infinity }}
      >
        SCROLL TO EXPLORE
      </ScrollDown>
    </HeroContainer>
  );
};

export default AcademyHero;
