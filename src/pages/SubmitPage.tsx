import { useState } from 'react';
import type { AssignmentType } from '../types';
import { curriculum } from '../data/mockData';

export function SubmitPage() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [submitType, setSubmitType] = useState<AssignmentType>('text');
  const [textContent, setTextContent] = useState('');
  const [linkContent, setLinkContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cur = curriculum.find(c => c.weekNumber === selectedWeek);
  const assignments = cur?.assignments || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">과제 제출</h1>

      {submitted && (
        <div className="mb-4 bg-emerald-100 text-emerald-700 px-4 py-3 rounded-lg">✅ 과제가 제출되었습니다!</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl">
        {/* Week Select */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">주차 선택</label>
          <select value={selectedWeek} onChange={e => { setSelectedWeek(Number(e.target.value)); setSelectedAssignment(''); }} className="w-full border rounded-lg px-3 py-2 text-sm">
            {[0,1,2,3,4,5].map(w => <option key={w} value={w}>{w}주차 — {curriculum[w]?.title}</option>)}
          </select>
        </div>

        {/* Assignment Select */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">과제 선택</label>
          <select value={selectedAssignment} onChange={e => { setSelectedAssignment(e.target.value); const a = assignments.find(x => x.assignmentId === e.target.value); if (a) setSubmitType(a.type); }} className="w-full border rounded-lg px-3 py-2 text-sm">
            <option value="">과제를 선택하세요</option>
            {assignments.map(a => <option key={a.assignmentId} value={a.assignmentId}>{a.title} ({a.type === 'file' ? '파일' : a.type === 'text' ? '텍스트' : '링크'})</option>)}
          </select>
        </div>

        {/* Type Indicator */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">제출 유형</label>
          <div className="flex gap-2">
            {(['file', 'text', 'link'] as const).map(t => (
              <button key={t} type="button" onClick={() => setSubmitType(t)} className={`px-4 py-2 rounded-lg text-sm ${submitType === t ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {t === 'file' ? '📎 파일' : t === 'text' ? '✏️ 텍스트' : '🔗 링크'}
              </button>
            ))}
          </div>
        </div>

        {/* Content Input */}
        {submitType === 'text' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">내용 작성</label>
            <textarea value={textContent} onChange={e => setTextContent(e.target.value)} rows={6} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="과제 내용을 작성하세요..." />
          </div>
        )}

        {submitType === 'file' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">파일 업로드</label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center text-gray-400">
              <div className="text-4xl mb-2">📁</div>
              <p className="text-sm">파일을 드래그하거나 클릭하여 업로드</p>
              <p className="text-xs mt-1">PDF, DOCX, PPTX, 이미지 (최대 10MB)</p>
              <input type="file" className="mt-3" />
            </div>
          </div>
        )}

        {submitType === 'link' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">링크 URL</label>
            <input type="url" value={linkContent} onChange={e => setLinkContent(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="https://..." />
          </div>
        )}

        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          제출하기
        </button>
      </form>
    </div>
  );
}
