import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:3000/api";

export function useWallet(enabled: boolean = true) {
  const { data, isLoading, refetch } = useQuery({
    enabled,
    queryKey: ["wallet"],
    queryFn: async () => {
      try {
        // Fetch user data (includes balance)
        const userResponse = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!userResponse.ok) {
          // User not authenticated
          return { 
            balance: 0, 
            pending: 0, 
            transactions: [], 
            settings: { 
              coin_to_currency: 2, // 1 coin = 2 RWF
              min_withdraw_coins: 30 
            } 
          };
        }

        const userData = await userResponse.json();

        // Fetch transaction history
        const transactionsResponse = await fetch(`${API_BASE_URL}/transactions/history?limit=50`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        let transactions = [];
        let pendingAmount = 0;

        if (transactionsResponse.ok) {
          const transactionData = await transactionsResponse.json();
          transactions = transactionData.transactions || [];
          
          // Calculate pending amount from pending transactions
          pendingAmount = transactions
            .filter((tx: any) => tx.status === 'pending' && tx.type === 'payout_request')
            .reduce((sum: number, tx: any) => sum + (tx.amount_coins || 0), 0);
        }

        return {
          balance: userData.balance || 0,
          pending: pendingAmount,
          transactions: transactions,
          settings: { 
            coin_to_currency: 2, // 1 coin = 2 RWF
            min_withdraw_coins: 30 
          },
        };
      } catch (error) {
        console.error('Wallet data fetch error:', error);
        // Return default values on error
        return { 
          balance: 0, 
          pending: 0, 
          transactions: [], 
          settings: { 
            coin_to_currency: 2,
            min_withdraw_coins: 30 
          } 
        };
      }
    },
  });

  return { 
    ...(data ?? { 
      balance: 0, 
      pending: 0, 
      transactions: [], 
      settings: { 
        coin_to_currency: 2,
        min_withdraw_coins: 30 
      } 
    }), 
    isLoading, 
    refetch 
  };
}