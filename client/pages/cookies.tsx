import Layout from "@/components/layout/Layout";

export default function JWTAuthPolicy() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                JWT Authentication & Token Policy
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Learn how PulseSurvey uses JSON Web Tokens (JWT) and modern authentication technologies to secure your account and protect your survey data.
              </p>
              <div className="mt-6 inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                Last Updated: September 27, 2025
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
                    What is JWT Authentication?
                  </h2>
                  <div className="space-y-6">
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      JSON Web Tokens (JWT) are a modern, stateless authentication method that PulseSurvey uses to securely verify your identity. Unlike traditional session cookies, JWTs are self-contained tokens that carry authentication information directly within them, providing enhanced security and scalability.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-blue-900 mb-4">🔐 JWT Tokens Explained</h3>
                        <p className="text-blue-800 mb-3">Self-contained authentication tokens that securely identify you without server-side session storage.</p>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• Stateless authentication</li>
                          <li>• Cryptographically signed</li>
                          <li>• Contains user claims</li>
                          <li>• Built-in expiration</li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-green-900 mb-4">⚡ How We Use JWTs</h3>
                        <p className="text-green-800 mb-3">JWTs authenticate API requests and maintain your login state across all PulseSurvey services.</p>
                        <ul className="text-green-700 text-sm space-y-1">
                          <li>• Secure API access</li>
                          <li>• Cross-platform authentication</li>
                          <li>• Survey data protection</li>
                          <li>• Role-based permissions</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                      <p className="text-amber-800 font-medium">
                        <strong>Important:</strong> JWTs provide enhanced security compared to traditional sessions while eliminating the need for server-side session storage, making your authentication both more secure and privacy-friendly.
                      </p>
                    </div>
                  </div>
                </section>

                {/* JWT Token Types */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">2</span>
                    </span>
                    Types of JWT Tokens We Use
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Access Tokens */}
                    <div className="border border-green-200 rounded-xl overflow-hidden">
                      <div className="bg-green-500 text-white p-4">
                        <h3 className="text-xl font-bold flex items-center">
                          🚀 Access Tokens (Primary Authentication)
                          <span className="ml-auto text-sm bg-green-600 px-3 py-1 rounded-full">Short-lived</span>
                        </h3>
                      </div>
                      <div className="p-6 bg-green-50">
                        <p className="text-green-800 mb-4 leading-relaxed">
                          Access tokens authenticate your API requests and provide access to PulseSurvey features. They contain your user identity and permissions in a secure, tamper-proof format.
                        </p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-white">
                              <tr>
                                <th className="text-left p-3 font-semibold text-green-900">Property</th>
                                <th className="text-left p-3 font-semibold text-green-900">Value</th>
                                <th className="text-left p-3 font-semibold text-green-900">Purpose</th>
                              </tr>
                            </thead>
                            <tbody className="text-green-700">
                              <tr className="border-t border-green-200">
                                <td className="p-3 font-mono">Expiration</td>
                                <td className="p-3">15 minutes</td>
                                <td className="p-3">Minimizes exposure if compromised</td>
                              </tr>
                              <tr className="border-t border-green-200 bg-white">
                                <td className="p-3 font-mono">Algorithm</td>
                                <td className="p-3">RS256 (RSA + SHA-256)</td>
                                <td className="p-3">Asymmetric signing for enhanced security</td>
                              </tr>
                              <tr className="border-t border-green-200">
                                <td className="p-3 font-mono">Claims</td>
                                <td className="p-3">User ID, Role, Permissions</td>
                                <td className="p-3">Authorization and identity verification</td>
                              </tr>
                              <tr className="border-t border-green-200 bg-white">
                                <td className="p-3 font-mono">Storage</td>
                                <td className="p-3">Memory only (not persistent)</td>
                                <td className="p-3">Prevents token theft from storage</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Refresh Tokens */}
                    <div className="border border-blue-200 rounded-xl overflow-hidden">
                      <div className="bg-blue-500 text-white p-4">
                        <h3 className="text-xl font-bold flex items-center">
                          🔄 Refresh Tokens (Token Renewal)
                          <span className="ml-auto text-sm bg-blue-600 px-3 py-1 rounded-full">Long-lived</span>
                        </h3>
                      </div>
                      <div className="p-6 bg-blue-50">
                        <p className="text-blue-800 mb-4 leading-relaxed">
                          Refresh tokens are used to obtain new access tokens without requiring you to log in again. They're stored securely and have longer expiration times.
                        </p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-white">
                              <tr>
                                <th className="text-left p-3 font-semibold text-blue-900">Property</th>
                                <th className="text-left p-3 font-semibold text-blue-900">Value</th>
                                <th className="text-left p-3 font-semibold text-blue-900">Purpose</th>
                              </tr>
                            </thead>
                            <tbody className="text-blue-700">
                              <tr className="border-t border-blue-200">
                                <td className="p-3 font-mono">Expiration</td>
                                <td className="p-3">7 days (default)</td>
                                <td className="p-3">Balance security with user convenience</td>
                              </tr>
                              <tr className="border-t border-blue-200 bg-white">
                                <td className="p-3 font-mono">Storage</td>
                                <td className="p-3">HttpOnly cookie (secure)</td>
                                <td className="p-3">Prevents XSS attacks and JavaScript access</td>
                              </tr>
                              <tr className="border-t border-blue-200">
                                <td className="p-3 font-mono">Rotation</td>
                                <td className="p-3">Each use generates new token</td>
                                <td className="p-3">Prevents token replay attacks</td>
                              </tr>
                              <tr className="border-t border-blue-200 bg-white">
                                <td className="p-3 font-mono">Revocation</td>
                                <td className="p-3">Server-side blacklist</td>
                                <td className="p-3">Immediate invalidation when needed</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* ID Tokens */}
                    <div className="border border-purple-200 rounded-xl overflow-hidden">
                      <div className="bg-purple-500 text-white p-4">
                        <h3 className="text-xl font-bold flex items-center">
                          👤 ID Tokens (User Information)
                          <span className="ml-auto text-sm bg-purple-600 px-3 py-1 rounded-full">Session-based</span>
                        </h3>
                      </div>
                      <div className="p-6 bg-purple-50">
                        <p className="text-purple-800 mb-4 leading-relaxed">
                          ID tokens contain your profile information and are used to display user details in the application interface. They follow OpenID Connect standards.
                        </p>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-white">
                              <tr>
                                <th className="text-left p-3 font-semibold text-purple-900">Property</th>
                                <th className="text-left p-3 font-semibold text-purple-900">Value</th>
                                <th className="text-left p-3 font-semibold text-purple-900">Purpose</th>
                              </tr>
                            </thead>
                            <tbody className="text-purple-700">
                              <tr className="border-t border-purple-200">
                                <td className="p-3 font-mono">Expiration</td>
                                <td className="p-3">1 hour</td>
                                <td className="p-3">Profile information access</td>
                              </tr>
                              <tr className="border-t border-purple-200 bg-white">
                                <td className="p-3 font-mono">Claims</td>
                                <td className="p-3">Name, Email, Avatar, Preferences</td>
                                <td className="p-3">User interface personalization</td>
                              </tr>
                              <tr className="border-t border-purple-200">
                                <td className="p-3 font-mono">Standard</td>
                                <td className="p-3">OpenID Connect</td>
                                <td className="p-3">Industry-standard user identity</td>
                              </tr>
                              <tr className="border-t border-purple-200 bg-white">
                                <td className="p-3 font-mono">Privacy</td>
                                <td className="p-3">Minimal necessary data only</td>
                                <td className="p-3">Data minimization compliance</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* JWT Security Features */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">3</span>
                    </span>
                    JWT Security & Protection
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Our JWT implementation includes multiple layers of security to protect your authentication tokens from various attack vectors and ensure your account remains secure.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-red-900 mb-4">🛡️ Cryptographic Security</h3>
                        <ul className="text-red-800 space-y-2">
                          <li>• RSA-2048 asymmetric key pairs</li>
                          <li>• SHA-256 cryptographic hashing</li>
                          <li>• Regular key rotation (every 90 days)</li>
                          <li>• Hardware Security Module (HSM) key storage</li>
                          <li>• Tamper-evident token signatures</li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-blue-900 mb-4">🔒 Transport Security</h3>
                        <ul className="text-blue-800 space-y-2">
                          <li>• TLS 1.3 encryption for all token transfers</li>
                          <li>• Certificate pinning for API endpoints</li>
                          <li>• Secure cookie attributes (HttpOnly, Secure, SameSite)</li>
                          <li>• Content Security Policy (CSP) headers</li>
                          <li>• Request origin validation</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-green-900 mb-4">⚡ Attack Prevention</h3>
                      <div className="grid lg:grid-cols-3 gap-4">
                        <div>
                          <h4 className="font-semibold text-green-800 mb-2">XSS Protection</h4>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• HttpOnly refresh tokens</li>
                            <li>• Content Security Policy</li>
                            <li>• Input sanitization</li>
                            <li>• Script injection prevention</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-800 mb-2">CSRF Protection</h4>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• SameSite cookie attributes</li>
                            <li>• Origin header validation</li>
                            <li>• Double-submit cookie pattern</li>
                            <li>• Custom header requirements</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-800 mb-2">Token Theft Protection</h4>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• Short access token lifetime</li>
                            <li>• Token rotation on refresh</li>
                            <li>• IP address binding</li>
                            <li>• Anomaly detection</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-yellow-900 mb-4">🎯 Security Best Practices</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">For Enhanced Security:</h4>
                          <ul className="text-yellow-700 text-sm space-y-1">
                            <li>• Enable two-factor authentication</li>
                            <li>• Use unique, strong passwords</li>
                            <li>• Keep browsers updated</li>
                            <li>• Log out from shared devices</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">Security Warnings:</h4>
                          <ul className="text-yellow-700 text-sm space-y-1">
                            <li>• Never share authentication tokens</li>
                            <li>• Avoid public Wi-Fi for sensitive operations</li>
                            <li>• Report suspicious account activity</li>
                            <li>• Monitor login notifications</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Token Lifecycle */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">4</span>
                    </span>
                    JWT Token Lifecycle & Management
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Understanding how JWT tokens are created, used, refreshed, and invalidated helps you maintain optimal security while using PulseSurvey.
                    </p>

                    <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 border border-indigo-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-indigo-900 mb-6">🔄 Token Flow Process</h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">1</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-indigo-800">Authentication Request</h4>
                            <p className="text-indigo-700 text-sm">User provides credentials (username/password or OAuth)</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">2</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-indigo-800">Token Generation</h4>
                            <p className="text-indigo-700 text-sm">Server creates access token (15min) and refresh token (7 days)</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">3</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-indigo-800">Token Usage</h4>
                            <p className="text-indigo-700 text-sm">Access token included in API requests for authentication</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">4</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-indigo-800">Token Refresh</h4>
                            <p className="text-indigo-700 text-sm">Refresh token exchanges for new access token when expired</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">5</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-indigo-800">Token Expiration/Logout</h4>
                            <p className="text-indigo-700 text-sm">Tokens expire naturally or are invalidated on logout</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-green-900 mb-4">✅ Automatic Token Management</h3>
                        <ul className="text-green-800 space-y-2">
                          <li>• Seamless token refresh in background</li>
                          <li>• Automatic retry on token expiration</li>
                          <li>• Graceful logout on refresh failure</li>
                          <li>• Cross-tab synchronization</li>
                          <li>• Mobile app token persistence</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-red-900 mb-4">🚨 Token Invalidation Triggers</h3>
                        <ul className="text-red-800 space-y-2">
                          <li>• Manual logout from any device</li>
                          <li>• Password change or reset</li>
                          <li>• Suspicious activity detection</li>
                          <li>• Account security settings change</li>
                          <li>• Administrative security action</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Cookies Still Used */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">5</span>
                    </span>
                    Limited Cookie Usage with JWT
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      While JWT tokens handle most authentication, we still use a minimal set of secure cookies for specific security and functionality purposes.
                    </p>

                    <div className="border border-blue-200 rounded-xl overflow-hidden">
                      <div className="bg-blue-500 text-white p-4">
                        <h3 className="text-xl font-bold">🍪 Essential Security Cookies</h3>
                      </div>
                      <div className="p-6 bg-blue-50">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-white">
                              <tr>
                                <th className="text-left p-3 font-semibold text-blue-900">Cookie Name</th>
                                <th className="text-left p-3 font-semibold text-blue-900">Purpose</th>
                                <th className="text-left p-3 font-semibold text-blue-900">Duration</th>
                                <th className="text-left p-3 font-semibold text-blue-900">Security</th>
                              </tr>
                            </thead>
                            <tbody className="text-blue-700">
                              <tr className="border-t border-blue-200">
                                <td className="p-3 font-mono">refresh_token</td>
                                <td className="p-3">Stores JWT refresh token securely</td>
                                <td className="p-3">7 days</td>
                                <td className="p-3">HttpOnly, Secure, SameSite=Strict</td>
                              </tr>
                              <tr className="border-t border-blue-200 bg-white">
                                <td className="p-3 font-mono">csrf_token</td>
                                <td className="p-3">CSRF protection for state-changing requests</td>
                                <td className="p-3">Session</td>
                                <td className="p-3">Secure, SameSite=Strict</td>
                              </tr>
                              <tr className="border-t border-blue-200">
                                <td className="p-3 font-mono">device_fingerprint</td>
                                <td className="p-3">Device recognition for security validation</td>
                                <td className="p-3">30 days</td>
                                <td className="p-3">HttpOnly, Secure</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-green-900 mb-4">✨ Benefits of JWT + Minimal Cookies</h3>
                        <ul className="text-green-800 space-y-2">
                          <li>• Reduced server storage requirements</li>
                          <li>• Enhanced scalability and performance</li>
                          <li>• Better mobile app compatibility</li>
                          <li>• Simplified cross-domain authentication</li>
                          <li>• Improved privacy through stateless design</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-purple-900 mb-4">🎛️ Cookie Control Options</h3>
                        <ul className="text-purple-800 space-y-2">
                          <li>• Essential security cookies cannot be disabled</li>
                          <li>• Functional preferences cookies are optional</li>
                          <li>• Analytics cookies can be opted out</li>
                          <li>• No marketing or tracking cookies used</li>
                          <li>• Full transparency in cookie usage</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Cross-Platform JWT */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">6</span>
                    </span>
                    Cross-Platform JWT Authentication
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      JWT tokens enable seamless authentication across all PulseSurvey platforms - web, mobile apps, and API integrations - while maintaining consistent security standards.
                    </p>

                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-blue-900 mb-4">🌐 Web Platform</h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-blue-800">Token Storage</h4>
                            <p className="text-blue-700 text-sm">Memory + HttpOnly cookies for refresh</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-800">Security Features</h4>
                            <p className="text-blue-700 text-sm">HTTPS, CSP headers, XSS protection</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-800">Token Refresh</h4>
                            <p className="text-blue-700 text-sm">Automatic background renewal</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-green-900 mb-4">📱 Mobile Apps</h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-green-800">Token Storage</h4>
                            <p className="text-green-700 text-sm">Secure keychain/keystore storage</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-green-800">Biometric Auth</h4>
                            <p className="text-green-700 text-sm">Fingerprint/Face ID integration</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-green-800">Offline Support</h4>
                            <p className="text-green-700 text-sm">Cached tokens for offline access</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-purple-900 mb-4">🔌 API Access</h3>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-purple-800">Token Usage</h4>
                            <p className="text-purple-700 text-sm">Bearer token in Authorization header</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-purple-800">Rate Limiting</h4>
                            <p className="text-purple-700 text-sm">Per-user and per-token limits</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-purple-800">Scoped Access</h4>
                            <p className="text-purple-700 text-sm">Fine-grained permission control</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Privacy & Compliance */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">7</span>
                    </span>
                    Privacy & Regulatory Compliance
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Our JWT implementation complies with international privacy regulations while minimizing data collection and storage through stateless authentication design.
                    </p>

                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="bg-white border border-blue-300 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center mb-4">
                          <span className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">🇪🇺</span>
                          </span>
                          <h3 className="font-semibold text-blue-900">GDPR Compliance</h3>
                        </div>
                        <ul className="text-blue-700 text-sm space-y-2">
                          <li>• Minimal data processing principle</li>
                          <li>• No persistent session tracking</li>
                          <li>• Explicit consent for optional cookies</li>
                          <li>• Right to data portability via JWTs</li>
                          <li>• Automatic token expiration</li>
                        </ul>
                      </div>

                      <div className="bg-white border border-purple-300 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center mb-4">
                          <span className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">🇺🇸</span>
                          </span>
                          <h3 className="font-semibold text-purple-900">CCPA Compliance</h3>
                        </div>
                        <ul className="text-purple-700 text-sm space-y-2">
                          <li>• Transparent token data processing</li>
                          <li>• No sale of personal information</li>
                          <li>• Token deletion on account closure</li>
                          <li>• Clear opt-out mechanisms</li>
                          <li>• Privacy rights exercised via API</li>
                        </ul>
                      </div>

                      <div className="bg-white border border-green-300 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center mb-4">
                          <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">🔒</span>
                          </span>
                          <h3 className="font-semibold text-green-900">Security Standards</h3>
                        </div>
                        <ul className="text-green-700 text-sm space-y-2">
                          <li>• OAuth 2.0 / OpenID Connect standards</li>
                          <li>• SOC 2 Type II certification</li>
                          <li>• ISO 27001 security framework</li>
                          <li>• Regular security audits</li>
                          <li>• OWASP security guidelines</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-emerald-900 mb-4">✅ Privacy-First JWT Benefits</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-emerald-800 mb-3">Data Minimization</h4>
                          <ul className="text-emerald-700 text-sm space-y-2">
                            <li>• No server-side session storage</li>
                            <li>• Self-contained authentication</li>
                            <li>• Minimal personal data in tokens</li>
                            <li>• Automatic data expiration</li>
                            <li>• Stateless architecture</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-emerald-800 mb-3">User Control</h4>
                          <ul className="text-emerald-700 text-sm space-y-2">
                            <li>• Transparent token contents</li>
                            <li>• Easy logout from all devices</li>
                            <li>• Token inspection capabilities</li>
                            <li>• Granular permission control</li>
                            <li>• No hidden tracking</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Token Management */}
                <section className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-sm font-bold">8</span>
                    </span>
                    Managing Your JWT Tokens
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      While JWT tokens are largely managed automatically, you have full control over your authentication sessions and can manage active tokens across all your devices.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">🔍</span>
                        </div>
                        <h3 className="font-semibold text-blue-900 mb-3">Active Sessions</h3>
                        <p className="text-blue-700 text-sm mb-4">View and manage all active JWT sessions across your devices.</p>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">🚪</span>
                        </div>
                        <h3 className="font-semibold text-green-900 mb-3">Remote Logout</h3>
                        <p className="text-green-700 text-sm mb-4">Instantly invalidate tokens on all devices from any location.</p>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                        <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">⚙️</span>
                        </div>
                        <h3 className="font-semibold text-purple-900 mb-3">Token Settings</h3>
                        <p className="text-purple-700 text-sm mb-4">Customize token expiration and security preferences.</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">🛠️ Token Management Actions</h3>
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Available Actions</h4>
                          <ul className="text-gray-700 text-sm space-y-2">
                            <li>• View active sessions with device info</li>
                            <li>• Revoke specific device tokens</li>
                            <li>• Force logout from all devices</li>
                            <li>• Review recent authentication activity</li>
                            <li>• Set token expiration preferences</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Security Features</h4>
                          <ul className="text-gray-700 text-sm space-y-2">
                            <li>• Email notifications for new logins</li>
                            <li>• Suspicious activity detection</li>
                            <li>• Geographic login tracking</li>
                            <li>• Device fingerprinting</li>
                            <li>• Automatic token rotation</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-amber-900 mb-4">⚠️ Important Token Security Tips</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-amber-800 mb-3">Best Practices</h4>
                          <ul className="text-amber-700 text-sm space-y-1">
                            <li>• Regular logout from shared devices</li>
                            <li>• Monitor active sessions weekly</li>
                            <li>• Enable login notifications</li>
                            <li>• Use strong, unique passwords</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-amber-800 mb-3">Red Flags</h4>
                          <ul className="text-amber-700 text-sm space-y-1">
                            <li>• Unrecognized device sessions</li>
                            <li>• Login from unusual locations</li>
                            <li>• Multiple concurrent sessions</li>
                            <li>• Unexpected token expirations</li>
                          </ul>
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
                    Contact Us About JWT Authentication
                  </h2>
                  
                  <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-8">
                    <p className="text-violet-800 text-lg mb-6 leading-relaxed">
                      Have questions about JWT authentication, token security, or need help with authentication issues? Our security team is ready to assist.
                    </p>
                    
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="bg-white rounded-lg p-6 border border-violet-200">
                        <h3 className="font-semibold text-violet-900 mb-3">🔐 Authentication Support</h3>
                        <p className="text-violet-700 text-sm mb-3">
                          <strong>Response:</strong> Within 1 hour
                        </p>
                        <p className="text-violet-600 text-xs">For login issues and token-related problems</p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-6 border border-violet-200">
                        <h3 className="font-semibold text-violet-900 mb-3">🛡️ Security Concerns</h3>
                        <p className="text-violet-700 text-sm mb-3">
                          <strong>Response:</strong> Within 30 minutes
                        </p>
                        <p className="text-violet-600 text-xs">For security incidents and suspicious activity</p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-6 border border-violet-200">
                        <h3 className="font-semibold text-violet-900 mb-3">📖 Technical Questions</h3>
                        <p className="text-violet-700 text-sm mb-3">
                          <strong>Response:</strong> Within 4 hours
                        </p>
                        <p className="text-violet-600 text-xs">For JWT implementation and API questions</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-white rounded-lg border border-violet-200">
                      <p className="text-violet-800 text-sm">
                        <strong>Quick Tip:</strong> Include your user ID and the specific device/browser when reporting authentication issues to help us troubleshoot more effectively.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Footer CTA */}
                <section className="border-t border-gray-200 pt-8">
                  <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure, Modern Authentication</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto">
                      Experience the security and convenience of JWT-based authentication. Manage your tokens, review active sessions, and maintain complete control over your PulseSurvey account security.
                    </p>
                  </div>
                </section>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )}