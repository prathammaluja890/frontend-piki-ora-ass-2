import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Top navigation shown on every admin screen.
export default function AdminNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <nav className="topnav">
      <div className="topnav-left">
        <NavLink to="/admin" className="topnav-logo">
          <span className="topnav-dot"></span>
          Piki Ora
        </NavLink>
        <div className="topnav-links">
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/doctors">Doctors</NavLink>
          <NavLink to="/admin/patients">Patients</NavLink>
          <NavLink to="/admin/appointments">Appointments</NavLink>
          <NavLink to="/admin/doctors/add">+ Add Doctor</NavLink>
        </div>
      </div>
      <div className="topnav-right">
        <span className="topnav-welcome">Welcome, <strong>{user?.first_name}</strong></span>
        <button className="btn-logout" onClick={handleLogout}>Log Out</button>
      </div>
    </nav>
  );
}
