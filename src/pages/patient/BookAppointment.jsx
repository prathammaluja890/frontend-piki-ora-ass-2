import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import client, { getErrorMessage } from '../../api/client';
import PatientNav from '../../components/PatientNav';
import { initials, formatDate } from '../../utils/helpers';
import './patient.css';

// Handles both booking a brand-new appointment and rescheduling an existing
// one. Reschedule mode is triggered when "My Appointments" passes an
// appointmentId through the router state.
export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const editingId = location.state?.appointmentId || null;
  const isEditing = Boolean(editingId);

  const [availability, setAvailability] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load this doctor's available dates + slots (and which are already taken).
  useEffect(() => {
    client.get(`/doctors/${doctorId}/availability/`)
      .then((res) => setAvailability(res.data))
      .catch(() => setError('Could not load this doctor\'s availability.'))
      .finally(() => setLoading(false));
  }, [doctorId]);

  // Work out which slots are still free for the chosen date.
  const bookedForDate = (availability?.booked || [])
    .filter((b) => b.date === selectedDate)
    .map((b) => b.slot);
  const freeSlots = (availability?.slots || []).filter((s) => !bookedForDate.includes(s));

  function pickDate(date) {
    setSelectedDate(date);
    setSelectedSlot('');  // reset slot whenever the date changes
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!selectedDate || !selectedSlot) {
      setError('Please select both a date and a time slot.');
      return;
    }

    setSubmitting(true);
    try {
      if (isEditing) {
        // Reschedule the existing appointment.
        await client.put(`/appointments/${editingId}/`, { date: selectedDate, slot: selectedSlot });
        navigate('/patient/appointments', { state: { message: 'Appointment updated successfully.' } });
      } else {
        // Brand new booking.
        await client.post('/appointments/', { doctor: doctorId, date: selectedDate, slot: selectedSlot });
        navigate('/patient/appointments', { state: { message: 'Appointment booked successfully.' } });
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  const doctor = availability?.doctor;

  return (
    <>
      <PatientNav />
      <div className="page page-narrow fade-up">
        <Link className="back-link" to="/patient/doctors">← Back to Doctors</Link>

        {loading ? (
          <div className="loading">Loading…</div>
        ) : (
          <>
            {doctor && (
              <div className="bk-doctor">
                <div className="avatar bk-doctor-avatar">{initials(doctor.first_name, doctor.last_name)}</div>
                <div>
                  <div className="pt-doc-card-name">Dr. {doctor.full_name}</div>
                  <div className="pt-doc-card-spec">{doctor.specialization}</div>
                </div>
              </div>
            )}

            <div className="card">
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', marginBottom: '22px' }}>
                {isEditing ? 'Reschedule Appointment' : 'Select Date & Time'}
              </h2>

              {error && <div className="msg msg-error">{error}</div>}

              <form onSubmit={handleSubmit}>
                {/* Date picker */}
                <div className="form-group">
                  <span className="bk-label">Choose a Date</span>
                  {availability?.available_dates?.length ? (
                    <div className="bk-grid">
                      {availability.available_dates.map((date) => (
                        <div
                          key={date}
                          className={`bk-option ${selectedDate === date ? 'selected' : ''}`}
                          onClick={() => pickDate(date)}
                        >
                          <small>{formatDate(date).split(',')[0]}</small>
                          <strong>{formatDate(date).split(' ').slice(1, 3).join(' ')}</strong>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty" style={{ padding: '14px' }}>No available dates in the next two weeks for this doctor.</div>
                  )}
                </div>

                <hr className="bk-divider" />

                {/* Slot picker */}
                <div className="form-group">
                  <span className="bk-label">Choose a Time Slot</span>
                  {!selectedDate ? (
                    <div className="bk-hint">← Pick a date first to see available slots</div>
                  ) : freeSlots.length === 0 ? (
                    <div className="empty" style={{ padding: '14px' }}>All slots are booked for this date. Please choose another.</div>
                  ) : (
                    <div className="bk-grid">
                      {freeSlots.map((slot) => (
                        <div
                          key={slot}
                          className={`bk-option ${selectedSlot === slot ? 'selected' : ''}`}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {selectedDate && selectedSlot && (
                  <button type="submit" className="btn btn-primary btn-block" disabled={submitting} style={{ marginTop: '20px' }}>
                    {submitting ? 'Saving…' : isEditing ? 'Update Appointment' : 'Confirm Booking'}
                  </button>
                )}
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
