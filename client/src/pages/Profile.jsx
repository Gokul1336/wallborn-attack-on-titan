import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import './Profile.css';

export default function Profile() {
  const { user } = useAuthStore();
  const { stats, status, uploading, uploadError, fetchProfile, uploadAvatar } = useProfileStore();
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  function handlePickFile() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    await uploadAvatar(file);
    e.target.value = ''; // allow re-selecting the same file later
  }

  if (status === 'loading' && !user) {
    return (
      <div className="container detail-page">
        <p className="mono-label">Loading profile...</p>
      </div>
    );
  }

  const avatarSrc = previewUrl || user?.avatarUrl;
  const joined = stats?.memberSince
    ? new Date(stats.memberSince).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
    : null;

  return (
    <div className="container profile-page profile-page--video">
      <video
        className="profile-page__video-bg"
        src="/videos/profile-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <span className="mono-label">PERSONNEL FILE</span>
      <h1>Your Profile</h1>

      <div className="profile-card">
        <div className="profile-card__avatar-col">
          <div className="profile-avatar">
            {avatarSrc ? (
              <img src={avatarSrc} alt={user?.username} />
            ) : (
              <span className="profile-avatar__placeholder">
                {user?.username?.[0]?.toUpperCase() || '?'}
              </span>
            )}
            {uploading && <div className="profile-avatar__overlay">Uploading...</div>}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button className="profile-avatar__btn" onClick={handlePickFile} disabled={uploading}>
            {user?.avatarUrl ? 'Change Photo' : 'Upload Photo'}
          </button>
          {uploadError && <p className="auth-form__error mono-label">{uploadError}</p>}
        </div>

        <div className="profile-card__details">
          <div className="profile-fact">
            <span className="mono-label">Username</span>
            <span>{user?.username}</span>
          </div>
          <div className="profile-fact">
            <span className="mono-label">Email</span>
            <span>{user?.email}</span>
          </div>
          <div className="profile-fact">
            <span className="mono-label">Status</span>
            <span>
              {user?.isVerified ? (
                <span className="profile-badge profile-badge--verified">Verified</span>
              ) : (
                <span className="profile-badge profile-badge--unverified">
                  Unverified — <Link to="/verify-email">verify now</Link>
                </span>
              )}
            </span>
          </div>
          <div className="profile-fact">
            <span className="mono-label">Role</span>
            <span style={{ textTransform: 'capitalize' }}>{user?.role}</span>
          </div>
          {joined && (
            <div className="profile-fact">
              <span className="mono-label">Member Since</span>
              <span>{joined}</span>
            </div>
          )}
          <div className="profile-fact">
            <span className="mono-label">Saved Dossier</span>
            <span>
              {stats ? `${stats.favoriteCharacterCount} personnel, ${stats.favoriteTitanCount} Hollow Kin` : '—'}
              {' '}
              <Link to="/favorites">View →</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
