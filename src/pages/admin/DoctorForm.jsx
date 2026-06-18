import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import client, { getErrorMessage } from '../../api/client';
import AdminNav from '../../components/AdminNav';
import './admin.css';

const DAYS = [
  { code: 'mon', label: 'Monday' }, { code: 'tue', label: 'Tuesday' },
  { code: 'wed', label: 'Wednesday' }, { code: 'thu', label: 'Thursday' },
  { code: 'fri', label: 'Friday' }, { code: 'sat', label: 'Saturday' },
  { code: 'sun', label: 'Sunday' },
];

// One component for both "Add Doctor" and "Edit Doctor". When editing we only
// allow availability changes (days + slots), mirroring Assignment 1.
export default function DoctorForm() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(doctorId);

  const [form, setForm] = useState({
    first_name: '', last_name: '', username: '', email: '',
    date_of_birth: '', specialization: '', slots: '',
  });
  const [days, setDays] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);

  // When editing, pre-fill the availability fields from the existing doctor.
  useEffect(() => {
    if (!isEditing) return;
    client.get(`/doctors/${doctorId}/`)
      .then((res) => {
        const d = res.data;
        setForm((f) => ({
          ...f,
          first_name: d.first_name, last_name: d.last_name,
          specialization: d.specialization,
          slots: d.slots_list.join(', '),
        }));
        setDays(d.days_list);
      })
      .catch(() => setError('Could not load this doctor.'))
      .finally(() => setLoading(false));
  }, [doctorId, isEditing]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function toggleDay(code) {
    setDays((prev) => (prev.includes(code) ? prev.filter((d) => d !== code) : [...prev, code]));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (days.length === 0) {
      setError('Please select at least one available day.');
      return;
    }

    setSubmitting(true);
    try {
      if (isEditing) {
        await client.put(`/doctors/${doctorId}/`, {
          available_days: days,
          slots: form.slots,
        });
      } else {
        const payload = {
          first_name: form.first_name, last_name: form.last_name,
          username: form.username, email: form.email,
          specialization: form.specialization,
          available_days: days, slots: form.slots,
        };
        if (form.date_of_birth) payload.date_of_birth = form.date_of_birth;
        await client.post('/doctors/', payload);
      }
      navigate('/admin/doctors');
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
        <Link className="back-link" to="/admin/doctors">← Back to Doctors</Link>

        <div className="page-header">
          <div className="page-eyebrow">{isEditing ? 'Edit' : 'New'}</div>
          <h1 className="page-title">{isEditing ? 'Edit Doctor' : 'Add Doctor'}</h1>
        </div>

        {error && <div className="msg msg-error">{error}</div>}

        {loading ? (
          <div className="loading">Loading…</div>
        ) : (
          <div className="card">
            <form onSubmit={handleSubmit}>
              {/* Account details — only collected when adding a new doctor. */}
              {!isEditing && (
                <>
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

                  <div className="form-row">
                    <div className="form-group">
                      <label>Username</label>
                      <input type="text" name="username" value={form.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Specialization</label>
                      <input type="text" name="specialization" value={form.specialization} onChange={handleChange} required />
                    </div>
                  </div>
                  <p className="help-text" style={{ marginTop: '-6px', marginBottom: '18px' }}>
                    A new login is created for the doctor with the default password <strong>doctor123</strong>.
                  </p>
                </>
              )}

              {/* When editing, show the doctor's name read-only for context. */}
              {isEditing && (
                <div className="form-group">
                  <label>Doctor</label>
                  <input type="text" value={`Dr. ${form.first_name} ${form.last_name} — ${form.specialization}`} disabled />
                </div>
              )}

              {/* Availability — shown in both modes. */}
              <div className="form-group">
                <label>Available Days</label>
                <div className="ad-days">
                  {DAYS.map((d) => (
                    <label key={d.code} className={`ad-day ${days.includes(d.code) ? 'checked' : ''}`}>
                      <input type="checkbox" checked={days.includes(d.code)} onChange={() => toggleDay(d.code)} />
                      {d.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Time Slots</label>
                <input type="text" name="slots" value={form.slots} onChange={handleChange} placeholder="09:30, 10:30, 11:00" required />
                <p className="help-text">Enter time slots separated by commas, e.g. 09:30, 10:30, 11:00</p>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? 'Saving…' : isEditing ? 'Update Doctor' : 'Add Doctor'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
