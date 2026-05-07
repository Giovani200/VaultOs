import React, { useState } from 'react';
import { Icon, VaultMark, SAVED_RECIPIENTS } from '../components/ui-core';
import { transfer as apiTransfer } from '../api';

function VirementScreen({ onClose, onComplete }) {
  const [step, setStep] = useState(1); // 1 details · 2 review · 3 success
  const [amount, setMontant] = useState('1250.00');
  const [recipientId, setBeneficiaireId] = useState('r1');
  const [iban, setIban] = useState('PT50 0035 0000 1234 5678 9012 3');
  const [recipientName, setBeneficiaireName] = useState('Maria Santos');
  const [reference, setReference] = useState('Facture INV-2026-0412');
  const [reason, setReason] = useState('Prestations');
  const [speed, setVitesse] = useState('instant'); // instant | sepa | swift
  const [fromAccount, setDepuisAccount] = useState('operating');
  const [search, setSearch] = useState('');
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferError, setTransferError] = useState('');

  const fromBalance = 284913.47;
  const numericMontant = parseFloat(amount.replace(/,/g, '')) || 0;
  const remaining = fromBalance - numericMontant;
  const fee = speed === 'instant' ? 0 : speed === 'sepa' ? 0 : 6.50;
  const eta = speed === 'instant' ? '~10 secondes' : speed === 'sepa' ? 'Le jour meme · avant 17h00' : '1 a 2 jours ouvrables';

  const filteredBeneficiaires = SAVED_RECIPIENTS.filter(r =>
    !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.iban.includes(search)
  );

  function selectBeneficiaire(r) {
    setBeneficiaireId(r.id);
    setIban(r.iban);
    setBeneficiaireName(r.name);
  }

  function handleMontantChange(v) {
    // Allow digits and one decimal
    let cleaned = v.replace(/[^\d.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) cleaned = parts[0] + '.' + parts.slice(1).join('');
    if (parts[1] && parts[1].length > 2) cleaned = parts[0] + '.' + parts[1].slice(0, 2);
    setMontant(cleaned);
  }

  // Format amount display
  const [whole, cents] = (amount || '0').split('.');
  const wholeFmt = (parseInt(whole || '0') || 0).toLocaleString('en-US');

  return (
    <div className="transfer-root min-w-0" data-screen-label="03 Virement">
      <header className="transfer-header flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6 md:px-8 lg:px-10">
        <button className="transfer-back" onClick={onClose}>
          <Icon name="arrowLeft" size={15} /> Retour a la vue d'ensemble
        </button>
        <div className="transfer-title-bar min-w-0">
          <VaultMark size={22} />
          <span className="transfer-title">Nouveau virement</span>
        </div>
        <div className="transfer-stepper ml-auto flex min-w-0 flex-shrink flex-wrap items-center justify-end gap-2 overflow-x-auto pb-1">
          <div className={`step ${step >= 1 ? 'step--done' : ''} ${step === 1 ? 'step--current' : ''}`}>
            <span className="step-num">{step > 1 ? <Icon name="check" size={11} stroke={2.6} /> : '1'}</span>
            <span>Details</span>
          </div>
          <div className={`step-line ${step >= 2 ? 'step-line--done' : ''}`} />
          <div className={`step ${step >= 2 ? 'step--done' : ''} ${step === 2 ? 'step--current' : ''}`}>
            <span className="step-num">{step > 2 ? <Icon name="check" size={11} stroke={2.6} /> : '2'}</span>
            <span>Verification</span>
          </div>
          <div className={`step-line ${step >= 3 ? 'step-line--done' : ''}`} />
          <div className={`step ${step >= 3 ? 'step--done' : ''} ${step === 3 ? 'step--current' : ''}`}>
            <span className="step-num">{step > 3 ? <Icon name="check" size={11} stroke={2.6} /> : '3'}</span>
            <span>Termine</span>
          </div>
        </div>
      </header>

      <div className="transfer-body px-4 py-6 sm:px-6 md:px-8 lg:px-10">
        {step === 1 && (
          <div className="transfer-grid mx-auto grid max-w-[1280px] grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            {/* Left: form */}
            <div className="transfer-card w-full min-w-0 p-4 sm:px-6 sm:py-2 md:px-8">
              <div className="t-section">
                <div className="t-section-head">
                  <span className="t-section-num">01</span>
                  <span>Depuis</span>
                </div>
                <div className="from-account">
                  <div className="from-account-main">
                    <span className="from-dot" style={{ background: '#5BC0EB' }} />
                    <div>
                      <div className="from-name">Courant · EUR</div>
                      <div className="from-iban">DE89 3704 0044 0532 0130 00</div>
                    </div>
                  </div>
                  <div className="from-bal">
                    <div className="from-bal-label">Disponible</div>
                    <div className="from-bal-amount">€284,913.47</div>
                  </div>
                  <button className="from-switch"><Icon name="chevronDown" size={14} /></button>
                </div>
              </div>

              <div className="t-section">
                <div className="t-section-head">
                  <span className="t-section-num">02</span>
                  <span>Montant</span>
                </div>

                <div className="amount-input-wrap">
                  <span className="amount-currency">EUR</span>
                  <span className="amount-symbol">€</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    className="amount-input text-3xl sm:text-4xl md:text-5xl lg:text-[56px]"
                    value={amount}
                    onChange={e => handleMontantChange(e.target.value)}
                    onBlur={() => {
                      const n = parseFloat(amount) || 0;
                      setMontant(n.toFixed(2));
                    }}
                  />
                </div>

                <div className="amount-meta">
                  <div className="amount-meta-item">
                    <span className="amount-meta-label">Disponible</span>
                    <span>€{fromBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="amount-meta-item">
                    <span className="amount-meta-label">Apres virement</span>
                    <span className={remaining < 0 ? 'down' : ''}>
                      €{remaining.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="amount-quick">
                  {['100', '500', '1000', '5000'].map(v => (
                    <button key={v} className="quick-chip" onClick={() => setMontant(parseFloat(v).toFixed(2))}>
                      €{parseInt(v).toLocaleString('en-US')}
                    </button>
                  ))}
                  <button className="quick-chip" onClick={() => setMontant((fromBalance / 2).toFixed(2))}>½</button>
                </div>
              </div>

              <div className="t-section">
                <div className="t-section-head">
                  <span className="t-section-num">03</span>
                  <span>Beneficiaire</span>
                  <button className="t-section-aux">+ Nouveau beneficiaire</button>
                </div>

                <div className="rec-search">
                  <Icon name="search" size={14} />
                  <input
                    placeholder="Rechercher par nom, IBAN ou entreprise…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>

                <div className="rec-list">
                  {filteredBeneficiaires.map(r => (
                    <button
                      key={r.id}
                      className={`rec-row ${recipientId === r.id ? 'rec-row--active' : ''}`}
                      onClick={() => selectBeneficiaire(r)}
                    >
                      <div className="rec-avatar">{r.initials}</div>
                      <div className="rec-main">
                        <div className="rec-name">{r.name}</div>
                        <div className="rec-iban">{r.iban}</div>
                      </div>
                      <div className="rec-last">
                        <div className="rec-last-label">Dernier envoi</div>
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
                  <span>Vitesse</span>
                </div>
                <div className="speed-grid grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {[
                    { id: 'instant', label: 'SEPA instantane', eta: '~10 secondes', fee: 'Gratuit', icon: 'zap' },
                    { id: 'sepa', label: 'SEPA Standard', eta: 'Le jour meme', fee: 'Gratuit', icon: 'globe' },
                    { id: 'swift', label: 'SWIFT', eta: '1–2 jours', fee: '€6.50', icon: 'send' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      className={`speed-card ${speed === opt.id ? 'speed-card--active' : ''}`}
                      onClick={() => setVitesse(opt.id)}
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
                  <span>Reference et categorie</span>
                </div>
                <div className="t-row-2 grid grid-cols-1 gap-3 md:grid-cols-[1fr_220px]">
                  <label className="field">
                    <span className="field-label">Reference visible par le beneficiaire</span>
                    <div className="field-input">
                      <input value={reference} onChange={e => setReference(e.target.value)} maxLength={140} />
                      <span className="field-suffix field-suffix--count">{reference.length}/140</span>
                    </div>
                  </label>
                  <label className="field">
                    <span className="field-label">Categorie (interne)</span>
                    <div className="field-input">
                      <select value={reason} onChange={e => setReason(e.target.value)}>
                        <option>Prestations</option>
                        <option>Biens</option>
                        <option>Paie</option>
                        <option>Remboursement</option>
                        <option>Intra-entreprise</option>
                        <option>Autre</option>
                      </select>
                      <span className="field-suffix"><Icon name="chevronDown" size={13} /></span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: summary */}
            <aside className="transfer-summary w-full max-w-full shrink-0 lg:sticky lg:top-24 lg:max-w-[360px]">
              <div className="summary-head">
                <div className="summary-eyebrow">Resume du virement</div>
                <div className="summary-amount">
                  <span className="summary-cur">€</span>
                  <span className="summary-whole">{wholeFmt}</span>
                  <span className="summary-cents">.{cents || '00'}</span>
                </div>
                <div className="summary-to">
                  vers <b>{recipientName}</b>
                </div>
              </div>

              <div className="summary-line">
                <span>Depuis</span><span>Courant · EUR</span>
              </div>
              <div className="summary-line">
                <span>IBAN</span><span className="mono">{iban.slice(0, 18)}…</span>
              </div>
              <div className="summary-line">
                <span>Methode</span>
                <span>
                  {speed === 'instant' ? 'SEPA Instantane' : speed === 'sepa' ? 'SEPA Standard' : 'SWIFT'}
                </span>
              </div>
              <div className="summary-line">
                <span>Delai</span><span>{eta}</span>
              </div>
              <div className="summary-line">
                <span>Frais</span><span>{fee === 0 ? 'Gratuit' : `€${fee.toFixed(2)}`}</span>
              </div>
              <div className="summary-line">
                <span>Reference</span><span className="summary-truncate">{reference}</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-total">
                <span>Total debite</span>
                <span>€{(numericMontant + fee).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <div className="summary-trust">
                <Icon name="shield" size={13} />
                <span>Fonds separes chez BNP Paribas DE. Annulable sous 10 minutes.</span>
              </div>

              <button className="btn-primary btn-primary--full" onClick={() => setStep(2)} disabled={numericMontant <= 0}>
                Verifier le virement <Icon name="arrowRight" size={14} />
              </button>
              <button className="btn-ghost btn-ghost--full" onClick={onClose}>
                Enregistrer en brouillon
              </button>
            </aside>
          </div>
        )}

        {step === 2 && (
          <div className="review-wrap max-w-full px-1 sm:px-0">
            <div className="review-card p-6 sm:p-8 md:p-9">
              <div className="review-head">
                <div className="review-eyebrow">Verification finale</div>
                <h2>Vous envoyez</h2>
                <div className="review-amount">
                  <span>€</span>{wholeFmt}<span className="review-cents">.{cents || '00'}</span>
                </div>
                <div className="review-to">
                  vers <b>{recipientName}</b> · {speed === 'instant' ? 'Instantane · arrive en ~10 s' : eta}
                </div>
              </div>

              <div className="review-grid grid grid-cols-1 gap-px sm:grid-cols-2">
                <div className="review-item">
                  <div className="review-label">Depuis</div>
                  <div className="review-value">
                    <span className="from-dot" style={{ background: '#5BC0EB' }} />
                    Courant · EUR
                  </div>
                  <div className="review-sub">DE89 3704 0044 0532 0130 00</div>
                </div>
                <div className="review-item">
                  <div className="review-label">Vers</div>
                  <div className="review-value">
                    <span className="rec-avatar rec-avatar--sm">MS</span>
                    {recipientName}
                  </div>
                  <div className="review-sub mono">{iban}</div>
                </div>
                <div className="review-item">
                  <div className="review-label">Reference</div>
                  <div className="review-value">{reference}</div>
                  <div className="review-sub">Visible pour le beneficiaire · Categorie : {reason}</div>
                </div>
                <div className="review-item">
                  <div className="review-label">Total</div>
                  <div className="review-value">€{(numericMontant + fee).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="review-sub">Montant €{numericMontant.toFixed(2)} + frais {fee === 0 ? 'Gratuit' : `€${fee.toFixed(2)}`}</div>
                </div>
              </div>

              <div className="review-confirm">
                <Icon name="lock" size={14} />
                <span>La confirmation demandera un appui sur votre <b>YubiKey · slot 1</b>.</span>
              </div>

              <div className="review-actions flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button className="btn-ghost w-full sm:w-auto" onClick={() => setStep(1)}>
                  <Icon name="arrowLeft" size={14} /> Modifier les details
                </button>
                {transferError && <p style={{ color: 'red', fontSize: 13 }}>{transferError}</p>}
                <button
                  className="btn-primary btn-primary--lg w-full sm:w-auto"
                  disabled={transferLoading}
                  onClick={async () => {
                    setTransferLoading(true);
                    setTransferError('');
                    try {
                      await apiTransfer(numericMontant, iban);
                      setStep(3);
                    } catch (e) {
                      setTransferError(e.message);
                    } finally {
                      setTransferLoading(false);
                    }
                  }}
                >
                  {transferLoading ? 'Envoi…' : <>Confirmer et envoyer €{numericMontant.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <Icon name="arrowRight" size={14} /></>}
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
                €{numericMontant.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span>envoye</span>
              </div>
              <p className="success-sub">
                <b>{recipientName}</b> recevra les fonds sous <b>~10 secondes</b>.
                Reference VLT-{Math.floor(Math.random() * 900000 + 100000)}.
              </p>

              <div className="success-tracker">
                <div className="track-step track-step--done">
                  <span className="track-dot"><Icon name="check" size={10} stroke={2.6} /></span>
                  <span>Autorise</span>
                </div>
                <div className="track-line track-line--done" />
                <div className="track-step track-step--done">
                  <span className="track-dot"><Icon name="check" size={10} stroke={2.6} /></span>
                  <span>Valide par VaultOs</span>
                </div>
                <div className="track-line track-line--active" />
                <div className="track-step track-step--active">
                  <span className="track-dot track-dot--pulse" />
                  <span>Reseau SEPA instantane</span>
                </div>
                <div className="track-line" />
                <div className="track-step">
                  <span className="track-dot" />
                  <span>Banque du beneficiaire</span>
                </div>
              </div>

              <div className="success-actions">
                <button className="btn-ghost" onClick={() => { setStep(1); }}>
                  Envoyer un autre
                </button>
                <button className="btn-primary" onClick={onComplete}>
                  Retour a la vue d'ensemble <Icon name="arrowRight" size={14} />
                </button>
              </div>

              <button className="success-receipt">
                <Icon name="download" size={13} /> Telecharger le recu (PDF)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VirementScreen;

