import './Portrait.css';

function getInitials(name) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

export default function Portrait({ name, color = '#3D5A6C', imageUrl, size = 'md', type = 'character' }) {
  // Show real image if URL is set and not empty
  if (imageUrl && imageUrl.trim() !== '') {
    return (
      <div className={`portrait portrait--${size}`}>
        <img
          src={imageUrl}
          alt={name}
          className="portrait__image"
          loading="lazy"
          onError={(e) => {
            // Fallback to initials placeholder if image fails to load
            e.target.style.display = 'none';
            e.target.parentNode.classList.add('portrait--broken');
          }}
        />
        <div className="portrait__vignette" />
      </div>
    );
  }

  // Placeholder with initials
  return (
    <div
      className={`portrait portrait--${size} portrait--placeholder portrait--${type}`}
      style={{ '--portrait-color': color }}
    >
      <span className="portrait__initials">{getInitials(name)}</span>
    </div>
  );
}
