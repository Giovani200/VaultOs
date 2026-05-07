import React, { useState } from 'react';
import { TOKENS, Icon, VaultMark } from '../components/ui-core';

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('alex.morgan@vaultos.io');
  const [password, setPassword] = useState('•••••••••••');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('credentials'); // credentials | mfa
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [errorShake, setErrorShake] = useState(false);

  function submitCreds(e) {
    e?.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('mfa');
    }, 900);
  }

  function handleCodeChange(i, v) {
    if (!/^\d?$/.test(v)) return;
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 5) document.getElementById(`mfa-${i + 1}`)?.focus();
    if (next.every(d => d !== '') && next.join('').length === 6) {
      setTimeout(() => {
        setLoading(true);
        setTimeout(() => onLogin(), 700);
      }, 150);
    }
  }

  function handleCodeKey(i, e) {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      document.getElementById(`mfa-${i - 1}`)?.focus();
    }
  }

  return (
    <div className="login-root overflow-x-hidden">
      {/* Left brand panel */}
      <aside className="login-brand px-6 py-10 sm:px-10 sm:py-12 xl:px-14 xl:py-12">
        <div className="brand-grain" />
        <div className="brand-glow" />
        <div className="brand-top">
          <div className="brand-logo">
            <VaultMark size={32} />
            <span className="brand-name">VaultOs</span>
          </div>
          <div className="brand-pill"><Icon name="globe" size={13} /> UE · Francfort</div>
        </div>

        <div className="brand-mid">
          <div className="brand-eyebrow">— La tresorerie, en plus simple</div>
          <h1 className="brand-headline text-3xl leading-tight sm:text-4xl md:text-5xl xl:text-[56px] xl:leading-[1.05]">
            Pilotez vos paiements<br />
            <span className="brand-headline-accent">avec fluidite.</span>
          </h1>
          <p className="brand-sub">
            Une seule plateforme pour gerer la tresorerie, les paiements et le rapprochement.
            Basee sur des comptes EMI separes dans 14 juridictions.
          </p>
        </div>

        <div className="brand-stats mt-14 flex flex-col gap-8 xl:grid xl:grid-cols-[1fr_auto_1fr_auto_1fr] xl:items-center xl:gap-x-7 xl:gap-y-0">
          <div className="stat">
            <div className="stat-num">€41.2B<span className="stat-unit">/ an</span></div>
            <div className="stat-label">Volume regle en 2025</div>
          </div>
          <div className="stat-divider hidden xl:block" />
          <div className="stat">
            <div className="stat-num">99.997<span className="stat-unit">%</span></div>
            <div className="stat-label">Disponibilite du registre central</div>
          </div>
          <div className="stat-divider hidden xl:block" />
          <div className="stat">
            <div className="stat-num">SOC 2<span className="stat-unit">II</span></div>
            <div className="stat-label">PSD2 · ISO 27001</div>
          </div>
        </div>

        <div className="brand-foot">
          <span>EMI agreee · BaFin 154772</span>
          <span>v4.21 · tous les services sont operationnels</span>
        </div>
      </aside>

      {/* Right form */}
      <main className="login-main px-5 py-6 sm:px-8 sm:py-8 xl:px-14 xl:py-8">
        <div className="login-topbar flex flex-wrap items-center justify-between gap-3">
          <div className="brand-logo brand-logo--mobile">
            <VaultMark size={26} />
            <span className="brand-name">VaultOs</span>
          </div>
          <div className="login-topbar-right">
            <span className="login-topbar-text">Nouveau sur VaultOs ?</span>
            <a className="login-topbar-link">Demander un acces</a>
          </div>
        </div>

        <div className={`login-card-wrap ${errorShake ? 'shake' : ''}`}>
          {step === 'credentials' && (
            <div className="login-card">
              <div className="login-card-head">
                <h2>Bon retour, Alex.</h2>
                <p>Connectez-vous a votre espace tresorerie.</p>
              </div>

              <form className="login-form" onSubmit={submitCreds}>
                <label className="field">
                  <span className="field-label">Email professionnel</span>
                  <div className="field-input">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                    <span className="field-suffix field-suffix--ok"><Icon name="check" size={14} /></span>
                  </div>
                </label>

                <label className="field">
                  <span className="field-label">
                    Mot de passe
                    <a className="field-aux">Oublie ?</a>
                  </span>
                  <div className="field-input">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                    <button type="button" className="field-suffix field-suffix--btn" onClick={() => setShowPw(!showPw)}>
                      <Icon name={showPw ? 'eyeOff' : 'eye'} size={15} />
                    </button>
                  </div>
                </label>

                <div className="login-row">
                  <label className="check">
                    <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                    <span className="check-box"><Icon name="check" size={11} stroke={2.4} /></span>
                    <span>Faire confiance a cet appareil pendant 30 jours</span>
                  </label>
                </div>

                <button type="submit" className={`btn-primary ${loading ? 'btn-loading' : ''}`} disabled={loading}>
                  {loading ? <span className="spinner" /> : <>Continuer <Icon name="arrowRight" size={15} /></>}
                </button>

                <div className="login-divider"><span>ou</span></div>

                <div className="login-alts grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <button type="button" className="btn-ghost">
                    <Icon name="fingerprint" size={16} /> Cle d'acces
                  </button>
                  <button type="button" className="btn-ghost">
                    <span className="sso-mark">SSO</span> Authentification unique
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'mfa' && (
            <div className="login-card">
              <button className="login-back" onClick={() => { setStep('credentials'); setCode(['','','','','','']); }}>
                <Icon name="arrowLeft" size={14} /> Retour
              </button>
              <div className="login-card-head">
                <div className="mfa-badge"><Icon name="shield" size={18} /></div>
                <h2>Verification en deux etapes</h2>
                <p>Saisissez le code a 6 chiffres de votre application d'authentification pour <b>{email}</b>.</p>
              </div>

              <div className="mfa-code grid w-full max-w-full grid-cols-6 gap-1.5 sm:gap-2">
                {code.map((d, i) => (
                  <input
                    key={i}
                    id={`mfa-${i}`}
                    className="mfa-digit min-w-0 text-base sm:text-[22px]"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    autoFocus={i === 0}
                    onChange={e => handleCodeChange(i, e.target.value)}
                    onKeyDown={e => handleCodeKey(i, e)}
                  />
                ))}
              </div>

              <div className="mfa-foot">
                <a className="field-aux">Utiliser une cle de recuperation</a>
                <span className="mfa-timer">Renvoyer dans 0:42</span>
              </div>

              {loading && (
                <div className="mfa-verify"><span className="spinner spinner--dark" /> Verification…</div>
              )}
            </div>
          )}

          <div className="login-trust">
            <Icon name="lock" size={12} /> TLS 256 bits · Sessions protegees par cle physique · Conservation separee
          </div>
        </div>

        <div className="login-foot flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 VaultOs Operations GmbH</div>
          <div className="login-foot-links flex flex-wrap gap-x-[18px] gap-y-2">
            <a>Confidentialite</a><a>Conditions</a><a>Statut</a><a>Documentation</a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;

