import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../../api/client';
import PatientNav from '../../components/PatientNav';
import { initials, formatDays } from '../../utils/helpers';
import './patient.css';

export default function FindDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Re-fetch whenever the search term changes. A small debounce keeps us from
  // firing a request on every single keystroke.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      client.get('/doctors/', { params: { search } })
        .then((res) => setDoctors(res.data))
        .catch(() => setDoctors([]))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <PatientNav />
      <div className="page fade-up">
        <div className="page-header">
          <div className="page-eyebrow">Our Team</div>
          <h1 className="page-title">Find a <em>Doctor</em></h1>
          <p className="page-sub">Browse our specialists and book an available slot.</p>
        </div>

        <div className="toolbar">
          <input
            type="text" placeholder="Search by name or specialization…"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading">Loading doctors…</div>
        ) : doctors.length === 0 ? (
          <div className="empty">No doctors match your search.</div>
        ) : (
          <div className="pt-doc-grid">
            {doctors.map((doc) => (
              <div className="pt-doc-card" key={doc.id}>
                <div className="pt-doc-card-top">
                  <div className="avatar pt-doc-card-avatar">{initials(doc.first_name, doc.last_name)}</div>
                  <div>
                    <div className="pt-doc-card-name">Dr. {doc.full_name}</div>
                    <div className="pt-doc-card-spec">{doc.specialization}</div>
                  </div>
                </div>

                <div className="pt-doc-meta">Available: <strong>{formatDays(doc.days_list) || '—'}</strong></div>
                <div className="pt-doc-meta">{doc.total_slots} time slot{doc.total_slots !== 1 ? 's' : ''} per day</div>

                <div className="pt-chip-row">
                  {doc.slots_list.slice(0, 4).map((s) => <span className="pt-chip" key={s}>{s}</span>)}
                  {doc.slots_list.length > 4 && <span className="pt-chip">+{doc.slots_list.length - 4}</span>}
                </div>

                <Link to={`/patient/book/${doc.id}`} className="btn btn-primary btn-block">Book Appointment</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
