/* global React, TOKENS, Icon, VaultMark */
const { useState, useEffect } = React;

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
    <div className="login-root">
      {/* Left brand panel */}
      <aside className="login-brand">
        <div className="brand-grain" />
        <div className="brand-glow" />
        <div className="brand-top">
          <div className="brand-logo">
            <VaultMark size={32} />
            <span className="brand-name">VaultOs</span>
          </div>
          <div className="brand-pill"><Icon name="globe" size={13} /> EU · Frankfurt</div>
        </div>

        <div className="brand-mid">
          <div className="brand-eyebrow">— Treasury, simplified</div>
          <h1 className="brand-headline">
            Move money like<br />
            <span className="brand-headline-accent">software ships.</span>
          </h1>
          <p className="brand-sub">
            One operating system for company cash, payments, and reconciliation.
            Built on segregated EMI accounts in 14 jurisdictions.
          </p>
        </div>

        <div className="brand-stats">
          <div className="stat">
            <div className="stat-num">€41.2B<span className="stat-unit">/ yr</span></div>
            <div className="stat-label">Volume settled in 2025</div>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <div className="stat-num">99.997<span className="stat-unit">%</span></div>
            <div className="stat-label">Core ledger uptime</div>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <div className="stat-num">SOC 2<span className="stat-unit">II</span></div>
            <div className="stat-label">PSD2 · ISO 27001</div>
          </div>
        </div>

        <div className="brand-foot">
          <span>Authorised EMI · BaFin 154772</span>
          <span>v4.21 · status all green</span>
        </div>
      </aside>

      {/* Right form */}
      <main className="login-main">
        <div className="login-topbar">
          <div className="brand-logo brand-logo--mobile">
            <VaultMark size={26} />
            <span className="brand-name">VaultOs</span>
          </div>
          <div className="login-topbar-right">
            <span className="login-topbar-text">New to VaultOs?</span>
            <a className="login-topbar-link">Request access →</a>
          </div>
        </div>

        <div className={`login-card-wrap ${errorShake ? 'shake' : ''}`}>
          {step === 'credentials' && (
            <div className="login-card">
              <div className="login-card-head">
                <h2>Welcome back, Alex.</h2>
                <p>Sign in to your treasury workspace.</p>
              </div>

              <form className="login-form" onSubmit={submitCreds}>
                <label className="field">
                  <span className="field-label">Work email</span>
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
                    Password
                    <a className="field-aux">Forgot?</a>
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
                    <span>Trust this device for 30 days</span>
                  </label>
                </div>

                <button type="submit" className={`btn-primary ${loading ? 'btn-loading' : ''}`} disabled={loading}>
                  {loading ? <span className="spinner" /> : <>Continue <Icon name="arrowRight" size={15} /></>}
                </button>

                <div className="login-divider"><span>or</span></div>

                <div className="login-alts">
                  <button type="button" className="btn-ghost">
                    <Icon name="fingerprint" size={16} /> Passkey
                  </button>
                  <button type="button" className="btn-ghost">
                    <span className="sso-mark">SSO</span> Single sign-on
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'mfa' && (
            <div className="login-card">
              <button className="login-back" onClick={() => { setStep('credentials'); setCode(['','','','','','']); }}>
                <Icon name="arrowLeft" size={14} /> Back
              </button>
              <div className="login-card-head">
                <div className="mfa-badge"><Icon name="shield" size={18} /></div>
                <h2>Two-step verification</h2>
                <p>Enter the 6-digit code from your authenticator app for <b>{email}</b>.</p>
              </div>

              <div className="mfa-code">
                {code.map((d, i) => (
                  <input
                    key={i}
                    id={`mfa-${i}`}
                    className="mfa-digit"
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
                <a className="field-aux">Use a recovery key instead</a>
                <span className="mfa-timer">Resend in 0:42</span>
              </div>

              {loading && (
                <div className="mfa-verify"><span className="spinner spinner--dark" /> Verifying…</div>
              )}
            </div>
          )}

          <div className="login-trust">
            <Icon name="lock" size={12} /> 256-bit TLS · Hardware-key sessions · Independent custody
          </div>
        </div>

        <div className="login-foot">
          <div>© 2026 VaultOs Operations GmbH</div>
          <div className="login-foot-links">
            <a>Privacy</a><a>Terms</a><a>Status</a><a>Docs</a>
          </div>
        </div>
      </main>
    </div>
  );
}

window.LoginScreen = LoginScreen;
