const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Email ou mot de passe incorrect');
  }

  const data = await res.json();
  return data.access_token;
}

export async function transfer(amount: number, recipientIban: string) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/transactions/transfer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount, recipient_iban: recipientIban }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? 'Erreur lors du virement');
  }

  return res.json();
}

export async function getDashboard() {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/accounts/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error('Impossible de charger le tableau de bord');
  }

  return res.json();
}
