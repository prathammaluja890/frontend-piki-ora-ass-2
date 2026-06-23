import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import client, { getErrorMessage } from '../../api/client';
import AdminNav from '../../components/AdminNav';

// Import the NEW, isolated CSS file
import './doctor-form.css'; 

const DAYS = [
  { code: 'mon', label: 'Monday' }, { code: 'tue', label: 'Tuesday' },
  { code: 'wed', label: 'Wednesday' }, { code: 'thu', label: 'Thursday' },
  { code: 'fri', label: 'Friday' }, { code: 'sat', label: 'Saturday' },
  { code: 'sun', label: 'Sunday' },
];

export default function DoctorForm() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(doctorId);

  const [form, setForm] = useState({
    first_name: '', last_name: '', username: '', email: '',
    date_of_birth: '', specialization: '',
  });
  
  const [days, setDays] = useState([]);
  const [slotsArray, setSlotsArray] = useState([]); 
  
  // --- Generator State ---
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [durationOption, setDurationOption] = useState('15');
  const [customDuration, setCustomDuration] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing) return;
    client.get(`/doctors/${doctorId}/`)
      .then((res) => {
        const d = res.data;
        setForm((f) => ({
          ...f,
          first_name: d.first_name, last_name: d.last_name,
          specialization: d.specialization,
        }));
        setDays(d.days_list || []);
        
        if (d.slots_list && d.slots_list.length > 0) {
          setSlotsArray(d.slots_list);
        }
      })
      .catch(() => setError('Could not load this doctor.'))
      .finally(() => setLoading(false));
  }, [doctorId, isEditing]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function toggleDay(code) {
    setDays((prev) => (prev.includes(code) ? prev.filter((d) => d !== code) : [...prev, code]));
  }

  // --- Slot Generator Logic ---
  function generateSlots() {
    if (!startTime || !endTime) {
      alert("Error: Please select both a start and end time.");
      return;
    }

    let minutes = parseInt(durationOption === 'custom' ? customDuration : durationOption);
    
    if (!minutes || minutes <= 0) {
      alert("Error: Please enter a valid duration in minutes.");
      return;
    }

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    if (start >= end) {
      alert("Error: End time must be after Start time.");
      return;
    }

    const generated = [];
    let current = start;

    while (current < end) {
      const hh = String(current.getHours()).padStart(2, '0');
      const mm = String(current.getMinutes()).padStart(2, '0');
      generated.push(`${hh}:${mm}`);
      current = new Date(current.getTime() + minutes * 60000);
    }

    setSlotsArray(generated);
  }

  // --- Individual Slot Handlers ---
  function handleSlotChange(index, value) {
    const newSlots = [...slotsArray];
    newSlots[index] = value;
    setSlotsArray(newSlots);
  }

  function addSlot() {
    setSlotsArray([...slotsArray, '']);
  }

  function removeSlot(index) {
    const newSlots = [...slotsArray];
    newSlots.splice(index, 1);
    setSlotsArray(newSlots);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (days.length === 0) {
      setError('Please select at least one available day.');
      return;
    }

    const validSlots = slotsArray.filter(slot => slot.trim() !== '');
    if (validSlots.length === 0) {
      setError('Please generate or add at least one valid time slot.');
      return;
    }
    const finalSlotsString = validSlots.join(', ');

    setSubmitting(true);
    try {
      if (isEditing) {
        await client.put(`/doctors/${doctorId}/`, {
          available_days: days,
          slots: finalSlotsString,
        });
      } else {
        const payload = {
          first_name: form.first_name, last_name: form.last_name,
          username: form.username, email: form.email,
          specialization: form.specialization,
          available_days: days, 
          slots: finalSlotsString,
        };
        if (form.date_of_birth) payload.date_of_birth = form.date_of_birth;
        await client.post('/doctors/', payload);
      }
      navigate('/admin/doctors');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <AdminNav />
      <div className="df-container">
        <Link className="df-back-link" to="/admin/doctors">← Back to Doctors List</Link>

        <div className="df-header">
          <h1>{isEditing ? 'Edit Doctor Details' : 'Register New Doctor'}</h1>
        </div>

        {error && <div className="df-error-msg"><b>{error}</b></div>}

        {loading ? (
          <div className="df-loading"><h2>Loading data...</h2></div>
        ) : (
          <div className="df-card">
            <form onSubmit={handleSubmit}>
              
              {!isEditing && (
                <>
                  <div className="df-row">
                    <div className="df-group">
                      <label>First Name</label>
                      <input className="df-input" type="text" name="first_name" value={form.first_name} onChange={handleChange} required />
                    </div>
                    <div className="df-group">
                      <label>Last Name</label>
                      <input className="df-input" type="text" name="last_name" value={form.last_name} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="df-row">
                    <div className="df-group">
                      <label>Username</label>
                      <input className="df-input" type="text" name="username" value={form.username} onChange={handleChange} required />
                    </div>
                    <div className="df-group">
                      <label>Email ID</label>
                      <input className="df-input" type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="df-row">
                    <div className="df-group">
                      <label>Date of Birth</label>
                      <input className="df-input" type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} />
                    </div>
                    <div className="df-group">
                      <label>Specialization</label>
                      <input className="df-input" type="text" name="specialization" value={form.specialization} onChange={handleChange} required />
                    </div>
                  </div>
                </>
              )}

              {isEditing && (
                <div className="df-group">
                  <label>Doctor Name</label>
                  <input className="df-input" type="text" value={`Dr. ${form.first_name} ${form.last_name} — ${form.specialization}`} disabled />
                </div>
              )}

              <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ccc' }} />

              <div className="df-group">
                <label>Available Days</label>
                <div className="df-days-wrapper">
                  {DAYS.map((d) => (
                    <label key={d.code} className={`df-day-label ${days.includes(d.code) ? 'selected' : ''}`}>
                      <input type="checkbox" checked={days.includes(d.code)} onChange={() => toggleDay(d.code)} />
                      {d.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* --- Generator Box --- */}
              <div className="df-generator-box">
                <h3>Bulk Slot Generator</h3>
                <div className="df-gen-controls">
                  <div className="df-gen-item">
                    <label>From:</label>
                    <input className="df-gen-input" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                  </div>
                  
                  <div className="df-gen-item">
                    <label>To:</label>
                    <input className="df-gen-input" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                  </div>

                  <div className="df-gen-item">
                    <label>Duration:</label>
                    <select className="df-gen-input" value={durationOption} onChange={(e) => setDurationOption(e.target.value)}>
                      <option value="10">10 Minutes</option>
                      <option value="15">15 Minutes</option>
                      <option value="20">20 Minutes</option>
                      <option value="30">30 Minutes</option>
                      <option value="60">1 Hour</option>
                      <option value="custom">Custom...</option>
                    </select>
                  </div>

                  {durationOption === 'custom' && (
                    <div className="df-gen-item">
                      <label>Mins:</label>
                      <input className="df-gen-input" type="number" style={{ width: '70px' }} value={customDuration} onChange={(e) => setCustomDuration(e.target.value)} placeholder="e.g. 45" />
                    </div>
                  )}

                  <button type="button" className="df-btn df-btn-generate" onClick={generateSlots}>
                    ⚙️ Generate
                  </button>
                </div>
              </div>

              {/* --- Slots Review --- */}
              <div className="df-group">
                <label>Final Time Slots (Review & Edit)</label>
                
                {slotsArray.length === 0 && <p style={{ color: '#888', fontStyle: 'italic', margin: 0 }}>No slots generated yet.</p>}

                <div className="df-slots-list">
                  {slotsArray.map((slot, index) => (
                    <div key={index} className="df-slot-item">
                      <input 
                        className="df-slot-input"
                        type="time" 
                        value={slot} 
                        onChange={(e) => handleSlotChange(index, e.target.value)} 
                        required 
                      />
                      <button type="button" className="df-btn-remove" onClick={() => removeSlot(index)} title="Remove Slot">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                
                <button type="button" className="df-btn df-btn-add" onClick={addSlot}>
                  ➕ Add Manual Slot
                </button>
              </div>

              <button type="submit" className="df-btn df-btn-submit" disabled={submitting}>
                {submitting ? 'Processing...' : isEditing ? 'Update Doctor Data' : 'Save New Doctor'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}