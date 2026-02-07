// AcademyShared.js
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  min-height: 100dvh;
  background: #050505;
  color: #e0e0e0;
  font-family: 'JetBrains Mono', monospace;
  overflow-x: hidden;
`;

export const Section = styled(motion.section)`
  max-width: 1000px;
  margin: 100px auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    margin: 60px auto;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #fff;
  text-align: center;
  margin-bottom: 60px;
  font-weight: 800;
  letter-spacing: -1px;
  
  span { 
    background: linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(0, 243, 255, 0.3) 60%);
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const Highlight = styled.span`
  color: #00f3ff;
  font-weight: bold;
`;
