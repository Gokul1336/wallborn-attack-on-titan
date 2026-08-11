import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './Auth.css';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, error, clearError } = useAuthStore();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    clearError();
    setSubmitting(true);
    const result = await signup(form);
    setSubmitting(false);
    if (result.success) navigate('/');
  }

  return (
    <div className="container auth-page">
      <div className="auth-card">
        <span className="mono-label">NEW RECRUIT INTAKE</span>
        <h1>Enlist</h1>
        <p className="auth-card__lede">Create an account to favorite personnel and file field notes.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span className="mono-label">Username</span>
            <input
              type="text"
              required
              minLength={3}
              maxLength={24}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </label>
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
              minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          {error && <p className="auth-form__error mono-label">{error}</p>}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Processing...' : 'Enlist'}
          </button>
        </form>

        <p className="auth-card__switch mono-label">
          Already enlisted? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
