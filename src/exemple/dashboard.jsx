/* global React, TOKENS, Icon, VaultMark, INITIAL_TX */
const { useState, useMemo } = React;

const NAV_ITEMS = [
  { id: 'home', label: 'Overview', icon: 'home', badge: null },
  { id: 'accounts', label: 'Accounts', icon: 'card', badge: '3' },
  { id: 'transfers', label: 'Transfers', icon: 'send', badge: null },
  { id: 'analytics', label: 'Analytics', icon: 'chart', badge: null },
  { id: 'cards', label: 'Cards', icon: 'zap', badge: null },
  { id: 'settings', label: 'Settings', icon: 'settings', badge: null },
];

function Sidebar({ active, onNavigate, onTransferClick }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-brand">
        <VaultMark size={26} />
        <div>
          <div className="sidebar-brand-name">VaultOs</div>
          <div className="sidebar-brand-org">Northwind Labs · EU</div>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Workspace</div>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`sidebar-link ${active === item.id ? 'sidebar-link--active' : ''}`}
            onClick={() => item.id === 'transfers' ? onTransferClick() : onNavigate(item.id)}
          >
            <span className="sidebar-link-icon"><Icon name={item.icon} size={17} /></span>
            <span className="sidebar-link-label">{item.label}</span>
            {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            {active === item.id && <span className="sidebar-link-rail" />}
          </button>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Pinned</div>
        <button className="sidebar-pin">
          <span className="sidebar-pin-dot" style={{ background: '#5BC0EB' }} />
          Operating · EUR
        </button>
        <button className="sidebar-pin">
          <span className="sidebar-pin-dot" style={{ background: '#F4A261' }} />
          Payroll · EUR
        </button>
        <button className="sidebar-pin">
          <span className="sidebar-pin-dot" style={{ background: '#A78BFA' }} />
          Tax reserve · USD
        </button>
      </div>

      <div className="sidebar-card">
        <div className="sidebar-card-head">
          <Icon name="sparkle" size={14} />
          <span>Treasury sweep</span>
        </div>
        <p>€41,200 idle in Operating. Move to 4.1% MMF?</p>
        <div className="sidebar-card-actions">
          <button className="sidebar-card-btn">Review</button>
          <button className="sidebar-card-dismiss">Later</button>
        </div>
      </div>

      <div className="sidebar-foot">
        <div className="sidebar-user">
          <div className="sidebar-avatar">AM</div>
          <div className="sidebar-user-meta">
            <div className="sidebar-user-name">Alex Morgan</div>
            <div className="sidebar-user-role">Owner · Admin</div>
          </div>
          <button className="sidebar-user-more"><Icon name="chevronDown" size={14} /></button>
        </div>
      </div>
    </nav>
  );
}

function Topbar({ onTransferClick }) {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <Icon name="search" size={15} />
        <input placeholder="Search transactions, recipients, IBANs…" />
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
          <Icon name="plus" size={14} /> New transfer
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
    <div className="hero">
      <div className="hero-grid" />
      <div className="hero-glow" />

      <div className="hero-top">
        <div>
          <div className="hero-label">
            <span className="hero-dot" /> Operating account · DE89 ··· 0130 00
          </div>
          <div className="hero-amount-row">
            <span className="hero-currency">€</span>
            <span className="hero-amount">{formatted.split('.')[0]}</span>
            <span className="hero-cents">.{formatted.split('.')[1]}</span>
            <button className="hero-eye" onClick={onToggleVisible}>
              <Icon name={visible ? 'eye' : 'eyeOff'} size={15} />
            </button>
          </div>
          <div className="hero-meta">
            <span className="hero-delta hero-delta--up">▲ €4,182.40</span>
            <span className="hero-meta-sep">·</span>
            <span>+1.49% this month</span>
            <span className="hero-meta-sep">·</span>
            <span>Updated just now</span>
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
            <span>Apr 14</span><span>Apr 28</span><span>May 7</span>
          </div>
        </div>
      </div>

      <div className="hero-actions">
        <button className="hero-action hero-action--primary" onClick={onTransferClick}>
          <span className="hero-action-icon"><Icon name="send" size={16} /></span>
          <span>Send money</span>
        </button>
        <button className="hero-action">
          <span className="hero-action-icon"><Icon name="arrowDown" size={16} /></span>
          <span>Request</span>
        </button>
        <button className="hero-action">
          <span className="hero-action-icon"><Icon name="refresh" size={16} /></span>
          <span>Convert FX</span>
        </button>
        <button className="hero-action">
          <span className="hero-action-icon"><Icon name="card" size={16} /></span>
          <span>Issue card</span>
        </button>
        <button className="hero-action hero-action--ghost">
          <span className="hero-action-icon"><Icon name="plus" size={16} /></span>
          <span>More</span>
        </button>
      </div>
    </div>
  );
}

function AccountsStrip() {
  const accounts = [
    { name: 'Operating', currency: 'EUR', symbol: '€', amount: '284,913.47', delta: '+1.49%', dot: '#5BC0EB', iban: 'DE89 ··· 0130' },
    { name: 'Payroll', currency: 'EUR', symbol: '€', amount: '52,400.00', delta: '−12.20%', dot: '#F4A261', iban: 'DE89 ··· 0244' },
    { name: 'Tax reserve', currency: 'USD', symbol: '$', amount: '118,200.00', delta: '+0.40%', dot: '#A78BFA', iban: 'US44 ··· 7702' },
    { name: 'Yield · MMF', currency: 'EUR', symbol: '€', amount: '410,000.00', delta: '+4.10% APY', dot: TOKENS.teal, iban: 'Locked 90d' },
  ];
  return (
    <div className="accounts-strip">
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
    { id: 'all', label: 'All', count: INITIAL_TX.length },
    { id: 'in', label: 'Incoming', count: INITIAL_TX.filter(t => t.amount > 0).length },
    { id: 'out', label: 'Outgoing', count: INITIAL_TX.filter(t => t.amount < 0).length },
    { id: 'subs', label: 'Subscriptions', count: INITIAL_TX.filter(t => t.cat === 'Subscriptions').length },
  ];
  const list = useMemo(() => {
    if (filter === 'in') return INITIAL_TX.filter(t => t.amount > 0);
    if (filter === 'out') return INITIAL_TX.filter(t => t.amount < 0);
    if (filter === 'subs') return INITIAL_TX.filter(t => t.cat === 'Subscriptions');
    return INITIAL_TX;
  }, [filter]);

  return (
    <div className="card tx-card">
      <div className="card-head">
        <div>
          <div className="card-title">Recent activity</div>
          <div className="card-sub">8 transactions across 3 accounts · Last 7 days</div>
        </div>
        <div className="card-head-actions">
          <button className="chip-btn"><Icon name="filter" size={13} /> Filter</button>
          <button className="chip-btn"><Icon name="download" size={13} /> Export</button>
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

      <button className="tx-all">View all activity <Icon name="arrowRight" size={13} /></button>
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
          <div className="card-title">Cash-flow · This week</div>
          <div className="card-sub">Net <b className="up">+€8,412.30</b></div>
        </div>
        <div className="legend">
          <span className="legend-item"><span className="legend-dot" style={{ background: TOKENS.teal }} /> In</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: TOKENS.navy }} /> Out</span>
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
    { name: 'AWS · invoice', amount: '€2,140.00', when: 'Tomorrow', icon: '◇', tone: 'navy' },
    { name: 'Payroll · 12 emp.', amount: '€38,200.00', when: 'May 15', icon: '⌥', tone: 'amber' },
    { name: 'Office lease', amount: '€4,800.00', when: 'May 18', icon: '⌂', tone: 'navy' },
    { name: 'VAT Q1 · DE', amount: '€11,402.00', when: 'May 31', icon: '%', tone: 'teal' },
  ];
  return (
    <div className="card upcoming-card">
      <div className="card-head">
        <div>
          <div className="card-title">Upcoming</div>
          <div className="card-sub">4 scheduled outflows · €56,542.00</div>
        </div>
        <button className="chip-btn">Schedule</button>
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

  return (
    <div className="dash-root" data-screen-label="02 Dashboard">
      <Sidebar active={active} onNavigate={onNavigate} onTransferClick={onTransferClick} />

      <div className="dash-main">
        <Topbar onTransferClick={onTransferClick} />

        <div className="dash-content">
          <div className="page-head">
            <div>
              <div className="page-eyebrow">Tuesday, May 7 · 09:24 CET</div>
              <h1 className="page-title">Good morning, Alex.</h1>
              <p className="page-sub">Cash position is healthy. 3 items need your sign-off today.</p>
            </div>
            <div className="page-head-actions">
              <button className="chip-btn"><Icon name="info" size={13} /> What changed?</button>
              <button className="chip-btn chip-btn--filled"><Icon name="check" size={13} /> 3 to approve</button>
            </div>
          </div>

          <BalanceHero visible={visible} onToggleVisible={() => setVisible(!visible)} onTransferClick={onTransferClick} />

          <AccountsStrip />

          <div className="dash-grid">
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

window.DashboardScreen = DashboardScreen;
