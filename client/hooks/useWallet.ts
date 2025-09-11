import { useQuery } from "@tanstack/react-query";

const LS_USERS_KEY = "ps_users";
const LS_SESSION_KEY = "ps_session";

function readUsers() {
  try {
    const raw = localStorage.getItem(LS_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function readSession() {
  return localStorage.getItem(LS_SESSION_KEY);
}

export function useWallet(enabled: boolean = true) {
  const { data, isLoading, refetch } = useQuery({
    enabled,
    queryKey: ["wallet"],
    queryFn: async () => {
      const session = readSession();
      const users = readUsers();
      if (!session) return { balance: 0, pending: 0, transactions: [], settings: { coin_to_currency: 100, min_withdraw_coins: 1000 } };
      const u = users[session.toLowerCase()];
      if (!u) return { balance: 0, pending: 0, transactions: [], settings: { coin_to_currency: 100, min_withdraw_coins: 1000 } };
      return {
        balance: u.balance ?? 0,
        pending: 0,
        transactions: u.transactions ?? [],
        settings: { coin_to_currency: 100, min_withdraw_coins: 1000 },
      };
    },
  });
  return { ...(data ?? { balance: 0, pending: 0, transactions: [], settings: {} }), isLoading, refetch };
}
