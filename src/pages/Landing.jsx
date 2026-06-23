import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/">🏥 Piki Ora Medical Centre</Link>
        </div>
        
        <ul className="nav-links">
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#doctors">Our Doctors</a></li>
          <li><a href="#why-us">Why Us</a></li>
        </ul>

        <div className="nav-buttons">
          <Link to="/login" className="btn btn-login">Log In</Link>
          <Link to="/register" className="btn btn-signup">Sign Up</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero-section">
        <div className="hero-content">
          <span className="badge">⭐ Now accepting new patients</span>
          <h1>Your Health, Simplified & Online</h1>
          <p>
            Book appointments with trusted doctors at Piki Ora Medical Centre — anytime,
            from anywhere. No phone queues, no waiting rooms.
          </p>
          
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">Book an Appointment</Link>
            <a href="#doctors" className="btn btn-secondary">Meet Our Doctors</a>
          </div>
          
          <div className="hero-stats">
            <div className="stat-box">
              <h2>12+</h2>
              <p>Specialists</p>
            </div>
            <div className="stat-box">
              <h2>2400+</h2>
              <p>Patients</p>
            </div>
          </div>
        </div>

        <div className="hero-image-placeholder">
          <div className="info-card">
            <h3>👨‍⚕️ Available Today</h3>
            <ul>
              <li>Dr. Shreya Patel (General)</li>
              <li>Dr. James Liu (Cardiology)</li>
              <li>Dr. Anika Moana (Paediatrics)</li>
            </ul>
            <p className="secure-text">🔒 Secure & Private</p>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="steps-section">
        <h2>Book in 3 easy steps</h2>
        <p>From registration to your confirmed appointment — it takes less than 2 minutes.</p>
        
        <div className="steps-wrapper">
          <div className="step-card">
            <h1>1</h1>
            <h3>Create Account</h3>
            <p>Register with your name, email, and contact details.</p>
          </div>
          <div className="step-card">
            <h1>2</h1>
            <h3>Choose a Doctor</h3>
            <p>Browse available doctors and pick a time slot.</p>
          </div>
          <div className="step-card">
            <h1>3</h1>
            <h3>Confirmed!</h3>
            <p>Receive an instant confirmation on your dashboard.</p>
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section id="doctors" className="doctors-section">
        <h2>Meet Our Specialists</h2>
        
        <div className="doctors-grid">
          <div className="doc-card">
            <div className="doc-avatar">SP</div>
            <h3>Dr. Shreya Patel</h3>
            <p>MBBS, FRNZCGP</p>
            <p className="doc-avail">Available today</p>
          </div>
          <div className="doc-card">
            <div className="doc-avatar">JL</div>
            <h3>Dr. James Liu</h3>
            <p>MD, FRACP</p>
            <p className="doc-avail">Available today</p>
          </div>
          <div className="doc-card">
            <div className="doc-avatar">AM</div>
            <h3>Dr. Anika Moana</h3>
            <p>MBChB, FRACP</p>
            <p className="doc-avail">Next slot: 2:00 PM</p>
          </div>
          <div className="doc-card">
            <div className="doc-avatar">RN</div>
            <h3>Dr. Rachel Nguyen</h3>
            <p>MBBS, FRANZCOG</p>
            <p className="doc-avail">Available tomorrow</p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="why-section">
        <h2>Why choose us</h2>
        <div className="why-content">
          <ul>
            <li><strong>✅ Secure & Private:</strong> Your health data is encrypted and protected.</li>
            <li><strong>✅ 24/7 Online Booking:</strong> Book any time of day — no phone calls required.</li>
            <li><strong>✅ No Double Bookings:</strong> Our system guarantees your time slot.</li>
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-about">
            <h3>Piki Ora Medical Centre</h3>
            <p>Providing trusted, accessible healthcare for the Auckland community.</p>
          </div>
          <div className="footer-links-box">
            <h4>Quick Links</h4>
            <a href="#how-it-works">How It Works</a><br/>
            <a href="#doctors">Our Doctors</a>
          </div>
        </div>
        <p className="footer-bottom">© 2026 Piki Ora Medical Centre. All rights reserved.</p>
      </footer>

    </div>
  );
}