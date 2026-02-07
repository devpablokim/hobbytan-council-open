import React, { useState } from 'react';
import styled from 'styled-components';
import { getFirestore, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure firebase is initialized

const FormContainer = styled.div`
  max-width: 600px;
  margin: 60px auto;
  background: #111;
  border: 1px solid #333;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
`;

const FormTitle = styled.h3`
  color: #fff;
  margin-bottom: 20px;
  border-bottom: 2px solid #00f3ff;
  display: inline-block;
  padding-bottom: 5px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: #ccc;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  background: #0a0a0a;
  border: 1px solid #444;
  color: #fff;
  padding: 12px;
  border-radius: 4px;
  font-family: inherit;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #00f3ff;
  }
`;

const Select = styled.select`
  width: 100%;
  background: #0a0a0a;
  border: 1px solid #444;
  color: #fff;
  padding: 12px;
  border-radius: 4px;
  font-family: inherit;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  background: #0a0a0a;
  border: 1px solid #444;
  color: #fff;
  padding: 12px;
  border-radius: 4px;
  font-family: inherit;
  min-height: 100px;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #00f3ff;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #00f3ff;
  color: #000;
  border: none;
  padding: 15px;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #fff;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #333;
    color: #666;
    cursor: not-allowed;
  }
`;

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    job: 'other',
    painPoint: 'time',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) {
      alert("이름과 연락처는 필수입니다.");
      return;
    }
    
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setStatus('success');
      alert("문의가 접수되었습니다. AI Council이 곧 분석을 시작합니다.");
      setFormData({ name: '', contact: '', job: 'other', painPoint: 'time', message: '' });
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus('error');
      alert("접수 실패. 잠시 후 다시 시도해주세요.");
    } finally {
        if(status !== 'error') setStatus('idle');
    }
  };

  return (
    <FormContainer id="inquiry-form">
      <FormTitle>Request AI Consultation</FormTitle>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>이름 (Name)</Label>
          <Input name="name" value={formData.name} onChange={handleChange} placeholder="홍길동" />
        </InputGroup>
        <InputGroup>
          <Label>연락처 (Email or Phone)</Label>
          <Input name="contact" value={formData.contact} onChange={handleChange} placeholder="010-1234-5678" />
        </InputGroup>
        <InputGroup>
          <Label>현재 업종 (Industry)</Label>
          <Select name="job" value={formData.job} onChange={handleChange}>
            <option value="other">기타 / 예비창업</option>
            <option value="ecommerce">쇼핑몰 / 유통</option>
            <option value="fnb">요식업 / 카페</option>
            <option value="edu">교육 / 학원</option>
            <option value="freelancer">프리랜서 / 전문직</option>
          </Select>
        </InputGroup>
        <InputGroup>
          <Label>가장 큰 고민 (Pain Point)</Label>
          <Select name="painPoint" value={formData.painPoint} onChange={handleChange}>
            <option value="time">시간이 너무 부족합니다 (잡무 자동화)</option>
            <option value="design">디자인 감각이 없어서 퀄리티가 낮아요</option>
            <option value="marketing">글쓰기/마케팅이 너무 힘들어요</option>
            <option value="data">매출 데이터 분석을 못하겠어요</option>
          </Select>
        </InputGroup>
        <InputGroup>
          <Label>추가 문의사항 (Message)</Label>
          <TextArea name="message" value={formData.message} onChange={handleChange} placeholder="궁금한 점을 자유롭게 적어주세요." />
        </InputGroup>
        <SubmitButton type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'TRANSMITTING...' : 'SEND INQUIRY'}
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default InquiryForm;
