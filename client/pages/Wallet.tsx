import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useWallet, requestPayout } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { makeAuthenticatedRequest } from "@/hooks/useAuth";
import { Edit2, Check, X, AlertCircle, Clock, CheckCircle } from "lucide-react";

const API_BASE_URL = "https://pulse-survey-backend.onrender.com/api";

export default function Wallet() {
  const { user, refetch: refetchAuth } = useAuth();
  const { balance, pending, transactions, settings, isLoading, refetch } = useWallet(Boolean(user));
  
  const [coins, setCoins] = useState(30);
  const [mtn, setMtn] = useState("");
  const [isEditingMtn, setIsEditingMtn] = useState(false);
  const [tempMtn, setTempMtn] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastWithdrawal, setLastWithdrawal] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      const userMtn = user.mtn_mobile_number ?? "";
      setMtn(userMtn);
      setTempMtn(userMtn);
    }
  }, [user]);

  // Get last withdrawal from transactions
  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const lastPayoutRequest = transactions
        .filter((tx: any) => tx.type === 'payout_request')
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
      
      if (lastPayoutRequest) {
        setLastWithdrawal(new Date(lastPayoutRequest.created_at).getTime());
      }
    }
  }, [transactions]);

  const canWithdrawToday = () => {
    if (!lastWithdrawal) return true;
    const today = new Date().toDateString();
    const lastWithdrawalDate = new Date(lastWithdrawal).toDateString();
    return today !== lastWithdrawalDate;
  };

  const getNextWithdrawalTime = () => {
    if (!lastWithdrawal) return null;
    const nextDay = new Date(lastWithdrawal);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  };

  async function updateMtnNumber() {
    if (!user) return toast.error("Please log in");
    if (!tempMtn.trim()) return toast.error("MTN number is required");
    
    setLoading(true);
    try {
      const response = await makeAuthenticatedRequest(`${API_BASE_URL}/auth/profile/phone`, {
        method: 'PUT',
        body: JSON.stringify({
          mtn_mobile_number: tempMtn.trim()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to update MTN number');
      }
      
      setMtn(tempMtn.trim());
      setIsEditingMtn(false);
      toast.success("MTN number updated successfully");
      await refetchAuth();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update MTN number");
    } finally {
      setLoading(false);
    }
  }

  function cancelMtnEdit() {
    setTempMtn(mtn);
    setIsEditingMtn(false);
  }

  async function requestPayoutAction() {
    if (!user) return toast.error("Please log in to request a withdrawal");
    
    // Validation checks
    if (!canWithdrawToday()) {
      const nextTime = getNextWithdrawalTime();
      return toast.error(`You can only withdraw once per day. Next withdrawal available: ${nextTime?.toLocaleDateString()}`);
    }
    
    if (coins < 30) {
      return toast.error("Minimum withdrawal amount is 30 coins");
    }

    if (balance < coins) {
      return toast.error("Insufficient balance");
    }
    
    if (!mtn.trim()) {
      return toast.error("Please set your MTN mobile number first");
    }
    
    try {
      setLoading(true);
      const result = await requestPayout(coins, mtn);
      
      setLastWithdrawal(Date.now());
      setCoins(30); // Reset to minimum
      toast.success(result.message || "Withdrawal requested successfully!");
      
      // Refresh data
      await refetch();
      await refetchAuth();
    } catch (err: any) {
      toast.error(err?.message || "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  }

  const getTransactionStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "failed":
        return <X className="w-4 h-4 text-red-500" />;
      case "cancelled":
        return <X className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTransactionStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "completed":
        return "Completed";
      case "failed":
        return "Failed";
      case "cancelled":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const formatDate = (timestamp: string | number) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionTypeLabel = (type: string) => {
    switch (type) {
      case "credit":
        return "Survey Reward";
      case "payout_request":
        return "Withdrawal Request";
      default:
        return type.replace('_', ' ');
    }
  };

  const getTransactionAmountColor = (type: string) => {
    return type === 'credit' ? 'text-green-600' : 'text-red-600';
  };

  const getTransactionAmountPrefix = (type: string) => {
    return type === 'credit' ? '+' : '-';
  };

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <Layout>
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border p-8 bg-card shadow-sm text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Please Log In
            </h3>
            <p className="text-muted-foreground mb-4">
              You need to be logged in to view your wallet and manage withdrawals.
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => window.location.href = '/login'}>
                Log In
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/signup'}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
          <div className="text-sm text-muted-foreground">
            {!canWithdrawToday() && getNextWithdrawalTime() && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Next withdrawal: {getNextWithdrawalTime()?.toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* Balance Card */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:from-blue-950/20 dark:to-indigo-950/20">
            <div className="text-sm font-medium text-muted-foreground mb-2">Available Balance</div>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {isLoading ? "..." : balance ?? 0} coins
            </div>
         <div className="text-sm text-muted-foreground mt-2">
          ≈ {Math.floor(((balance ?? 0) * 3) / 5).toLocaleString()} RWF
         </div>
            <div className="text-sm text-muted-foreground mt-1">
              Pending: <span className="font-medium text-yellow-600">{pending ?? 0} coins</span>
            </div>
          </div>

          <div className="rounded-xl border bg-gradient-to-r from-green-50 to-emerald-50 p-6 dark:from-green-950/20 dark:to-emerald-950/20">
            <div className="text-sm font-medium text-muted-foreground mb-2">Withdrawal Status</div>
            <div className="flex items-center gap-2 mb-2">
              {canWithdrawToday() ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-600">Available</span>
                </>
              ) : (
                <>
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-yellow-600">Daily limit reached</span>
                </>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Min: {settings?.min_withdraw_coins ?? 30} coins | Max: Once per day
            </div>
          </div>
        </div>

        {/* MTN Number Section */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">MTN Mobile Number</h3>
            {!isEditingMtn && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingMtn(true)}
                className="flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            )}
          </div>
          
          <div className="space-y-3">
            {isEditingMtn ? (
              <div className="flex gap-2">
                <Input
                  value={tempMtn}
                  onChange={(e) => setTempMtn(e.target.value)}
                  placeholder="Enter MTN mobile number (e.g., +250788123456)"
                  className="flex-1"
                />
                <Button
                  size="sm"
                  onClick={updateMtnNumber}
                  disabled={loading}
                  className="flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={cancelMtnEdit}
                  disabled={loading}
                  className="flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="text-lg font-mono bg-muted rounded-lg p-3">
                {mtn || "No number set"}
              </div>
            )}
            <div className="text-sm text-muted-foreground">
              This number will be used for mobile money transfers when you request withdrawals.
            </div>
          </div>
        </div>

        {/* Withdrawal Section */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Request Withdrawal</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Amount (coins)</label>
              <Input
                type="number"
                value={coins}
                onChange={(e) => setCoins(Math.max(settings?.min_withdraw_coins ?? 30, Number(e.target.value)))}
                min={settings?.min_withdraw_coins ?? 30}
                max={balance ?? 0}
                className="text-lg"
              />
              <div className="text-sm text-muted-foreground mt-1">
                Minimum: {settings?.min_withdraw_coins ?? 30} coins • Maximum: {balance ?? 0} coins
                <br />
                ≈ {(coins * (settings?.coin_to_currency ?? 2)).toLocaleString()} RWF will be sent to your MTN number
              </div>
            </div>
            
            {!canWithdrawToday() && (
              <div className="rounded-lg border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div className="text-sm text-yellow-800 dark:text-yellow-200">
                    You have already made a withdrawal today. Please wait until tomorrow.
                  </div>
                </div>
              </div>
            )}
            
            <Button
              onClick={requestPayoutAction}
              disabled={loading || !canWithdrawToday() || !mtn.trim() || coins < (settings?.min_withdraw_coins ?? 30) || (balance ?? 0) < coins}
              className="w-full text-lg h-12"
            >
              {loading ? "Processing..." : `Request Payout (${coins} coins → ${(coins * (settings?.coin_to_currency ?? 2)).toLocaleString()} RWF)`}
            </Button>
          </div>
        </div>

        {/* Transactions */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
          <div className="space-y-3">
            {(transactions ?? []).length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No transactions yet. Complete surveys to start earning!
              </div>
            ) : (
              (transactions ?? []).map((t: any) => (
                <div
                  key={t.id}
                  className="rounded-lg border bg-background p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getTransactionStatusIcon(t.status)}
                    <div>
                      <div className="font-medium">
                        {getTransactionTypeLabel(t.type)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(t.created_at)} • {getTransactionStatusText(t.status)}
                      </div>
                      {t.mtn_number && (
                        <div className="text-xs text-muted-foreground font-mono">
                          To: {t.mtn_number}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold text-lg ${getTransactionAmountColor(t.type)}`}>
                      {getTransactionAmountPrefix(t.type)}{t.amount_coins} coins
                    </div>
                    {t.type === 'payout_request' && (
                      <div className="text-sm text-muted-foreground">
                        {(t.amount_coins * (settings?.coin_to_currency ?? 2)).toLocaleString()} RWF
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}