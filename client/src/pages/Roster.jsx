import { useEffect, useState } from 'react';
import { useCharacterStore } from '../store/characterStore';
import CharacterCard from '../components/CharacterCard';
import './ListPage.css';

const ORDERS = [
  { value: 'All', label: 'All' },
  { value: 'Vanguard', label: 'Survey Corps' },
  { value: 'Ironwatch', label: 'Marley Warriors' },
  { value: 'Cinder Corps', label: 'Military Police' },
  { value: 'Civilian', label: 'Civilians / Royals' },
  { value: 'Unaffiliated', label: 'Unaffiliated' },
];

const STATUSES = ['All', 'Active', 'KIA', 'Missing', 'Titan-Bonded'];

export default function Roster() {
  const { characters, status, fetchAll } = useCharacterStore();
  const [orderFilter, setOrderFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const filtered = characters.filter((c) => {
    const matchesOrder = orderFilter === 'All' || c.order === orderFilter;
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchesOrder && matchesStatus && matchesSearch;
  });

  return (
    <div className="container list-page">
      <div className="list-page__head">
        <div>
          <span className="mono-label">SURVEY CORPS ARCHIVE — FULL ROSTER</span>
          <h1>Character Roster</h1>
          <p style={{ color: 'var(--bone-dim)', marginTop: 8 }}>
            {filtered.length} of {characters.length} characters
          </p>
        </div>
        <input
          type="search"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="list-page__search"
        />
      </div>

      <div className="list-page__filter-group">
        <span className="mono-label" style={{ marginBottom: 8, display: 'block' }}>Filter by Faction</span>
        <div className="list-page__filters">
          {ORDERS.map((o) => (
            <button
              key={o.value}
              className={`filter-pill ${orderFilter === o.value ? 'filter-pill--active' : ''}`}
              onClick={() => setOrderFilter(o.value)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="list-page__filter-group">
        <span className="mono-label" style={{ marginBottom: 8, display: 'block' }}>Filter by Status</span>
        <div className="list-page__filters">
          {STATUSES.map((s) => (
            <button
              key={s}
              className={`filter-pill ${statusFilter === s ? 'filter-pill--active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {status === 'loading' && <p className="mono-label">Loading dossiers...</p>}
      {status === 'error' && <p className="mono-label">Could not reach the archive. Check your server connection.</p>}

      <div className="grid">
        {filtered.map((c, i) => (
          <CharacterCard key={c.slug} character={c} index={i} />
        ))}
      </div>

      {status === 'success' && filtered.length === 0 && (
        <p className="mono-label" style={{ marginTop: 24 }}>No characters match that filter.</p>
      )}
    </div>
  );
}
