import React from 'react';

export const TOKENS = {
  navy: '#001A2C',
  navy2: '#04243C',
  navy3: '#0A2F4A',
  teal: '#1FBBA6',
  tealDark: '#159885',
  tealSoft: 'rgba(31, 187, 166, 0.12)',
  bg: '#F8FAFC',
  bgCard: '#FFFFFF',
  ink: '#0B1B2B',
  ink2: '#3D4F62',
  ink3: '#6B7B8C',
  line: '#E6ECF2',
  line2: '#EEF2F6',
  danger: '#E5484D',
  amber: '#F5A524',
};

export const INITIAL_TX = [
  { id: 1, name: 'Café Lumière', cat: 'Nourriture & Boissons', icon: '☕', amount: -8.40, date: "Aujourd'hui, 09:14", method: 'Carte •• 4421' },
  { id: 2, name: 'Salaire — Northwind Labs', cat: 'Revenus', icon: '↘', amount: 4280.00, date: "Aujourd'hui, 08:00", method: 'Credit SEPA' },
  { id: 3, name: 'Spotify Family', cat: 'Abonnements', icon: '♪', amount: -16.99, date: 'Hier', method: 'Carte •• 4421' },
  { id: 4, name: 'Maria Santos', cat: 'Virement', icon: '↗', amount: -120.00, date: 'Hier', method: 'Virement IBAN' },
  { id: 5, name: 'Uber', cat: 'Transport', icon: '⌖', amount: -14.20, date: '4 mai', method: 'Carte •• 4421' },
  { id: 6, name: 'Apple iCloud+', cat: 'Abonnements', icon: '☁', amount: -2.99, date: '3 mai', method: 'Carte •• 4421' },
  { id: 7, name: 'Remboursement — Nordstrom', cat: 'Remboursement', icon: '↺', amount: 89.00, date: '2 mai', method: 'Carte •• 4421' },
  { id: 8, name: "Trader Joe's", cat: 'Courses', icon: '◫', amount: -64.18, date: '1 mai', method: 'Carte •• 4421' },
];

export const SAVED_RECIPIENTS = [
  { id: 'r1', name: 'Maria Santos', iban: 'PT50 0035 0000 1234 5678 9012 3', initials: 'MS', last: '€120.00' },
  { id: 'r2', name: 'Northwind Labs', iban: 'DE89 3704 0044 0532 0130 00', initials: 'NL', last: '€2,800.00' },
  { id: 'r3', name: 'Lukas Weber', iban: 'AT61 1904 3002 3457 3201', initials: 'LW', last: '€45.00' },
  { id: 'r4', name: 'Aïcha Diop', iban: 'FR76 3000 6000 0112 3456 7890 189', initials: 'AD', last: '€220.50' },
];

export const Icon = ({ name, size = 18, stroke = 1.6, className = '' }) => {
  const s = {
    width: size,
    height: size,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };
  const paths = {
    home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></>,
    card: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /></>,
    send: <><path d="M21 3L11 14" /><path d="M21 3l-7 18-3-8-8-3 18-7z" /></>,
    chart: <><path d="M4 19V9" /><path d="M10 19V5" /><path d="M16 19v-7" /><path d="M22 19H2" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1A2 2 0 1 1 4.3 17l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1A2 2 0 1 1 7 4.3l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1A2 2 0 1 1 19.7 7l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrowDown: <><path d="M7 13l5 5 5-5" /><path d="M12 18V4" /></>,
    arrowUp: <><path d="M17 11l-5-5-5 5" /><path d="M12 6v14" /></>,
    arrowRight: <><path d="M5 12h14M13 5l7 7-7 7" /></>,
    arrowLeft: <><path d="M19 12H5M11 19l-7-7 7-7" /></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>,
    eyeOff: <><path d="M17.94 17.94A10 10 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10 10 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><path d="M1 1l22 22" /></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    shield: <><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" /></>,
    check: <><path d="M20 6L9 17l-5-5" /></>,
    info: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></>,
    fingerprint: <><path d="M2 12C2 6.48 6.48 2 12 2c2.84 0 5.4 1.18 7.22 3.08" /><path d="M5.5 12c0-3.59 2.91-6.5 6.5-6.5 2.34 0 4.39 1.24 5.53 3.1" /><path d="M9 12a3 3 0 0 1 6 0c0 4-2 7-3 8" /><path d="M12 12c0 4-1 8-2 10" /><path d="M22 12c0-2-.5-4-1.5-5.5" /></>,
    sparkle: <><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" /></>,
    chevronRight: <><path d="M9 18l6-6-6-6" /></>,
    chevronDown: <><path d="M6 9l6 6 6-6" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    filter: <><path d="M22 3H2l8 9v7l4 2v-9z" /></>,
    refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></>,
    zap: <><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="M18 6L6 18M6 6l12 12" /></>,
  };
  return <svg viewBox="0 0 24 24" style={s} className={className}>{paths[name]}</svg>;
};

export const VaultMark = ({ size = 28, color = TOKENS.teal }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="3" y="3" width="26" height="26" rx="7" stroke={color} strokeWidth="2" />
    <circle cx="16" cy="16" r="6.5" stroke={color} strokeWidth="2" />
    <circle cx="16" cy="16" r="2" fill={color} />
    <path d="M16 6.5v3M16 22.5v3M6.5 16h3M22.5 16h3" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

