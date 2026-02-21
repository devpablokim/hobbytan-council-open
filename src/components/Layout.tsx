import { Link, useLocation, Outlet } from 'react-router-dom';
import type { Role, User } from '../types';

const navItems = [
  { to: '/dashboard', label: '📊 대시보드' },
  { to: '/curriculum', label: '📚 커리큘럼' },
  { to: '/submit', label: '📤 과제 제출' },
  { to: '/community', label: '💬 커뮤니티' },
];

const adminNavItems = [
  { to: '/admin', label: '⚙️ 관리자' },
];

const roleLabels: Record<Role, string> = {
  admin: '관리자',
  team_lead: '팀 리더',
  student: '수강생',
};

interface LayoutProps {
  user: User;
  role: Role;
  onSwitchRole: (role: Role) => void;
  onLogout: () => void;
}

export function Layout({ user, role, onSwitchRole, onLogout }: LayoutProps) {
  const location = useLocation();
  const allNav = role === 'admin' ? [...navItems, ...adminNavItems] : navItems;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col shrink-0 hidden md:flex">
        <div className="p-6 border-b border-indigo-700">
          <h1 className="text-lg font-bold">🎓 AI 슈퍼워크샵</h1>
          <p className="text-indigo-300 text-sm mt-1">HOBBYTAN AI</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {allNav.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                location.pathname === item.to
                  ? 'bg-indigo-700 text-white font-medium'
                  : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-indigo-700">
          <div className="text-sm text-indigo-200">{user.displayName}</div>
          <div className="text-xs text-indigo-400 mt-0.5">{roleLabels[role]}</div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b px-6 py-3 flex items-center justify-between shrink-0">
          <div className="md:hidden font-bold text-indigo-900">🎓 AI 슈퍼워크샵</div>
          <div className="flex items-center gap-4">
            {/* Role Switcher (dev only) */}
            {import.meta.env.DEV && (
              <select
                value={role}
                onChange={e => onSwitchRole(e.target.value as Role)}
                className="text-xs border rounded px-2 py-1 bg-yellow-50 text-yellow-700"
                title="개발 모드 전용"
              >
                <option value="admin">🔧 관리자</option>
                <option value="team_lead">🔧 팀 리더</option>
                <option value="student">🔧 수강생</option>
              </select>
            )}
            <span className="text-sm text-gray-600">{user.displayName}</span>
            <button onClick={onLogout} className="text-sm text-red-500 hover:text-red-700">로그아웃</button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
