import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  async function submit(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.signup({ email, password, display_name: displayName, country });
      toast.success("Account created — please log in");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-md">
        <h2 className="text-2xl font-bold mb-2">Create an account</h2>
        <p className="text-sm text-muted-foreground mb-6">Sign up to start earning coins by answering surveys.</p>
        <form onSubmit={submit} className="grid gap-3">
          <label className="text-sm">Display name</label>
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          <label className="text-sm">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <label className="text-sm">Password</label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          <label className="text-sm">Country (optional)</label>
          <Input value={country} onChange={(e) => setCountry(e.target.value)} />
          <div className="flex items-center justify-between mt-4">
            <Button type="submit" disabled={loading}>{loading ? "Creating…" : "Create account"}</Button>
            <Link to="/login" className="text-sm text-foreground/70 hover:underline">Already have an account?</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
