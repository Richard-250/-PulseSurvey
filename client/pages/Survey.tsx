import Layout from "@/components/layout/Layout";
import SurveyFlow from "@/components/SurveyFlow";

export default function Survey() {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold mb-4">Survey</h1>
        <SurveyFlow />
      </div>
    </Layout>
  );
}
