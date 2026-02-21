import { useState } from 'react';
import type { Role, User } from '../types';
import { curriculum } from '../data/mockData';
import { WeekBadge } from '../components/WeekBadge';

export function CurriculumPage({ user, role }: { user: User; role: Role }) {
  const [activeWeek, setActiveWeek] = useState(0);
  const cur = curriculum.find(c => c.weekNumber === activeWeek);
  const weekKey = `week${activeWeek}` as keyof typeof user.progress;
  const myStatus = user.progress[weekKey];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">커리큘럼</h1>

      {/* Week Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[0,1,2,3,4,5].map(w => {
          const wk = `week${w}` as keyof typeof user.progress;
          const s = user.progress[wk].status;
          return (
            <button
              key={w}
              onClick={() => setActiveWeek(w)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeWeek === w
                  ? 'bg-indigo-600 text-white'
                  : s === 'completed' ? 'bg-emerald-100 text-emerald-700'
                  : s === 'in-progress' ? 'bg-amber-100 text-amber-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {w}주차 {s === 'completed' && '✅'}
            </button>
          );
        })}
      </div>

      {cur && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{cur.title}</h2>
            <WeekBadge status={myStatus.status} />
          </div>
          <p className="text-gray-600 mb-6">{cur.description}</p>

          {/* Objectives */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-2">🎯 학습 목표</h3>
            <ul className="space-y-1">
              {cur.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-indigo-500 mt-0.5">•</span>{obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          {cur.materials.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">📖 학습 자료</h3>
              <div className="space-y-2">
                {cur.materials.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm bg-gray-50 rounded-lg p-3">
                    <span>{m.type === 'video' ? '🎥' : m.type === 'doc' ? '📄' : '🔗'}</span>
                    <span className="text-gray-700">{m.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assignments */}
          <div>
            <h3 className="font-bold text-gray-800 mb-2">📝 과제</h3>
            <div className="space-y-3">
              {cur.assignments.map(a => (
                <div key={a.assignmentId} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">{a.title}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${a.required ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                      {a.required ? '필수' : '선택'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{a.description}</p>
                  <div className="flex gap-3 mt-2 text-xs text-gray-400">
                    <span>📎 {a.type === 'file' ? '파일 업로드' : a.type === 'text' ? '텍스트 작성' : '링크 제출'}</span>
                    <span>⏰ D+{a.dueOffsetDays}일</span>
                  </div>
                  {role === 'admin' && (
                    <button className="mt-2 text-xs text-indigo-600 hover:text-indigo-800">✏️ 수정</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {role === 'admin' && (
            <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">+ 과제 추가</button>
          )}
        </div>
      )}
    </div>
  );
}
