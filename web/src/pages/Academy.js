// Academy.js
import React from 'react';
import styled from 'styled-components';
import AcademyHero from './academy/components/AcademyHero';
import ProblemSection from './academy/components/ProblemSection';
import SolutionSection from './academy/components/SolutionSection';
import EvidenceSection from './academy/components/EvidenceSection';
import TeamSection from './academy/components/TeamSection';
import BonusSection from './academy/components/BonusSection';
import FAQSection from './academy/components/FAQSection';
import EnrollmentSection from './academy/components/EnrollmentSection';

const Container = styled.div`
  min-height: 100dvh;
  background: #050505;
  color: #e0e0e0;
  font-family: 'JetBrains Mono', monospace;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Footer = styled.footer`
  padding: 60px 20px;
  text-align: center;
  border-top: 1px solid #333;
  color: #666;
  font-size: 0.8rem;
  
  p { margin: 5px 0; }
  a { color: #888; text-decoration: none; &:hover { color: #fff; } }
`;

const Academy = () => {
  return (
    <Container>
      <AcademyHero />
      <ProblemSection />
      <SolutionSection />
      <EvidenceSection />
      <TeamSection />
      <BonusSection />
      <FAQSection />
      <EnrollmentSection />
      
      <Footer>
        <p>HOBBYTAN COUNCIL | CEO: HOBBY Kim</p>
        <p>Contact: aijossi@hobbytan.com</p>
        <p>© 2026 Hobbytan Council. All rights reserved.</p>
        <p style={{marginTop:'20px'}}>
            <a href="https://threads.net/@aijossi" target="_blank" rel="noreferrer">Threads</a> | 
            <a href="/dashboard" style={{marginLeft:'10px'}}>Council Login</a>
        </p>
      </Footer>
    </Container>
  );
};

export default Academy;
