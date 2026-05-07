/* global React, ReactDOM, LoginScreen, DashboardScreen, TransferScreen */
const { useState } = React;

function App() {
  const [screen, setScreen] = useState('login'); // login | dashboard | transfer
  const [activeNav, setActiveNav] = useState('home');

  return (
    <>
      {screen === 'login' && (
        <div data-screen-label="01 Login">
          <LoginScreen onLogin={() => setScreen('dashboard')} />
        </div>
      )}
      {screen === 'dashboard' && (
        <DashboardScreen
          active={activeNav}
          onNavigate={setActiveNav}
          onTransferClick={() => setScreen('transfer')}
        />
      )}
      {screen === 'transfer' && (
        <TransferScreen
          onClose={() => setScreen('dashboard')}
          onComplete={() => setScreen('dashboard')}
        />
      )}

      {/* Bottom screen switcher (always visible) */}
      <div className="screen-switcher">
        <span className="ss-label">Prototype</span>
        <button
          className={screen === 'login' ? 'ss-btn ss-btn--active' : 'ss-btn'}
          onClick={() => setScreen('login')}
        >01 · Login</button>
        <button
          className={screen === 'dashboard' ? 'ss-btn ss-btn--active' : 'ss-btn'}
          onClick={() => setScreen('dashboard')}
        >02 · Dashboard</button>
        <button
          className={screen === 'transfer' ? 'ss-btn ss-btn--active' : 'ss-btn'}
          onClick={() => setScreen('transfer')}
        >03 · Transfer</button>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
