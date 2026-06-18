import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import client, { getErrorMessage } from '../../api/client';
import PatientNav from '../../components/PatientNav';
import { initials } from '../../utils/helpers';
import './patient.css';

export default function MyAppointments() {
  const navigate = useNavigate();
  const location = useLocation();

  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  // Show a success note if we were redirected here after booking/rescheduling.
  const [message, setMessage] = useState(location.state?.message || '');
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    client.get('/appointments/', { params: { status: statusFilter } })
      .then((res) => setAppointments(res.data))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  // Clear the router state so the flash doesn't reappear on refresh.
  useEffect(() => {
    if (location.state?.message) {
      window.history.replaceState({}, '');
    }
  }, [location.state]);

  async function handleCancel(appt) {
    if (!window.confirm('Cancel this appointment? This cannot be undone.')) return;
    setError('');
    try {
      await client.post(`/appointments/${appt.id}/cancel/`);
      setMessage('Appointment cancelled successfully.');
      load();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  function handleEdit(appt) {
    // Hand the booking screen everything it needs to reschedule this one.
    navigate(`/patient/book/${appt.doctor}`, {
      state: { appointmentId: appt.id },
    });
  }

  return (
    <>
      <PatientNav />
      <div className="page fade-up">
        <div className="page-header">
          <div className="page-eyebrow">My Bookings</div>
          <h1 className="page-title">My <em>Appointments</em></h1>
        </div>

        {message && <div className="msg msg-success">{message}</div>}
        {error && <div className="msg msg-error">{error}</div>}

        <div className="toolbar">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ flex: '0 0 200px' }}>
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Link to="/patient/doctors" className="btn btn-primary" style={{ marginLeft: 'auto' }}>+ Book New</Link>
        </div>

        {loading ? (
          <div className="loading">Loading appointments…</div>
        ) : appointments.length === 0 ? (
          <div className="empty">
            You have no appointments yet.<br />
            <Link to="/patient/doctors">Book your first appointment</Link>
          </div>
        ) : (
          <div className="panel">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar" style={{ width: '34px', height: '34px', fontSize: '12px' }}>
                          {initials(appt.doctor_name?.split(' ')[0], appt.doctor_name?.split(' ')[1])}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#1a1a1a' }}>Dr. {appt.doctor_name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{appt.doctor_specialization}</div>
                        </div>
                      </div>
                    </td>
                    <td>{appt.date}</td>
                    <td>{appt.slot}</td>
                    <td><span className={`badge ${appt.status}`}>{appt.status}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      {appt.status === 'pending' ? (
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button className="btn btn-outline btn-sm" onClick={() => handleEdit(appt)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleCancel(appt)}>Cancel</button>
                        </div>
                      ) : (
                        <span style={{ color: '#ccc', fontSize: '12px' }}>—</span>
                      )}
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
