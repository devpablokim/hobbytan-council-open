import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalCard = styled.div`
  background: #111;
  border: 1px solid ${props => props.color || '#444'};
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  padding: 30px;
  position: relative;
  box-shadow: 0 0 30px ${props => props.color || '#444'}40;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover { color: #fff; }
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid ${props => props.color || '#444'};
  margin-bottom: 20px;
  object-fit: cover;
`;

const Name = styled.h2`
  color: ${props => props.color || '#fff'};
  margin: 0 0 5px 0;
  font-size: 1.5rem;
`;

const Role = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Desc = styled.p`
  color: #ccc;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 20px;
`;

const TraitsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

const TraitTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #aaa;
  border: 1px solid #333;
`;

const ProfileModal = ({ profile, onClose }) => {
  if (!profile) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalCard color={profile.color} onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ProfileImage src={profile.imgSrc} color={profile.color} />
        <Name color={profile.color}>{profile.name}</Name>
        <Role>{profile.role}</Role>
        <Desc>{profile.desc}</Desc>
        <TraitsContainer>
          {profile.traits && profile.traits.map((t, i) => (
            <TraitTag key={i}>{t}</TraitTag>
          ))}
        </TraitsContainer>
      </ModalCard>
    </Overlay>
  );
};

export default ProfileModal;
