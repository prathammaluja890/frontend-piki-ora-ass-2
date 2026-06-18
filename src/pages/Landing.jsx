import { Link } from 'react-router-dom';
import './Landing.css';

// Public marketing/landing page. This is the same content as the Assignment 1
// home page, rebuilt as a React component. It's mostly static, with the old
// {% url %} links swapped for React Router <Link>s.
export default function Landing() {
  return (
    <div className="lp">

      {/* ── NAVBAR ── */}
      <nav className="lp-nav">
        <Link className="lp-logo" to="/">
          <div className="lp-logo-icon">
            <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H8v-2h4v2zm4-4H8v-2h8v2zm0-4H8V7h8v2z"/></svg>
          </div>
          <div className="lp-logo-text">Piki Ora<span>Medical Centre</span></div>
        </Link>

        <ul className="lp-nav-links">
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#doctors">Our Doctors</a></li>
          <li><a href="#why-us">Why Us</a></li>
        </ul>

        <div className="lp-nav-actions">
          <Link to="/login" className="btn btn-outline">Log In</Link>
          <Link to="/register" className="btn btn-primary">Sign Up</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div>
          <div className="lp-badge"><div className="lp-badge-dot"></div>Now accepting new patients</div>
          <h1 className="lp-hero-title">Your Health,<br /><em>Simplified</em> &amp; Online</h1>
          <p className="lp-hero-desc">
            Book appointments with trusted doctors at Piki Ora Medical Centre — anytime,
            from anywhere. No phone queues, no waiting rooms.
          </p>
          <div className="lp-hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">Book an Appointment</Link>
            <a href="#doctors" className="btn btn-outline btn-lg">Meet Our Doctors</a>
          </div>
          <div className="lp-hero-stats">
            <div><div className="lp-stat-num">12+</div><div className="lp-stat-label">Specialist doctors</div></div>
            <div><div className="lp-stat-num">2,400+</div><div className="lp-stat-label">Patients served</div></div>
            <div><div className="lp-stat-num">98%</div><div className="lp-stat-label">Satisfaction rate</div></div>
          </div>
        </div>

        <div className="lp-hero-visual">
          <div className="lp-pill lp-pill-top">
            <span style={{ fontSize: '18px' }}>✓</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#0a4a3a' }}>Booking Confirmed</div>
              <div className="lp-pill-muted">Dr. Patel – 9:00 AM</div>
            </div>
          </div>

          <div className="lp-card-main">
            <div className="lp-card-head">
              <span className="lp-card-title">Available Doctors</span>
              <span className="lp-card-badge">Today</span>
            </div>
            <div className="lp-doc-row">
              <div className="lp-doc-avatar" style={{ background: '#e1f5ee', color: '#0a4a3a' }}>SP</div>
              <div><div className="lp-doc-name">Dr. Shreya Patel</div><div className="lp-doc-spec">General Practice</div></div>
              <span className="lp-doc-avail">3 slots</span>
            </div>
            <div className="lp-doc-row">
              <div className="lp-doc-avatar" style={{ background: '#e6f1fb', color: '#185fa5' }}>JL</div>
              <div><div className="lp-doc-name">Dr. James Liu</div><div className="lp-doc-spec">Cardiology</div></div>
              <span className="lp-doc-avail">5 slots</span>
            </div>
            <div className="lp-doc-row">
              <div className="lp-doc-avatar" style={{ background: '#faeeda', color: '#854f0b' }}>AM</div>
              <div><div className="lp-doc-name">Dr. Anika Moana</div><div className="lp-doc-spec">Paediatrics</div></div>
              <span className="lp-doc-avail">2 slots</span>
            </div>
          </div>

          <div className="lp-pill lp-pill-bottom">
            <span style={{ fontSize: '18px' }}>🔒</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#0a4a3a' }}>Secure &amp; Private</div>
              <div className="lp-pill-muted">Your data is protected</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="lp-section lp-steps" id="how-it-works">
        <div className="lp-steps-head">
          <div className="lp-label">Simple process</div>
          <h2 className="lp-section-title">Book in 3 easy steps</h2>
          <p className="lp-section-desc">From registration to your confirmed appointment — it takes less than 2 minutes.</p>
        </div>
        <div className="lp-steps-grid">
          <div className="lp-step">
            <div className="lp-step-num">01</div>
            <div className="lp-step-icon"><svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg></div>
            <div className="lp-step-title">Create Your Account</div>
            <p className="lp-step-text">Register in seconds with your name, email, and contact details. Your profile is secure and private.</p>
          </div>
          <div className="lp-step">
            <div className="lp-step-num">02</div>
            <div className="lp-step-icon"><svg viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg></div>
            <div className="lp-step-title">Choose a Doctor &amp; Slot</div>
            <p className="lp-step-text">Browse available doctors, view their specialties, and pick a time slot that fits your schedule.</p>
          </div>
          <div className="lp-step">
            <div className="lp-step-num">03</div>
            <div className="lp-step-icon"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>
            <div className="lp-step-title">Confirmed!</div>
            <p className="lp-step-text">Receive an instant confirmation. View, reschedule, or cancel your appointment anytime from your dashboard.</p>
          </div>
        </div>
      </section>

      {/* ── DOCTORS ── */}
      <section className="lp-section lp-doctors" id="doctors">
        <div className="lp-doctors-top">
          <div>
            <div className="lp-label">Our team</div>
            <h2 className="lp-section-title">Meet Our Specialists</h2>
            <p className="lp-section-desc">Qualified, experienced, and ready to care for you and your family.</p>
          </div>
          <Link to="/register" className="btn btn-primary">Book Appointment</Link>
        </div>
        <div className="lp-doctors-grid">
          {[
            { i: 'SP', bg: '#e1f5ee', c: '#0a4a3a', n: 'Dr. Shreya Patel', q: 'MBBS, FRNZCGP', t: ['General Practice', 'Family Health'], a: 'Available today' },
            { i: 'JL', bg: '#e6f1fb', c: '#185fa5', n: 'Dr. James Liu', q: 'MD, FRACP', t: ['Cardiology', 'Internal Medicine'], a: 'Available today' },
            { i: 'AM', bg: '#faeeda', c: '#854f0b', n: 'Dr. Anika Moana', q: 'MBChB, FRACP', t: ['Paediatrics', 'Child Wellness'], a: 'Next slot: 2:00 PM' },
            { i: 'RN', bg: '#fbeaf0', c: '#993556', n: 'Dr. Rachel Nguyen', q: 'MBBS, FRANZCOG', t: ["Women's Health", 'Obstetrics'], a: 'Available tomorrow' },
          ].map((d) => (
            <div className="lp-doctor-card" key={d.n}>
              <div className="lp-doctor-card-avatar" style={{ background: d.bg, color: d.c }}>{d.i}</div>
              <div className="lp-doctor-card-name">{d.n}</div>
              <div className="lp-doctor-card-spec">{d.q}</div>
              <div className="lp-tags">{d.t.map((tag) => <span className="lp-tag" key={tag}>{tag}</span>)}</div>
              <div className="lp-avail-row"><div className="lp-avail-dot"></div>{d.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="lp-section lp-why" id="why-us">
        <div className="lp-label">Why choose us</div>
        <h2 className="lp-section-title">Healthcare Made for Modern Life</h2>
        <div className="lp-why-grid">
          <div className="lp-why-features">
            <div className="lp-why-feature">
              <div className="lp-why-icon"><svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z"/></svg></div>
              <div><div className="lp-why-title">Secure &amp; Private</div><p className="lp-why-text">Your health data is encrypted and protected. We comply with all healthcare privacy regulations.</p></div>
            </div>
            <div className="lp-why-feature">
              <div className="lp-why-icon"><svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg></div>
              <div><div className="lp-why-title">24/7 Online Booking</div><p className="lp-why-text">Book, reschedule, or cancel appointments any time of day — no phone calls required.</p></div>
            </div>
            <div className="lp-why-feature">
              <div className="lp-why-icon"><svg viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg></div>
              <div><div className="lp-why-title">No Double Bookings</div><p className="lp-why-text">Our system automatically prevents double bookings, so your time slot is always guaranteed.</p></div>
            </div>
          </div>

          <div className="lp-why-visual">
            <div className="lp-confirm">
              <div className="lp-confirm-top">
                <div className="lp-confirm-icon"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>
                <div><div className="lp-confirm-label">Appointment</div><div className="lp-confirm-title">Booking Confirmed</div></div>
              </div>
              <div className="lp-confirm-row"><span className="lp-confirm-key">Doctor</span><span className="lp-confirm-val">Dr. Shreya Patel</span></div>
              <div className="lp-confirm-row"><span className="lp-confirm-key">Date</span><span className="lp-confirm-val">Tuesday, 29 Apr 2026</span></div>
              <div className="lp-confirm-row"><span className="lp-confirm-key">Time</span><span className="lp-confirm-val">9:00 AM – 9:30 AM</span></div>
            </div>
            <div className="lp-notif">
              <span style={{ fontSize: '20px' }}>🔔</span>
              <div className="lp-notif-text"><strong>Reminder sent!</strong> You&apos;ll receive a notification before your appointment.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta">
        <div className="lp-label" style={{ color: '#5dcaa5' }}>Ready to get started?</div>
        <h2 className="lp-section-title">Book Your Appointment Today</h2>
        <p>Join thousands of patients who manage their health easily with Piki Ora Medical Centre.</p>
        <div className="lp-cta-actions">
          <Link to="/register" className="lp-btn-white">Create Free Account</Link>
          <a href="#how-it-works" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>See How It Works</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-grid">
          <div>
            <div className="lp-footer-logo">
              <div className="lp-footer-logo-icon"><svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg></div>
              <span className="lp-footer-logo-text">Piki Ora Medical Centre</span>
            </div>
            <p>Providing trusted, accessible healthcare for the Auckland community. Book online, see a doctor, feel better.</p>
          </div>
          <div className="lp-footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#doctors">Our Doctors</a></li>
              <li><a href="#why-us">Why Choose Us</a></li>
            </ul>
          </div>
          <div className="lp-footer-col">
            <h4>Patient</h4>
            <ul>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Log In</Link></li>
            </ul>
          </div>
        </div>
        <div className="lp-footer-bottom">© 2026 Piki Ora Medical Centre. All rights reserved.</div>
      </footer>
    </div>
  );
}
