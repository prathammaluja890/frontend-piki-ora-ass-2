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
      setError(getErrorMessage(err, 'Error: Invalid username or password!'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        
        <div className="header-section">
          <h2>🏥 Piki Ora Login</h2>
          <p>Enter your details to access your dashboard.</p>
        </div>

        {/* Basic green success text */}
        {flash && <div className="success-message"><b>{flash}</b></div>}
        
        {/* Basic red error text */}
        {error && <div className="error-message"><b>{error}</b></div>}

        <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label>Username:</label>
            <input
              type="text" 
              value={username} 
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)} 
              required 
              autoFocus
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password" 
              value={password} 
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          <br />

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? 'Please wait...' : 'Login'}
          </button>
        </form>

        <div className="footer-links">
          <p>New patient? <Link to="/register">Click here to Register</Link></p>
        </div>
        
      </div>
    </div>
  );
}