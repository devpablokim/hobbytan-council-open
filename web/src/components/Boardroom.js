import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { TAN_PROFILES } from '../data/profiles';
import ProfileModal from './modals/ProfileModal';
import { createSparkle } from '../utils/effects';
import { db, auth } from '../firebase';
import FormattedText from './FormattedText';

// --- Styled Components (Copied from App.js) ---
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #050505;
    color: #e0e0e0;
    font-family: 'JetBrains Mono', monospace;
    margin: 0;
    overflow: hidden;
  }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #555; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
  background: rgba(5, 5, 5, 0.9);
  backdrop-filter: blur(10px);
  z-index: 10;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Brand = styled.h1`
  color: #00f3ff;
  font-size: 1.2rem;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 10px;
  &::before { content: '🏛️'; font-size: 1.5rem; }
  
  @media (max-width: 600px) {
    font-size: 1rem;
    &::before { font-size: 1.2rem; }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 0.9rem;
  
  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
    font-size: 0.8rem;
  }
`;

const ChatWindow = styled.div`
  flex: 1;
  padding: 15px; /* Reduced padding for mobile */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 100px; 
  width: 100%; /* Ensure full width */
  box-sizing: border-box; /* Include padding in width */
`;

const InputArea = styled.form`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 20px;
  padding-bottom: max(15px, env(safe-area-inset-bottom));
  background: rgba(5, 5, 5, 0.95);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 10px;
  backdrop-filter: blur(10px);
  z-index: 100;
`;

const StyledInput = styled.input`
  flex: 1;
  background: #111;
  border: 1px solid #333;
  color: #fff;
  padding: 12px 15px;
  border-radius: 6px;
  font-family: inherit;
  font-size: 16px; 
  min-width: 0;
  transition: all 0.2s;
  &:focus { outline: none; border-color: #00f3ff; box-shadow: 0 0 10px rgba(0, 243, 255, 0.2); }
`;

const SendButton = styled.button`
  background: #00f3ff;
  color: #000;
  border: none;
  padding: 0 20px;
  border-radius: 6px;
  font-family: inherit;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  &:hover { background: #00d2dd; transform: translateY(-1px); }
  &:disabled { background: #333; color: #555; cursor: not-allowed; transform: none; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MessageRow = styled.div`
  display: flex;
  gap: 10px; /* Reduced gap */
  animation: ${fadeIn} 0.3s ease-out;
  max-width: 100%; /* Allow full width of container */
  align-self: ${props => props.isMe ? 'flex-end' : 'flex-start'};
  /* Width constraints for bubble inside */
`;

const ProfileImg = styled.img`
  width: 40px; /* Smaller avatar on mobile */
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${props => props.color || '#444'};
  object-fit: cover;
  cursor: pointer;
  flex-shrink: 0; /* Don't shrink avatar */
  transition: transform 0.2s;
  &:hover { transform: scale(1.1); box-shadow: 0 0 15px ${props => props.color || '#444'}80; }
  
  @media (min-width: 600px) {
    width: 50px;
    height: 50px;
  }
`;

const MessageBubble = styled.div`
  background: ${props => props.isMe ? 'rgba(0, 243, 255, 0.1)' : 'rgba(20, 20, 20, 0.9)'};
  border: 1px solid ${props => props.isMe ? 'rgba(0, 243, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  padding: 12px;
  border-radius: 12px;
  border-top-left-radius: ${props => props.isMe ? '12px' : '0'};
  border-top-right-radius: ${props => props.isMe ? '0' : '12px'};
  position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  max-width: 75vw; /* explicit max width for bubble */
  word-break: break-word; /* Important for long URLs */
  
  @media (min-width: 600px) {
      max-width: 600px;
      padding: 15px;
  }
`;

const SpeakerName = styled.div`
  font-size: 0.75rem;
  color: ${props => props.color || '#aaa'};
  margin-bottom: 5px;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: #666;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
  &:hover { color: #888; }
`;

const ThinkingHeader = styled.div`
  cursor: pointer;
  font-size: 0.7rem;
  color: #555;
  padding: 4px 8px;
  border: 1px dashed #333;
  border-radius: 4px;
  margin-bottom: 8px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
  &:hover { color: #777; border-color: #555; background: rgba(255, 255, 255, 0.02); }
`;

const ThinkingContent = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: #777;
  padding: 10px;
  background: #0a0a0a;
  border-radius: 4px;
  white-space: pre-wrap;
  margin-bottom: 10px;
  border-left: 2px solid #333;
  line-height: 1.4;
`;

const ThinkingBlock = ({ content, label = "Process / System Log" }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ThinkingHeader onClick={() => setOpen(!open)}>
        <span>{open ? '▼' : '▶'}</span>
        <span>{label}</span>
      </ThinkingHeader>
      {open && <ThinkingContent>{content}</ThinkingContent>}
    </div>
  );
};

const LoadingBubble = styled.div`
  align-self: flex-start;
  background: rgba(20, 20, 20, 0.5);
  border: 1px dashed rgba(0, 243, 255, 0.3);
  padding: 10px 15px;
  border-radius: 8px;
  color: #00f3ff;
  font-size: 0.8rem;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: pulse 1.5s infinite;
  @keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
`;

const TAN_ROLES = {
  'PO-TAN': { color: '#007bff', img: '/assets/profiles/po.png' },
  'DEV-TAN': { color: '#28a745', img: '/assets/profiles/dev.png' },
  'UX-TAN': { color: '#e83e8c', img: '/assets/profiles/ux.png' },
  'HOST-TAN': { color: '#ffd700', img: '/assets/profiles/host.png' },
  'MARKETING-TAN': { color: '#6f42c1', img: '/assets/profiles/marketing.png' },
  'LEGAL-TAN': { color: '#ffc107', img: '/assets/profiles/legal.png' },
  'HR-TAN': { color: '#fd7e14', img: '/assets/profiles/hr.png' },
  'PM-TAN': { color: '#6c757d', img: '/assets/profiles/pm.png' },
  'BA-TAN': { color: '#17a2b8', img: '/assets/profiles/ba.png' },
  'CS-TAN': { color: '#20c997', img: '/assets/profiles/cs.png' },
  'QA-TAN': { color: '#dc3545', img: '/assets/profiles/qa.png' },
  'RESEARCHER-TAN': { color: '#6610f2', img: '/assets/profiles/researcher.png' },
  'ATTENDANT-TAN': { color: '#f8f9fa', img: '/assets/profiles/attendant.png' },
  'DEO-TAN': { color: '#ffffff', img: '/assets/profiles/ceo.png' },
  'CEO': { color: '#00f3ff', img: 'USER_AVATAR' },
  'USER': { color: '#00f3ff', img: 'USER_AVATAR' },
};

const normalizeSpeaker = (name) => {
  if (!name) return 'DEO-TAN';
  let clean = name.trim();
  if (clean.includes('수행원')) return 'HOST-TAN';
  if (clean === 'CEO' || clean === '대표님' || clean === 'HOBBY') return 'CEO';
  if (!clean.includes('-') && clean.endsWith('TAN')) {
    clean = clean.replace('TAN', '-TAN');
  }
  return clean.toUpperCase();
};

const parseLogMessage = (text, defaultSpeaker) => {
  const hasStructure = /\[(생각|답변|Thought|Answer)\]/.test(text);
  if (!hasStructure) return [{ type: 'dialogue', speaker: normalizeSpeaker(defaultSpeaker), content: text }];
  const lines = text.split('\n');
  const segments = [];
  let currentSpeaker = normalizeSpeaker(defaultSpeaker);
  let currentBuffer = [];
  let currentType = 'system'; 

  const flush = (nextType, nextSpeaker) => {
    if (currentBuffer.length > 0) {
      const content = currentBuffer.join('\n').trim();
      if (content) segments.push({ type: currentType, speaker: currentSpeaker, content: content });
    }
    currentBuffer = [];
    if (nextType) currentType = nextType;
    if (nextSpeaker) currentSpeaker = nextSpeaker;
  };

  for (let line of lines) {
    const tsMatch = line.match(/^(\d{4}-\d{2}-\d{2})?\s*(\d{2}:\d{2}:\d{2})?\s*\[([^\]]+)\]/);
    if (tsMatch) { flush('system', normalizeSpeaker(tsMatch[3])); currentBuffer.push(line); continue; }
    const thMatch = line.match(/^\s*-\s*\[(생각|Thought|Thinking)\]\s*[:;]?\s*(.*)/i);
    if (thMatch) { flush('thought'); currentBuffer.push(thMatch[2]); continue; }
    const ansMatch = line.match(/^\s*-\s*\[(답변|Answer|Reply)\]\s*[:;]?\s*(.*)/i);
    if (ansMatch) { flush('dialogue'); currentBuffer.push(ansMatch[2]); continue; }
    currentBuffer.push(line);
  }
  flush();
  return segments;
};

// --- Component ---
const Boardroom = () => {
  const { projectId } = useParams(); // internal_aijossi or others
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isConvening, setIsConvening] = useState(false);
  const bottomRef = useRef(null);
  
  // firestoreClientId mapping
  const firestoreClientId = projectId === 'headquarter' ? 'internal_aijossi' : projectId;

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub();
  }, []);

  // Micro-Interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
       if (Math.random() > 0.9) { 
           document.documentElement.style.setProperty('--tx', `${(Math.random() - 0.5) * 50}px`);
           document.documentElement.style.setProperty('--ty', `${(Math.random() - 0.5) * 50}px`);
           createSparkle(e);
       }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Listen to Logs & User Inputs (Merged)
  useEffect(() => {
    if (!user || !firestoreClientId) return;
    
    // Listen to ALL chronicles for this client, not just today
    const qLogs = collection(db, 'clients', firestoreClientId, 'chronicles');
    
    let currentLogs = [];
    let currentInputs = [];

    const updateMerged = () => {
        // Flatten all chronicles
        const allLogSegments = currentLogs.flatMap(docData => docData.logs || []);
        
        const normLogs = allLogSegments.map(l => ({ ...l, source: 'council', sortTime: l.timestamp }));
        const normInputs = currentInputs.map(i => ({
            type: 'dialogue',
            speaker: 'CEO', 
            message: i.message,
            source: 'input',
            sortTime: i.timestamp?.toDate ? i.timestamp.toDate().toISOString() : new Date().toISOString(),
            content: i.message
        }));

        const merged = [...normLogs, ...normInputs].sort((a, b) => a.sortTime.localeCompare(b.sortTime));
        
        if (merged.length > 0) {
             const lastMsg = merged[merged.length - 1];
             if (lastMsg.source === 'council') {
                 setIsConvening(false);
             }
        }
        
        setLogs(merged);
    };

    const unsub1 = onSnapshot(qLogs, (snapshot) => {
        currentLogs = [];
        snapshot.forEach(doc => currentLogs.push(doc.data()));
        updateMerged();
    });

    const qInputs = collection(db, 'clients', firestoreClientId, 'user_inputs');
    const unsub2 = onSnapshot(qInputs, (snapshot) => {
        currentInputs = [];
        snapshot.forEach(doc => currentInputs.push(doc.data()));
        updateMerged();
    });

    return () => { unsub1(); unsub2(); };
  }, [user, firestoreClientId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, isConvening]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !user) return;
    const message = inputText.trim();
    setInputText('');
    setIsConvening(true);

    try {
        await addDoc(collection(db, 'clients', firestoreClientId, 'user_inputs'), {
            message: message,
            sender: 'CEO',
            uid: user.uid,
            timestamp: serverTimestamp(),
            processed: false
        });
    } catch (err) {
        console.error("Failed to send:", err);
        alert(`Transmission Error: ${err.message}`);
        setIsConvening(false);
    }
  };

  const handleProfileClick = (speaker, imgSrc) => {
      let profile = TAN_PROFILES[speaker];
      if (!profile) {
          if (speaker === 'CEO') {
             profile = TAN_PROFILES['CEO'];
             profile.imgSrc = imgSrc;
          } else {
             profile = {
                 name: speaker,
                 role: 'Council Member',
                 desc: 'A member of the Hobbytan Council.',
                 traits: ['Unknown'],
                 color: '#aaa',
                 imgSrc: imgSrc
             };
          }
      } else {
          profile.imgSrc = imgSrc;
      }
      setSelectedProfile(profile);
  };

  const visualSegments = [];
  logs.forEach((log) => {
    if (log.source === 'input') {
        visualSegments.push(log);
    } else {
        const parsed = parseLogMessage(log.message, log.speaker);
        visualSegments.push(...parsed);
    }
  });

  return (
    <Container>
      <GlobalStyle />
      {selectedProfile && <ProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />}
      <Header>
        <Brand>BOARDROOM: {projectId.toUpperCase()}</Brand>
        {user ? (
          <UserInfo>
            <span>{user.displayName} (CEO)</span>
            <LogoutButton onClick={() => signOut(auth)}>Log Out</LogoutButton>
          </UserInfo>
        ) : null}
      </Header>

      <ChatWindow>
        {visualSegments.map((segment, idx) => {
          const roleData = TAN_ROLES[segment.speaker] || TAN_ROLES['ATTENDANT-TAN'];
          let imgSrc = roleData.img;
          if (segment.speaker === 'CEO') imgSrc = user?.photoURL;
          else if (imgSrc && imgSrc.startsWith('/')) imgSrc = `https://raw.githubusercontent.com/devpablokim/hobbytan-council-open/main/docs${roleData.img}`;

          const isMe = segment.speaker === 'CEO';
          const content = segment.content || segment.message;

          if (segment.type === 'thought' || segment.type === 'system') {
            return (
              <div key={idx} style={{ alignSelf: 'stretch', padding: '0 20px' }}>
                <ThinkingBlock content={segment.content} label={segment.type === 'thought' ? `${segment.speaker} is thinking...` : `System Log / Context (${segment.speaker})`} />
              </div>
            );
          }
          return (
            <MessageRow key={idx} isMe={isMe}>
              {!isMe && <ProfileImg src={imgSrc} color={roleData.color} onClick={() => handleProfileClick(segment.speaker, imgSrc)} />}
              <MessageBubble isMe={isMe}>
                <SpeakerName color={isMe ? '#00f3ff' : roleData.color}>{segment.speaker}</SpeakerName>
                <FormattedText text={content} />
              </MessageBubble>
              {isMe && <ProfileImg src={imgSrc} color={roleData.color} onClick={() => handleProfileClick('CEO', imgSrc)} />}
            </MessageRow>
          );
        })}
        
        {isConvening && (
            <LoadingBubble>
                <span>🏛️</span>
                <span>TAN 의회가 소집 중입니다... (Processing Directive)</span>
            </LoadingBubble>
        )}
        
        <div ref={bottomRef} />
      </ChatWindow>

      {user && (
        <InputArea onSubmit={handleSend}>
            <StyledInput value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Issue directive to Council..." autoFocus />
            <SendButton type="submit" disabled={!inputText.trim()}>TRANSMIT</SendButton>
        </InputArea>
      )}
    </Container>
  );
};

export default Boardroom;
