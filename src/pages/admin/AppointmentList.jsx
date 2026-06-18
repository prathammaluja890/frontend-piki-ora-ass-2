import { useEffect, useState, useCallback } from 'react';
import client, { getErrorMessage } from '../../api/client';
import AdminNav from '../../components/AdminNav';
import { initials } from '../../utils/helpers';
import './admin.css';

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    client.get('/appointments/', { params: { search, status: statusFilter } })
      .then((res) => setAppointments(res.data))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, [search, statusFilter]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  // Admin changes an appointment's status (pending / completed / cancelled).
  async function changeStatus(appt, newStatus) {
    setError(''); setMessage('');
    try {
      await client.post(`/appointments/${appt.id}/set_status/`, { status: newStatus });
      setMessage(`Appointment status updated to ${newStatus}.`);
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
          <h1 className="page-title">Appointments</h1>
        </div>

        {message && <div className="msg msg-success">{message}</div>}
        {error && <div className="msg msg-error">{error}</div>}

        <div className="toolbar">
          <input
            type="text" placeholder="Search by patient or doctor name…"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ flex: '0 0 180px' }}>
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading appointments…</div>
        ) : appointments.length === 0 ? (
          <div className="empty">No appointments found.</div>
        ) : (
          <div className="panel">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar" style={{ width: '34px', height: '34px', fontSize: '12px' }}>
                          {initials(appt.patient_name?.split(' ')[0], appt.patient_name?.split(' ')[1])}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#1a1a1a' }}>{appt.patient_name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{appt.patient_email}</div>
                        </div>
                      </div>
                    </td>
                    <td>Dr. {appt.doctor_name}</td>
                    <td>{appt.date}</td>
                    <td>{appt.slot}</td>
                    <td><span className={`badge ${appt.status}`}>{appt.status}</span></td>
                    <td>
                      <select
                        value={appt.status}
                        onChange={(e) => changeStatus(appt, e.target.value)}
                        style={{ width: 'auto', padding: '6px 10px', fontSize: '13px', background: 'white' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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
