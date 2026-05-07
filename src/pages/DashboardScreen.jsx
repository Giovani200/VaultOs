import React, { useMemo, useState } from 'react';
import { TOKENS, Icon, VaultMark, INITIAL_TX } from '../components/ui-core';

const NAV_ITEMS = [
  { id: 'home', label: "Vue d'ensemble", icon: 'home', badge: null },
  { id: 'accounts', label: 'Comptes', icon: 'card', badge: '3' },
  { id: 'transfers', label: 'Virements', icon: 'send', badge: null },
  { id: 'analytics', label: 'Analyses', icon: 'chart', badge: null },
  { id: 'cards', label: 'Cartes', icon: 'zap', badge: null },
  { id: 'settings', label: 'Parametres', icon: 'settings', badge: null },
];

function Sidebar({ active, onNavigate, onTransferClick, menuOpen, onCloseMenu }) {
  const handleNav = (id) => {
    onNavigate(id);
    onCloseMenu?.();
  };
  const handleTransfer = () => {
    onTransferClick();
    onCloseMenu?.();
  };

  return (
    <nav
      className={`sidebar max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-40 max-lg:h-screen max-lg:w-[248px] max-lg:overflow-y-auto max-lg:transition-transform max-lg:duration-200 max-lg:ease-out lg:relative ${menuOpen ? 'max-lg:translate-x-0 max-lg:shadow-2xl' : 'max-lg:-translate-x-full'}`}
    >
      <div className="sidebar-brand">
        <VaultMark size={26} />
        <div>
          <div className="sidebar-brand-name">VaultOs</div>
          <div className="sidebar-brand-org">Northwind Labs · Europe</div>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Espace de travail</div>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`sidebar-link ${active === item.id ? 'sidebar-link--active' : ''}`}
            onClick={() => (item.id === 'transfers' ? handleTransfer() : handleNav(item.id))}
          >
            <span className="sidebar-link-icon"><Icon name={item.icon} size={17} /></span>
            <span className="sidebar-link-label">{item.label}</span>
            {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            {active === item.id && <span className="sidebar-link-rail" />}
          </button>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Epingles</div>
        <button className="sidebar-pin">
          <span className="sidebar-pin-dot" style={{ background: '#5BC0EB' }} />
          Courant · EUR
        </button>
        <button className="sidebar-pin">
          <span className="sidebar-pin-dot" style={{ background: '#F4A261' }} />
          Paie · EUR
        </button>
        <button className="sidebar-pin">
          <span className="sidebar-pin-dot" style={{ background: '#A78BFA' }} />
          Reserve fiscale · USD
        </button>
      </div>

      <div className="sidebar-card">
        <div className="sidebar-card-head">
          <Icon name="sparkle" size={14} />
          <span>Optimisation de tresorerie</span>
        </div>
        <p>€41,200 sont inactifs sur le compte courant. Les placer sur un MMF a 4,1 % ?</p>
        <div className="sidebar-card-actions">
          <button className="sidebar-card-btn">Verifier</button>
          <button className="sidebar-card-dismiss">Plus tard</button>
        </div>
      </div>

      <div className="sidebar-foot">
        <div className="sidebar-user">
          <div className="sidebar-avatar">AM</div>
          <div className="sidebar-user-meta">
            <div className="sidebar-user-name">Alex Morgan</div>
            <div className="sidebar-user-role">Proprietaire · Administrateur</div>
          </div>
          <button className="sidebar-user-more"><Icon name="chevronDown" size={14} /></button>
        </div>
      </div>
    </nav>
  );
}

function Topbar({ onTransferClick, onOpenMenu }) {
  return (
    <header className="topbar flex-wrap gap-y-2 px-4 py-3 sm:px-6 md:px-8 xl:px-8 xl:py-[14px]">
      <button
        type="button"
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E6ECF2] bg-white text-[#001A2C] lg:hidden"
        aria-label="Ouvrir le menu"
        onClick={onOpenMenu}
      >
        <Icon name="menu" size={18} />
      </button>
      <div className="topbar-search min-w-0 max-lg:max-w-none max-lg:flex-1 md:flex-1">
        <Icon name="search" size={15} />
        <input placeholder="Rechercher transactions, beneficiaires, IBAN…" />
        <kbd>⌘K</kbd>
      </div>
      <div className="topbar-actions">
        <button className="topbar-icon-btn">
          <Icon name="bell" size={16} />
          <span className="topbar-dot" />
        </button>
        <button className="topbar-icon-btn"><Icon name="download" size={16} /></button>
        <div className="topbar-divider" />
        <button className="btn-primary btn-primary--sm" onClick={onTransferClick}>
          <Icon name="plus" size={14} /> Nouveau virement
        </button>
      </div>
    </header>
  );
}

function BalanceHero({ visible, onToggleVisible, onTransferClick }) {
  const balance = 284913.47;
  const formatted = visible
    ? balance.toLocaleString('en-EU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '••• •••.••';

  // Sparkline points
  const points = [12, 18, 14, 22, 26, 20, 28, 32, 27, 35, 41, 38, 46, 52, 48, 58, 64, 60, 70, 76, 72, 82, 88, 92];
  const max = Math.max(...points), min = Math.min(...points);
  const path = points.map((p, i) => {
    const x = (i / (points.length - 1)) * 100;
    const y = 100 - ((p - min) / (max - min)) * 100;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  const fill = path + ` L 100 100 L 0 100 Z`;

  return (
    <div className="hero px-5 py-6 sm:p-8 xl:p-[32px_36px]">
      <div className="hero-grid" />
      <div className="hero-glow" />

      <div className="hero-top grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px] lg:items-end lg:gap-8">
        <div>
          <div className="hero-label">
            <span className="hero-dot" /> Compte courant · DE89 ··· 0130 00
          </div>
          <div className="hero-amount-row">
            <span className="hero-currency text-2xl sm:text-3xl md:text-[32px] xl:text-[32px]">€</span>
            <span className="hero-amount text-[clamp(2rem,8vw,4rem)] xl:text-[64px]">{formatted.split('.')[0]}</span>
            <span className="hero-cents text-xl sm:text-2xl md:text-[32px] xl:text-[32px]">.{formatted.split('.')[1]}</span>
            <button className="hero-eye" onClick={onToggleVisible}>
              <Icon name={visible ? 'eye' : 'eyeOff'} size={15} />
            </button>
          </div>
          <div className="hero-meta">
            <span className="hero-delta hero-delta--up">▲ €4,182.40</span>
            <span className="hero-meta-sep">·</span>
            <span>+1,49 % ce mois-ci</span>
            <span className="hero-meta-sep">·</span>
            <span>Mis a jour a l'instant</span>
          </div>
        </div>

        <div className="hero-spark">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={TOKENS.teal} stopOpacity="0.45" />
                <stop offset="100%" stopColor={TOKENS.teal} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={fill} fill="url(#sparkFill)" />
            <path d={path} fill="none" stroke={TOKENS.teal} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="hero-spark-axis">
            <span>14 avr</span><span>28 avr</span><span>7 mai</span>
          </div>
        </div>
      </div>

      <div className="hero-actions flex flex-wrap gap-2">
        <button className="hero-action hero-action--primary" onClick={onTransferClick}>
          <span className="hero-action-icon"><Icon name="send" size={16} /></span>
          <span>Envoyer de l'argent</span>
        </button>
        <button className="hero-action">
          <span className="hero-action-icon"><Icon name="arrowDown" size={16} /></span>
          <span>Demander</span>
        </button>
        <button className="hero-action">
          <span className="hero-action-icon"><Icon name="refresh" size={16} /></span>
          <span>Convertir des devises</span>
        </button>
        <button className="hero-action">
          <span className="hero-action-icon"><Icon name="card" size={16} /></span>
          <span>Creer une carte</span>
        </button>
        <button className="hero-action hero-action--ghost">
          <span className="hero-action-icon"><Icon name="plus" size={16} /></span>
          <span>Plus</span>
        </button>
      </div>
    </div>
  );
}

function ComptesStrip() {
  const accounts = [
    { name: 'Courant', currency: 'EUR', symbol: '€', amount: '284,913.47', delta: '+1.49%', dot: '#5BC0EB', iban: 'DE89 ··· 0130' },
    { name: 'Paie', currency: 'EUR', symbol: '€', amount: '52,400.00', delta: '−12.20%', dot: '#F4A261', iban: 'DE89 ··· 0244' },
    { name: 'Reserve fiscale', currency: 'USD', symbol: '$', amount: '118,200.00', delta: '+0.40%', dot: '#A78BFA', iban: 'US44 ··· 7702' },
    { name: 'Rendement · MMF', currency: 'EUR', symbol: '€', amount: '410,000.00', delta: '+4.10% APY', dot: TOKENS.teal, iban: 'Bloque 90 j' },
  ];
  return (
    <div className="accounts-strip grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {accounts.map((a, i) => (
        <div key={i} className="account-card">
          <div className="account-head">
            <span className="account-dot" style={{ background: a.dot }} />
            <span className="account-name">{a.name}</span>
            <span className="account-cur">{a.currency}</span>
          </div>
          <div className="account-amount">
            <span className="account-sym">{a.symbol}</span>
            {a.amount}
          </div>
          <div className="account-foot">
            <span className={`account-delta ${a.delta.startsWith('−') ? 'down' : 'up'}`}>{a.delta}</span>
            <span className="account-iban">{a.iban}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TransactionRow({ tx }) {
  const positive = tx.amount > 0;
  return (
    <div className="tx-row">
      <div className="tx-icon" data-cat={tx.cat}>{tx.icon}</div>
      <div className="tx-main">
        <div className="tx-name">{tx.name}</div>
        <div className="tx-meta">
          <span className="tx-cat">{tx.cat}</span>
          <span className="tx-sep">·</span>
          <span>{tx.method}</span>
        </div>
      </div>
      <div className="tx-date">{tx.date}</div>
      <div className={`tx-amount ${positive ? 'tx-amount--in' : ''}`}>
        {positive ? '+' : '−'}€{Math.abs(tx.amount).toFixed(2)}
      </div>
    </div>
  );
}

function TransactionsCard() {
  const [filter, setFilter] = useState('all');
  const filters = [
    { id: 'all', label: 'Toutes', count: INITIAL_TX.length },
    { id: 'in', label: 'Entrants', count: INITIAL_TX.filter(t => t.amount > 0).length },
    { id: 'out', label: 'Sortants', count: INITIAL_TX.filter(t => t.amount < 0).length },
    { id: 'subs', label: 'Abonnements', count: INITIAL_TX.filter(t => t.cat === 'Abonnements').length },
  ];
  const list = useMemo(() => {
    if (filter === 'in') return INITIAL_TX.filter(t => t.amount > 0);
    if (filter === 'out') return INITIAL_TX.filter(t => t.amount < 0);
    if (filter === 'subs') return INITIAL_TX.filter(t => t.cat === 'Abonnements');
    return INITIAL_TX;
  }, [filter]);

  return (
    <div className="card tx-card">
      <div className="card-head">
        <div>
          <div className="card-title">Activite recente</div>
          <div className="card-sub">8 transactions sur 3 comptes · 7 derniers jours</div>
        </div>
        <div className="card-head-actions">
          <button className="chip-btn"><Icon name="filter" size={13} /> Filtrer</button>
          <button className="chip-btn"><Icon name="download" size={13} /> Exporter</button>
        </div>
      </div>

      <div className="tx-filters">
        {filters.map(f => (
          <button
            key={f.id}
            className={`tx-filter ${filter === f.id ? 'tx-filter--active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label} <span className="tx-filter-count">{f.count}</span>
          </button>
        ))}
      </div>

      <div className="tx-list">
        {list.map(tx => <TransactionRow key={tx.id} tx={tx} />)}
      </div>

      <button className="tx-all">Voir toute l'activite <Icon name="arrowRight" size={13} /></button>
    </div>
  );
}

function CashflowCard() {
  // Bars: in (teal) and out (navy)
  const data = [
    { d: 'M', in: 62, out: 28 },
    { d: 'T', in: 48, out: 36 },
    { d: 'W', in: 84, out: 22 },
    { d: 'T', in: 32, out: 48 },
    { d: 'F', in: 70, out: 40 },
    { d: 'S', in: 18, out: 12 },
    { d: 'S', in: 14, out: 8 },
  ];
  return (
    <div className="card cashflow-card">
      <div className="card-head">
        <div>
          <div className="card-title">Flux de tresorerie · Cette semaine</div>
          <div className="card-sub">Net <b className="up">+€8,412.30</b></div>
        </div>
        <div className="legend">
          <span className="legend-item"><span className="legend-dot" style={{ background: TOKENS.teal }} /> Entrees</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: TOKENS.navy }} /> Sorties</span>
        </div>
      </div>

      <div className="bars">
        {data.map((d, i) => (
          <div key={i} className="bar-col">
            <div className="bar-stack">
              <div className="bar bar--in" style={{ height: `${d.in}%` }} />
              <div className="bar bar--out" style={{ height: `${d.out}%` }} />
            </div>
            <div className="bar-label">{d.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpcomingCard() {
  const items = [
    { name: 'AWS · facture', amount: '€2,140.00', when: 'Demain', icon: '◇', tone: 'navy' },
    { name: 'Paie · 12 emp.', amount: '€38,200.00', when: '15 mai', icon: '⌥', tone: 'amber' },
    { name: 'Bail des bureaux', amount: '€4,800.00', when: '18 mai', icon: '⌂', tone: 'navy' },
    { name: 'TVA T1 · DE', amount: '€11,402.00', when: '31 mai', icon: '%', tone: 'teal' },
  ];
  return (
    <div className="card upcoming-card">
      <div className="card-head">
        <div>
          <div className="card-title">A venir</div>
          <div className="card-sub">4 sorties planifiees · €56,542.00</div>
        </div>
        <button className="chip-btn">Planifier</button>
      </div>
      <div className="upcoming-list">
        {items.map((it, i) => (
          <div key={i} className="upcoming-row">
            <div className={`upcoming-icon upcoming-icon--${it.tone}`}>{it.icon}</div>
            <div className="upcoming-main">
              <div className="upcoming-name">{it.name}</div>
              <div className="upcoming-when">{it.when}</div>
            </div>
            <div className="upcoming-amount">{it.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardScreen({ onTransferClick, onNavigate, active }) {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="dash-root grid min-h-screen grid-cols-1 bg-[#F8FAFC] lg:grid-cols-[248px_minmax(0,1fr)]"
      data-screen-label="02 Tableau de bord"
    >
      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Fermer le menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <Sidebar
        active={active}
        onNavigate={onNavigate}
        onTransferClick={onTransferClick}
        menuOpen={menuOpen}
        onCloseMenu={() => setMenuOpen(false)}
      />

      <div className="dash-main min-w-0">
        <Topbar onTransferClick={onTransferClick} onOpenMenu={() => setMenuOpen(true)} />

        <div className="dash-content px-4 pb-10 pt-6 sm:px-6 md:px-8 xl:px-8 xl:pb-[60px] xl:pt-7">
          <div className="page-head flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="page-eyebrow">Mardi 7 mai · 09:24 CET</div>
              <h1 className="page-title">Bonjour, Alex.</h1>
              <p className="page-sub">La tresorerie est saine. Trois elements attendent votre validation aujourd'hui.</p>
            </div>
            <div className="page-head-actions flex flex-wrap gap-2">
              <button className="chip-btn"><Icon name="info" size={13} /> Quoi de neuf ?</button>
              <button className="chip-btn chip-btn--filled"><Icon name="check" size={13} /> 3 a approuver</button>
            </div>
          </div>

          <BalanceHero visible={visible} onToggleVisible={() => setVisible(!visible)} onTransferClick={onTransferClick} />

          <ComptesStrip />

          <div className="dash-grid grid grid-cols-1 gap-[18px] xl:grid-cols-[1.6fr_1fr]">
            <TransactionsCard />
            <div className="dash-grid-side">
              <CashflowCard />
              <UpcomingCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;

