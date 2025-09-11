import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Target, Globe, Award, TrendingUp, Shield, Heart, Zap } from "lucide-react";

export default function AboutUs() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2 items-center mb-12">
          <div>
            <Badge variant="secondary" className="mb-4">
              <Heart className="w-4 h-4 mr-2" />
              About PulseSurvey
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">About PulseSurvey</h1>
            <p className="text-muted-foreground text-lg mb-6">
              PulseSurvey is a free platform where you can earn by taking fun and easy surveys. Your answers 
              help companies improve their products and services. No skills or experience needed—just 
              your opinion. Click below to join and start earning.
            </p>
            <Button 
              asChild 
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-500/90 hover:to-amber-600/90"
            >
              <Link to="/signup">Start earning</Link>
            </Button>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 rounded-2xl p-8 text-center">
              <div className="flex justify-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-amber-600 mb-2">50,000+</div>
              <div className="text-sm text-muted-foreground">Active survey participants</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Main Goal Section */}
      <section className="mx-auto max-w-6xl mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Main Goal: Building a World of Better Products</h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-xl font-semibold">Global Impact</div>
                <div className="text-sm text-muted-foreground">Connecting voices worldwide</div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl mb-2">🏢</div>
              <div className="text-sm">Companies trust our insights to improve their products and services</div>
            </div>
          </div>
          
          <div className="space-y-6">
            <p className="text-muted-foreground">
              First, we gained knowledge about market research. We realized that companies and 
              organizations would pay to learn about your views. The next step was to create PulseSurvey — a 
              website that connects your opinion with those who value it.
            </p>
            
            <p className="text-muted-foreground">
              Ordinary people should have a say in shaping the world around us. Not only that you get a 
              reward, but sharing your thoughts also means that you can influence the market in a 
              meaningful way. By being a part of public opinion, you are making the community a 
              better place for all of us.
            </p>
            
            <p className="text-muted-foreground">
              With such an important role, the least we can do is offer cash rewards to our users. To us, 
              every opinion is crucial.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Start earning today!</h2>
          <p className="mb-6 opacity-90">It takes less than 30 seconds to sign up</p>
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-500/90 hover:to-amber-600/90"
          >
            <Link to="/signup">Sign up now</Link>
          </Button>
        </div>
      </section>

      {/* Why We Stand Out Section */}
      <section className="mx-auto max-w-6xl mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why PulseSurvey Stands Out</h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              At PulseSurvey, we believe earning money online should be simple, transparent, and 
              accessible to everyone. That's why we focus on providing a user-friendly 
              experience with honest rewards, real opportunities, and surveys that actually 
              respect your time. Whether you're on your phone or computer, PulseSurvey makes it easy 
              to turn spare moments into extra income whenever it suits you.
            </p>
            
            <p className="text-muted-foreground">
              PulseSurvey isn't just a website—it's a growing community built around trust, simplicity, 
              and shared value.
            </p>

            <div className="grid gap-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Secure & Trusted</div>
                  <div className="text-sm text-muted-foreground">Your data is protected with industry-standard security</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Instant Rewards</div>
                  <div className="text-sm text-muted-foreground">Get paid immediately via MTN Mobile Money</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Community Driven</div>
                  <div className="text-sm text-muted-foreground">Join thousands of active participants in Rwanda</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">👥</div>
              <div className="text-2xl font-bold mb-2">Happy Users</div>
              <div className="text-sm text-muted-foreground">What our community says</div>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-4">
                  "I love how simple and honest PulseSurvey is. No complicated systems, just answer 
                  questions and get paid instantly to my MTN wallet. Perfect for students like me!"
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    J
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Jean Claude</div>
                    <div className="text-xs text-muted-foreground">University Student, Kigali</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="mx-auto max-w-4xl mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-muted-foreground">The principles that guide everything we do</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mb-4 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Transparency</h3>
              <p className="text-sm text-muted-foreground">
                Clear rewards, honest communication, and no hidden fees. You know exactly what you're earning.
              </p>
            </CardContent>
          </Card>
          
          <Card className="p-6 text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-4 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Respect</h3>
              <p className="text-sm text-muted-foreground">
                Your time is valuable. We create surveys that are engaging, relevant, and worth your while.
              </p>
            </CardContent>
          </Card>
          
          <Card className="p-6 text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mb-4 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Impact</h3>
              <p className="text-sm text-muted-foreground">
                Every survey helps improve products and services that millions of people use daily.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-center text-black">
          <h2 className="text-2xl font-bold mb-2">Become a member of PulseSurvey today!</h2>
          <p className="mb-6 opacity-90">
            Join thousands of Rwandans earning extra income by sharing their opinions
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-amber-600 hover:bg-gray-100"
          >
            <Link to="/signup">Start earning</Link>
          </Button>
          <p className="text-xs mt-4 opacity-75">
            Free to join • No experience required • Instant MTN payouts
          </p>
        </div>
      </section>
    </Layout>
  );
}