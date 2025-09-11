import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Clock, 
  Smartphone, 
  Coins, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  TrendingUp,
  Shield,
  Zap,
  Target
} from "lucide-react";

export default function AboutSurveys() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl mb-12">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            <MessageSquare className="w-4 h-4 mr-2" />
            How It Works
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            PulseSurvey — an easy way to make money from home
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Whether you're a stay-at-home parent, a student, or simply wish to make money from home, you're 
            at the right place. PulseSurvey gives you the opportunity to increase your income effortlessly with paid 
            surveys. Anytime and anywhere, our platform is your best bet to experience real-life survey participation.
          </p>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="mx-auto max-w-4xl mb-16">
        <h2 className="text-2xl font-bold mb-6">Getting started with PulseSurvey</h2>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Quick & Simple Setup</h3>
              <p className="text-sm text-muted-foreground">Get started in under a minute</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            You can sign up for free to PulseSurvey in under a minute. Yes, that's right. Whether you're using a 
            mobile phone, a laptop, or a tablet, it doesn't matter. All that matters is that you have an internet 
            connection. To create your profile, we'll ask some basic personal information (name, 
            email address, etc.). After you fill out the sign-up form, you'll receive a confirmation email from us. 
            And once you activate your account via the link, you're all set.
          </p>
        </div>
      </section>

      {/* How Survey Groups Work */}
      <section className="mx-auto max-w-4xl mb-16">
        <h2 className="text-2xl font-bold mb-6">How our survey groups work</h2>
        
        <Alert className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>Important:</strong> Each survey group contains exactly 5 questions. Take your time to think through each answer carefully.
          </AlertDescription>
        </Alert>

        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-bold">
                5
              </div>
              <div>
                <h3 className="font-semibold mb-2">5-Question Groups</h3>
                <p className="text-muted-foreground text-sm">
                  You'll receive survey groups with exactly 5 carefully crafted questions. Each group focuses on a specific topic 
                  or theme to gather meaningful insights from real people like you.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Quality Over Speed</h3>
                <p className="text-muted-foreground text-sm">
                  Don't rush through your answers! These are real-life questions that help companies make better products 
                  and services. Thoughtful responses are more valuable than quick ones.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Continuous Flow</h3>
                <p className="text-muted-foreground text-sm">
                  After completing one group, you'll receive another set of 5 questions. This ensures a steady stream 
                  of earning opportunities throughout your day.
                </p>
              </div>
            </div>
          </div>

          <Card className="p-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-center">Survey Group Example</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">1</div>
                  <span className="text-sm">Food preferences question</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">2</div>
                  <span className="text-sm">Shopping habits question</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">3</div>
                  <span className="text-sm">Brand awareness question</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">4</div>
                  <span className="text-sm">Usage frequency question</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">5</div>
                  <span className="text-sm">Future intentions question</span>
                </div>
              </div>
              <div className="text-center mt-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Coins className="w-3 h-3 mr-1" />
                  Earn 5 coins per group
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Think Before Answering */}
      <section className="mx-auto max-w-4xl mb-16">
        <h2 className="text-2xl font-bold mb-6">Why complete surveys thoughtfully?</h2>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Real Impact on Real Products</h3>
              <p className="text-sm text-muted-foreground">Your answers shape the products and services you use daily</p>
            </div>
          </div>
          <p className="text-muted-foreground mb-4">
            These aren't practice questions or games. Companies use your responses to improve their products, 
            develop new services, and make decisions that affect millions of people. When you take time to provide 
            thoughtful answers, you're directly contributing to better products in the market.
          </p>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
              💡 Tip: Read each question carefully and consider your honest opinion. Your authentic response 
              is what makes the data valuable to researchers.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h3 className="font-semibold">Good Survey Practice</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Read questions completely before answering</li>
                <li>• Consider your real experiences and preferences</li>
                <li>• Take a moment to think about your response</li>
                <li>• Answer honestly, even if it's not the "popular" choice</li>
                <li>• Review your answer before submitting</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
                <h3 className="font-semibold">What to Avoid</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Rushing through without reading</li>
                <li>• Selecting random answers to finish quickly</li>
                <li>• Giving the same response to every question</li>
                <li>• Answering based on what you think we want to hear</li>
                <li>• Skipping explanations when provided</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Payment Information */}
      <section className="mx-auto max-w-4xl mb-16">
        <h2 className="text-2xl font-bold mb-6">Collecting your rewards from PulseSurvey</h2>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">MTN Mobile Money - Our Recommended Payment Method</h3>
              <p className="text-sm text-muted-foreground">Fast, secure, and convenient for everyone in Rwanda</p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-3">Why MTN Mobile Money?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-600" />
                  Instant transfers to your mobile wallet
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  Secure and trusted payment system
                </li>
                <li className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-600" />
                  Available to all MTN subscribers
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  Daily payment processing
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Payment Schedule</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Frequency:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Daily
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Processing Time:</span>
                  <Badge variant="outline">
                    Same Day
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Minimum Payout:</span>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    10 Coins
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
          <Clock className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <strong>Daily Payouts:</strong> We process payments every single day, not later. Once you reach the minimum 
            threshold, your earnings will be transferred to your MTN Mobile Money account within hours.
          </AlertDescription>
        </Alert>
      </section>

      {/* How Payments Work */}
      <section className="mx-auto max-w-4xl mb-16">
        <h2 className="text-2xl font-bold mb-6">Make the most of paid surveys</h2>
        
        <div className="space-y-6">
          <p className="text-muted-foreground">
            The key to maximizing your earnings is consistency and quality. By completing survey groups thoughtfully 
            and regularly, you'll build a reputation as a reliable participant and receive more survey opportunities.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mb-4 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Stay Active</h3>
                <p className="text-sm text-muted-foreground">
                  Complete survey groups regularly to maintain a steady income stream and receive priority access to new surveys.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-4 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Quality Answers</h3>
                <p className="text-sm text-muted-foreground">
                  Thoughtful, honest responses improve your participant rating and unlock higher-paying survey opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 mb-4 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Perfect Timing</h3>
                <p className="text-sm text-muted-foreground">
                  With daily payouts, you can see your earnings grow consistently. Set aside time each day for maximum income.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-center">💰 Earning Potential</h3>
            <div className="grid gap-4 md:grid-cols-3 text-center">
              <div>
                <div className="text-2xl font-bold text-amber-600">5 coins</div>
                <div className="text-sm text-muted-foreground">Per survey group</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">25+ coins</div>
                <div className="text-sm text-muted-foreground">Daily potential</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">750+ coins</div>
                <div className="text-sm text-muted-foreground">Monthly potential</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Today Section */}
      <section className="mx-auto max-w-4xl mb-16">
        <h2 className="text-2xl font-bold mb-6">Join PulseSurvey for easy and rewarding surveys</h2>
        <p className="text-muted-foreground mb-8">
          Now is the best time to start making money from home. You can do so without any special skills 
          by joining the PulseSurvey platform and its growing community. The platform is easy to use, and anyone 
          can manage it. You can easily find new survey groups, track your earnings at any time, and cash out 
          to MTN Mobile Money by expressing your thoughts on a variety of topics. Start earning today!
        </p>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Start earning with thoughtful survey responses</h2>
          <p className="mb-6 opacity-90">
            Join thousands earning daily through quality survey participation
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-500/90 hover:to-amber-600/90"
          >
            <Link to="/signup">Begin earning today</Link>
          </Button>
          <p className="text-xs mt-4 opacity-75">
            Daily MTN payouts • 5-question groups • Quality matters
          </p>
        </div>
      </section>
    </Layout>
  );
}