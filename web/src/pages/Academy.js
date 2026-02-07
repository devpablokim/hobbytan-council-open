import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import InquiryForm from './InquiryForm'; // Import the form

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100dvh;
  background: #050505;
  color: #e0e0e0;
  font-family: 'JetBrains Mono', monospace;
  padding: 0; /* Full bleed */
  overflow-y: auto;
`;

const HeroSection = styled.div`
  height: 80vh;
  background-image: url('https://fastly.picsum.photos/id/1008/1200/800.jpg?hmac=HMq920662bJ6kI7BrSWTjxVxCr8caJgzW_95yidK8GY');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3), #050505);
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 20px;
`;

const Title = styled.h1`
  color: #00f3ff;
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
  
  @media (max-width: 600px) { font-size: 2rem; }
`;

const SubTitle = styled.p`
  color: #fff;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 40px;
  font-weight: 300;
`;

const Section = styled(motion.section)`
  max-width: 1000px;
  margin: 80px auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin-bottom: 50px;
  
  span { border-bottom: 3px solid #00f3ff; padding-bottom: 10px; }
`;

const VisualProof = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 80px;
  
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const ProofImage = styled.img`
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
  border: 1px solid #333;
`;

const ProofText = styled.div`
  h3 { color: #00f3ff; font-size: 1.5rem; margin-bottom: 15px; }
  p { line-height: 1.6; color: #ccc; }
`;

const CurriculumItem = styled.div`
  margin-bottom: 15px;
  padding: 20px;
  background: #111;
  border-left: 4px solid #00f3ff;
  border-radius: 0 8px 8px 0;
  
  h3 { margin: 0 0 5px 0; color: #fff; font-size: 1.2rem; }
  p { margin: 0; color: #888; font-size: 0.95rem; }
`;

const Academy = () => {
  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <Title>THE CEO'S AI TEAM</Title>
          <SubTitle>
            당신의 뒤에는 13명의 천재가 있습니다.<br/>
            혼자 일하지 마십시오. 지시하십시오.
          </SubTitle>
        </HeroContent>
      </HeroSection>

      <Section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <SectionTitle><span> VISUAL PROOF </span></SectionTitle>
        
        <VisualProof>
            <ProofImage src="https://fastly.picsum.photos/id/1078/800/600.jpg?hmac=wjHqEaMNcWV3q0v7VkJZJOxdXjfS-OqEvdQrLrpP5zE" />
            <ProofText>
                <h3>Design by AI</h3>
                <p>
                    "디자인 감각이 없어도 됩니다."<br/>
                    미드저니로 생성한 로고와 패키지 디자인입니다.
                    당신의 브랜드도 단 3분 만에 이런 퀄리티를 가질 수 있습니다.
                </p>
            </ProofText>
        </VisualProof>

        <VisualProof style={{ direction: 'rtl' }}> {/* Reverse layout */}
            <ProofImage src="https://fastly.picsum.photos/id/296/1200/600.jpg?hmac=LPkjWwfu_4vFih3p8L_Q4OtlFWxB5ZmMdS_iEJlbKxk" style={{ direction: 'ltr' }} />
            <ProofText style={{ direction: 'ltr' }}>
                <h3>Analysis by AI</h3>
                <p>
                    "엑셀 지옥에서 탈출하십시오."<br/>
                    매출 데이터를 던져주면, AI가 분석하고 시각화된 대시보드를 그려줍니다.
                    직관적인 데이터로 의사결정 하십시오.
                </p>
            </ProofText>
        </VisualProof>
      </Section>

      <Section>
        <SectionTitle><span> CURRICULUM </span></SectionTitle>
        <CurriculumItem>
            <h3>Week 1: Onboarding & Security</h3>
            <p>
                안전한 AI 환경 세팅 및 데이터 보안 교육 (필수)<br/>
                - OpenAI/Claude 계정 세팅 및 결제법<br/>
                - 내 회사 기밀을 지키는 '데이터 비식별화' 가이드
            </p>
        </CurriculumItem>
        <CurriculumItem>
            <h3>Week 2: The Secretary (김비서)</h3>
            <p>
                회의록 요약, 이메일 자동화 등 잡무 50% 단축<br/>
                - 녹음 파일만 던져주면 '액션 아이템'이 뽑히는 회의록 봇<br/>
                - 클레임 메일에 정중하게 거절하는 답장 3초 만에 쓰기
            </p>
        </CurriculumItem>
        <CurriculumItem>
            <h3>Week 3: The Creator (Visual & Video)</h3>
            <p>
                디자이너와 영상 편집자를 동시에 채용하는 효과<br/>
                - 미드저니/DALL-E로 브랜드 로고 및 패키지 디자인<br/>
                - Runway/Sora를 활용한 숏폼 홍보 영상 자동 생성
            </p>
        </CurriculumItem>
        <CurriculumItem>
            <h3>Week 4: The Marketer (최마케터)</h3>
            <p>
                블로그/스레드 포스팅 자동 생성 및 바이럴 전략<br/>
                - "이 상품 팔아줘"라고 말하면 나오는 세일즈 카피 10종<br/>
                - 조회수 터지는 썸네일 문구와 해시태그 추출
            </p>
        </CurriculumItem>
        <CurriculumItem>
            <h3>Week 5: The Analyst (정분석가)</h3>
            <p>
                엑셀 데이터 분석 및 시각화 리포트 자동화<br/>
                - 복잡한 매출 엑셀 파일 업로드 -> 인사이트 3줄 요약<br/>
                - "지난달 대비 왜 매출이 줄었어?" 질문에 답하는 차트
            </p>
        </CurriculumItem>
        <CurriculumItem>
            <h3>Week 6: Graduation</h3>
            <p>
                나만의 Custom GPT 봇 배포 및 수료<br/>
                - 우리 회사 매뉴얼을 학습한 '신입 사원 교육용 봇' 완성<br/>
                - 코딩 한 줄 없이 나만의 앱(App)처럼 배포하기
            </p>
        </CurriculumItem>
      </Section>

      <Section>
        <SectionTitle><span> APPLY NOW </span></SectionTitle>
        <InquiryForm />
      </Section>
    </Container>
  );
};

export default Academy;
