import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCharacterStore } from '../store/characterStore';
import { useTitanStore } from '../store/titanStore';
import CharacterCard from '../components/CharacterCard';
import TitanCard from '../components/TitanCard';
import './Home.css';

export default function Home() {
  const { featured: featuredChars, fetchFeatured: fetchCharFeatured } = useCharacterStore();
  const { featured: featuredTitans, fetchFeatured: fetchTitanFeatured } = useTitanStore();

  useEffect(() => {
    fetchCharFeatured();
    fetchTitanFeatured();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        {/* Layer 1: Video background — bottom, full viewport */}
        <video
          className="hero__video-bg"
          src="/videos/hero-bg.mp4"
          poster="/videos/hero-bg-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />

        {/* Layer 2: Static colossal titan image blended over video */}
        <div className="hero__bg-image" aria-hidden="true" />

        {/* Layer 3: Dark gradient for readability */}
        <div className="hero__overlay" aria-hidden="true" />

        {/* Layer 4: Red atmospheric glow */}
        <div className="hero__glow" aria-hidden="true" />

        {/* Layer 5: Floating ember particles */}
        <div className="hero__particles" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="hero__particle" />
          ))}
        </div>

        {/* Layer 6: Horizontal scan line */}
        <div className="hero__scan-line" aria-hidden="true" />

        {/* Content */}
        <div className="container hero__content">
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.1em' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="mono-label hero__eyebrow"
          >
            CLASSIFIED — SURVEY CORPS ARCHIVE — YEAR 854
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="hero__title"
          >
            ATTACK ON TITAN
            <span className="hero__subtitle">Shingeki no Kyojin — Character Archive</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="hero__lede"
          >
            Every soldier, warrior, Titan holder and creature in the war between
            Paradis and Marley — from the fall of Shiganshina to the Rumbling.
            The complete dossier of humanity's last stand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.7 }}
            className="hero__actions"
          >
            <Link to="/characters" className="hero__btn hero__btn--primary">
              ⚔ View All Characters
            </Link>
            <Link to="/titans" className="hero__btn hero__btn--secondary">
              The Nine Titans
            </Link>
            <Link to="/story" className="hero__btn hero__btn--secondary">
              Read Chronicle
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="hero__stats"
          >
            {[
              { num: '30+', label: 'Characters' },
              { num: '9',   label: 'Titan Powers' },
              { num: '2000', label: 'Years of History' },
              { num: '4',   label: 'Story Arcs' },
            ].map(({ num, label }) => (
              <div key={label} className="hero__stat">
                <span className="hero__stat-num">{num}</span>
                <span className="mono-label">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Characters */}
      <section className="container section">
        <div className="section__head">
          <div>
            <span className="mono-label" style={{ color: 'var(--signal-flare)' }}>
              SURVEY CORPS — FEATURED PERSONNEL
            </span>
            <h2 style={{ marginTop: 8 }}>Main Characters</h2>
          </div>
          <Link to="/characters" className="mono-label section__see-all">
            View all 30+ →
          </Link>
        </div>
        {featuredChars.length === 0 ? (
          <p className="mono-label" style={{ color: 'var(--bone-dim)' }}>
            Run the seed script to load characters: <code>node src/seed/seed.js</code>
          </p>
        ) : (
          <div className="grid">
            {featuredChars.map((c, i) => (
              <CharacterCard key={c.slug} character={c} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Nine Titans */}
      <section className="container section">
        <div className="section__head">
          <div>
            <span className="mono-label" style={{ color: 'var(--blood-iron-bright)' }}>
              BLOODLINE DIVISION — THREAT ARCHIVE
            </span>
            <h2 style={{ marginTop: 8 }}>The Nine Titans</h2>
          </div>
          <Link to="/titans" className="mono-label section__see-all">
            View all titans →
          </Link>
        </div>
        {featuredTitans.length === 0 ? (
          <p className="mono-label" style={{ color: 'var(--bone-dim)' }}>Loading titans...</p>
        ) : (
          <div className="grid">
            {featuredTitans.map((t, i) => (
              <TitanCard key={t.slug} titan={t} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Story Teaser */}
      <section className="container section">
        <div className="section__head">
          <div>
            <span className="mono-label" style={{ color: 'var(--signal-flare)' }}>
              INNER WALL ARCHIVE
            </span>
            <h2 style={{ marginTop: 8 }}>The Chronicle</h2>
          </div>
          <Link to="/story" className="mono-label section__see-all">
            Full timeline →
          </Link>
        </div>
        <div className="story-teaser">
          {[
            { year: 'Year 845', event: "Fall of Shiganshina — Colossal Titan breaks the wall. Eren's mother is eaten. The story begins." },
            { year: 'Year 850', event: "Battle of Trost — Eren's Titan power awakens. Humanity's first victory against the Titans." },
            { year: 'Year 854', event: "The Rumbling — Eren unleashes millions of Wall Titans on the world. 80% of humanity wiped out." },
          ].map((item) => (
            <div key={item.year} className="story-teaser__item">
              <span className="mono-label story-teaser__year">{item.year}</span>
              <p>{item.event}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
