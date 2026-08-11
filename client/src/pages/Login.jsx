import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    clearError();
    setSubmitting(true);
    const result = await login(form);
    setSubmitting(false);
    if (result.success) navigate('/');
  }

  return (
    <div className="container auth-page auth-page--login">
      <video
        className="auth-page__video-bg"
        src="/videos/login-bg.mp4"
        poster="/videos/login-bg-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="auth-card">
        <span className="mono-label">ACCESS REQUEST</span>
        <h1>Log In</h1>
        <p className="auth-card__lede">Resume access to your dossier and field notes.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span className="mono-label">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            <span className="mono-label">Password</span>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>
          <Link to="/forgot-password" className="auth-form__forgot mono-label">
            Forgot password?
          </Link>

          {error && <p className="auth-form__error mono-label">{error}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Verifying...' : 'Log In'}
          </button>
        </form>

        <p className="auth-card__switch mono-label">
          No clearance yet? <Link to="/signup">Enlist here</Link>
        </p>
      </div>
    </div>
  );
}
