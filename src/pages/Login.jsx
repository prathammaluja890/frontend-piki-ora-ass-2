import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../api/client';
import './auth.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // A success note may be passed across from the register page.
  const flash = location.state?.message;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login(username, password);
      // Send each role to its own dashboard.
      navigate(user.role === 'admin' ? '/admin' : '/patient');
    } catch (err) {
      setError(getErrorMessage(err, 'Invalid username or password.'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">
            <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H8v-2h4v2zm4-4H8v-2h8v2zm0-4H8V7h8v2z"/></svg>
          </div>
          <span className="auth-logo-text">Piki Ora</span>
        </Link>

        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Log in to manage your appointments.</p>

        {flash && <div className="msg msg-success">{flash}</div>}
        {error && <div className="msg msg-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text" value={username} placeholder="Your username"
              onChange={(e) => setUsername(e.target.value)} required autoFocus
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password" value={password} placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)} required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <div className="auth-bottom">
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}
