import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client, { getErrorMessage } from '../api/client';
import './auth.css';

// Public sign-up form for new patients.
export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '', last_name: '', username: '', email: '',
    date_of_birth: '', password: '', confirm_password: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // One handler updates whichever field fired the change.
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Quick client-side check before bothering the server.
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      // Don't send an empty date string — the API expects null or a real date.
      const payload = { ...form };
      if (!payload.date_of_birth) delete payload.date_of_birth;

      await client.post('/auth/register/', payload);
      // Bounce to login with a friendly note waiting for them.
      navigate('/login', { state: { message: 'Account created! Please log in.' } });
    } catch (err) {
      setError(getErrorMessage(err, 'Could not create your account.'));
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

        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Register to book appointments online.</p>

        {error && <div className="msg msg-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="first_name" value={form.first_name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="last_name" value={form.last_name} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <div className="auth-bottom">
          Already have an account? <Link to="/login">Log in here</Link>
        </div>
      </div>
    </div>
  );
}
