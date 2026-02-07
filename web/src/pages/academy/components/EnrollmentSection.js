// EnrollmentSection.js (Update)
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Section, SectionTitle, Highlight } from './SharedStyles';
import InquiryForm from '../../InquiryForm';

const PriceBox = styled.div`
  background: linear-gradient(145deg, #111, #0a0a0a);
  border: 1px solid #00f3ff;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
  position: relative;
  box-shadow: 0 0 50px rgba(0, 243, 255, 0.15);
  
  &::before {
    content: 'SUPER EARLY BIRD';
    position: absolute;
    top: -15px; left: 50%;
    transform: translateX(-50%);
    background: #00f3ff;
    color: #000;
    padding: 5px 20px;
    font-weight: bold;
    border-radius: 20px;
    font-size: 0.9rem;
  }
`;

const OldPrice = styled.div`
  text-decoration: line-through;
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const CurrentPrice = styled.div`
  font-size: 3.5rem;
  color: #fff;
  font-weight: 900;
  margin-bottom: 10px;
  
  span { font-size: 1rem; color: #00f3ff; margin-left: 10px; font-weight: normal; }
`;

const blink = keyframes`
  50% { opacity: 0.5; }
`;

const Countdown = styled.div`
  background: rgba(255, 0, 0, 0.1);
  color: #ff4444;
  padding: 15px;
  border-radius: 8px;
  display: inline-block;
  font-weight: bold;
  margin: 20px 0;
  font-size: 1.3rem;
  border: 1px solid #ff4444;
  animation: ${blink} 1s infinite;
`;

const Warning = styled.p`
  color: #ff4444;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #333;
  padding: 10px 0;
  font-size: 0.95rem;
  color: #ccc;
  
  span:first-child { color: #888; }
`;

const EnrollmentSection = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const target = new Date('2026-02-15T23:59:59'); 
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      
      if (diff <= 0) {
        setTimeLeft("OFFER EXPIRED");
        clearInterval(interval);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft(`D-${d} ${h}:${m}:${s}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section>
      <SectionTitle>이제, <Highlight>결정</Highlight>할 시간입니다.</SectionTitle>
      
      <PriceBox>
        <div style={{textAlign:'left', marginBottom:'30px'}}>
            <InfoRow>
                <span>일정</span>
                <span>2026년 2월 25일 (수) 시작 (6주 과정)</span>
            </InfoRow>
            <InfoRow>
                <span>시간</span>
                <span>매주 수요일 저녁 8:00 ~ 9:30 (90분)</span>
            </InfoRow>
            <InfoRow>
                <span>장소</span>
                <span>온라인 Live (ZOOM) + VOD 무제한</span>
            </InfoRow>
        </div>
        
        <p style={{color:'#ccc', marginBottom:'10px', fontSize:'0.9rem'}}>
            정상가
        </p>
        <OldPrice>800,000 KRW</OldPrice>
        <CurrentPrice>480,000 KRW <span>(40% OFF)</span></CurrentPrice>
        
        <div style={{margin:'30px 0', borderTop:'1px solid #333', borderBottom:'1px solid #333', padding:'20px 0'}}>
            <Warning>⚠️ PRICE HIKE WARNING</Warning>
            <p style={{color:'#ccc', fontSize:'0.9rem'}}>2월 15일 24:00 이후, 가격이 <strong>600,000원</strong>으로 인상됩니다.</p>
            <Countdown>{timeLeft}</Countdown>
            <p style={{color:'#888', fontSize:'0.8rem'}}>지금 망설이는 1분은 12만원의 손해입니다.</p>
        </div>
        
        <InquiryForm />
      </PriceBox>
    </Section>
  );
};

export default EnrollmentSection;
