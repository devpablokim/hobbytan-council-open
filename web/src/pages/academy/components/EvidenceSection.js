// EvidenceSection.js
import React from 'react';
import styled from 'styled-components';
import { Section, SectionTitle, Highlight } from './SharedStyles';

const EvidenceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const EvidenceItem = styled.div`
  background: #111;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #333;
`;

const ImageContainer = styled.div`
  height: 300px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '${props => props.tag}';
    position: absolute;
    top: 20px; left: 20px;
    background: #00f3ff;
    color: #000;
    padding: 5px 10px;
    font-weight: bold;
    font-size: 0.8rem;
    border-radius: 4px;
  }
`;

const TextContainer = styled.div`
  padding: 25px;
  
  h3 { color: #fff; margin-bottom: 10px; }
  p { color: #aaa; line-height: 1.5; font-size: 0.9rem; }
  .time { color: #00f3ff; font-weight: bold; margin-top: 10px; display: block; }
`;

const EvidenceSection = () => {
  return (
    <Section>
      <SectionTitle>말뿐인 강의는 <Highlight>사기</Highlight>입니다.</SectionTitle>
      <p style={{textAlign:'center', marginBottom:'50px', color:'#ccc'}}>
          우리는 결과물로 증명합니다. 
          이 모든 것이 당신의 손끝에서 탄생합니다.
      </p>
      
      <EvidenceGrid>
        <EvidenceItem>
            <ImageContainer src="https://fastly.picsum.photos/id/1078/800/600.jpg?hmac=wjHqEaMNcWV3q0v7VkJZJOxdXjfS-OqEvdQrLrpP5zE" tag="WEEK 3 결과물" />
            <TextContainer>
                <h3>High-End Brand Logo</h3>
                <p>
                    디자인 툴 하나도 모르는 수강생이 만든 커피 브랜드 로고입니다.
                    미드저니 프롬프트 단 4줄로 생성되었습니다.
                </p>
                <span className="time">소요 시간: 3분</span>
            </TextContainer>
        </EvidenceItem>
        
        <EvidenceItem>
            <ImageContainer src="https://fastly.picsum.photos/id/296/1200/600.jpg?hmac=LPkjWwfu_4vFih3p8L_Q4OtlFWxB5ZmMdS_iEJlbKxk" tag="WEEK 5 결과물" />
            <TextContainer>
                <h3>Automated Sales Dashboard</h3>
                <p>
                    매일 아침 엑셀 켜서 복붙하던 매출 집계, 이제 그만하세요.
                    데이터만 넣으면 AI가 분석 리포트까지 써줍니다.
                </p>
                <span className="time">소요 시간: 1분 (자동화)</span>
            </TextContainer>
        </EvidenceItem>
      </EvidenceGrid>
    </Section>
  );
};

export default EvidenceSection;
