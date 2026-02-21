import type { Role } from '../types';

interface LoginPageProps {
  onLogin: (role?: Role) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-4">🎓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI 슈퍼유저 워크샵</h1>
        <p className="text-gray-500 mb-8">HOBBYTAN AI · 5주 파워워크샵 대시보드</p>

        <button
          onClick={() => onLogin()}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-xl px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Google로 로그인
        </button>

        <div className="text-xs text-gray-400 mt-6">
          <p>🔧 개발 모드: 아래 역할로 빠른 로그인</p>
          <div className="flex gap-2 mt-2 justify-center">
            <button onClick={() => onLogin('admin')} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs hover:bg-indigo-200">관리자</button>
            <button onClick={() => onLogin('team_lead')} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs hover:bg-emerald-200">팀 리더</button>
            <button onClick={() => onLogin('student')} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs hover:bg-amber-200">수강생</button>
          </div>
        </div>
      </div>
    </div>
  );
}
