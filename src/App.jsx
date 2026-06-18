import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// Patient pages
import PatientDashboard from './pages/patient/PatientDashboard';
import FindDoctors from './pages/patient/FindDoctors';
import BookAppointment from './pages/patient/BookAppointment';
import MyAppointments from './pages/patient/MyAppointments';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import DoctorList from './pages/admin/DoctorList';
import DoctorForm from './pages/admin/DoctorForm';
import PatientList from './pages/admin/PatientList';
import PatientEdit from './pages/admin/PatientEdit';
import AppointmentList from './pages/admin/AppointmentList';

// The whole route table for the app lives here. Patient and admin areas are
// each wrapped in a ProtectedRoute so the right role is enforced.
export default function App() {
  return (
    <Routes>
      {/* ── Public ── */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ── Patient ── */}
      <Route path="/patient" element={<ProtectedRoute role="patient"><PatientDashboard /></ProtectedRoute>} />
      <Route path="/patient/doctors" element={<ProtectedRoute role="patient"><FindDoctors /></ProtectedRoute>} />
      <Route path="/patient/book/:doctorId" element={<ProtectedRoute role="patient"><BookAppointment /></ProtectedRoute>} />
      <Route path="/patient/appointments" element={<ProtectedRoute role="patient"><MyAppointments /></ProtectedRoute>} />

      {/* ── Admin ── */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/doctors" element={<ProtectedRoute role="admin"><DoctorList /></ProtectedRoute>} />
      <Route path="/admin/doctors/add" element={<ProtectedRoute role="admin"><DoctorForm /></ProtectedRoute>} />
      <Route path="/admin/doctors/:doctorId/edit" element={<ProtectedRoute role="admin"><DoctorForm /></ProtectedRoute>} />
      <Route path="/admin/patients" element={<ProtectedRoute role="admin"><PatientList /></ProtectedRoute>} />
      <Route path="/admin/patients/:patientId/edit" element={<ProtectedRoute role="admin"><PatientEdit /></ProtectedRoute>} />
      <Route path="/admin/appointments" element={<ProtectedRoute role="admin"><AppointmentList /></ProtectedRoute>} />

      {/* Anything else → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
