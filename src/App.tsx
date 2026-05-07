import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './styles/app-prototype.css';
import LoginScreen from './pages/LoginScreen.jsx';
import DashboardScreen from './pages/DashboardScreen.jsx';
import TransferScreen from './pages/TransferScreen.jsx';

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <div data-screen-label="01 Connexion">
            <LoginScreen onLogin={() => navigate('/dashboard')} />
          </div>
        }
      />
      <Route
        path="/dashboard"
        element={
        <DashboardScreen
          active={activeNav}
          onNavigate={setActiveNav}
          onTransferClick={() => navigate('/transfer')}
        />
        }
      />
      <Route
        path="/transfer"
        element={
        <TransferScreen
          onClose={() => navigate('/dashboard')}
          onComplete={() => navigate('/dashboard')}
        />
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
