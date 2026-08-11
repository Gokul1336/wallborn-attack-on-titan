import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './Auth.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { forgotPassword, resetPassword } = useAuthStore();

  const [step, setStep] = useState(1); // 1 = request code, 2 = enter code + new password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleRequestCode(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const result = await forgotPassword(email);
    setSubmitting(false);
    setNotice(result.message);
    if (result.success) setStep(2);
  }

  async function handleReset(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const result = await resetPassword({ email, code, newPassword });
    setSubmitting(false);
    if (result.success) {
      navigate('/login', { state: { justReset: true } });
    } else {
      setError(result.message);
    }
  }

  return (
    <div className="container auth-page">
      <div className="auth-card">
        <span className="mono-label">ACCOUNT RECOVERY</span>
        <h1>Forgot Password</h1>

        {step === 1 ? (
          <>
            <p className="auth-card__lede">Enter the email on your account and we'll send a reset code.</p>
            <form onSubmit={handleRequestCode} className="auth-form">
              <label>
                <span className="mono-label">Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              {notice && <p className="auth-form__notice mono-label">{notice}</p>}

              <button type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Reset Code'}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="auth-card__lede">Enter the code we sent to <strong>{email}</strong> and choose a new password.</p>
            <form onSubmit={handleReset} className="auth-form">
              <label>
                <span className="mono-label">Reset Code</span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  style={{ letterSpacing: '0.3em', fontSize: '1.1rem', textAlign: 'center' }}
                />
              </label>
              <label>
                <span className="mono-label">New Password</span>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>

              {error && <p className="auth-form__error mono-label">{error}</p>}

              <button type="submit" disabled={submitting || code.length !== 6}>
                {submitting ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>

            <p className="auth-card__switch mono-label">
              <button className="auth-card__link-btn" onClick={() => setStep(1)}>
                ← Use a different email
              </button>
            </p>
          </>
        )}

        <p className="auth-card__switch mono-label">
          Remembered it? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
