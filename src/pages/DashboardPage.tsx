import { Link } from 'react-router-dom';
import type { Role, User } from '../types';
import { teams, users, cohort, curriculum, submissions } from '../data/mockData';
import { ProgressBar } from '../components/ProgressBar';
import { WeekBadge } from '../components/WeekBadge';

function AdminDashboard() {
  const studentCount = users.filter(u => u.role !== 'admin').length;
  return (
    <div>
      {/* Cohort Selector */}
      <div className="flex items-center gap-3 mb-6">
        <label className="text-sm font-medium text-gray-600">기수 선택:</label>
        <select className="border rounded-lg px-3 py-1.5 text-sm bg-white" defaultValue="cohort-3">
          <option value="cohort-3">3기 (진행 중)</option>
          <option value="cohort-2" disabled>2기 (수료 완료)</option>
          <option value="cohort-1" disabled>1기 (수료 완료)</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border"><div className="text-sm text-gray-500">기수</div><div className="text-2xl font-bold text-indigo-900">{cohort.name}</div></div>
        <div className="bg-white rounded-xl p-5 shadow-sm border"><div className="text-sm text-gray-500">팀 수</div><div className="text-2xl font-bold text-indigo-900">{teams.length}</div></div>
        <div className="bg-white rounded-xl p-5 shadow-sm border"><div className="text-sm text-gray-500">수강생</div><div className="text-2xl font-bold text-indigo-900">{studentCount}명</div></div>
        <div className="bg-white rounded-xl p-5 shadow-sm border"><div className="text-sm text-gray-500">진행 주차</div><div className="text-2xl font-bold text-indigo-900">Week {Math.max(...teams.map(t => t.currentWeek))}</div></div>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-4">팀별 진행 현황</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {teams.map(team => (
          <Link to={`/team/${team.teamId}`} key={team.teamId} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">{team.name}</h3>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">Week {team.currentWeek}</span>
            </div>
            <div className="space-y-2">
              {([0,1,2,3,4,5] as const).map(w => (
                <ProgressBar key={w} value={team.progress[`week${w}`]} label={`${w}주차`} size="sm" />
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-500">{team.members.length}명</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StudentDashboard({ user }: { user: User }) {
  const myTeam = teams.find(t => t.teamId === user.teamId);
  const weekKeys = ['week0','week1','week2','week3','week4','week5'] as const;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border"><div className="text-sm text-gray-500">내 팀</div><div className="text-xl font-bold text-indigo-900">{myTeam?.name || '-'}</div></div>
        <div className="bg-white rounded-xl p-5 shadow-sm border"><div className="text-sm text-gray-500">완료 주차</div><div className="text-xl font-bold text-emerald-600">{weekKeys.filter(w => user.progress[w].status === 'completed').length} / 6</div></div>
        <div className="bg-white rounded-xl p-5 shadow-sm border"><div className="text-sm text-gray-500">현재 상태</div><div className="text-xl font-bold text-amber-600">{weekKeys.find(w => user.progress[w].status === 'in-progress') ? '진행 중' : '대기'}</div></div>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-4">내 진행 현황</h2>
      <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
        <div className="space-y-3">
          {weekKeys.map((w, i) => (
            <div key={w} className="flex items-center gap-4">
              <span className="w-16 text-sm text-gray-600">{i}주차</span>
              <div className="flex-1"><ProgressBar value={user.progress[w].status === 'completed' ? 100 : user.progress[w].status === 'in-progress' ? 50 : 0} size="sm" /></div>
              <WeekBadge status={user.progress[w].status} />
            </div>
          ))}
        </div>
      </div>

      {myTeam && (
        <>
          <h2 className="text-lg font-bold text-gray-900 mb-4">팀 진행 현황</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="space-y-2">
              {([0,1,2,3,4,5] as const).map(w => (
                <ProgressBar key={w} value={myTeam.progress[`week${w}`]} label={`${w}주차`} size="sm" />
              ))}
            </div>
          </div>
        </>
      )}

      {/* My Submissions & Feedback */}
      <h2 className="text-lg font-bold text-gray-900 mt-6 mb-4">내 제출물 & 피드백</h2>
      <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
        {submissions.filter(s => s.userId === user.userId).length === 0 ? (
          <p className="text-gray-400 text-sm">아직 제출한 과제가 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {submissions.filter(s => s.userId === user.userId).map(s => (
              <div key={s.submissionId} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{s.weekNumber}주차 과제</span>
                  {s.feedback ? (
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">피드백 완료</span>
                  ) : (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">리뷰 대기</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">{s.content}</p>
                {s.feedback && (
                  <div className="mt-2 bg-emerald-50 rounded p-2 text-sm text-emerald-700">
                    💬 {s.feedback.comment} {s.feedback.score && `(${s.feedback.score}점)`}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <h2 className="text-lg font-bold text-gray-900 mt-6 mb-4">다가오는 과제</h2>
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        {curriculum.filter(c => {
          const wk = `week${c.weekNumber}` as keyof typeof user.progress;
          return user.progress[wk].status !== 'completed';
        }).slice(0, 2).map(c => (
          <div key={c.curriculumId} className="border-b last:border-0 py-3">
            <div className="font-medium text-gray-900">{c.title}</div>
            {c.assignments.map(a => (
              <div key={a.assignmentId} className="text-sm text-gray-500 mt-1">📝 {a.title}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamLeadDashboard({ user }: { user: User }) {
  const myTeam = teams.find(t => t.teamId === user.teamId);
  const teamMembers = users.filter(u => u.teamId === user.teamId);
  const weekKeys = ['week0','week1','week2','week3','week4','week5'] as const;

  if (!myTeam) return <div>팀 정보를 찾을 수 없습니다.</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border"><div className="text-sm text-gray-500">내 팀</div><div className="text-xl font-bold text-indigo-900">{myTeam.name}</div></div>
        <div className="bg-white rounded-xl p-5 shadow-sm border"><div className="text-sm text-gray-500">팀원 수</div><div className="text-xl font-bold text-indigo-900">{teamMembers.length}명</div></div>
        <div className="bg-white rounded-xl p-5 shadow-sm border"><div className="text-sm text-gray-500">현재 주차</div><div className="text-xl font-bold text-indigo-900">Week {myTeam.currentWeek}</div></div>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-4">팀원별 진행 현황</h2>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">이름</th>
              {weekKeys.map((_, i) => <th key={i} className="text-center px-2 py-3 text-sm font-medium text-gray-600">{i}주</th>)}
            </tr>
          </thead>
          <tbody>
            {teamMembers.map(member => (
              <tr key={member.userId} className="border-t">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{member.displayName}</td>
                {weekKeys.map((w, i) => (
                  <td key={i} className="text-center px-2 py-3"><WeekBadge status={member.progress[w].status} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DashboardPage({ user, role }: { user: User; role: Role }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h1>
      {role === 'admin' && <AdminDashboard />}
      {role === 'student' && <StudentDashboard user={user} />}
      {role === 'team_lead' && <TeamLeadDashboard user={user} />}
    </div>
  );
}
