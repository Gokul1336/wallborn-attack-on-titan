import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
      <span className="mono-label">FILE NOT FOUND — 404</span>
      <h1 style={{ marginTop: '12px', fontSize: '2.5rem' }}>This record doesn't exist.</h1>
      <p style={{ color: 'var(--bone-dim)', marginTop: '12px' }}>
        It may have been sealed by the Inner Council, or never filed at all.
      </p>
      <Link to="/" className="mono-label" style={{ display: 'inline-block', marginTop: '24px' }}>
        ← Return to the archive
      </Link>
    </div>
  );
}
