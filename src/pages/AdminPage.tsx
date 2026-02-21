import { teams, users, cohort } from '../data/mockData';

export function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">관리자 패널</h1>

      {/* Cohort Info */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">기수 정보</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-800">✏️ 수정</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><span className="text-gray-500">기수:</span> <span className="font-medium">{cohort.name}</span></div>
          <div><span className="text-gray-500">상태:</span> <span className="font-medium text-emerald-600">{cohort.status}</span></div>
          <div><span className="text-gray-500">시작일:</span> <span className="font-medium">{cohort.startDate}</span></div>
          <div><span className="text-gray-500">종료일:</span> <span className="font-medium">{cohort.endDate}</span></div>
        </div>
      </div>

      {/* Teams Management */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
        <div className="flex items-center justify-between p-6 pb-3">
          <h2 className="font-bold text-gray-900">팀 관리 ({teams.length}팀)</h2>
          <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">+ 팀 추가</button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">팀명</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">팀 리더</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">인원</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">현재 주차</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">상태</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">작업</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => {
              const lead = users.find(u => u.userId === team.teamLeadId);
              return (
                <tr key={team.teamId} className="border-t">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{team.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{lead?.displayName || '-'}</td>
                  <td className="text-center px-4 py-3 text-sm">{team.members.length}명</td>
                  <td className="text-center px-4 py-3 text-sm">Week {team.currentWeek}</td>
                  <td className="text-center px-4 py-3"><span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{team.status}</span></td>
                  <td className="text-center px-4 py-3"><button className="text-xs text-indigo-600 hover:text-indigo-800">수정</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Students Management */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-3">
          <h2 className="font-bold text-gray-900">수강생 관리 ({users.filter(u => u.role !== 'admin').length}명)</h2>
          <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">+ 수강생 추가</button>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">이름</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">이메일</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">팀</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">역할</th>
              <th className="text-center px-4 py-3 text-sm font-medium text-gray-600">작업</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(u => u.role !== 'admin').map(u => {
              const team = teams.find(t => t.teamId === u.teamId);
              return (
                <tr key={u.userId} className="border-t">
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{u.displayName}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{u.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{team?.name || '-'}</td>
                  <td className="text-center px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${u.role === 'team_lead' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>{u.role === 'team_lead' ? '팀 리더' : '수강생'}</span></td>
                  <td className="text-center px-4 py-3"><button className="text-xs text-indigo-600 hover:text-indigo-800">수정</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
