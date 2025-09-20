import Layout from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Your privacy is our priority. Learn how we protect your data and respect your rights on PulseSurvey.
              </p>
              <div className="mt-6 inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Last Updated: September 20, 2025
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-12">
                
                {/* Introduction */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">1</span>
                    </span>
                    Introduction
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-base sm:text-lg">
                      Welcome to PulseSurvey ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our survey platform and participate in our peer-to-peer (P2P) reward system.
                    </p>
                    <p className="text-base sm:text-lg">
                      By using PulseSurvey, you consent to the data practices described in this policy. We encourage you to read this policy carefully and contact us if you have any questions or concerns about how we handle your personal information.
                    </p>
                  </div>
                </section>

                {/* Information We Collect */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">2</span>
                    </span>
                    Information We Collect
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                      <p className="text-gray-700 mb-3">When you create an account or participate in surveys, we may collect:</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Email address and username</li>
                        <li>Demographic information (age, location, interests) - optional</li>
                        <li>Payment information for P2P rewards (encrypted and secure)</li>
                        <li>Profile preferences and settings</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Survey Responses</h3>
                      <p className="text-gray-700 mb-3">We collect your responses to surveys and questionnaires, including:</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Individual survey answers and feedback</li>
                        <li>Response timestamps and completion rates</li>
                        <li>Survey participation history</li>
                        <li>Quality metrics and engagement data</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Information</h3>
                      <p className="text-gray-700 mb-3">We automatically collect certain technical data:</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>IP address and browser information</li>
                        <li>Device type, operating system, and screen resolution</li>
                        <li>Usage patterns and navigation behavior</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* How We Use Your Information */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">3</span>
                    </span>
                    How We Use Your Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">Service Operations</h3>
                      <ul className="text-blue-800 space-y-2">
                        <li>• Facilitate survey participation and data collection</li>
                        <li>• Process P2P reward payments securely</li>
                        <li>• Maintain and improve our platform</li>
                        <li>• Provide customer support and assistance</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-green-900 mb-4">Research & Analytics</h3>
                      <ul className="text-green-800 space-y-2">
                        <li>• Generate aggregated, anonymized insights</li>
                        <li>• Improve survey quality and user experience</li>
                        <li>• Conduct legitimate research studies</li>
                        <li>• Prevent fraud and ensure data integrity</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-amber-800 font-medium">
                      <strong>Important:</strong> We never sell your personal information to third parties or use your individual responses for marketing purposes without explicit consent.
                    </p>
                  </div>
                </section>

                {/* P2P Reward System */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">4</span>
                    </span>
                    P2P Reward System Privacy
                  </h2>
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Our peer-to-peer reward system is designed with privacy at its core. We use advanced encryption and decentralized technologies to ensure your financial transactions remain secure and private.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="font-semibold text-blue-900 mb-3">Payment Security</h3>
                        <p className="text-blue-800 text-sm">All payment data is encrypted using industry-standard protocols. We never store complete payment information on our servers.</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                        <h3 className="font-semibold text-green-900 mb-3">Transaction Privacy</h3>
                        <p className="text-green-800 text-sm">P2P transactions are processed through secure channels. Personal identifiers are masked during reward distribution.</p>
                      </div>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Reward Data Processing</h3>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Transaction amounts and timestamps (for fraud prevention)</li>
                        <li>• Reward eligibility verification data</li>
                        <li>• Payment method preferences (encrypted)</li>
                        <li>• Tax reporting information (where legally required)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Data Sharing and Disclosure */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">5</span>
                    </span>
                    Data Sharing and Disclosure
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-red-900 mb-4">We Do NOT Share</h3>
                      <ul className="text-red-800 space-y-2">
                        <li>• Individual survey responses with identifying information</li>
                        <li>• Personal contact information or demographic data</li>
                        <li>• Payment details or financial information</li>
                        <li>• User behavior data for advertising purposes</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-green-900 mb-4">We May Share (With Consent)</h3>
                      <ul className="text-green-800 space-y-2">
                        <li>• Aggregated, anonymized research insights</li>
                        <li>• Statistical trends and population-level data</li>
                        <li>• Non-identifying survey results for academic research</li>
                        <li>• General platform usage statistics</li>
                      </ul>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      We may disclose personal information only in specific circumstances: to comply with legal obligations, protect our rights and safety, prevent fraud, or in the event of a business transfer (with continued privacy protection guarantees).
                    </p>
                  </div>
                </section>

                {/* Your Privacy Rights */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">6</span>
                    </span>
                    Your Privacy Rights
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border-2 border-indigo-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <h3 className="font-semibold text-indigo-900 mb-3">Access & Review</h3>
                      <p className="text-indigo-700 text-sm">Request copies of your personal data and survey responses at any time.</p>
                    </div>
                    <div className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <h3 className="font-semibold text-purple-900 mb-3">Correct & Update</h3>
                      <p className="text-purple-700 text-sm">Modify inaccurate information and update your preferences easily.</p>
                    </div>
                    <div className="bg-white border-2 border-pink-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <h3 className="font-semibold text-pink-900 mb-3">Delete & Withdraw</h3>
                      <p className="text-pink-700 text-sm">Request account deletion and withdraw consent for data processing.</p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-indigo-900 mb-4">How to Exercise Your Rights</h3>
                    <p className="text-indigo-800 mb-4">Contact us at privacy@pulsesurvey.com or use the settings panel in your account dashboard. We will respond to your requests within 30 days.</p>
                    <p className="text-indigo-700 text-sm">
                      <strong>Note:</strong> Some data may be retained for legitimate business purposes (fraud prevention, legal compliance) even after account deletion, but will be anonymized where possible.
                    </p>
                  </div>
                </section>

                {/* Data Security */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">7</span>
                    </span>
                    Data Security
                  </h2>
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      We implement comprehensive security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                        <div className="w-12 h-12 bg-cyan-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <span className="text-white font-bold">🔒</span>
                        </div>
                        <h3 className="font-semibold text-cyan-900 mb-2">Encryption</h3>
                        <p className="text-cyan-700 text-sm">End-to-end encryption for sensitive data</p>
                      </div>
                      
                      <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <span className="text-white font-bold">🛡️</span>
                        </div>
                        <h3 className="font-semibold text-blue-900 mb-2">Access Control</h3>
                        <p className="text-blue-700 text-sm">Multi-factor authentication and role-based access</p>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <span className="text-white font-bold">🔍</span>
                        </div>
                        <h3 className="font-semibold text-purple-900 mb-2">Monitoring</h3>
                        <p className="text-purple-700 text-sm">24/7 security monitoring and threat detection</p>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <span className="text-white font-bold">✅</span>
                        </div>
                        <h3 className="font-semibold text-green-900 mb-2">Compliance</h3>
                        <p className="text-green-700 text-sm">GDPR, CCPA, and industry standard compliance</p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                      <p className="text-yellow-800">
                        <strong>Important:</strong> While we implement robust security measures, no method of transmission over the internet is 100% secure. We continuously update our security practices and encourage users to use strong passwords and enable two-factor authentication.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Cookies and Tracking */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">8</span>
                    </span>
                    Cookies and Tracking Technologies
                  </h2>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed">
                      We use cookies and similar technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie settings through your browser preferences.
                    </p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="text-left p-4 font-semibold text-gray-900">Cookie Type</th>
                            <th className="text-left p-4 font-semibold text-gray-900">Purpose</th>
                            <th className="text-left p-4 font-semibold text-gray-900">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700">
                          <tr className="border-t border-gray-200">
                            <td className="p-4 font-medium">Essential</td>
                            <td className="p-4">Required for basic functionality and security</td>
                            <td className="p-4">Session</td>
                          </tr>
                          <tr className="border-t border-gray-200 bg-gray-50">
                            <td className="p-4 font-medium">Analytics</td>
                            <td className="p-4">Understand usage patterns and improve services</td>
                            <td className="p-4">2 years</td>
                          </tr>
                          <tr className="border-t border-gray-200">
                            <td className="p-4 font-medium">Preferences</td>
                            <td className="p-4">Remember your settings and preferences</td>
                            <td className="p-4">1 year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* International Data Transfers */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">9</span>
                    </span>
                    International Data Transfers
                  </h2>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                    <p className="text-emerald-800 leading-relaxed mb-4">
                      PulseSurvey operates globally, and your data may be processed in countries other than where you reside. We ensure appropriate safeguards are in place for international data transfers, including:
                    </p>
                    <ul className="text-emerald-700 space-y-2">
                      <li>• Standard Contractual Clauses (SCCs) approved by relevant authorities</li>
                      <li>• Adequacy decisions for transfers to countries with equivalent privacy laws</li>
                      <li>• Additional security measures for sensitive data transfers</li>
                      <li>• Regular compliance audits and privacy impact assessments</li>
                    </ul>
                  </div>
                </section>

                {/* Contact Information */}
                <section className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">10</span>
                    </span>
                    Contact Us
                  </h2>
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-8">
                    <p className="text-violet-800 text-lg mb-6 leading-relaxed">
                      If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please don't hesitate to contact us:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-violet-900 mb-3">General Privacy Inquiries</h3>
                        <p className="text-violet-700">
                          <strong>Email:</strong> privacy@pulsesurvey.com<br/>
                          <strong>Response Time:</strong> Within 48 hours
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-violet-900 mb-3">Data Protection Officer</h3>
                        <p className="text-violet-700">
                          <strong>Email:</strong> dpo@pulsesurvey.com<br/>
                          <strong>For:</strong> GDPR and formal privacy requests
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white rounded-lg border border-violet-200">
                      <p className="text-violet-800 text-sm">
                        <strong>Tip:</strong> When contacting us about privacy matters, please include your account email and a clear description of your request to help us assist you more efficiently.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Updates to Policy */}
                <section className="border-t border-gray-200 pt-8">
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Policy Updates</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We may update this privacy policy periodically to reflect changes in our practices or legal requirements. 
                      We will notify you of significant changes via email or through our platform. Continued use of PulseSurvey 
                      after policy updates constitutes acceptance of the revised terms.
                    </p>
                    {/* <div className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors cursor-pointer">
                      Subscribe to Policy Updates
                    </div> */}
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}