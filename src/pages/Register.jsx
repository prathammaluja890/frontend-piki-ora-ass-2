import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client, { getErrorMessage } from '../api/client';
import './auth.css';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '', last_name: '', username: '', email: '',
    date_of_birth: '', password: '', confirm_password: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm_password) {
      setError('Error: Passwords do not match!');
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...form };
      if (!payload.date_of_birth) delete payload.date_of_birth;

      await client.post('/auth/register/', payload);
      // Use standard browser alert for that classic student project feel
      alert("Account created successfully! Please log in.");
      navigate('/login');
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to create account.'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        
        <div className="header-section">
          <h2>🏥 Piki Ora Registration</h2>
          <p>Create a new patient account below.</p>
        </div>

        {/* Basic red error text */}
        {error && <div className="error-message"><b>{error}</b></div>}

        <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label>First Name:</label>
            <input type="text" name="first_name" value={form.first_name} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Last Name:</label>
            <input type="text" name="last_name" value={form.last_name} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Username:</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email ID:</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Date of Birth:</label>
            <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Confirm Password:</label>
            <input type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} required />
          </div>

          <br />

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? 'Please wait...' : 'Register'}
          </button>
        </form>

        <div className="footer-links">
          <p>Already registered? <Link to="/login">Click here to Login</Link></p>
        </div>
        
      </div>
    </div>
  );
}