import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './VerifyBanner.css';

export default function VerifyBanner() {
  const { user, status } = useAuthStore();
  const location = useLocation();
  const [dismissed, setDismissed] = useState(false);

  const shouldShow =
    status === 'authenticated' &&
    user &&
    !user.isVerified &&
    !dismissed &&
    location.pathname !== '/verify-email';

  if (!shouldShow) return null;

  return (
    <div className="verify-banner">
      <div className="container verify-banner__inner">
        <span>
          Your email isn't verified yet. <Link to="/verify-email">Verify now →</Link>
        </span>
        <button className="verify-banner__close" onClick={() => setDismissed(true)} aria-label="Dismiss">
          ×
        </button>
      </div>
    </div>
  );
}
