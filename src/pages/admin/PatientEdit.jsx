import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import client, { getErrorMessage } from '../../api/client';
import AdminNav from '../../components/AdminNav';
import './admin.css';

// Admin edits a patient's profile and can optionally reset their password.
export default function PatientEdit() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', date_of_birth: '', password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    client.get(`/patients/${patientId}/`)
      .then((res) => {
        const p = res.data;
        setForm({
          first_name: p.first_name, last_name: p.last_name,
          email: p.email, date_of_birth: p.date_of_birth || '', password: '',
        });
      })
      .catch(() => setError('Could not load this patient.'))
      .finally(() => setLoading(false));
  }, [patientId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const payload = { ...form };
      // Don't send an empty password — that means "keep the current one".
      if (!payload.password) delete payload.password;
      if (!payload.date_of_birth) payload.date_of_birth = null;

      await client.put(`/patients/${patientId}/`, payload);
      navigate('/admin/patients');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <AdminNav />
      <div className="page page-narrow fade-up">
        <Link className="back-link" to="/admin/patients">← Back to Patients</Link>

        <div className="page-header">
          <div className="page-eyebrow">Edit</div>
          <h1 className="page-title">Edit Patient</h1>
        </div>

        {error && <div className="msg msg-error">{error}</div>}

        {loading ? (
          <div className="loading">Loading…</div>
        ) : (
          <div className="card">
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
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Leave blank to keep current" />
                <p className="help-text">Only fill this in if you want to reset the patient&apos;s password.</p>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? 'Saving…' : 'Update Patient'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
