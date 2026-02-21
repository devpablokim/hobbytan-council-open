import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CurriculumPage } from './pages/CurriculumPage';
import { TeamDetailPage } from './pages/TeamDetailPage';
import { SubmitPage } from './pages/SubmitPage';
import { CommunityPage } from './pages/CommunityPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const { isLoggedIn, currentUser, role, login, logout, switchRole } = useAuth();

  if (!isLoggedIn || !currentUser) {
    return (
      <BrowserRouter basename="/superworkshop">
        <LoginPage onLogin={login} />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter basename="/superworkshop">
      <Routes>
        <Route element={<Layout user={currentUser} role={role} onSwitchRole={switchRole} onLogout={logout} />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage user={currentUser} role={role} />} />
          <Route path="/curriculum" element={<CurriculumPage user={currentUser} role={role} />} />
          <Route path="/team/:id" element={<TeamDetailPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/community" element={<CommunityPage />} />
          {role === 'admin' && <Route path="/admin" element={<AdminPage />} />}
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
