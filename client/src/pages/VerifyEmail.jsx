import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './Auth.css';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { user, verifyEmail, resendOtp } = useAuthStore();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (user?.isVerified) {
      navigate('/profile', { replace: true });
    }
  }, [user?.isVerified]);

  if (user?.isVerified) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setNotice('');
    setSubmitting(true);
    const result = await verifyEmail(code);
    setSubmitting(false);
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.message);
    }
  }

  async function handleResend() {
    setError('');
    setNotice('');
    setResending(true);
    const result = await resendOtp();
    setResending(false);
    if (result.success) {
      setNotice('A new code is on its way to your email.');
    } else {
      setError(result.message);
    }
  }

  return (
    <div className="container auth-page">
      <div className="auth-card">
        <span className="mono-label">IDENTITY CONFIRMATION</span>
        <h1>Verify Your Email</h1>
        <p className="auth-card__lede">
          We sent a 6-digit code to <strong>{user?.email}</strong>. Enter it below to confirm your account.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span className="mono-label">Verification Code</span>
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

          {error && <p className="auth-form__error mono-label">{error}</p>}
          {notice && <p className="auth-form__notice mono-label">{notice}</p>}

          <button type="submit" disabled={submitting || code.length !== 6}>
            {submitting ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <p className="auth-card__switch mono-label">
          Didn't get a code?{' '}
          <button className="auth-card__link-btn" onClick={handleResend} disabled={resending}>
            {resending ? 'Sending...' : 'Resend code'}
          </button>
        </p>
      </div>
    </div>
  );
}
