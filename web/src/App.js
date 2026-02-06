import React, { useEffect, useState, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// --- Firebase Config (To be filled by user) ---
const firebaseConfig = {
  // TODO: Add your Firebase config here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- Styled Components ---
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #050505;
    color: #e0e0e0;
    font-family: 'JetBrains Mono', monospace;
    margin: 0;
    overflow: hidden;
  }
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
  padding: 20px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.2);
`;

const Brand = styled.h1`
  color: #00f3ff;
  font-size: 1.5rem;
  margin: 0;
  text-shadow: 0 0 10px #00f3ff;
`;

const ChatWindow = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MessageRow = styled.div`
  display: flex;
  gap: 15px;
  animation: ${fadeIn} 0.5s ease-out;
  max-width: 80%;
  align-self: ${props => props.isMe ? 'flex-end' : 'flex-start'};
`;

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${props => props.color || '#444'};
`;

const MessageBubble = styled.div`
  background: rgba(20, 20, 20, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  position: relative;
`;

const SpeakerName = styled.div`
  font-size: 0.8rem;
  color: ${props => props.color || '#aaa'};
  margin-bottom: 5px;
  font-weight: bold;
`;

const LoginButton = styled.button`
  background: #00f3ff;
  border: none;
  padding: 10px 20px;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background: #00d2dd;
  }
`;

// --- Role Colors & Images Mapping (Mock) ---
const TAN_ROLES = {
  'PO-TAN': { color: '#007bff', img: '/assets/profiles/po.png' },
  'DEV-TAN': { color: '#28a745', img: '/assets/profiles/dev.png' },
  'UX-TAN': { color: '#e83e8c', img: '/assets/profiles/ux.png' },
  'HOST-TAN': { color: '#ffd700', img: '/assets/profiles/host.png' },
  // ... Add others
};

// --- App Component ---
function App() {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const bottomRef = useRef(null);

  const login = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  };

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    if (!user) return;
    
    // Multi-tenancy: In production, get clientId from user profile claim
    const clientId = 'internal_aijossi'; // Default for MVP
    const today = new Date().toISOString().split('T')[0];

    const unsub = onSnapshot(doc(db, 'clients', clientId, 'chronicles', today), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.logs) {
          setLogs(data.logs);
        }
      }
    });

    return () => unsub();
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <Container>
      <GlobalStyle />
      <Header>
        <Brand>HOBBYTAN-COUNCIL: THE BOARDROOM</Brand>
        {user ? (
          <div>{user.displayName} (Connected)</div>
        ) : (
          <LoginButton onClick={login}>ACCESS BOARDROOM (Google Login)</LoginButton>
        )}
      </Header>

      <ChatWindow>
        {user && logs.map((log, idx) => {
          const roleData = TAN_ROLES[log.speaker] || { color: '#aaa', img: '' };
          return (
            <MessageRow key={idx}>
              <ProfileImg src={roleData.img} color={roleData.color} />
              <MessageBubble>
                <SpeakerName color={roleData.color}>{log.speaker}</SpeakerName>
                {log.message}
              </MessageBubble>
            </MessageRow>
          );
        })}
        <div ref={bottomRef} />
      </ChatWindow>
    </Container>
  );
}

export default App;
