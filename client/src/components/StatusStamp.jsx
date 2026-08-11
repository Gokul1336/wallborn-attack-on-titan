const STATUS_MAP = {
  Active: { className: 'active', label: 'Active' },
  KIA: { className: 'kia', label: 'KIA' },
  Missing: { className: 'missing', label: 'Missing' },
  'Titan-Bonded': { className: 'titan-bonded', label: 'Titan-Bonded' },
  Unknown: { className: 'unknown', label: 'Unknown' },
};

export default function StatusStamp({ status }) {
  const entry = STATUS_MAP[status] || STATUS_MAP.Unknown;
  return <span className={`status-stamp ${entry.className}`}>{entry.label}</span>;
}
