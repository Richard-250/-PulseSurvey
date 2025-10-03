import Layout from "@/components/layout/Layout";
// import SurveyCard from "@/components/SurveyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Users, Smartphone, Coins, CheckCircle, Star, Zap, Shield } from "lucide-react";
// import { AdSlot } from "@/components/AdSlot";

export default function Index() {
  const { user } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
       {/* <AdSlot id="ad-top-banne" size="728x90" adKey="28d985c53d47771c95adb86795d9143f" /> */}
      <section className="text-center md:text-left">
        <div className="mx-auto max-w-3xl">
          <Badge variant="secondary" className="mb-4">
            <Users className="w-4 h-4 mr-2" />
            Join thousands + active users
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Answer real-life questions. Earn coins. Cash out via MTN P2P.
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Join thousands turning everyday insights into rewards. One tap per question. Earn from your answers. 
          </p>
          <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
            {user ? ( 
              <>
                <Button asChild className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-500/90 hover:to-amber-600/90">
                  <Link to="/survey">Start answering</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/wallet">View wallet</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-500/90 hover:to-amber-600/90">
                  <Link to="/signup">Create your account</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/about">Learn more</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      

     {/* <section className="mt-10">{user ? <SurveyCard /> : <HomeExplainers />}</section> */}

      {/* How to earn money section */}
      <section className="mt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">How to earn money with our surveys</h2>
          <p className="text-muted-foreground mt-2">Simple steps to start earning today</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="text-center p-6">
            <CardContent className="pt-6"> 
              <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Sign up for free</h3>
              <p className="text-sm text-muted-foreground">
                Create your account in seconds. No fees, no commitments. Just your email and you're ready to start.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-4 flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Answer surveys</h3>
              <p className="text-sm text-muted-foreground">
                Quick questions about your preferences. Each answer takes seconds and earns you instant coins.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mb-4 flex items-center justify-center">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Withdraw money</h3>
              <p className="text-sm text-muted-foreground">
                Cash out instantly via MTN Mobile Money. Low minimum threshold and fast processing.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <Feature 
          title="One-tap surveys" 
          desc="Scroll, confirm, done. Earn 1 coin per answer instantly."
          icon={<Zap className="w-5 h-5" />}
        />
        <Feature 
          title="Cash out to MTN" 
          desc="Reach the threshold and withdraw via MTN P2P with ease."
          icon={<Coins className="w-5 h-5" />}
        />
        <Feature 
          title="professional layout" 
          desc="Users view is most concerned."
          icon={<Shield className="w-5 h-5" />}
        />
      </section>

      {/* How it works */}
      <section className="mt-12 rounded-xl border bg-card p-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          How it works
        </h3>
        <ol className="mt-4 grid gap-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="bg-amber-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
            Sign up and stay signed in for 90 days with secure cookies.
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-amber-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
            Answer a short question. Scroll to read why we ask. Confirm to earn a coin.
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-amber-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
            Watch your balance grow in the header. Withdraw to MTN when ready.
          </li>
        </ol>
      </section>

      {/* What is our platform section */}
      <section className="mt-12">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">What makes us different?</h2>
            <p className="text-muted-foreground mb-4">
              Our survey platform is built for the mobile-first generation in Rwanda. Fast questions, instant rewards, and seamless MTN Mobile Money integration.
            </p>
            <p className="text-muted-foreground mb-4">
              We believe your opinions are valuable and should be rewarded immediately. No complex points systems or delayed payments.
            </p>
            <p className="text-muted-foreground">
              Join thousands of Rwandans already earning extra income by sharing their thoughts on products, services, and trends that matter.
            </p>
          </div>
          <Card className="p-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Trusted by thousands</div>
                  <div className="text-sm text-muted-foreground">4.8/5 rating from users</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                "I've earned over 10,000 coins in my first month. The questions are interesting and payouts are always on time."
              </div>
              <div className="text-xs text-muted-foreground mt-2">- Marie K., Kigali</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Making money is easy section */}
      <section className="mt-12 rounded-xl border bg-card p-8">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Making money online is easy with our surveys</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium">Earning money online has never been simpler</div>
                  <div className="text-sm text-muted-foreground">Answer questions about topics you know and care about</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium">Flexible schedule that works for you</div>
                  <div className="text-sm text-muted-foreground">Answer surveys anytime, anywhere from your phone</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium">Instant rewards with MTN Mobile Money</div>
                  <div className="text-sm text-muted-foreground">Cash out directly to your mobile wallet</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 rounded-lg p-6 text-center">
            <div className="text-4xl mb-2">💰</div>
            <div className="text-2xl font-bold text-amber-600">Start earning now!</div>
            <div className="text-sm text-muted-foreground mt-2">Average user earns 500+ coins per week</div>
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="mt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Enjoy all the benefits we bring</h2>
          <p className="text-muted-foreground mt-2">Everything you need to start earning from surveys</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Work as a stay-at-home</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Perfect for students, parents, or anyone looking for flexible income from home.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• No commute required</li>
                <li>• Work on your schedule</li>
                <li>• Balance family and income</li>
                <li>• Start and stop anytime</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Make money from your opinions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your thoughts and preferences have value. Get paid for sharing them with brands.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Instant coin rewards</li>
                <li>• No minimum education</li>
                <li>• All ages welcome</li>
                <li>• Fair compensation</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Additional income for everyone</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Whether you're employed, studying, or retired - earn extra money in your spare time.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Supplement main income</li>
                <li>• Save for special goals</li>
                <li>• Emergency fund building</li>
                <li>• Financial independence</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA section */}
      <section className="mt-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Share your opinion, get your reward</h2>
        <p className="mb-6 opacity-90">
          Join thousands of users earning money by sharing their thoughts. It's simple, fast, and rewarding.
        </p>
        <Button 
          asChild 
          size="lg" 
          className="bg-white text-amber-600 hover:bg-gray-100"
        >
          <Link to={user ? "/survey" : "/signup"}>
          Start earning now
        </Link>
        </Button>
        <p className="text-xs mt-4 opacity-75">
          No credit card required • Free to join • Instant payouts via MTN Mobile Money
        </p>
      </section>
    </Layout>
  );
}

function Feature({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mb-3 shadow flex items-center justify-center text-white">
        {icon}
      </div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-muted-foreground mt-1">{desc}</div>
    </div>
  );
}

function HomeExplainers() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-xl border bg-card p-6">
        <div className="text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <Smartphone className="w-3 h-3" />
          Example
        </div>
        <div className="text-lg font-semibold mt-1">What you'll see</div>
        <p className="text-sm text-muted-foreground mt-3">
          After signing in, you'll get a quick question with a short explanation beneath it. Scroll to the bottom and tap confirm to claim  coins.
        </p>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <div className="text-xs uppercase tracking-wide text-muted-foreground flex items-center gap-2">
          <Coins className="w-3 h-3" />
          Rewards
        </div>
        <div className="text-lg font-semibold mt-1">Instant balance updates</div>
        <p className="text-sm text-muted-foreground mt-3">
          Your balance updates immediately in the header after each answer. You can withdraw to MTN when you reach the threshold.
        </p>
      </div>
    </div>
  );
}