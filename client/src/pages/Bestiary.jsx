import { useEffect, useState } from 'react';
import { useTitanStore } from '../store/titanStore';
import TitanCard from '../components/TitanCard';
import './ListPage.css';

const CLASSES = ['All', 'Wandering', 'Sentinel', 'Apex', 'Sealed God', 'Unknown'];

export default function Bestiary() {
  const { titans, status, fetchAll } = useTitanStore();
  const [classFilter, setClassFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const filtered = titans.filter((t) => {
    const matchesClass = classFilter === 'All' || t.classification === classFilter;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <div className="container list-page">
      <div className="list-page__head">
        <div>
          <span className="mono-label">BLOODLINE DIVISION — THREAT ARCHIVE</span>
          <h1>Hollow Kin Bestiary</h1>
        </div>
        <input
          type="search"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="list-page__search"
        />
      </div>

      <div className="list-page__filters">
        {CLASSES.map((c) => (
          <button
            key={c}
            className={`filter-pill ${classFilter === c ? 'filter-pill--active' : ''}`}
            onClick={() => setClassFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {status === 'loading' && <p className="mono-label">Loading threat archive...</p>}
      {status === 'error' && <p className="mono-label">Could not reach the archive. Try again shortly.</p>}

      <div className="grid">
        {filtered.map((t, i) => (
          <TitanCard key={t.slug} titan={t} index={i} />
        ))}
      </div>

      {status === 'success' && filtered.length === 0 && (
        <p className="mono-label">No Hollow Kin match that filter.</p>
      )}
    </div>
  );
}
