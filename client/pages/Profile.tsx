import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Profile() {
  const { user, refetch } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");
  const [mtn, setMtn] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.display_name || "");
      setCountry(user.country || "");
      setMtn(user.mtn_mobile_number || "");
    }
  }, [user]);

  async function save() {
    try {
      if (!user) throw new Error("Not authenticated");
      const LS_USERS_KEY = "ps_users";
      const raw = localStorage.getItem(LS_USERS_KEY);
      const users = raw ? JSON.parse(raw) : {};
      const u = users[user.email.toLowerCase()];
      if (!u) throw new Error("User not found");
      u.display_name = displayName;
      u.country = country;
      u.mtn_mobile_number = mtn;
      users[user.email.toLowerCase()] = u;
      localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
      toast.success("Profile updated");
      await refetch();
    } catch (err: any) {
      toast.error(err?.message || "Save failed");
    }
  }

  if (!user) return (
    <Layout>
      <div className="mx-auto max-w-md">Please log in to view your profile.</div>
    </Layout>
  );

  return (
    <Layout>
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <label className="text-sm">Display name</label>
        <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        <label className="text-sm mt-2">Country</label>
        <Input value={country} onChange={(e) => setCountry(e.target.value)} />
        <label className="text-sm mt-2">MTN Mobile Number</label>
        <Input value={mtn} onChange={(e) => setMtn(e.target.value)} />
        <div className="mt-4">
          <Button onClick={save}>Save profile</Button>
        </div>
      </div>
    </Layout>
  );
}
