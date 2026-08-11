import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTitanStore } from '../store/titanStore';
import Portrait from '../components/Portrait';
import FavoriteButton from '../components/FavoriteButton';
import Comments from '../components/Comments';
import './DetailPage.css';

export default function TitanDetail() {
  const { slug } = useParams();
  const { current, status, fetchBySlug } = useTitanStore();

  useEffect(() => {
    fetchBySlug(slug);
    window.scrollTo(0, 0);
  }, [slug]);

  if (status === 'loading' || !current) {
    return (
      <div className="container detail-page">
        <p className="mono-label">Unsealing threat file...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="container detail-page">
        <p className="mono-label">File not found in the archive.</p>
        <Link to="/titans" className="mono-label">← Return to bestiary</Link>
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
        src={`/videos/titans/${current.slug}.mp4`}
        poster={current.portraitUrl}
        autoPlay
        loop
        muted
        playsInline
        onError={(e) => { e.target.style.display = 'none'; }}
        aria-hidden="true"
      />

      <Link to="/titans" className="mono-label detail-page__back">← Return to bestiary</Link>

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
            type="titan"
          />
          <div className="dossier__quick-facts">
            <div className="dossier__fact">
              <span className="mono-label">Classification</span>
              <span>{current.classification}</span>
            </div>
            <div className="dossier__fact">
              <span className="mono-label">Height</span>
              <span>{current.heightMeters > 0 ? `${current.heightMeters}m` : 'Classified'}</span>
            </div>
            <div className="dossier__fact">
              <span className="mono-label">Threat Level</span>
              <span className="dossier__threat-value">{current.threatLevel}/10</span>
            </div>
            {current.firstSighting && (
              <div className="dossier__fact">
                <span className="mono-label">First Sighting</span>
                <span>{current.firstSighting}</span>
              </div>
            )}
          </div>
          <FavoriteButton entityId={current._id} slug={current.slug} type="titan" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="dossier__main-col"
        >
          <div className="dossier__header-row">
            <span className="status-stamp kia">HOLLOW KIN</span>
            <span className="mono-label">FILE #{current.slug.toUpperCase()}</span>
          </div>

          <h1 className="dossier__name">{current.name}</h1>

          <p className="dossier__short-bio">{current.shortBio}</p>

          <div className="dossier__section">
            <h2 className="dossier__section-heading">Threat Assessment</h2>
            <p>{current.fullBio}</p>
          </div>

          {current.abilities?.length > 0 && (
            <div className="dossier__section">
              <h2 className="dossier__section-heading">Observed Abilities</h2>
              <ul className="dossier__tag-list">
                {current.abilities.map((a) => (
                  <li key={a} className="dossier__tag dossier__tag--danger">{a}</li>
                ))}
              </ul>
            </div>
          )}

          {current.weakness && (
            <div className="dossier__section">
              <h2 className="dossier__section-heading">Known Weakness</h2>
              <p>{current.weakness}</p>
            </div>
          )}

          {current.boundCharacter && (
            <div className="dossier__section">
              <h2 className="dossier__section-heading">Bound Bloodline</h2>
              <Link to={`/characters/${current.boundCharacter.slug}`} className="dossier__related-card">
                <Portrait
                  name={current.boundCharacter.name}
                  color={current.boundCharacter.portraitColor}
                  imageUrl={current.boundCharacter.portraitUrl}
                  size="sm"
                  type="character"
                />
                <div>
                  <strong>{current.boundCharacter.name}</strong>
                  <span className="mono-label">{current.boundCharacter.title}</span>
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

          <Comments targetType="TitanKin" targetSlug={current.slug} />
        </motion.div>
      </div>
    </motion.div>
  );
}
