// SolutionSection.js
import React from 'react';
import styled from 'styled-components';
import { Section, SectionTitle, Highlight } from './SharedStyles';

const WeekContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const WeekCard = styled.div`
  background: #111;
  border: 1px solid #333;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
  
  &:hover {
    border-color: #00f3ff;
    transform: translateX(10px);
    
    .week-header { background: rgba(0, 243, 255, 0.1); color: #00f3ff; }
  }
`;

const WeekHeader = styled.div`
  padding: 20px 30px;
  background: #1a1a1a;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 { margin: 0; font-size: 1.3rem; }
  span { color: #888; font-size: 0.9rem; }
`;

const WeekContent = styled.div`
  padding: 30px;
  color: #ccc;
  line-height: 1.6;
  
  ul { padding-left: 20px; margin-top: 15px; }
  li { margin-bottom: 10px; list-style-type: none; position: relative; }
  li::before { content: '✓'; color: #00f3ff; position: absolute; left: -20px; font-weight: bold; }
`;

const RoleBadge = styled.span`
  background: #333;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  margin-left: 10px;
  vertical-align: middle;
`;

const SolutionSection = () => {
    const curriculum = [
        {
            week: "Week 1",
            title: "Onboarding: AI 마인드셋 & 보안",
            desc: "AI를 처음 쓰는 분들을 위한 기초 세팅부터, 내 소중한 회사 정보를 지키는 보안 수칙까지.",
            details: [
                "OpenAI / Claude / Midjourney 계정 생성 및 최적화 세팅",
                "회사 기밀 유출을 막는 '데이터 비식별화' 가이드 (LEGAL-TAN 특강)",
                "AI와 대화하는 법: '개떡같이 말해도 찰떡같이 알아듣게' 만드는 프롬프트 공식"
            ]
        },
        {
            week: "Week 2",
            title: "The Secretary (김비서 채용)",
            desc: "잡무 시간 50% 단축. 이제 단순 반복 업무는 김비서에게 넘기세요.",
            details: [
                "녹음 파일만 던지면 '회의록 요약' + '할 일(Action Item)' 추출",
                "이메일 답장 자동화: 클레임 메일에 정중하게 사과하고 대안 제시하기",
                "PDF 문서 300페이지, 3초 만에 핵심 요약하기"
            ]
        },
        {
            week: "Week 3",
            title: "The Creator (박디자이너 채용)",
            desc: "디자인 감각 0점도 괜찮습니다. 말 한마디로 로고부터 패키지까지.",
            details: [
                "Midjourney V6 마스터: 텍스트로 300만원짜리 로고 만들기",
                "상세페이지용 제품 연출컷 생성 (스튜디오 촬영비 0원)",
                "Runway/Sora 활용: 텍스트만으로 우리 회사 홍보 영상 만들기"
            ]
        },
        {
            week: "Week 4",
            title: "The Marketer (최마케터 채용)",
            desc: "돈 버는 글쓰기. 24시간 잠들지 않는 카피라이터.",
            details: [
                "블로그 포스팅 자동화: 주제만 던지면 서론-본론-결론 완벽한 글 생성",
                "스레드/인스타 바이럴 치트키: 조회수 터지는 썸네일 문구 100개 뽑기",
                "랜딩 페이지 세일즈 카피: 고객의 지갑을 여는 설득의 심리학 적용"
            ]
        },
        {
            week: "Week 5",
            title: "The Analyst (정분석가 채용)",
            desc: "데이터는 거짓말하지 않습니다. 엑셀 지옥 탈출.",
            details: [
                "매출 데이터 엑셀 업로드 -> '이번 달 매출 하락 원인' 3초 만에 분석",
                "복잡한 데이터를 직관적인 차트와 그래프로 시각화",
                "경쟁사 리뷰 데이터 크롤링 & 분석으로 우리 제품 개선점 도출"
            ]
        },
        {
            week: "Week 6",
            title: "Graduation (나만의 시스템)",
            desc: "이제 당신은 혼자가 아닙니다. 나만의 AI 사단 완성.",
            details: [
                "Custom GPT 제작: 우리 회사 매뉴얼을 학습한 '신입 교육용 봇' 만들기",
                "No-Code 배포: 코딩 없이 나만의 AI 앱 만들어서 직원들에게 공유하기",
                "수료증 수여 및 졸업생 네트워킹 (VIP 커뮤니티 초대)"
            ]
        }
    ];

  return (
    <Section>
      <SectionTitle>커리큘럼: <Highlight>당신의 6주</Highlight></SectionTitle>
      <WeekContainer>
        {curriculum.map((c, i) => (
            <WeekCard key={i}>
                <WeekHeader className="week-header">
                    <h3>{c.week}: {c.title}</h3>
                    <RoleBadge>PRACTICAL</RoleBadge>
                </WeekHeader>
                <WeekContent>
                    <p style={{fontSize:'1.1rem', color:'#fff', marginBottom:'15px'}}>{c.desc}</p>
                    <ul>
                        {c.details.map((d, j) => <li key={j}>{d}</li>)}
                    </ul>
                </WeekContent>
            </WeekCard>
        ))}
      </WeekContainer>
    </Section>
  );
};

export default SolutionSection;
