import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { makeAuthenticatedRequest } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Wallet, CreditCard, HelpCircle, Clock, AlertCircle, CheckCircle, Coins, Save, Edit } from "lucide-react";

export default function Dashboard() {
  const { user, refetch, token } = useAuth();
  const [mtn, setMtn] = useState("");
  const [bank, setBank] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingBank, setEditingBank] = useState(false);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalWithdrawals: 0,
    pendingAmount: 0,
    lastWithdrawal: null as Date | null
  });

  useEffect(() => {
    if (user) {
      setMtn(user.mtn_mobile_number ?? "");
      setBank((user as any).bank_account ?? "");
      
      // Load user stats from localStorage (keeping this as is since it's for display)
      loadUserStats();
    }
  }, [user]);

  const loadUserStats = () => {
    if (!user) return;
    
    const LS_USERS_KEY = "ps_users";
    const raw = localStorage.getItem(LS_USERS_KEY);
    const users = raw ? JSON.parse(raw) : {};
    const u = users[user.email.toLowerCase()];
    
    if (u) {
      const transactions = u.transactions ?? [];
      const completedWithdrawals = transactions.filter((t: any) => 
        t.type === "payout_request" && t.status === "completed"
      );
      const pendingWithdrawals = transactions.filter((t: any) => 
        t.type === "payout_request" && t.status === "pending"
      );
      
      const totalWithdrawals = completedWithdrawals.reduce((sum: number, t: any) => 
        sum + (t.amount_coins || 0), 0
      );
      const pendingAmount = pendingWithdrawals.reduce((sum: number, t: any) => 
        sum + (t.amount_coins || 0), 0
      );
      
      const lastWithdrawal = u.last_withdrawal_date 
        ? new Date(u.last_withdrawal_date) 
        : null;
      
      setStats({
        totalEarnings: (u.balance || 0) + totalWithdrawals,
        totalWithdrawals,
        pendingAmount,
        lastWithdrawal
      });
    }
  };

  // Update phone number via API
  async function updatePhoneNumber() {
    if (!user) return toast.error("Please log in");
    if (!mtn.trim()) return toast.error("Phone number is required");

    setLoading(true);
    try {
      const response = await makeAuthenticatedRequest('http://localhost:3001/api/auth/profile/phone', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mtn_mobile_number: mtn.trim()
        }),
      });

      console.log('Phone update response status:', response.status);
      console.log('Phone update response headers:', response.headers);
      
      if (!response.ok) {
        const responseText = await response.text();
        console.log('Error response text:', responseText);
        
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          throw new Error(`Server error: ${response.status} - ${responseText}`);
        }
        throw new Error(errorData.error || 'Failed to update phone number');
      }

      const responseText = await response.text();
      console.log('Success response text:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error('Invalid JSON response from server');
      }
      
      toast.success("Phone number updated successfully");
      setEditingPhone(false);
      await refetch(); // Refresh user data
    } catch (error: any) {
      console.error('Phone update error:', error);
      toast.error(error.message || "Failed to update phone number");
    } finally {
      setLoading(false);
    }
  }

  // Update bank account via API
  async function updateBankAccount() {
    if (!user) return toast.error("Please log in");
    if (!bank.trim()) return toast.error("Bank account is required");

    setLoading(true);
    try {
      const response = await makeAuthenticatedRequest('https://pulse-survey-backend.onrender.com/api/auth/profile/bank-account', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bank_account: bank.trim()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update bank account');
      }

      const data = await response.json();
      
      toast.success("Bank account updated successfully");
      setEditingBank(false);
      await refetch(); // Refresh user data
    } catch (error: any) {
      console.error('Bank account update error:', error);
      toast.error(error.message || "Failed to update bank account");
    } finally {
      setLoading(false);
    }
  }

  // Update both phone and bank via general profile API
  async function updateProfile() {
    if (!user) return toast.error("Please log in");

    setLoading(true);
    try {
      const response = await makeAuthenticatedRequest('http://localhost:3000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mtn_mobile_number: mtn.trim(),
          bank_account: bank.trim(),
          display_name: user.display_name,
          country: user.country
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      const data = await response.json();
      
      toast.success("Payment details updated successfully");
      setEditingPhone(false);
      setEditingBank(false);
      await refetch(); // Refresh user data
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error(error.message || "Failed to update payment details");
    } finally {
      setLoading(false);
    }
  }

  const hasRequiredInfo = mtn.trim().length > 0;

  // Convert coins to RWF (5 coins = 3 RWF)
  const convertCoinsToRWF = (coins: number): number => {
    return Math.floor((coins * 3) / 5);
  };

  if (!user)
    return (
      <Layout>
        <div className="mx-auto max-w-md text-center py-12">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
          <p className="text-muted-foreground">Please log in to access your dashboard.</p>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="text-sm text-gray-600 mt-2 md:mt-0">
                Welcome back, {user.display_name}
            </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:from-blue-950/20 dark:to-indigo-950/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Current Balance</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {user.balance ?? 0} coins
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  ≈ {convertCoinsToRWF(user.balance ?? 0)} RWF
                </div>
              </div>
              <Coins className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="rounded-xl border bg-gradient-to-r from-green-50 to-emerald-50 p-6 dark:from-green-950/20 dark:to-emerald-950/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Total Earnings</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.totalEarnings} coins
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  ≈ {convertCoinsToRWF(stats.totalEarnings)} RWF
                </div>
              </div>
              <Wallet className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="rounded-xl border bg-gradient-to-r from-purple-50 to-violet-50 p-6 dark:from-purple-950/20 dark:to-violet-950/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Total Withdrawn</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.totalWithdrawals} coins
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  ≈ {convertCoinsToRWF(stats.totalWithdrawals)} RWF
                </div>
              </div>
              <CreditCard className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="rounded-xl border bg-gradient-to-r from-yellow-50 to-orange-50 p-6 dark:from-yellow-950/20 dark:to-orange-950/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Pending</div>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {stats.pendingAmount} coins
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  ≈ {convertCoinsToRWF(stats.pendingAmount)} RWF
                </div>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Account Status</h3>
            {hasRequiredInfo ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Ready for withdrawals</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-yellow-600">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Setup required</span>
              </div>
            )}
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm font-medium">Payment Information</div>
              <div className="text-sm text-muted-foreground">
                {hasRequiredInfo ? "✓ MTN number configured" : "⚠ MTN number required"}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Last Activity</div>
              <div className="text-sm text-muted-foreground">
                {stats.lastWithdrawal 
                  ? `Last withdrawal: ${stats.lastWithdrawal.toLocaleDateString()}`
                  : "No withdrawals yet"
                }
              </div>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Billing & Payout Information</h3>
          </div>
          
          <div className="rounded-lg bg-muted/50 p-4 mb-6">
            <div className="text-sm">
              <div className="font-medium mb-2">Processing Fees & Conversion Rate:</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Conversion Rate: <strong>5 coins = 3 RWF</strong></li>
                <li>• First-time payout: <strong>30 coins processing fee</strong></li>
                <li>• Subsequent payouts: <strong>30 coins fee per day</strong></li>
              </ul>
              <div className="mt-3 text-xs">
                <strong>Processing Schedule:</strong> Payouts are processed daily before 20:00. 
                If your payout is delayed, please contact support.
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* MTN Mobile Number */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">
                  MTN Mobile Number <span className="text-red-500">*</span>
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingPhone(!editingPhone)}
                  disabled={loading}
                  className="h-8 px-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              
              {editingPhone ? (
                <div className="flex gap-2">
                  <Input
                    value={mtn}
                    onChange={(e) => setMtn(e.target.value)}
                    placeholder="e.g., +25078XXXXXXX or 078XXXXXXX"
                    className={!mtn.trim() ? "border-red-200" : ""}
                  />
                  <Button
                    onClick={updatePhoneNumber}
                    disabled={loading || !mtn.trim()}
                    size="sm"
                  >
                    {loading ? "Saving..." : <Save className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setMtn(user.mtn_mobile_number ?? "");
                      setEditingPhone(false);
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="p-3 bg-muted/30 rounded-md text-sm">
                  {mtn || <span className="text-muted-foreground italic">Not set</span>}
                </div>
              )}
              
              <div className="text-xs text-muted-foreground mt-1">
                Required for mobile money payouts. Format: +25078XXXXXXX
              </div>
            </div>
            
            {/* Bank Account */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">
                  Bank Account <span className="text-muted-foreground">(Optional)</span>
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingBank(!editingBank)}
                  disabled={loading}
                  className="h-8 px-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              
              {editingBank ? (
                <div className="flex gap-2">
                  <Input
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    placeholder="Bank account number (8-20 digits)"
                  />
                  <Button
                    onClick={updateBankAccount}
                    disabled={loading || !bank.trim()}
                    size="sm"
                  >
                    {loading ? "Saving..." : <Save className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setBank((user as any).bank_account ?? "");
                      setEditingBank(false);
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="p-3 bg-muted/30 rounded-md text-sm">
                  {bank || <span className="text-muted-foreground italic">Not set</span>}
                </div>
              )}
              
              <div className="text-xs text-red-600 mt-1 font-medium">
                ⚠️ Warning: Verify bank details carefully! Incorrect details cannot be refunded.
              </div>
            </div>
            
            {/* Update All Button */}
            <div className="pt-4 border-t">
              <Button
                onClick={updateProfile}
                disabled={loading}
                className="w-full md:w-auto"
                variant="default"
              >
                {loading ? "Updating..." : "Update All Payment Details"}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold">Wallet</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              View your balance, request withdrawals, and check transaction history.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="/wallet">Go to Wallet</a>
            </Button>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold">Support</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Need help? Contact our support team for assistance with your account.
            </p>
            <Button variant="outline" className="w-full">
             <a href="/contact">Contact Support</a>  
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}