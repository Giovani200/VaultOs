/* global React, TOKENS, Icon, VaultMark, SAVED_RECIPIENTS */
const { useState, useMemo, useEffect } = React;

function TransferScreen({ onClose, onComplete }) {
  const [step, setStep] = useState(1); // 1 details · 2 review · 3 success
  const [amount, setAmount] = useState('1250.00');
  const [recipientId, setRecipientId] = useState('r1');
  const [iban, setIban] = useState('PT50 0035 0000 1234 5678 9012 3');
  const [recipientName, setRecipientName] = useState('Maria Santos');
  const [reference, setReference] = useState('Invoice INV-2026-0412');
  const [reason, setReason] = useState('Services');
  const [speed, setSpeed] = useState('instant'); // instant | sepa | swift
  const [fromAccount, setFromAccount] = useState('operating');
  const [search, setSearch] = useState('');

  const fromBalance = 284913.47;
  const numericAmount = parseFloat(amount.replace(/,/g, '')) || 0;
  const remaining = fromBalance - numericAmount;
  const fee = speed === 'instant' ? 0 : speed === 'sepa' ? 0 : 6.50;
  const eta = speed === 'instant' ? '~10 seconds' : speed === 'sepa' ? 'Same day · before 17:00' : '1–2 business days';

  const filteredRecipients = SAVED_RECIPIENTS.filter(r =>
    !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.iban.includes(search)
  );

  function selectRecipient(r) {
    setRecipientId(r.id);
    setIban(r.iban);
    setRecipientName(r.name);
  }

  function handleAmountChange(v) {
    // Allow digits and one decimal
    let cleaned = v.replace(/[^\d.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) cleaned = parts[0] + '.' + parts.slice(1).join('');
    if (parts[1] && parts[1].length > 2) cleaned = parts[0] + '.' + parts[1].slice(0, 2);
    setAmount(cleaned);
  }

  // Format amount display
  const [whole, cents] = (amount || '0').split('.');
  const wholeFmt = (parseInt(whole || '0') || 0).toLocaleString('en-US');

  return (
    <div className="transfer-root" data-screen-label="03 Transfer">
      <header className="transfer-header">
        <button className="transfer-back" onClick={onClose}>
          <Icon name="arrowLeft" size={15} /> Back to overview
        </button>
        <div className="transfer-title-bar">
          <VaultMark size={22} />
          <span className="transfer-title">New transfer</span>
        </div>
        <div className="transfer-stepper">
          <div className={`step ${step >= 1 ? 'step--done' : ''} ${step === 1 ? 'step--current' : ''}`}>
            <span className="step-num">{step > 1 ? <Icon name="check" size={11} stroke={2.6} /> : '1'}</span>
            <span>Details</span>
          </div>
          <div className={`step-line ${step >= 2 ? 'step-line--done' : ''}`} />
          <div className={`step ${step >= 2 ? 'step--done' : ''} ${step === 2 ? 'step--current' : ''}`}>
            <span className="step-num">{step > 2 ? <Icon name="check" size={11} stroke={2.6} /> : '2'}</span>
            <span>Review</span>
          </div>
          <div className={`step-line ${step >= 3 ? 'step-line--done' : ''}`} />
          <div className={`step ${step >= 3 ? 'step--done' : ''} ${step === 3 ? 'step--current' : ''}`}>
            <span className="step-num">{step > 3 ? <Icon name="check" size={11} stroke={2.6} /> : '3'}</span>
            <span>Done</span>
          </div>
        </div>
      </header>

      <div className="transfer-body">
        {step === 1 && (
          <div className="transfer-grid">
            {/* Left: form */}
            <div className="transfer-card">
              <div className="t-section">
                <div className="t-section-head">
                  <span className="t-section-num">01</span>
                  <span>From</span>
                </div>
                <div className="from-account">
                  <div className="from-account-main">
                    <span className="from-dot" style={{ background: '#5BC0EB' }} />
                    <div>
                      <div className="from-name">Operating · EUR</div>
                      <div className="from-iban">DE89 3704 0044 0532 0130 00</div>
                    </div>
                  </div>
                  <div className="from-bal">
                    <div className="from-bal-label">Available</div>
                    <div className="from-bal-amount">€284,913.47</div>
                  </div>
                  <button className="from-switch"><Icon name="chevronDown" size={14} /></button>
                </div>
              </div>

              <div className="t-section">
                <div className="t-section-head">
                  <span className="t-section-num">02</span>
                  <span>Amount</span>
                </div>

                <div className="amount-input-wrap">
                  <span className="amount-currency">EUR</span>
                  <span className="amount-symbol">€</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    className="amount-input"
                    value={amount}
                    onChange={e => handleAmountChange(e.target.value)}
                    onBlur={() => {
                      const n = parseFloat(amount) || 0;
                      setAmount(n.toFixed(2));
                    }}
                  />
                </div>

                <div className="amount-meta">
                  <div className="amount-meta-item">
                    <span className="amount-meta-label">Available</span>
                    <span>€{fromBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="amount-meta-item">
                    <span className="amount-meta-label">After transfer</span>
                    <span className={remaining < 0 ? 'down' : ''}>
                      €{remaining.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="amount-quick">
                  {['100', '500', '1000', '5000'].map(v => (
                    <button key={v} className="quick-chip" onClick={() => setAmount(parseFloat(v).toFixed(2))}>
                      €{parseInt(v).toLocaleString('en-US')}
                    </button>
                  ))}
                  <button className="quick-chip" onClick={() => setAmount((fromBalance / 2).toFixed(2))}>½</button>
                </div>
              </div>

              <div className="t-section">
                <div className="t-section-head">
                  <span className="t-section-num">03</span>
                  <span>Recipient</span>
                  <button className="t-section-aux">+ New recipient</button>
                </div>

                <div className="rec-search">
                  <Icon name="search" size={14} />
                  <input
                    placeholder="Search by name, IBAN, or company…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>

                <div className="rec-list">
                  {filteredRecipients.map(r => (
                    <button
                      key={r.id}
                      className={`rec-row ${recipientId === r.id ? 'rec-row--active' : ''}`}
                      onClick={() => selectRecipient(r)}
                    >
                      <div className="rec-avatar">{r.initials}</div>
                      <div className="rec-main">
                        <div className="rec-name">{r.name}</div>
                        <div className="rec-iban">{r.iban}</div>
                      </div>
                      <div className="rec-last">
                        <div className="rec-last-label">Last sent</div>
                        <div className="rec-last-amount">{r.last}</div>
                      </div>
                      {recipientId === r.id && <span className="rec-check"><Icon name="check" size={11} stroke={2.6} /></span>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="t-section">
                <div className="t-section-head">
                  <span className="t-section-num">04</span>
                  <span>Speed</span>
                </div>
                <div className="speed-grid">
                  {[
                    { id: 'instant', label: 'Instant SEPA', eta: '~10 seconds', fee: 'Free', icon: 'zap' },
                    { id: 'sepa', label: 'SEPA Standard', eta: 'Same day', fee: 'Free', icon: 'globe' },
                    { id: 'swift', label: 'SWIFT', eta: '1–2 days', fee: '€6.50', icon: 'send' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      className={`speed-card ${speed === opt.id ? 'speed-card--active' : ''}`}
                      onClick={() => setSpeed(opt.id)}
                    >
                      <div className="speed-icon"><Icon name={opt.icon} size={16} /></div>
                      <div className="speed-name">{opt.label}</div>
                      <div className="speed-eta">{opt.eta}</div>
                      <div className="speed-fee">{opt.fee}</div>
                      <span className="speed-radio" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="t-section">
                <div className="t-section-head">
                  <span className="t-section-num">05</span>
                  <span>Reference & category</span>
                </div>
                <div className="t-row-2">
                  <label className="field">
                    <span className="field-label">Reference shown to recipient</span>
                    <div className="field-input">
                      <input value={reference} onChange={e => setReference(e.target.value)} maxLength={140} />
                      <span className="field-suffix field-suffix--count">{reference.length}/140</span>
                    </div>
                  </label>
                  <label className="field">
                    <span className="field-label">Category (internal)</span>
                    <div className="field-input">
                      <select value={reason} onChange={e => setReason(e.target.value)}>
                        <option>Services</option>
                        <option>Goods</option>
                        <option>Payroll</option>
                        <option>Refund</option>
                        <option>Intra-company</option>
                        <option>Other</option>
                      </select>
                      <span className="field-suffix"><Icon name="chevronDown" size={13} /></span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: summary */}
            <aside className="transfer-summary">
              <div className="summary-head">
                <div className="summary-eyebrow">Transfer summary</div>
                <div className="summary-amount">
                  <span className="summary-cur">€</span>
                  <span className="summary-whole">{wholeFmt}</span>
                  <span className="summary-cents">.{cents || '00'}</span>
                </div>
                <div className="summary-to">
                  to <b>{recipientName}</b>
                </div>
              </div>

              <div className="summary-line">
                <span>From</span><span>Operating · EUR</span>
              </div>
              <div className="summary-line">
                <span>IBAN</span><span className="mono">{iban.slice(0, 18)}…</span>
              </div>
              <div className="summary-line">
                <span>Method</span>
                <span>
                  {speed === 'instant' ? 'Instant SEPA' : speed === 'sepa' ? 'SEPA Standard' : 'SWIFT'}
                </span>
              </div>
              <div className="summary-line">
                <span>Arrives</span><span>{eta}</span>
              </div>
              <div className="summary-line">
                <span>Fee</span><span>{fee === 0 ? 'Free' : `€${fee.toFixed(2)}`}</span>
              </div>
              <div className="summary-line">
                <span>Reference</span><span className="summary-truncate">{reference}</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-total">
                <span>Total debited</span>
                <span>€{(numericAmount + fee).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <div className="summary-trust">
                <Icon name="shield" size={13} />
                <span>Funds segregated at BNP Paribas DE. Reversible within 10 minutes.</span>
              </div>

              <button className="btn-primary btn-primary--full" onClick={() => setStep(2)} disabled={numericAmount <= 0}>
                Review transfer <Icon name="arrowRight" size={14} />
              </button>
              <button className="btn-ghost btn-ghost--full" onClick={onClose}>
                Save as draft
              </button>
            </aside>
          </div>
        )}

        {step === 2 && (
          <div className="review-wrap">
            <div className="review-card">
              <div className="review-head">
                <div className="review-eyebrow">Final review</div>
                <h2>You're sending</h2>
                <div className="review-amount">
                  <span>€</span>{wholeFmt}<span className="review-cents">.{cents || '00'}</span>
                </div>
                <div className="review-to">
                  to <b>{recipientName}</b> · {speed === 'instant' ? 'Instant · arrives in ~10s' : eta}
                </div>
              </div>

              <div className="review-grid">
                <div className="review-item">
                  <div className="review-label">From</div>
                  <div className="review-value">
                    <span className="from-dot" style={{ background: '#5BC0EB' }} />
                    Operating · EUR
                  </div>
                  <div className="review-sub">DE89 3704 0044 0532 0130 00</div>
                </div>
                <div className="review-item">
                  <div className="review-label">To</div>
                  <div className="review-value">
                    <span className="rec-avatar rec-avatar--sm">MS</span>
                    {recipientName}
                  </div>
                  <div className="review-sub mono">{iban}</div>
                </div>
                <div className="review-item">
                  <div className="review-label">Reference</div>
                  <div className="review-value">{reference}</div>
                  <div className="review-sub">Visible to recipient · Category: {reason}</div>
                </div>
                <div className="review-item">
                  <div className="review-label">Total</div>
                  <div className="review-value">€{(numericAmount + fee).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="review-sub">Amount €{numericAmount.toFixed(2)} + fee {fee === 0 ? 'Free' : `€${fee.toFixed(2)}`}</div>
                </div>
              </div>

              <div className="review-confirm">
                <Icon name="lock" size={14} />
                <span>Confirming will request a tap on your <b>YubiKey · slot 1</b>.</span>
              </div>

              <div className="review-actions">
                <button className="btn-ghost" onClick={() => setStep(1)}>
                  <Icon name="arrowLeft" size={14} /> Edit details
                </button>
                <button className="btn-primary btn-primary--lg" onClick={() => setStep(3)}>
                  Confirm & send €{numericAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <Icon name="arrowRight" size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="success-wrap">
            <div className="success-card">
              <div className="success-burst">
                <div className="success-ring success-ring--1" />
                <div className="success-ring success-ring--2" />
                <div className="success-ring success-ring--3" />
                <div className="success-check"><Icon name="check" size={26} stroke={2.8} /></div>
              </div>

              <div className="success-amount">
                €{numericAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span>sent</span>
              </div>
              <p className="success-sub">
                <b>{recipientName}</b> will see the funds in <b>~10 seconds</b>.
                Reference VLT-{Math.floor(Math.random() * 900000 + 100000)}.
              </p>

              <div className="success-tracker">
                <div className="track-step track-step--done">
                  <span className="track-dot"><Icon name="check" size={10} stroke={2.6} /></span>
                  <span>Authorized</span>
                </div>
                <div className="track-line track-line--done" />
                <div className="track-step track-step--done">
                  <span className="track-dot"><Icon name="check" size={10} stroke={2.6} /></span>
                  <span>Cleared at VaultOs</span>
                </div>
                <div className="track-line track-line--active" />
                <div className="track-step track-step--active">
                  <span className="track-dot track-dot--pulse" />
                  <span>SEPA Instant rail</span>
                </div>
                <div className="track-line" />
                <div className="track-step">
                  <span className="track-dot" />
                  <span>Recipient bank</span>
                </div>
              </div>

              <div className="success-actions">
                <button className="btn-ghost" onClick={() => { setStep(1); }}>
                  Send another
                </button>
                <button className="btn-primary" onClick={onComplete}>
                  Back to overview <Icon name="arrowRight" size={14} />
                </button>
              </div>

              <button className="success-receipt">
                <Icon name="download" size={13} /> Download receipt (PDF)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.TransferScreen = TransferScreen;
