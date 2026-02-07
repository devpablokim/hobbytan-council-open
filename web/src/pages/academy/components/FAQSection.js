// FAQSection.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Section, SectionTitle, Highlight } from './SharedStyles';

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Question = styled.div`
  background: #111;
  border: 1px solid #333;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover { background: #1a1a1a; }
  
  span { font-weight: bold; color: #eee; }
  .icon { color: #00f3ff; }
`;

const Answer = styled.div`
  background: #0a0a0a;
  padding: 20px;
  color: #aaa;
  line-height: 1.6;
  border-left: 2px solid #00f3ff;
  margin-bottom: 20px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(null);
  
  const faqs = [
    { q: "AI를 한 번도 써본 적 없는데 괜찮나요?", a: "네, 괜찮습니다. Week 1에서 계정 가입부터 기초 세팅까지 전부 알려드립니다. '왕초보 전용 질문방'도 따로 운영되니 걱정 마세요." },
    { q: "수업을 놓치면 어떻게 하나요?", a: "모든 수업은 녹화되어 '무제한 다시보기'가 제공됩니다. 바쁜 사장님들을 위해 핵심만 요약한 노트도 매주 드립니다." },
    { q: "환불 규정이 궁금합니다.", a: "수업 시작 7일 전까지 100% 환불 가능합니다. 수업 시작 후에는 '디지털 콘텐츠법'에 따라 진행된 회차를 제외하고 환불됩니다." },
    { q: "과제는 시간이 많이 걸리나요?", a: "아니요. 하루 30분이면 충분하도록 설계했습니다. 바쁜 사장님들의 시간을 뺏지 않는 것이 저희의 목표입니다." },
    { q: "미드저니 등 툴 결제는 별도인가요?", a: "네, 실습을 위해 월 3~4만원 정도의 툴 구독료가 발생할 수 있습니다. 이는 사업을 위한 최소한의 투자라고 생각해주세요." }
  ];

  const toggle = (i) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <Section>
      <SectionTitle>자주 묻는 질문 (<Highlight>FAQ</Highlight>)</SectionTitle>
      <FAQContainer>
        {faqs.map((f, i) => (
            <div key={i}>
                <Question onClick={() => toggle(i)}>
                    <span>Q. {f.q}</span>
                    <span className="icon">{openIdx === i ? '-' : '+'}</span>
                </Question>
                <Answer isOpen={openIdx === i}>
                    A. {f.a}
                </Answer>
            </div>
        ))}
      </FAQContainer>
    </Section>
  );
};

export default FAQSection;
