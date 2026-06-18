import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Top navigation shown on every patient screen.
export default function PatientNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <nav className="topnav">
      <div className="topnav-left">
        <NavLink to="/patient" className="topnav-logo">
          <span className="topnav-dot"></span>
          Piki Ora
        </NavLink>
        <div className="topnav-links">
          {/* `end` so "Home" isn't highlighted on every nested patient route */}
          <NavLink to="/patient" end>Home</NavLink>
          <NavLink to="/patient/doctors">Find Doctors</NavLink>
          <NavLink to="/patient/appointments">My Appointments</NavLink>
        </div>
      </div>
      <div className="topnav-right">
        <span className="topnav-welcome">Hi, <strong>{user?.first_name}</strong></span>
        <button className="btn-logout" onClick={handleLogout}>Log Out</button>
      </div>
    </nav>
  );
}
