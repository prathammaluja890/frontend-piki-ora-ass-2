import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import PatientNav from '../../components/PatientNav';
import { initials } from '../../utils/helpers';
import './patient.css';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pull the dashboard numbers + next few appointments once on mount.
  useEffect(() => {
    client.get('/patient/stats/')
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PatientNav />
      <div className="page fade-up">

        <div className="pt-welcome">
          <h1>Hello, {user?.first_name}! 👋</h1>
          <p>Welcome back — here&apos;s your health overview for today.</p>
        </div>

        {loading ? (
          <div className="loading">Loading your dashboard…</div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="pt-stats">
              <div className="pt-stat total">
                <div className="pt-stat-icon">🗂</div>
                <div className="pt-stat-label">Total</div>
                <div className="pt-stat-num">{stats?.total ?? 0}</div>
                <div className="pt-stat-sub">all time</div>
              </div>
              <div className="pt-stat upcoming">
                <div className="pt-stat-icon">🕐</div>
                <div className="pt-stat-label">Upcoming</div>
                <div className="pt-stat-num">{stats?.pending ?? 0}</div>
                <div className="pt-stat-sub">scheduled</div>
              </div>
              <div className="pt-stat completed">
                <div className="pt-stat-icon">✓</div>
                <div className="pt-stat-label">Completed</div>
                <div className="pt-stat-num">{stats?.completed ?? 0}</div>
                <div className="pt-stat-sub">visited</div>
              </div>
            </div>

            {/* Upcoming appointments */}
            <div className="card" style={{ marginBottom: '16px' }}>
              <div className="panel-header" style={{ padding: '0 0 16px', borderBottom: '1px solid var(--border)' }}>
                <span className="panel-title">Upcoming Appointments</span>
                <Link to="/patient/appointments" style={{ fontSize: '13px', color: 'var(--green-mid)', textDecoration: 'none', fontWeight: 500 }}>View all →</Link>
              </div>

              {stats?.upcoming?.length ? (
                stats.upcoming.map((appt) => (
                  <div className="pt-appt" key={appt.id}>
                    <div className="avatar pt-appt-avatar">{initials(appt.doctor_name?.split(' ')[0], appt.doctor_name?.split(' ')[1])}</div>
                    <div className="pt-appt-info">
                      <div className="pt-appt-name">Dr. {appt.doctor_name}</div>
                      <div className="pt-appt-meta">{appt.doctor_specialization} · {appt.date} at {appt.slot}</div>
                    </div>
                    <span className="badge pending">Pending</span>
                  </div>
                ))
              ) : (
                <div className="empty">
                  No upcoming appointments.<br />
                  <Link to="/patient/doctors">Book your first appointment</Link>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="pt-actions">
              <Link className="pt-action" to="/patient/doctors">
                <div className="pt-action-icon">🔍</div>
                <div className="pt-action-title">Find a Doctor</div>
                <div className="pt-action-desc">Browse specialists and book a slot</div>
              </Link>
              <Link className="pt-action" to="/patient/appointments">
                <div className="pt-action-icon">📋</div>
                <div className="pt-action-title">My Appointments</div>
                <div className="pt-action-desc">View, edit or cancel bookings</div>
              </Link>
              <div className="pt-action" style={{ cursor: 'default' }}>
                <div className="pt-action-icon">💊</div>
                <div className="pt-action-title">Health Records</div>
                <div className="pt-action-desc">Prescriptions and medical history</div>
              </div>
              <div className="pt-action" style={{ cursor: 'default' }}>
                <div className="pt-action-icon">📞</div>
                <div className="pt-action-title">Contact Support</div>
                <div className="pt-action-desc">Get help from our patient care team</div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
