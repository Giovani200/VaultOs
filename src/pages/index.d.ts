declare module './LoginScreen.jsx' {
  import type { ComponentType } from 'react';
  const LoginScreen: ComponentType<{ onLogin: () => void }>;
  export default LoginScreen;
}

declare module './DashboardScreen.jsx' {
  import type { ComponentType } from 'react';
  const DashboardScreen: ComponentType<{
    active: string;
    onNavigate: (id: string) => void;
    onTransferClick: () => void;
  }>;
  export default DashboardScreen;
}

declare module './TransferScreen.jsx' {
  import type { ComponentType } from 'react';
  const TransferScreen: ComponentType<{
    onClose: () => void;
    onComplete: () => void;
  }>;
  export default TransferScreen;
}
