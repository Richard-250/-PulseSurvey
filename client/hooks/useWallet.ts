import { useQuery } from "@tanstack/react-query";
import { makeAuthenticatedRequest } from "./useAuth";

const API_BASE_URL = "https://pulse-survey-backend-1.onrender.com/api";

export function useWallet(enabled: boolean = true) {
  const { data, isLoading, refetch } = useQuery({
    enabled,
    queryKey: ["wallet"],
    queryFn: async () => {
      try {
        // Fetch user data (includes balance)
        const userResponse = await makeAuthenticatedRequest(`${API_BASE_URL}/auth/me`);

        if (!userResponse.ok) {
          // Handle authentication errors
          if (userResponse.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            window.location.href = '/login';
            return;
          }
          
          // User not authenticated or other error
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
        const transactionsResponse = await makeAuthenticatedRequest(
          `${API_BASE_URL}/payout/transactions?limit=50`
        );

        let transactions = [];
        let pendingAmount = 0;

        if (transactionsResponse.ok) {
          const transactionData = await transactionsResponse.json();
          transactions = transactionData.transactions || [];
          
          // Calculate pending amount from pending transactions
          pendingAmount = transactions
            .filter((tx: any) => tx.status === 'pending' && tx.type === 'payout_request')
            .reduce((sum: number, tx: any) => sum + (tx.amount_coins || 0), 0);
        } else if (transactionsResponse.status === 401) {
          // Handle auth error for transactions
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          window.location.href = '/login';
          return;
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

// Helper function for making payout requests
export async function requestPayout(amount_coins: number, mtn_number: string) {
  try {
    const response = await makeAuthenticatedRequest(`${API_BASE_URL}/payout/request`, {
      method: 'POST',
      body: JSON.stringify({ amount_coins, mtn_number }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        window.location.href = '/login';
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error(data.error || 'Payout request failed');
    }

    return data;
  } catch (error) {
    console.error('Payout request error:', error);
    throw error;
  }
}