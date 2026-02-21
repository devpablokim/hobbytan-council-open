import { useParams } from 'react-router-dom';
import { teams, users, submissions } from '../data/mockData';
import { ProgressBar } from '../components/ProgressBar';
import { WeekBadge } from '../components/WeekBadge';

export function TeamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const team = teams.find(t => t.teamId === id);
  const members = users.filter(u => u.teamId === id);
  const teamSubmissions = submissions.filter(s => s.teamId === id);
  const weekKeys = ['week0','week1','week2','week3','week4','week5'] as const;

  if (!team) return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">🔍</div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">팀을 찾을 수 없습니다</h2>
      <p className="text-gray-500 mb-4">요청한 팀 ID({id})가 존재하지 않습니다.</p>
      <a href="/dashboard" className="text-indigo-600 hover:text-indigo-800 text-sm">← 대시보드로 돌아가기</a>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{team.name}</h1>
      <p className="text-gray-500 mb-6">현재 Week {team.currentWeek} 진행 중 · {members.length}명</p>

      {/* Team Progress */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">팀 진행률</h2>
        <div className="space-y-3">
          {([0,1,2,3,4,5] as const).map(w => (
            <ProgressBar key={w} value={team.progress[`week${w}`]} label={`${w}주차`} />
          ))}
        </div>
      </div>

      {/* Members */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
        <h2 className="font-bold text-gray-900 p-6 pb-3">팀원 현황</h2>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">이름</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">역할</th>
              {weekKeys.map((_, i) => <th key={i} className="text-center px-2 py-3 text-sm font-medium text-gray-600">{i}주</th>)}
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m.userId} className="border-t">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">{m.displayName}</td>
                <td className="px-4 py-3 text-xs">
                  <span className={`px-2 py-0.5 rounded-full ${m.role === 'team_lead' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                    {m.role === 'team_lead' ? '팀 리더' : '수강생'}
                  </span>
                </td>
                {weekKeys.map((w, i) => (
                  <td key={i} className="text-center px-2 py-3"><WeekBadge status={m.progress[w].status} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submissions */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="font-bold text-gray-900 mb-4">최근 제출물</h2>
        {teamSubmissions.length === 0 ? (
          <p className="text-gray-400 text-sm">아직 제출물이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {teamSubmissions.map(s => {
              const author = users.find(u => u.userId === s.userId);
              return (
                <div key={s.submissionId} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900">{author?.displayName}</span>
                      <span className="text-gray-400 mx-2">·</span>
                      <span className="text-sm text-gray-500">{s.weekNumber}주차</span>
                    </div>
                    {s.feedback ? (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">피드백 완료</span>
                    ) : (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">리뷰 대기</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{s.content}</p>
                  {s.feedback && (
                    <div className="mt-2 bg-emerald-50 rounded p-2 text-sm text-emerald-700">
                      💬 {s.feedback.comment} {s.feedback.score && `(${s.feedback.score}점)`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
