import { createContext, useContext, useState } from 'react';
import client from '../api/client';

// Holds the logged-in user across the whole app. We seed the initial state
// from localStorage so a page refresh doesn't kick the user back to login.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Call the login endpoint, stash the token + user, and return the user so
  // the caller can redirect based on their role.
  async function login(username, password) {
    const { data } = await client.post('/auth/login/', { username, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  // Tell the server to drop the token, then clear everything locally even if
  // that call fails (e.g. offline) — the important thing is the user is out.
  async function logout() {
    try {
      await client.post('/auth/logout/');
    } catch {
      /* ignore network errors on logout */
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Convenience hook so components can just do: const { user } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
