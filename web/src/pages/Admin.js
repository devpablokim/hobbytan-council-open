import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: #050505;
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  padding: 40px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  border-bottom: 1px solid #333;
  padding-bottom: 20px;
`;

const Title = styled.h1`
  color: #00f3ff;
  font-size: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #111;
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  background: #222;
  color: #aaa;
  font-weight: bold;
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #333;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #333;
  color: #ddd;
  font-size: 0.9rem;
`;

const Tr = styled.tr`
  &:hover {
    background: rgba(0, 243, 255, 0.05);
    cursor: pointer;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  background: ${props => props.status === 'new' ? '#00f3ff20' : '#444'};
  color: ${props => props.status === 'new' ? '#00f3ff' : '#aaa'};
  border: 1px solid ${props => props.status === 'new' ? '#00f3ff' : '#666'};
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
  border: 1px solid #444;
  padding: 30px;
  width: 500px;
  max-width: 90%;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0,0,0,0.5);
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 1.2rem;
  &:hover { color: #fff; }
`;

const DetailRow = styled.div`
  margin-bottom: 15px;
  label { display: block; color: #888; font-size: 0.8rem; margin-bottom: 5px; }
  div { color: #fff; white-space: pre-wrap; line-height: 1.5; }
`;

const Admin = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Allowed Admins
  const ADMIN_EMAILS = ['tanhyu.kim@gmail.com', 'devpablokim@gmail.com'];

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => {
        if (u) {
            if (ADMIN_EMAILS.includes(u.email)) {
                setUser(u);
            } else {
                alert("Access Denied: Admins Only");
                navigate('/');
            }
        } else {
            navigate('/'); // Redirect to login via home
        }
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const list = [];
      snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      setInquiries(list);
    });
    return () => unsub();
  }, [user]);

  if (!user) return null;

  return (
    <Container>
      <Header>
        <Title>INQUIRY DASHBOARD</Title>
        <div>Admin: {user.email}</div>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Name</Th>
            <Th>Industry</Th>
            <Th>Pain Point</Th>
            <Th>Contact</Th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map(item => (
            <Tr key={item.id} onClick={() => setSelected(item)}>
              <Td><StatusBadge status={item.status || 'new'}>{item.status || 'new'}</StatusBadge></Td>
              <Td>{item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : 'Pending...'}</Td>
              <Td>{item.name}</Td>
              <Td>{item.job}</Td>
              <Td>{item.painPoint}</Td>
              <Td>{item.contact}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>

      {selected && (
        <ModalOverlay onClick={() => setSelected(null)}>
            <ModalBox onClick={e => e.stopPropagation()}>
                <CloseBtn onClick={() => setSelected(null)}>×</CloseBtn>
                <h2 style={{marginTop:0, color:'#00f3ff'}}>Inquiry Details</h2>
                <DetailRow>
                    <label>Name</label>
                    <div>{selected.name}</div>
                </DetailRow>
                <DetailRow>
                    <label>Contact</label>
                    <div>{selected.contact}</div>
                </DetailRow>
                <DetailRow>
                    <label>Industry</label>
                    <div>{selected.job}</div>
                </DetailRow>
                <DetailRow>
                    <label>Pain Point</label>
                    <div>{selected.painPoint}</div>
                </DetailRow>
                <DetailRow>
                    <label>Message</label>
                    <div>{selected.message || '(No message)'}</div>
                </DetailRow>
                <DetailRow>
                    <label>Submitted At</label>
                    <div>{selected.createdAt?.toDate().toLocaleString()}</div>
                </DetailRow>
            </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Admin;
