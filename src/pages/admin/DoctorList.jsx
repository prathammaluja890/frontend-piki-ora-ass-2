import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import client, { getErrorMessage } from '../../api/client';
import AdminNav from '../../components/AdminNav';
import { initials, formatDays } from '../../utils/helpers';
import './admin.css';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    client.get('/doctors/', { params: { search } })
      .then((res) => setDoctors(res.data))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, [search]);

  // Debounced load on search change.
  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  async function handleDelete(doctor) {
    if (!window.confirm(`Delete Dr. ${doctor.full_name}? This removes their account too.`)) return;
    setError(''); setMessage('');
    try {
      await client.delete(`/doctors/${doctor.id}/`);
      setMessage('Doctor deleted successfully.');
      load();
    } catch (err) {
      // The API blocks deletion if the doctor still has pending appointments.
      setError(getErrorMessage(err));
    }
  }

  return (
    <>
      <AdminNav />
      <div className="page fade-up">
        <div className="ad-page-head">
          <div>
            <div className="page-eyebrow">Management</div>
            <h1 className="page-title">Doctors</h1>
          </div>
          <Link to="/admin/doctors/add" className="btn btn-primary">+ Add Doctor</Link>
        </div>

        {message && <div className="msg msg-success">{message}</div>}
        {error && <div className="msg msg-error">{error}</div>}

        <div className="toolbar">
          <input
            type="text" placeholder="Search by name or specialization…"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading">Loading doctors…</div>
        ) : doctors.length === 0 ? (
          <div className="empty">No doctors found.</div>
        ) : (
          <div className="panel">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Available Days</th>
                  <th>Slots</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar" style={{ width: '34px', height: '34px', fontSize: '12px' }}>
                          {initials(doc.first_name, doc.last_name)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#1a1a1a' }}>Dr. {doc.full_name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{doc.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{doc.specialization}</td>
                    <td>{formatDays(doc.days_list) || '—'}</td>
                    <td>{doc.total_slots}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <Link to={`/admin/doctors/${doc.id}/edit`} className="btn btn-outline btn-sm">Edit</Link>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(doc)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
