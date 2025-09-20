import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
    category: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      console.log('Contact form submitted:', formData);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        email: "",
        subject: "",
        message: "",
        category: "general"
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "billing", label: "Billing & Payments" },
    { value: "survey", label: "Survey Issues" },
    { value: "suggestion", label: "Suggestion" },
    { value: "bug", label: "Report a Bug" },
    { value: "partnership", label: "Partnership" },
    { value: "other", label: "Other" }
  ];

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Have a question, suggestion, or need help? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Contact Information - Mobile First, Stack on top */}
          <div className="w-full lg:col-span-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-4 sm:p-6 border">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Contact Information</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="block">
                  <div className="mb-3">
                    <div className="h-10 w-10 rounded-full bg-amber-500 inline-block items-center justify-center mb-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="mt-2 ml-2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-base sm:text-lg">Email Support</h3>
                    <p className="text-sm text-muted-foreground break-all">support@pulsesurvey.rw</p>
                    <p className="text-xs text-muted-foreground mt-1">We typically reply within 24 hours</p>
                  </div>
                </div>

                <div className="block">
                  <div className="mb-3">
                    <div className="h-10 w-10 rounded-full bg-green-500 inline-block items-center justify-center mb-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="mt-2 ml-2">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-base sm:text-lg">WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">+250 792 525 910</p>
                    <p className="text-xs text-muted-foreground mt-1">Quick responses during business hours</p>
                  </div>
                </div>

                <div className="block">
                  <div className="mb-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500 inline-block items-center justify-center mb-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="mt-2 ml-2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-base sm:text-lg">Response Time</h3>
                    <p className="text-sm text-muted-foreground">Mon - Fri: 9 AM - 6 PM (GMT+2)</p>
                    <p className="text-xs text-muted-foreground mt-1">Rwanda Standard Time</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 p-4 bg-white/50 dark:bg-black/20 rounded-lg border">
                <h3 className="font-medium mb-2">Need Immediate Help?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Check our FAQ section for quick answers to common questions.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Visit FAQ
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form - Stacks below on mobile */}
          <div className="w-full lg:col-span-2">
            <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 border shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Category Field */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-vertical text-sm sm:text-base sm:rows-6"
                    placeholder="Please describe your question, issue, or suggestion in detail..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum 10 characters. The more details you provide, the better we can help you.
                  </p>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3 sm:p-4">
                    <div className="block sm:flex sm:items-center sm:gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600 mb-1 sm:mb-0">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                      <p className="text-green-800 dark:text-green-200 font-medium text-sm sm:text-base">Message sent successfully!</p>
                    </div>
                    <p className="text-green-700 dark:text-green-300 text-xs sm:text-sm mt-1">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4">
                    <div className="block sm:flex sm:items-center sm:gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-600 mb-1 sm:mb-0">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                      <p className="text-red-800 dark:text-red-200 font-medium text-sm sm:text-base">Failed to send message</p>
                    </div>
                    <p className="text-red-700 dark:text-red-300 text-xs sm:text-sm mt-1">
                      Please try again or contact us directly via WhatsApp.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.email || !formData.subject || !formData.message}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-500/90 hover:to-amber-600/90 disabled:opacity-50 py-2 sm:py-3 text-base sm:text-lg font-medium"
                >
                  {isSubmitting ? (
                    <div className=" items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-1 sm:mb-0 sm:mx-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      <span className="text-sm sm:text-base">Sending Message...</span>
                    </div>
                  ) : (
               <div className="flex items-center justify-center gap-2">
  <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22,2 15,22 11,13 2,9 22,2"/>
  </svg>
  <span className="text-sm sm:text-base">Send Message</span>
</div>

                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center px-2">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Need Help Right Away?</h2>
          <p className="text-muted-foreground mb-4 sm:mb-6 px-4">
            For urgent matters or immediate assistance, reach out to us directly.
          </p>
          <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:max-w-md sm:mx-auto lg:max-w-lg">
            <Button variant="outline" className="w-full block">
              <div className="flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                </svg>
                   <Button variant="outline" className="bg-white border-collapse" asChild>
                  <a href="https://wa.me/250791762918" target="_blank" rel="noopener noreferrer">
                    0791762918
                  </a>
                </Button>
              </div>
            </Button>
            <Button variant="outline" className="w-full block">
              <div className="flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 sm:h-5 sm:w-5">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M16 8v5a3 3 0 0 0 6 0v-5a10 10 0 1 0-4 8"/>
                </svg>
              <a href="/faq">  <span className="text-sm sm:text-base"> Browse FAQ</span> </a>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}