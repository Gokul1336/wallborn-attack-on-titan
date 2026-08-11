import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Portrait from './Portrait';
import './TitanCard.css';

export default function TitanCard({ titan, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
    >
      <Link to={`/titans/${titan.slug}`} className="titan-card">
        <Portrait
          name={titan.name}
          color={titan.portraitColor}
          imageUrl={titan.portraitUrl}
          size="md"
          type="titan"
        />
        <div className="titan-card__body">
          <div className="titan-card__top-row">
            <span className="mono-label">{titan.classification}</span>
            <span className="titan-card__threat" style={{ '--threat': titan.threatLevel }}>
              THREAT {titan.threatLevel}/10
            </span>
          </div>
          <h3 className="titan-card__name">{titan.name}</h3>
          <span className="mono-label">{titan.heightMeters > 0 ? `${titan.heightMeters}m` : 'Classified height'}</span>
        </div>
      </Link>
    </motion.div>
  );
}
