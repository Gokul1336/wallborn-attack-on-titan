import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCharacterStore } from '../store/characterStore';
import Portrait from '../components/Portrait';
import StatusStamp from '../components/StatusStamp';
import FavoriteButton from '../components/FavoriteButton';
import Comments from '../components/Comments';
import './DetailPage.css';

export default function CharacterDetail() {
  const { slug } = useParams();
  const { current, status, fetchBySlug } = useCharacterStore();

  useEffect(() => {
    fetchBySlug(slug);
    window.scrollTo(0, 0);
  }, [slug]);

  if (status === 'loading' || !current) {
    return (
      <div className="container detail-page">
        <p className="mono-label">Unsealing file...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="container detail-page">
        <p className="mono-label">File not found in the archive.</p>
        <Link to="/characters" className="mono-label">← Return to roster</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="container detail-page"
    >
      <video
        key={current.slug}
        className="detail-page__video-bg"
        src={`/videos/characters/${current.slug}.mp4`}
        poster={current.portraitUrl}
        autoPlay
        loop
        muted
        playsInline
        onError={(e) => { e.target.style.display = 'none'; }}
        aria-hidden="true"
      />

      <Link to="/characters" className="mono-label detail-page__back">← Return to roster</Link>

      <div className="dossier">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="dossier__portrait-col"
        >
          <Portrait
            name={current.name}
            color={current.portraitColor}
            imageUrl={current.portraitUrl}
            size="lg"
            type="character"
          />
          <div className="dossier__quick-facts">
            <div className="dossier__fact">
              <span className="mono-label">Order</span>
              <span>{current.order}</span>
            </div>
            <div className="dossier__fact">
              <span className="mono-label">Rank</span>
              <span>{current.rank}</span>
            </div>
            <div className="dossier__fact">
              <span className="mono-label">Wall Tier</span>
              <span>{current.wallTier}</span>
            </div>
            {current.age && (
              <div className="dossier__fact">
                <span className="mono-label">Age</span>
                <span>{current.age}</span>
              </div>
            )}
            {current.heightCm && (
              <div className="dossier__fact">
                <span className="mono-label">Height</span>
                <span>{current.heightCm} cm</span>
              </div>
            )}
          </div>
          <FavoriteButton entityId={current._id} slug={current.slug} type="character" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="dossier__main-col"
        >
          <div className="dossier__header-row">
            <StatusStamp status={current.status} />
            <span className="mono-label">FILE #{current.slug.toUpperCase()}</span>
          </div>

          <h1 className="dossier__name">{current.name}</h1>
          {current.title && <p className="dossier__title">{current.title}</p>}

          <p className="dossier__short-bio">{current.shortBio}</p>

          <div className="dossier__section">
            <h2 className="dossier__section-heading">Full Record</h2>
            <p>{current.fullBio}</p>
          </div>

          {current.abilities?.length > 0 && (
            <div className="dossier__section">
              <h2 className="dossier__section-heading">Known Abilities</h2>
              <ul className="dossier__tag-list">
                {current.abilities.map((a) => (
                  <li key={a} className="dossier__tag">{a}</li>
                ))}
              </ul>
            </div>
          )}

          {current.affiliatedTitanForm && (
            <div className="dossier__section">
              <h2 className="dossier__section-heading">Hollow Bond</h2>
              <Link to={`/titans/${current.affiliatedTitanForm.slug}`} className="dossier__related-card">
                <Portrait
                  name={current.affiliatedTitanForm.name}
                  color={current.affiliatedTitanForm.portraitColor}
                  imageUrl={current.affiliatedTitanForm.portraitUrl}
                  size="sm"
                  type="titan"
                />
                <div>
                  <strong>{current.affiliatedTitanForm.name}</strong>
                  <span className="mono-label">{current.affiliatedTitanForm.classification}</span>
                </div>
              </Link>
            </div>
          )}

          {current.storyArcs?.length > 0 && (
            <div className="dossier__section">
              <h2 className="dossier__section-heading">Story Arcs</h2>
              <ol className="dossier__arc-list">
                {current.storyArcs
                  .sort((a, b) => a.order - b.order)
                  .map((arc) => (
                    <li key={arc.arcSlug} className="dossier__arc">
                      <span className="dossier__arc-title">{arc.arcTitle}</span>
                      <p>{arc.summary}</p>
                    </li>
                  ))}
              </ol>
            </div>
          )}

          {current.relationships?.length > 0 && (
            <div className="dossier__section">
              <h2 className="dossier__section-heading">Known Relationships</h2>
              <ul className="dossier__relationship-list">
                {current.relationships.map((r) => (
                  <li key={r.characterSlug}>
                    <Link to={`/characters/${r.characterSlug}`}>{r.characterSlug.replace(/-/g, ' ')}</Link>
                    <span className="mono-label"> — {r.relation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Comments targetType="Character" targetSlug={current.slug} />
        </motion.div>
      </div>
    </motion.div>
  );
}
