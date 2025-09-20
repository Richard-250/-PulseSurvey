import Layout from "@/components/layout/Layout";

export default function CookiePolicy() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Session & Cookie Policy
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Learn how PulseSurvey uses cookies, sessions, and tracking technologies to enhance your survey experience and protect your data.
              </p>
              <div className="mt-6 inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
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
                    What Are Cookies and Sessions?
                  </h2>
                  <div className="space-y-6">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Cookies are small text files stored on your device when you visit our website. Sessions are temporary data storage mechanisms that help maintain your connection and preferences while using PulseSurvey. Together, they enable us to provide you with a seamless, personalized, and secure survey experience.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-blue-900 mb-4">🍪 Cookies Explained</h3>
                        <p className="text-blue-800 mb-3">Small data files that remember your preferences, login status, and settings across visits.</p>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• Store user preferences</li>
                          <li>• Remember login sessions</li>
                          <li>• Track survey progress</li>
                          <li>• Analyze usage patterns</li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-green-900 mb-4">⚡ Sessions Explained</h3>
                        <p className="text-green-800 mb-3">Temporary storage that maintains your active connection and survey progress during your visit.</p>
                        <ul className="text-green-700 text-sm space-y-1">
                          <li>• Maintain login status</li>
                          <li>• Preserve survey progress</li>
                          <li>• Ensure security</li>
                          <li>• Enable real-time features</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                      <p className="text-amber-800 font-medium">
                        <strong>Important:</strong> We use cookies and sessions responsibly to enhance your experience while respecting your privacy. You have full control over cookie settings and can manage them at any time.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Types of Cookies We Use */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">2</span>
                    </span>
                    Types of Cookies We Use
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Essential Cookies */}
                    <div className="border border-red-200 rounded-xl overflow-hidden">
                      <div className="bg-red-500 text-white p-4">
                        <h3 className="text-xl font-bold flex items-center">
                          🔒 Essential Cookies (Required)
                          <span className="ml-auto text-sm bg-red-600 px-3 py-1 rounded-full">Always Active</span>
                        </h3>
                      </div>
                      <div className="p-6 bg-red-50">
                        <p className="text-red-800 mb-4 leading-relaxed">
                          These cookies are necessary for the website to function properly and cannot be disabled. They enable core functionality like security, authentication, and basic navigation.
                        </p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-white">
                              <tr>
                                <th className="text-left p-3 font-semibold text-red-900">Cookie Name</th>
                                <th className="text-left p-3 font-semibold text-red-900">Purpose</th>
                                <th className="text-left p-3 font-semibold text-red-900">Duration</th>
                              </tr>
                            </thead>
                            <tbody className="text-red-700">
                              <tr className="border-t border-red-200">
                                <td className="p-3 font-mono">session_id</td>
                                <td className="p-3">Maintains your login session and survey progress</td>
                                <td className="p-3">Session only</td>
                              </tr>
                              <tr className="border-t border-red-200 bg-white">
                                <td className="p-3 font-mono">csrf_token</td>
                                <td className="p-3">Protects against cross-site request forgery attacks</td>
                                <td className="p-3">Session only</td>
                              </tr>
                              <tr className="border-t border-red-200">
                                <td className="p-3 font-mono">auth_remember</td>
                                <td className="p-3">Remembers your login preference ("Keep me signed in")</td>
                                <td className="p-3">30 days</td>
                              </tr>
                              <tr className="border-t border-red-200 bg-white">
                                <td className="p-3 font-mono">survey_progress</td>
                                <td className="p-3">Saves your progress in ongoing surveys</td>
                                <td className="p-3">7 days</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Functional Cookies */}
                    <div className="border border-blue-200 rounded-xl overflow-hidden">
                      <div className="bg-blue-500 text-white p-4">
                        <h3 className="text-xl font-bold flex items-center">
                          ⚙️ Functional Cookies (Optional)
                          <span className="ml-auto text-sm bg-blue-600 px-3 py-1 rounded-full">User Controlled</span>
                        </h3>
                      </div>
                      <div className="p-6 bg-blue-50">
                        <p className="text-blue-800 mb-4 leading-relaxed">
                          These cookies enhance your experience by remembering your preferences and providing personalized features. You can disable them, but some functionality may be limited.
                        </p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-white">
                              <tr>
                                <th className="text-left p-3 font-semibold text-blue-900">Cookie Name</th>
                                <th className="text-left p-3 font-semibold text-blue-900">Purpose</th>
                                <th className="text-left p-3 font-semibold text-blue-900">Duration</th>
                              </tr>
                            </thead>
                            <tbody className="text-blue-700">
                              <tr className="border-t border-blue-200">
                                <td className="p-3 font-mono">user_preferences</td>
                                <td className="p-3">Stores theme, language, and display preferences</td>
                                <td className="p-3">1 year</td>
                              </tr>
                              <tr className="border-t border-blue-200 bg-white">
                                <td className="p-3 font-mono">survey_settings</td>
                                <td className="p-3">Remembers survey display options and filters</td>
                                <td className="p-3">6 months</td>
                              </tr>
                              <tr className="border-t border-blue-200">
                                <td className="p-3 font-mono">notification_prefs</td>
                                <td className="p-3">Manages your notification and communication preferences</td>
                                <td className="p-3">1 year</td>
                              </tr>
                              <tr className="border-t border-blue-200 bg-white">
                                <td className="p-3 font-mono">dashboard_layout</td>
                                <td className="p-3">Saves your personalized dashboard arrangement</td>
                                <td className="p-3">6 months</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="border border-purple-200 rounded-xl overflow-hidden">
                      <div className="bg-purple-500 text-white p-4">
                        <h3 className="text-xl font-bold flex items-center">
                          📊 Analytics Cookies (Optional)
                          <span className="ml-auto text-sm bg-purple-600 px-3 py-1 rounded-full">User Controlled</span>
                        </h3>
                      </div>
                      <div className="p-6 bg-purple-50">
                        <p className="text-purple-800 mb-4 leading-relaxed">
                          These cookies help us understand how users interact with PulseSurvey, allowing us to improve our services and user experience. All analytics data is anonymized.
                        </p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-white">
                              <tr>
                                <th className="text-left p-3 font-semibold text-purple-900">Cookie Name</th>
                                <th className="text-left p-3 font-semibold text-purple-900">Purpose</th>
                                <th className="text-left p-3 font-semibold text-purple-900">Duration</th>
                              </tr>
                            </thead>
                            <tbody className="text-purple-700">
                              <tr className="border-t border-purple-200">
                                <td className="p-3 font-mono">_ps_analytics</td>
                                <td className="p-3">Tracks page views, session duration, and user flow</td>
                                <td className="p-3">2 years</td>
                              </tr>
                              <tr className="border-t border-purple-200 bg-white">
                                <td className="p-3 font-mono">_ps_performance</td>
                                <td className="p-3">Monitors site performance and loading times</td>
                                <td className="p-3">1 year</td>
                              </tr>
                              <tr className="border-t border-purple-200">
                                <td className="p-3 font-mono">survey_analytics</td>
                                <td className="p-3">Analyzes survey completion rates and user engagement</td>
                                <td className="p-3">2 years</td>
                              </tr>
                              <tr className="border-t border-purple-200 bg-white">
                                <td className="p-3 font-mono">error_tracking</td>
                                <td className="p-3">Helps identify and fix technical issues</td>
                                <td className="p-3">30 days</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="border border-orange-200 rounded-xl overflow-hidden">
                      <div className="bg-orange-500 text-white p-4">
                        <h3 className="text-xl font-bold flex items-center">
                          🎯 Marketing Cookies (Optional)
                          <span className="ml-auto text-sm bg-orange-600 px-3 py-1 rounded-full">User Controlled</span>
                        </h3>
                      </div>
                      <div className="p-6 bg-orange-50">
                        <p className="text-orange-800 mb-4 leading-relaxed">
                          These cookies help us deliver relevant content and measure the effectiveness of our communications. We never share personal data with third-party advertisers.
                        </p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-white">
                              <tr>
                                <th className="text-left p-3 font-semibold text-orange-900">Cookie Name</th>
                                <th className="text-left p-3 font-semibold text-orange-900">Purpose</th>
                                <th className="text-left p-3 font-semibold text-orange-900">Duration</th>
                              </tr>
                            </thead>
                            <tbody className="text-orange-700">
                              <tr className="border-t border-orange-200">
                                <td className="p-3 font-mono">campaign_tracking</td>
                                <td className="p-3">Measures effectiveness of email campaigns and referrals</td>
                                <td className="p-3">90 days</td>
                              </tr>
                              <tr className="border-t border-orange-200 bg-white">
                                <td className="p-3 font-mono">content_personalization</td>
                                <td className="p-3">Delivers relevant survey recommendations</td>
                                <td className="p-3">6 months</td>
                              </tr>
                              <tr className="border-t border-orange-200">
                                <td className="p-3 font-mono">referral_tracking</td>
                                <td className="p-3">Tracks referral program participation and rewards</td>
                                <td className="p-3">1 year</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Session Management */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">3</span>
                    </span>
                    Session Management & Security
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Sessions are crucial for maintaining your secure connection to PulseSurvey and ensuring your survey data is protected. Our session management system uses industry-standard security practices.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-indigo-900 mb-4">🔐 Session Security Features</h3>
                        <ul className="text-indigo-800 space-y-2">
                          <li>• Encrypted session tokens with 256-bit AES encryption</li>
                          <li>• Automatic session expiration after inactivity</li>
                          <li>• Secure session regeneration on login</li>
                          <li>• IP address validation for session integrity</li>
                          <li>• Multi-factor authentication integration</li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-green-900 mb-4">⏰ Session Lifecycle</h3>
                        <ul className="text-green-800 space-y-2">
                          <li>• <strong>Active Session:</strong> 4 hours of activity</li>
                          <li>• <strong>Idle Timeout:</strong> 30 minutes of inactivity</li>
                          <li>• <strong>Remember Me:</strong> 30 days (if enabled)</li>
                          <li>• <strong>Survey Sessions:</strong> 7 days for progress saving</li>
                          <li>• <strong>Forced Logout:</strong> After password changes</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-yellow-900 mb-4">⚠️ Session Security Best Practices</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">Do:</h4>
                          <ul className="text-yellow-700 text-sm space-y-1">
                            <li>• Log out when using shared devices</li>
                            <li>• Use strong, unique passwords</li>
                            <li>• Enable two-factor authentication</li>
                            <li>• Keep your browser updated</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">Don't:</h4>
                          <ul className="text-yellow-700 text-sm space-y-1">
                            <li>• Share your login credentials</li>
                            <li>• Use public Wi-Fi for sensitive surveys</li>
                            <li>• Leave your account logged in unattended</li>
                            <li>• Ignore security notifications</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Third-Party Cookies */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">4</span>
                    </span>
                    Third-Party Cookies & Services
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      We work with trusted third-party services to enhance our platform's functionality. These services may set their own cookies, but we maintain strict controls over what data is shared.
                    </p>

                    <div className="grid lg:grid-cols-3 gap-4">
                      <div className="bg-white border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all">
                        <h3 className="font-semibold text-blue-900 mb-3">📊 Analytics Services</h3>
                        <p className="text-blue-700 text-sm mb-3">Google Analytics, Mixpanel</p>
                        <ul className="text-blue-600 text-xs space-y-1">
                          <li>• Anonymized usage statistics</li>
                          <li>• Performance monitoring</li>
                          <li>• User journey analysis</li>
                        </ul>
                      </div>

                      <div className="bg-white border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all">
                        <h3 className="font-semibold text-green-900 mb-3">💳 Payment Processors</h3>
                        <p className="text-green-700 text-sm mb-3">Stripe, PayPal</p>
                        <ul className="text-green-600 text-xs space-y-1">
                          <li>• Secure payment processing</li>
                          <li>• Fraud prevention</li>
                          <li>• Transaction verification</li>
                        </ul>
                      </div>

                      <div className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all">
                        <h3 className="font-semibold text-purple-900 mb-3">🛡️ Security Services</h3>
                        <p className="text-purple-700 text-sm mb-3">Cloudflare, Auth0</p>
                        <ul className="text-purple-600 text-xs space-y-1">
                          <li>• DDoS protection</li>
                          <li>• Authentication services</li>
                          <li>• Bot detection</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-red-900 mb-4">🚫 What We Don't Allow</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ul className="text-red-800 space-y-2">
                          <li>• Advertising cookies without explicit consent</li>
                          <li>• Social media tracking pixels</li>
                          <li>• Cross-site behavioral tracking</li>
                          <li>• Data brokers or marketing platforms</li>
                        </ul>
                        <ul className="text-red-800 space-y-2">
                          <li>• Fingerprinting technologies</li>
                          <li>• Unauthorized data collection</li>
                          <li>• Third-party analytics on sensitive pages</li>
                          <li>• Cookies that compromise user privacy</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Cookie Management */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">5</span>
                    </span>
                    Managing Your Cookie Preferences
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      You have complete control over your cookie preferences. Manage them through our cookie banner, account settings, or your browser preferences.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">⚙️</span>
                        </div>
                        <h3 className="font-semibold text-blue-900 mb-3">PulseSurvey Settings</h3>
                        <p className="text-blue-700 text-sm mb-4">Access comprehensive cookie controls in your account dashboard.</p>
                        {/* <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                           Cookie Settings
                        </button> */}
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">🍪</span>
                        </div>
                        <h3 className="font-semibold text-green-900 mb-3">Cookie Banner</h3>
                        <p className="text-green-700 text-sm mb-4">Manage preferences through our cookie consent banner.</p>
                        {/* <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                          Review Preferences
                        </button> */}
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">🌐</span>
                        </div>
                        <h3 className="font-semibold text-purple-900 mb-3">Browser Settings</h3>
                        <p className="text-purple-700 text-sm mb-4">Use your browser's built-in cookie management tools.</p>
                        {/* <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">
                          Browser Guide
                        </button> */}
                      </div>
                    </div>

                    {/* Browser-Specific Instructions */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Browser-Specific Cookie Management</h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-2">Chrome</h4>
                          <p className="text-gray-600 text-sm">Settings → Privacy → Cookies</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-2">Firefox</h4>
                          <p className="text-gray-600 text-sm">Preferences → Privacy → Cookies</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-2">Safari</h4>
                          <p className="text-gray-600 text-sm">Preferences → Privacy → Cookies</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-2">Edge</h4>
                          <p className="text-gray-600 text-sm">Settings → Privacy → Cookies</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-amber-900 mb-4">⚠️ Impact of Disabling Cookies</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-amber-800 mb-3">Essential Cookies (Cannot Disable)</h4>
                          <ul className="text-amber-700 text-sm space-y-1">
                            <li>• Login and authentication</li>
                            <li>• Survey progress saving</li>
                            <li>• Security protection</li>
                            <li>• Basic site functionality</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-amber-800 mb-3">Optional Cookies (Can Disable)</h4>
                          <ul className="text-amber-700 text-sm space-y-1">
                            <li>• Personalized recommendations</li>
                            <li>• Saved preferences</li>
                            <li>• Analytics and improvements</li>
                            <li>• Enhanced user experience</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Mobile and App Cookies */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">6</span>
                    </span>
                    Mobile Apps & Cross-Device Tracking
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Our mobile applications use similar tracking technologies to web cookies, including local storage, device identifiers, and analytics SDKs. We maintain the same privacy standards across all platforms.
                    </p>

                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-cyan-900 mb-4">📱 Mobile Technologies</h3>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <span className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-white text-xs">📦</span>
                            </span>
                            <div>
                              <h4 className="font-semibold text-cyan-800">Local Storage</h4>
                              <p className="text-cyan-700 text-sm">App preferences and offline survey data</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <span className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-white text-xs">🔍</span>
                            </span>
                            <div>
                              <h4 className="font-semibold text-cyan-800">Device Identifiers</h4>
                              <p className="text-cyan-700 text-sm">Anonymous device fingerprinting for analytics</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <span className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-white text-xs">📊</span>
                            </span>
                            <div>
                              <h4 className="font-semibold text-cyan-800">Analytics SDKs</h4>
                              <p className="text-cyan-700 text-sm">App usage statistics and crash reporting</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-purple-900 mb-4">🔄 Cross-Device Features</h3>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-white text-xs">☁️</span>
                            </span>
                            <div>
                              <h4 className="font-semibold text-purple-800">Cloud Sync</h4>
                              <p className="text-purple-700 text-sm">Survey progress across all your devices</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-white text-xs">⚙️</span>
                            </span>
                            <div>
                              <h4 className="font-semibold text-purple-800">Unified Preferences</h4>
                              <p className="text-purple-700 text-sm">Settings synchronized between web and mobile</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                              <span className="text-white text-xs">🔒</span>
                            </span>
                            <div>
                              <h4 className="font-semibold text-purple-800">Secure Authentication</h4>
                              <p className="text-purple-700 text-sm">Single sign-on across platforms</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-indigo-900 mb-4">📋 Mobile Privacy Controls</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-indigo-800 mb-3">iOS Settings</h4>
                          <ul className="text-indigo-700 text-sm space-y-1">
                            <li>• Settings → Privacy & Security → Analytics</li>
                            <li>• Settings → Privacy → Apple Advertising</li>
                            <li>• App-specific privacy settings</li>
                            <li>• App Tracking Transparency controls</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-indigo-800 mb-3">Android Settings</h4>
                          <ul className="text-indigo-700 text-sm space-y-1">
                            <li>• Settings → Privacy → Ads</li>
                            <li>• Settings → Apps → PulseSurvey → Permissions</li>
                            <li>• Google Play Services settings</li>
                            <li>• Personalized advertising controls</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Legal Compliance */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">7</span>
                    </span>
                    Legal Compliance & Regulations
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      PulseSurvey complies with international privacy regulations and cookie laws, ensuring your rights are protected regardless of your location.
                    </p>

                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="bg-white border border-blue-300 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center mb-4">
                          <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">🇪🇺</span>
                          </span>
                          <h3 className="font-semibold text-blue-900">GDPR (EU)</h3>
                        </div>
                        <ul className="text-blue-700 text-sm space-y-2">
                          <li>• Explicit consent for non-essential cookies</li>
                          <li>• Right to withdraw consent at any time</li>
                          <li>• Granular cookie category controls</li>
                          <li>• Clear and comprehensive cookie information</li>
                          <li>• Data minimization principles</li>
                        </ul>
                      </div>

                      <div className="bg-white border border-purple-300 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center mb-4">
                          <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">🇺🇸</span>
                          </span>
                          <h3 className="font-semibold text-purple-900">CCPA (California)</h3>
                        </div>
                        <ul className="text-purple-700 text-sm space-y-2">
                          <li>• Right to know what data is collected</li>
                          <li>• Right to delete personal information</li>
                          <li>• Right to opt-out of data sales</li>
                          <li>• Non-discrimination for exercising rights</li>
                          <li>• Transparent cookie practices</li>
                        </ul>
                      </div>

                      <div className="bg-white border border-green-300 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center mb-4">
                          <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">🌍</span>
                          </span>
                          <h3 className="font-semibold text-green-900">Other Regions</h3>
                        </div>
                        <ul className="text-green-700 text-sm space-y-2">
                          <li>• Brazilian LGPD compliance</li>
                          <li>• Canadian PIPEDA requirements</li>
                          <li>• Australian Privacy Act adherence</li>
                          <li>• UK GDPR implementation</li>
                          <li>• Local cookie law compliance</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-emerald-900 mb-4">✅ Our Compliance Commitments</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-emerald-800 mb-3">Technical Measures</h4>
                          <ul className="text-emerald-700 text-sm space-y-2">
                            <li>• Cookie consent management platform</li>
                            <li>• Automated preference enforcement</li>
                            <li>• Regular compliance audits</li>
                            <li>• Data retention policies</li>
                            <li>• Privacy by design implementation</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-emerald-800 mb-3">User Rights</h4>
                          <ul className="text-emerald-700 text-sm space-y-2">
                            <li>• Easy consent withdrawal</li>
                            <li>• Transparent data processing</li>
                            <li>• Accessible privacy controls</li>
                            <li>• Timely response to requests</li>
                            <li>• Regular policy updates</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Updates and Changes */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">8</span>
                    </span>
                    Policy Updates & Changes
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      We regularly review and update our cookie policy to reflect changes in technology, regulations, and our services. We're committed to keeping you informed about how we use cookies and tracking technologies.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-cyan-900 mb-4">📅 Update Schedule</h3>
                        <ul className="text-cyan-800 space-y-2">
                          <li>• <strong>Regular Reviews:</strong> Quarterly policy assessments</li>
                          <li>• <strong>Legal Updates:</strong> When regulations change</li>
                          <li>• <strong>Service Changes:</strong> When we add new features</li>
                          <li>• <strong>Security Updates:</strong> When protocols evolve</li>
                        </ul>
                      </div>

                      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-teal-900 mb-4">📢 Notification Methods</h3>
                        <ul className="text-teal-800 space-y-2">
                          <li>• <strong>Email Alerts:</strong> For significant changes</li>
                          <li>• <strong>In-App Notifications:</strong> When you next visit</li>
                          <li>• <strong>Website Banner:</strong> Prominent policy updates</li>
                          <li>• <strong>Account Dashboard:</strong> Update history tracking</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">🔄 Version History</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                          <div>
                            <h4 className="font-semibold text-gray-900">Version 3.0</h4>
                            <p className="text-gray-600 text-sm">Enhanced mobile tracking disclosures, GDPR compliance updates</p>
                          </div>
                          <span className="text-blue-600 text-sm font-medium">Sept 20, 2025</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div>
                            <h4 className="font-semibold text-gray-700">Version 2.1</h4>
                            <p className="text-gray-500 text-sm">P2P reward system cookie specifications</p>
                          </div>
                          <span className="text-gray-500 text-sm font-medium">June 15, 2025</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div>
                            <h4 className="font-semibold text-gray-700">Version 2.0</h4>
                            <p className="text-gray-500 text-sm">Complete policy restructure and clarity improvements</p>
                          </div>
                          <span className="text-gray-500 text-sm font-medium">March 1, 2025</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">9</span>
                    </span>
                    Contact Us About Cookies
                  </h2>
                  
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-8">
                    <p className="text-violet-800 text-lg mb-6 leading-relaxed">
                      Have questions about our cookie policy or need help managing your preferences? Our privacy team is here to help with any cookie-related inquiries.
                    </p>
                    
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="bg-white rounded-lg p-6 border border-violet-200">
                        <h3 className="font-semibold text-violet-900 mb-3">🍪 Cookie Questions</h3>
                        <p className="text-violet-700 text-sm mb-3">
                          {/* <strong>Email:</strong> <p className="h-1">ookies@pulsesurvey.com</p> <br/>  */}
                          <strong>Response:</strong>  Within 24 hours
                        </p>
                        <p className="text-violet-600 text-xs">For general cookie policy questions and clarifications</p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-6 border border-violet-200">
                        <h3 className="font-semibold text-violet-900 mb-3">⚙️ Technical Support</h3>
                        <p className="text-violet-700 text-sm mb-3">
                          {/* <strong>Email:</strong> support@pulsesurvey.com<br/> */}
                          <strong>Response:</strong> Within 2 hours
                        </p>
                        <p className="text-violet-600 text-xs">For cookie settings and technical assistance</p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-6 border border-violet-200">
                        <h3 className="font-semibold text-violet-900 mb-3">🔒 Privacy Rights</h3>
                        <p className="text-violet-700 text-sm mb-3">
                          {/* <strong>Email:</strong> privacy@pulsesurvey.com<br/> */}
                          <strong>Response:</strong> Within 48 hours
                        </p>
                        <p className="text-violet-600 text-xs">For formal privacy requests and rights exercises</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white rounded-lg border border-violet-200">
                      <p className="text-violet-800 text-sm">
                        <strong>Quick Tip:</strong> Include your account email and browser information when contacting us about cookie issues to help us assist you more effectively.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Footer CTA */}
                <section className="border-t border-gray-200 pt-8">
                  <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Take Control of Your Cookie Preferences</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto">
                      Your privacy matters to us. Easily manage your cookie preferences and customize your PulseSurvey experience to match your privacy comfort level.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {/* <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Manage Cookie Preferences
                      </button>
                      <button className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors">
                        View Privacy Policy
                      </button>
                      <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                        Account Settings
                      </button> */}
                    </div>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )};