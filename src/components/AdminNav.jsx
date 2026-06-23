import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './admin-nav.css'; // Import the new separated CSS

export default function AdminNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <nav className="an-navbar">
      
      <div className="an-nav-left">
        <NavLink to="/admin" className="an-brand">
        Piki Ora
        </NavLink>
        
        <div className="an-links">
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/doctors">Doctors</NavLink>
          <NavLink to="/admin/patients">Patients</NavLink>
          <NavLink to="/admin/appointments">Appointments</NavLink>
          <NavLink to="/admin/doctors/add" className="an-add-btn">+ Add Doctor</NavLink>
        </div>
      </div>

      <div className="an-nav-right">
        <span className="an-welcome">
          Welcome, <strong>{user?.first_name || 'Admin'}</strong>
        </span>
        <button className="an-logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      
    </nav>
  );
}