// ProblemSection.js
import React from 'react';
import styled from 'styled-components';
import { Section, SectionTitle, Highlight } from './SharedStyles';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const TextBox = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
  color: #ccc;
  
  p { margin-bottom: 20px; }
  strong { color: #fff; font-size: 1.2rem; }
`;

const QuoteBox = styled.div`
  background: #111;
  border-left: 4px solid #555;
  padding: 30px;
  font-style: italic;
  color: #888;
  position: relative;
  
  &::before {
    content: '"';
    font-size: 4rem;
    color: #333;
    position: absolute;
    top: -10px;
    left: 10px;
  }
`;

const ProblemSection = () => {
  return (
    <Section>
      <SectionTitle>아직도 <Highlight>혼자</Highlight> 야근하십니까?</SectionTitle>
      
      <Grid>
        <QuoteBox>
            "직원 한 명 뽑으려면 인건비 300만원...<br/>
            외주 맡기면 퀄리티는 엉망이고 기한은 늦고...<br/>
            결국 내가 다 다시 해야 해.<br/>
            <strong>나는 사장인데, 왜 잡무만 하고 있지?</strong>"
        </QuoteBox>
        
        <TextBox>
            <p>
                <strong>당신의 시간은 1초에 100원짜리가 아닙니다.</strong><br/>
                하지만 현실은 어떤가요? 영수증 정리, 블로그 글쓰기, 상세페이지 수정...
                누구나 할 수 있는 일에 당신의 귀한 에너지를 낭비하고 있습니다.
            </p>
            <p>
                남들은 AI로 퇴근 시간을 3시간 당기고, 매출을 2배로 올리는데
                나만 제자리걸음인 것 같아 불안하지 않으신가요?
            </p>
            <p>
                <Highlight>그 불안감, 저희가 끝내드리겠습니다.</Highlight><br/>
                이제 당신에게는 13명의 천재 AI 직원이 생깁니다.
            </p>
        </TextBox>
      </Grid>
    </Section>
  );
};

export default ProblemSection;
