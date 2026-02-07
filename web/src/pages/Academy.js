import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100dvh;
  background: #050505;
  color: #e0e0e0;
  font-family: 'JetBrains Mono', monospace;
  padding: 20px;
  overflow-y: auto;
`;

const Header = styled.header`
  text-align: center;
  padding: 40px 0;
  border-bottom: 1px solid rgba(0, 243, 255, 0.2);
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #00f3ff;
  font-size: 2rem;
  margin-bottom: 10px;
  text-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
`;

const SubTitle = styled.p`
  color: #888;
  font-size: 1rem;
`;

const Section = styled(motion.section)`
  max-width: 800px;
  margin: 0 auto 60px auto;
  animation: ${fadeIn} 0.5s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  border-left: 4px solid #00f3ff;
  padding-left: 15px;
  margin-bottom: 20px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: #111;
  border: 1px solid #333;
  padding: 20px;
  border-radius: 8px;
  
  &:hover {
    border-color: #00f3ff;
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.1);
  }
`;

const PriceTag = styled.div`
  font-size: 1.5rem;
  color: #00f3ff;
  font-weight: bold;
  margin: 20px 0;
`;

const CTAButton = styled.a`
  display: block;
  background: #00f3ff;
  color: #000;
  text-align: center;
  padding: 15px;
  border-radius: 6px;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.1rem;
  margin-top: 40px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #fff;
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
    transform: translateY(-2px);
  }
`;

const CurriculumItem = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background: #0a0a0a;
  border-left: 2px solid #333;
  
  h3 { margin: 0 0 5px 0; color: #ccc; }
  p { margin: 0; color: #666; font-size: 0.9rem; }
`;

const Academy = () => {
  return (
    <Container>
      <Header>
        <Title>HOBBYTAN ACADEMY</Title>
        <SubTitle>The CEO's AI Team Building Program</SubTitle>
      </Header>

      <Section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <SectionTitle>Why This Course?</SectionTitle>
        <p style={{ lineHeight: '1.6', color: '#ccc' }}>
          AI를 배우는 학생이 되지 마십시오. <br/>
          <strong>AI를 부리는 사장님이 되십시오.</strong><br/><br/>
          월 42만원으로 13명의 AI 임원진을 당신의 회사에 고용하는 효과를 드립니다.
          단순한 강의가 아닙니다. 6주 뒤, 당신은 '혼자'가 아닐 것입니다.
        </p>
      </Section>

      <Section>
        <SectionTitle>Curriculum (6 Weeks)</SectionTitle>
        <CurriculumItem>
            <h3>Week 1: Onboarding & Security</h3>
            <p>안전한 AI 환경 세팅 및 데이터 보안 교육</p>
        </CurriculumItem>
        <CurriculumItem>
            <h3>Week 2: The Secretary (김비서)</h3>
            <p>회의록 요약, 이메일 자동화 등 잡무 50% 단축</p>
        </CurriculumItem>
        <CurriculumItem>
            <h3>Week 3: The Designer (박디자이너)</h3>
            <p>미드저니/DALL-E로 내 브랜드 로고 및 명함 제작</p>
        </CurriculumItem>
        <CurriculumItem>
            <h3>Week 4: The Marketer (최마케터)</h3>
            <p>블로그/스레드 포스팅 자동 생성 및 바이럴 전략</p>
        </CurriculumItem>
        <CurriculumItem>
            <h3>Week 5: The Analyst (정분석가)</h3>
            <p>엑셀 데이터 분석 및 시각화 리포트 자동화</p>
        </CurriculumItem>
        <CurriculumItem>
            <h3>Week 6: Graduation</h3>
            <p>나만의 Custom GPT 봇 배포 및 수료</p>
        </CurriculumItem>
      </Section>

      <Section>
        <SectionTitle>Killer Feature</SectionTitle>
        <CardGrid>
            <Card>
                <h3 style={{ color: '#00f3ff' }}>24/7 AI Feedback</h3>
                <p>13인의 AI Council이 당신의 과제를 24시간 실시간으로 첨삭합니다.</p>
            </Card>
            <Card>
                <h3 style={{ color: '#00f3ff' }}>Pre-built Templates</h3>
                <p>업종별 표준 매뉴얼 템플릿 100종 무료 제공.</p>
            </Card>
        </CardGrid>
      </Section>

      <Section style={{ textAlign: 'center' }}>
        <SectionTitle style={{ border: 'none', padding: 0 }}>Enrollment</SectionTitle>
        <p>1기 선착순 모집 중</p>
        <PriceTag>₩ 420,000</PriceTag>
        <CTAButton href="https://forms.google.com/your-form-url" target="_blank">
            APPLY NOW (구글 폼 신청)
        </CTAButton>
        <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#666' }}>
            * 3회 이상 과제 미제출 시 제적 처리됩니다. (환불 불가)
        </p>
      </Section>
    </Container>
  );
};

export default Academy;
