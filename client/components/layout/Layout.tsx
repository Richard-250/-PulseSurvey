import Header from "./Header";
import Footer from "./Footer";
import { AdSlot } from "@/components/AdSlot";

export default function Layout({ children, showAds = true }: { children: React.ReactNode; showAds?: boolean }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      <Header />
      <main className="mx-auto max-w-[1400px] px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(640px,760px)_1fr] gap-4">
          {showAds ? (
            <aside className="hidden lg:flex flex-col items-center gap-4 py-6">
              <AdSlot id="ad-left-1" />
              <AdSlot id="ad-left-2" size="160x600" />
              <AdSlot id="ad-left-3" />
              <AdSlot id="ad-left-4" />
              <AdSlot id="ad-left-5" size="160x600" />
            </aside>
          ) : (
            <div className="hidden lg:block" />
          )}
          <section className="py-6 px-2 md:px-0">{children}</section>
          {showAds ? (
            <aside className="hidden lg:flex flex-col items-center gap-4 py-6">
              <AdSlot id="ad-right-1" />
              <AdSlot id="ad-right-2" size="160x600" />
              <AdSlot id="ad-right-3" />
              <AdSlot id="ad-right-4" />
              <AdSlot id="ad-right-5" size="160x600" />
            </aside>
          ) : (
            <div className="hidden lg:block" />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
