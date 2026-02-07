// BonusSection.js
import React from 'react';
import styled from 'styled-components';
import { Section, SectionTitle, Highlight } from './SharedStyles';

const BonusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const BonusCard = styled.div`
  background: linear-gradient(135deg, #222, #111);
  border: 1px solid #444;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: 'BONUS';
    position: absolute;
    top: 10px; right: -30px;
    background: #ff0055;
    color: #fff;
    padding: 5px 30px;
    transform: rotate(45deg);
    font-size: 0.7rem;
    font-weight: bold;
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Value = styled.div`
  color: #888;
  text-decoration: line-through;
  font-size: 0.9rem;
  margin-top: 10px;
`;

const BonusSection = () => {
  return (
    <Section>
      <SectionTitle>강의보다 비싼 <Highlight>무료 혜택</Highlight></SectionTitle>
      
      <BonusGrid>
        <BonusCard>
            <Icon>📚</Icon>
            <h3>표준 매뉴얼 템플릿 100종</h3>
            <p>빈칸만 채우면 완성되는 업종별(쇼핑몰, 요식업 등) CS/운영 매뉴얼 PDF.</p>
            <Value>판매가 200,000원 상당</Value>
        </BonusCard>
        
        <BonusCard>
            <Icon>🤖</Icon>
            <h3>Custom GPTs 5종</h3>
            <p>로고 생성기, 카피라이터, 엑셀 분석기 등 수업에 쓰이는 전용 봇 링크 제공.</p>
            <Value>판매가 150,000원 상당</Value>
        </BonusCard>
        
        <BonusCard>
            <Icon>💎</Icon>
            <h3>TAN Council 평생 회원권</h3>
            <p>수료 후에도 질문할 수 있는 VIP 커뮤니티 초대 & 월간 뉴스레터 발송.</p>
            <Value>Priceless</Value>
        </BonusCard>
      </BonusGrid>
    </Section>
  );
};

export default BonusSection;
