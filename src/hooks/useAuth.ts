import { useState, useCallback } from 'react';
import type { Role, User } from '../types';
import { users } from '../data/mockData';

interface AuthState {
  isLoggedIn: boolean;
  currentUser: User | null;
  role: Role;
  login: (role?: Role) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
}

const ROLE_KEY = 'superworkshop_role';
const LOGIN_KEY = 'superworkshop_loggedin';

function getSavedRole(): Role {
  return (localStorage.getItem(ROLE_KEY) as Role) || 'student';
}

function getUserByRole(role: Role): User {
  if (role === 'admin') return users.find(u => u.role === 'admin')!;
  if (role === 'team_lead') return users.find(u => u.role === 'team_lead')!;
  return users.find(u => u.role === 'student' && u.teamId === 'team-alpha')!;
}

export function useAuth(): AuthState {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem(LOGIN_KEY) === 'true');
  const [role, setRole] = useState<Role>(getSavedRole);

  const login = useCallback((r?: Role) => {
    const selectedRole = r || getSavedRole();
    localStorage.setItem(LOGIN_KEY, 'true');
    localStorage.setItem(ROLE_KEY, selectedRole);
    setRole(selectedRole);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(LOGIN_KEY);
    setIsLoggedIn(false);
  }, []);

  const switchRole = useCallback((newRole: Role) => {
    localStorage.setItem(ROLE_KEY, newRole);
    setRole(newRole);
  }, []);

  return {
    isLoggedIn,
    currentUser: isLoggedIn ? getUserByRole(role) : null,
    role,
    login,
    logout,
    switchRole,
  };
}
