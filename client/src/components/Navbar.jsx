import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import './Navbar.css';

export default function Navbar() {
  const { user, status, logout } = useAuthStore();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-mark">⚔</span>
          ATTACK ON TITAN
        </Link>

        <nav className="navbar__links">
          <NavLink to="/characters" className="navbar__link">
            Roster
          </NavLink>
          <NavLink to="/titans" className="navbar__link">
            Hollow Kin
          </NavLink>
          <NavLink to="/story" className="navbar__link">
            Chronicle
          </NavLink>
        </nav>

        <div className="navbar__auth">
          {status === 'authenticated' && user ? (
            <>
              <Link to="/favorites" className="navbar__link">
                Favorites
              </Link>
              <Link to="/profile" className="navbar__link navbar__link--favorites">
                Profile ({user.username})
              </Link>
              <button className="navbar__logout" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__link">
                Log in
              </Link>
              <Link to="/signup" className="navbar__cta">
                Join Corps
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
