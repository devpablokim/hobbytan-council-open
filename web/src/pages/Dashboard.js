import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import styled from 'styled-components';
import { db, auth } from '../firebase';

const Container = styled.div`
  min-height: 100vh;
  background: #050505;
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  border-bottom: 1px solid #333;
  padding-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  color: #00f3ff;
  font-size: 1.5rem;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.3);
`;

const LogoutBtn = styled.button`
  background: transparent;
  border: 1px solid #333;
  color: #666;
  padding: 8px 16px;
  cursor: pointer;
  &:hover { border-color: #666; color: #fff; }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
`;

const ProjectCard = styled.div`
  background: #111;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    border-color: #00f3ff;
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const ProjectName = styled.h3`
  margin: 0;
  color: #eee;
`;

const ProjectId = styled.span`
  font-size: 0.7rem;
  color: #555;
`;

const CreateCard = styled(ProjectCard)`
  border-style: dashed;
  justify-content: center;
  align-items: center;
  background: rgba(0, 243, 255, 0.02);
  
  &:hover {
    background: rgba(0, 243, 255, 0.05);
  }
`;

const CreateIcon = styled.div`
  font-size: 2rem;
  color: #00f3ff;
  margin-bottom: 10px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #111;
  border: 1px solid #00f3ff;
  padding: 30px;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0, 243, 255, 0.2);
`;

const Input = styled.input`
  width: 100%;
  background: #000;
  border: 1px solid #333;
  color: #fff;
  padding: 10px;
  margin: 15px 0;
  font-family: inherit;
  &:focus { outline: none; border-color: #00f3ff; }
`;

const Button = styled.button`
  background: #00f3ff;
  color: #000;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  &:hover { background: #00d2dd; }
`;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
        if (!u) navigate('/');
        setUser(u);
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    // Query user's projects
    const q = query(collection(db, 'users', user.uid, 'projects'));
    const unsub = onSnapshot(q, (snapshot) => {
      const p = [];
      snapshot.forEach(doc => p.push({ id: doc.id, ...doc.data() }));
      setProjects(p);
    });
    return () => unsub();
  }, [user]);

  const handleCreate = async () => {
    if (!newProjectName.trim() || !user) return;
    try {
        // Create project ref in user's collection
        // 1. Create a doc to get ID
        const projectRef = await addDoc(collection(db, 'users', user.uid, 'projects'), {
            name: newProjectName,
            createdAt: serverTimestamp(),
            owner: user.uid
        });
        
        // 2. Initialize the "Client" collection for this project (optional, or just navigate)
        // We navigate to the boardroom with this ID.
        setShowCreate(false);
        navigate(`/boardroom/${projectRef.id}`);
    } catch (e) {
        console.error(e);
        alert('Failed to create project');
    }
  };

  return (
    <Container>
      <Header>
        <Title>COUNCIL DASHBOARD</Title>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span>{user?.displayName}</span>
            <LogoutBtn onClick={() => signOut(auth)}>LOGOUT</LogoutBtn>
        </div>
      </Header>

      <ProjectGrid>
        {/* Headquarter Card (Static for Admin/Demo) */}
        <ProjectCard onClick={() => navigate('/boardroom/headquarter')}>
            <ProjectName>HEADQUARTER</ProjectName>
            <ProjectId>internal_aijossi</ProjectId>
            <div style={{ marginTop: 'auto', color: '#00f3ff', fontSize: '0.8rem' }}>OFFICIAL</div>
        </ProjectCard>

        {projects.map(p => (
            <ProjectCard key={p.id} onClick={() => navigate(`/boardroom/${p.id}`)}>
                <ProjectName>{p.name}</ProjectName>
                <ProjectId>{p.id}</ProjectId>
                <div style={{ marginTop: 'auto', color: '#888', fontSize: '0.8rem' }}>PRIVATE COUNCIL</div>
            </ProjectCard>
        ))}

        <CreateCard onClick={() => setShowCreate(true)}>
            <CreateIcon>+</CreateIcon>
            <div>ESTABLISH NEW COUNCIL</div>
        </CreateCard>
      </ProjectGrid>

      {showCreate && (
        <ModalOverlay onClick={() => setShowCreate(false)}>
            <ModalBox onClick={e => e.stopPropagation()}>
                <h2 style={{ marginTop: 0 }}>Establish Council</h2>
                <p style={{ color: '#888', fontSize: '0.9rem' }}>Enter the name of your new organization.</p>
                <Input 
                    placeholder="Project Name (e.g. Project Alpha)" 
                    value={newProjectName}
                    onChange={e => setNewProjectName(e.target.value)}
                    autoFocus
                />
                <Button onClick={handleCreate}>INITIALIZE</Button>
            </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Dashboard;
