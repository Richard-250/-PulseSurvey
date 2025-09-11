import Layout from "@/components/layout/Layout";



export function Privacy() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">We collect minimal data and never share personal information without consent. Aggregated answers are used for research purposes.</p>
      </div>
    </Layout>
  );
}

export function Terms() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Terms & Conditions</h1>
        <p className="text-muted-foreground">By using PulseSurvey you agree to our terms. This is a demo implementation.</p>
      </div>
    </Layout>
  );
}

export function Cookies() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground">We use cookies to keep you signed in and improve your experience.</p>
      </div>
    </Layout>
  );
}

export function Contact() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">Contact</h1>
        <p className="text-muted-foreground">Reach us at support@pulsesurvey.example (demo).</p>
      </div>
    </Layout>
  );
}
