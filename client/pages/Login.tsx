import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  async function submit(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.login({ email, password });
      toast.success("Logged in");
      navigate("/");
    } catch (err: any) {
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="mx-auto max-w-md">
        <h2 className="text-2xl font-bold mb-2">Log in</h2>
        <p className="text-sm text-muted-foreground mb-6">Use your email and password to sign in.</p>
        <form onSubmit={submit} className="grid gap-3">
          <label className="text-sm">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <label className="text-sm">Password</label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          <div className="flex items-center justify-between mt-4">
            <Button type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button>
            <Link to="/signup" className="text-sm text-foreground/70 hover:underline">Create account</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
