import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Portrait from './Portrait';
import StatusStamp from './StatusStamp';
import './CharacterCard.css';

export default function CharacterCard({ character, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
    >
      <Link to={`/characters/${character.slug}`} className="char-card">
        <Portrait
          name={character.name}
          color={character.portraitColor}
          imageUrl={character.portraitUrl}
          size="md"
          type="character"
        />
        <div className="char-card__body">
          <div className="char-card__top-row">
            <span className="mono-label">{character.order}</span>
            <StatusStamp status={character.status} />
          </div>
          <h3 className="char-card__name">{character.name}</h3>
          {character.title && <p className="char-card__title">{character.title}</p>}
          <span className="mono-label char-card__rank">{character.rank}</span>
        </div>
      </Link>
    </motion.div>
  );
}
