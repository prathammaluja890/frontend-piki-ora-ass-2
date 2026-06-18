import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import client, { getErrorMessage } from '../../api/client';
import AdminNav from '../../components/AdminNav';
import { initials } from '../../utils/helpers';
import './admin.css';

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    client.get('/patients/', { params: { search } })
      .then((res) => setPatients(res.data))
      .catch(() => setPatients([]))
      .finally(() => setLoading(false));
  }, [search]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  async function handleDelete(patient) {
    if (!window.confirm(`Delete ${patient.full_name}? Their appointments will be removed too.`)) return;
    setError(''); setMessage('');
    try {
      await client.delete(`/patients/${patient.id}/`);
      setMessage('Patient deleted successfully.');
      load();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  return (
    <>
      <AdminNav />
      <div className="page fade-up">
        <div className="page-header">
          <div className="page-eyebrow">Management</div>
          <h1 className="page-title">Patients</h1>
        </div>

        {message && <div className="msg msg-success">{message}</div>}
        {error && <div className="msg msg-error">{error}</div>}

        <div className="toolbar">
          <input
            type="text" placeholder="Search by name, username or email…"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading">Loading patients…</div>
        ) : patients.length === 0 ? (
          <div className="empty">No patients found.</div>
        ) : (
          <div className="panel">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar" style={{ width: '34px', height: '34px', fontSize: '12px' }}>
                          {initials(p.first_name, p.last_name)}
                        </div>
                        <span style={{ fontWeight: 600, color: '#1a1a1a' }}>{p.full_name}</span>
                      </div>
                    </td>
                    <td>{p.username}</td>
                    <td>{p.email}</td>
                    <td>{p.date_of_birth || '—'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <Link to={`/admin/patients/${p.id}/edit`} className="btn btn-outline btn-sm">Edit</Link>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p)}>Delete</button>
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
