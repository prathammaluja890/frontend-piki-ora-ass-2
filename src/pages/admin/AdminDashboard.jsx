import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import AdminNav from '../../components/AdminNav';
import './admin.css';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/admin/stats/')
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toLocaleDateString('en-NZ', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <>
      <AdminNav />
      <div className="page fade-up">
        <div className="ad-page-head">
          <div>
            <div className="page-eyebrow">Admin Console</div>
            <h1 className="page-title">Good day, <em>{user?.first_name}</em></h1>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{today}</div>
        </div>

        {loading ? (
          <div className="loading">Loading dashboard…</div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="ad-stats">
              <div className="ad-stat c1">
                <div className="ad-stat-icon">🩺</div>
                <div className="ad-stat-num">{stats?.total_doctors ?? 0}</div>
                <div className="ad-stat-label">Registered Doctors</div>
              </div>
              <div className="ad-stat c2">
                <div className="ad-stat-icon">👥</div>
                <div className="ad-stat-num">{stats?.total_patients ?? 0}</div>
                <div className="ad-stat-label">Registered Patients</div>
              </div>
              <div className="ad-stat c3">
                <div className="ad-stat-icon">📅</div>
                <div className="ad-stat-num">{stats?.total_appointments ?? 0}</div>
                <div className="ad-stat-label">Total Appointments</div>
              </div>
              <div className="ad-stat c4">
                <div className="ad-stat-icon">⏳</div>
                <div className="ad-stat-num">{stats?.pending ?? 0}</div>
                <div className="ad-stat-label">Pending Appointments</div>
              </div>
            </div>

            <div className="ad-grid">
              {/* Quick actions */}
              <div className="panel">
                <div className="panel-header"><span className="panel-title">Quick Actions</span></div>
                <div className="ad-actions">
                  <Link className="ad-action" to="/admin/doctors/add">
                    <div className="ad-action-icon">➕</div>
                    <div><div className="ad-action-title">Add Doctor</div><div className="ad-action-desc">Create a new doctor profile</div></div>
                  </Link>
                  <Link className="ad-action" to="/admin/doctors">
                    <div className="ad-action-icon">🩺</div>
                    <div><div className="ad-action-title">Manage Doctors</div><div className="ad-action-desc">Edit or remove profiles</div></div>
                  </Link>
                  <Link className="ad-action" to="/admin/patients">
                    <div className="ad-action-icon">👥</div>
                    <div><div className="ad-action-title">View Patients</div><div className="ad-action-desc">Browse all patient records</div></div>
                  </Link>
                  <Link className="ad-action" to="/admin/appointments">
                    <div className="ad-action-icon">📅</div>
                    <div><div className="ad-action-title">All Appointments</div><div className="ad-action-desc">View and update statuses</div></div>
                  </Link>
                </div>
              </div>

              {/* System status */}
            
            </div>
          </>
        )}
      </div>
    </>
  );
}
