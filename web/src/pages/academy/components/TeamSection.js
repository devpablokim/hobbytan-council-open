// TeamSection.js
import React from 'react';
import styled from 'styled-components';
import { Section, SectionTitle, Highlight } from './SharedStyles';
import { TAN_PROFILES } from '../../../data/profiles';

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const MemberCard = styled.div`
  background: #111;
  border: 1px solid #333;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-10px);
    border-color: ${props => props.color};
    box-shadow: 0 0 20px ${props => props.color}40;
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid ${props => props.color};
  margin-bottom: 20px;
  object-fit: cover;
`;

const Name = styled.h3`
  color: ${props => props.color};
  margin-bottom: 5px;
  font-size: 1.2rem;
`;

const Role = styled.div`
  color: #888;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;
`;

const Desc = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const TeamSection = () => {
  // Filter only main TANs
  const mainTans = ['DEO-TAN', 'PO-TAN', 'MKT-TAN', 'UX-TAN', 'DEV-TAN', 'LEGAL-TAN'];
  
  return (
    <Section>
      <SectionTitle>13명의 <Highlight>천재 이사회</Highlight></SectionTitle>
      <p style={{textAlign:'center', color:'#aaa', marginBottom:'50px', fontSize:'1.1rem'}}>
        당신이 잠든 사이에도, 이들은 당신의 사업을 고민합니다.<br/>
        인간 강사는 퇴근하지만, AI TAN은 24시간 대기 중입니다.
      </p>
      
      <TeamGrid>
        {mainTans.map(key => {
            const p = TAN_PROFILES[key];
            // Use safe absolute path or local asset if possible. 
            // Here we use the raw github url which should work if the repo is public.
            // But if it fails, the image might break. 
            // Let's add a fallback or ensure the URL is correct.
            // The previous code had a potential issue with double slashes or missing base.
            // Let's use a safe placeholder or the correct raw URL.
            // Assuming docs/assets/profiles_v2/ exists in main branch.
            const imgSrc = p.img.startsWith('/') 
                ? `https://raw.githubusercontent.com/devpablokim/hobbytan-council-open/main/docs${p.img}` 
                : p.img;
            
            return (
                <MemberCard key={key} color={p.color}>
                    <Avatar src={imgSrc} color={p.color} onError={(e) => {e.target.src = 'https://via.placeholder.com/100'}} />
                    <Name color={p.color}>{p.name}</Name>
                    <Role>{p.role}</Role>
                    <Desc>{p.desc}</Desc>
                </MemberCard>
            );
        })}
      </TeamGrid>
    </Section>
  );
};

export default TeamSection;
