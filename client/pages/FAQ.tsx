import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  ChevronDown, 
  ChevronRight, 
  HelpCircle, 
  Phone, 
  MessageSquare,
  Clock,
  Smartphone,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "How can I create an account?",
      answer: "Creating an account is simple and free! Click the 'Sign Up' button, provide your email address, create a secure password, and verify your email. You'll also need to add your MTN Mobile Money number for payments. The entire process takes less than 2 minutes."
    },
    {
      question: "Why is my phone number not accepted?",
      answer: "We currently only accept MTN Mobile Money numbers for payments as it's the most reliable payment method in Rwanda. Make sure your number is in the correct format (07XXXXXXXX) and that you have an active MTN Mobile Money account. If you're still having issues, contact our support team."
    },
    {
      question: "What if I forget my password?",
      answer: "No worries! Click on 'Forgot Password' on the login page, enter your registered email address, and we'll send you a password reset link. Check your email (including spam folder) and follow the instructions to create a new password."
    },
    {
      question: "How can I change my password?",
      answer: "To change your password: 1) Go to your profile page, 2) Navigate to the Security section, 3) Click 'Change Password', 4) Enter your current password and your new password, 5) Confirm the changes. Your new password will be active immediately."
    },
    {
      question: "Why am I not receiving any survey invitations?",
      answer: "Survey availability depends on several factors: your profile completeness, demographic match, and current survey demand. Make sure your profile is 100% complete with accurate information. Survey groups are distributed throughout the day, so check back regularly. High-quality responses to previous surveys also increase your invitation frequency."
    },
    {
      question: "Why am I not qualified for a survey group?",
      answer: "Survey groups target specific demographics to ensure relevant responses. If you're not qualified, it means the survey is looking for participants with different characteristics (age, location, interests, etc.). Don't worry - new survey groups become available daily, and you'll qualify for many others."
    },
    {
      question: "Why did I get an invitation for a closed survey group?",
      answer: "Survey groups have limited participant slots and may fill up quickly. If you received an invitation but the survey is closed, it means all available spots were taken. Keep your notifications on and respond to invitations promptly to increase your chances of participation."
    },
    {
      question: "Why does a survey group take a different amount of time than indicated?",
      answer: "Survey group timing can vary based on how thoroughly you read questions and explanations. We provide estimated completion times, but thoughtful responses (which we encourage!) may take longer. Remember, quality answers are more valuable than speed - take the time you need to provide genuine responses."
    },
    {
      question: "Why can't I continue the survey group if I accidentally exit?",
      answer: "For data integrity and fair compensation, survey groups must be completed in one session. If you accidentally exit, the session expires to prevent incomplete or inconsistent responses. Each participant gets fresh survey groups, so you'll receive new opportunities soon."
    },
    {
      question: "Why is my balance the same after completing the survey group?",
      answer: "If your balance hasn't updated after completing a survey group, please wait a few minutes as updates can take time. Ensure you clicked 'Submit' on the final question. If your balance still hasn't updated after 10 minutes, contact our support team with details of the survey group you completed."
    },
    {
      question: "How can I check my balance?",
      answer: "Your current coin balance is always visible in the header of every page when you're logged in. You can also visit your Wallet page for detailed earning history, withdrawal options, and transaction records. Your balance updates in real-time after each completed survey group."
    },
    {
      question: "How can I withdraw my money?",
      answer: "Withdrawals are processed once per day via MTN Mobile Money. Go to your Wallet page, ensure you've reached the minimum payout threshold (100 coins), enter your MTN number, and request withdrawal. Payments are processed daily and should reach your account within a few hours."
    },
    {
      question: "How long does it take for money to be transferred?",
      answer: "We process withdrawals once per day, typically in the evening. After requesting withdrawal, you should receive your money within 2-6 hours. If you haven't received your payment by 8:00 PM (20:00) on the same day, please contact us immediately via WhatsApp at 0780079748 or through our contact page."
    },
    {
      question: "What if I don't receive my payment by 8:00 PM?",
      answer: "If you haven't received your MTN Mobile Money payment by 8:00 PM (20:00) on the day you requested withdrawal, there may be a technical issue. Contact us immediately via WhatsApp at 0780079748 or visit our contact page. Include your withdrawal request details and MTN number for faster resolution."
    },
    {
      question: "How can I end my membership?",
      answer: "We're sorry to see you go! You can delete your account by going to your Profile settings and selecting 'Delete Account'. Before leaving, please withdraw any remaining coin balance. If you're having issues, contact our support team - we're here to help improve your experience."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl mb-12">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Center
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently asked questions
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome to our help center! Here you can find answers to questions frequently asked by our 
              users. Can't find what you're looking for? Contact our support team.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">❓</div>
            <div className="text-xl font-semibold mb-2">Need Help?</div>
            <div className="text-sm text-muted-foreground mb-4">
              Browse our FAQ or contact support
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <MessageSquare className="w-4 h-4" />
              <span>Quick answers below</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Still not our member?</h2>
          <p className="mb-4 opacity-90">Sign up in less than 30 seconds</p>
          <Button 
            asChild 
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-500/90 hover:to-amber-600/90"
          >
            <Link to="/signup">Sign up now</Link>
          </Button>
        </div>
      </section>

      {/* FAQ Questions */}
      <section className="mx-auto max-w-4xl mb-16">
        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <Collapsible open={openItems.has(index)} onOpenChange={() => toggleItem(index)}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-6 hover:bg-muted/50 transition-colors">
                    <h3 className="font-semibold text-left">{faq.question}</h3>
                    <div className="ml-4 flex-shrink-0">
                      {openItems.has(index) ? (
                        <ChevronDown className="h-5 w-5 text-blue-600" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-6 pb-6">
                    <div className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                    
                    {/* Special alerts for specific questions */}
                    {index === 11 && (
                      <Alert className="mt-4 border-amber-200 bg-amber-50 dark:bg-amber-950">
                        <Clock className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-800 dark:text-amber-200">
                          <strong>Important:</strong> Withdrawals are processed once per day. Make sure to request before our daily processing time.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {(index === 12 || index === 13) && (
                      <Alert className="mt-4 border-red-200 bg-red-50 dark:bg-red-950">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800 dark:text-red-200">
                          <strong>Payment Issues?</strong> Contact us via WhatsApp at <strong>0780079748</strong> if you don't receive payment by 8:00 PM.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Information */}
      <section className="mx-auto max-w-4xl mb-16">
        <Card className="p-8">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
              <p className="text-muted-foreground">
                If you have any more questions, get in touch with our support team.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-green-500 to-green-600 mb-4 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">WhatsApp Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For urgent payment issues or immediate assistance
                </p>
                <Button variant="outline" className="bg-white" asChild>
                  <a href="https://wa.me/250780079748" target="_blank" rel="noopener noreferrer">
                    0780079748
                  </a>
                </Button>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-4 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Contact Page</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For general questions and detailed inquiries
                </p>
                <Button variant="outline" className="bg-white" asChild>
                  <Link to="/contact">Visit Contact Page</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Payment Schedule Info */}
      <section className="mx-auto max-w-4xl mb-16">
        <Card className="p-6 border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Daily Payment Schedule</h3>
                <p className="text-sm text-muted-foreground">Important information about withdrawals</p>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <div className="font-semibold">Once Per Day</div>
                <div className="text-sm text-muted-foreground">Withdrawal frequency</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <Clock className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <div className="font-semibold">By 8:00 PM</div>
                <div className="text-sm text-muted-foreground">Expected arrival time</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <Phone className="w-8 h-8 mx-auto text-amber-600 mb-2" />
                <div className="font-semibold">0780079748</div>
                <div className="text-sm text-muted-foreground">Contact if delayed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Start earning today!</h2>
          <p className="mb-6 opacity-90">
            Paid survey groups are waiting for you
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-500/90 hover:to-amber-600/90"
          >
            <Link to="/signup">Sign up now</Link>
          </Button>
          <p className="text-xs mt-4 opacity-75">
            Daily MTN payments • Quality survey groups • Instant support
          </p>
        </div>
      </section>
    </Layout>
  );
}