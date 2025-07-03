import Navbar from '@components/components2025/Navbar2025';
import Footer from '@components/components2025/Footer2025';
// Saved as a draft

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex flex-col">
        <div className="gradient-bg fixed inset-0 pointer-events-none">
          <div className="gradients-container">
            <div className="g1"></div>
            <div className="g2"></div>
            <div className="g3"></div>
            <div className="g4"></div>
            <div className="g5"></div>
          </div>
        </div>

        <main className="flex-grow z-10 relative">
          <div className="container mx-auto">
            <section className="py-20">
              <div
                className="max-w-6xl mx-auto w-full bg-gradient-to-r from-purple-800/30 via-indigo-700/40 to-blue-600/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.4)] border border-white/30 transition-all duration-300 hover:shadow-[0_0_60px_rgba(139,92,246,0.5)]"
                style={{
                  boxShadow: "0 10px 40px 0 rgba(31, 38, 135, 0.35)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)"
                }}
              >
                <div className="relative p-6 sm:p-8 md:p-10 before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl">
                  <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-4 lg:mb-0 [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">Web3 Summer School & Hackathon</h2>
                      <div className="flex items-center px-4 py-2 bg-white/15 rounded-full backdrop-blur-md border border-white/20 shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <div className="px-3 py-1 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-full text-white font-semibold mr-3">
                          June 29 - July 6, 2025
                        </div>
                        <span className="text-white font-medium">Online Event</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-white mb-8">
                      {/* First column - Program Overview */}
                      <div className="bg-gradient-to-br from-white/10 to-white/15 p-6 rounded-xl backdrop-blur-md border border-white/20 h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600/90 to-purple-500/90 flex items-center justify-center mr-3 shadow-md group-hover:shadow-purple-500/50 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold drop-shadow group-hover:text-purple-200 transition-colors duration-300 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">Program Overview</h3>
                        </div>
                        <div className="space-y-2.5">
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-2.5 text-lg">•</span>
                            <span>June 29 - July 6, 2025</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-2.5 text-lg">•</span>
                            <span>9:45 AM - 5:00 PM IST</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-2.5 text-lg">•</span>
                            <span>Fully online event</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-2.5 text-lg">•</span>
                            <span>All skill levels welcome</span>
                          </div>
                        </div>
                      </div>

                      {/* Second column - Program Highlights */}
                      <div className="bg-gradient-to-br from-white/10 to-white/15 p-6 rounded-xl backdrop-blur-md border border-white/20 h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600/90 to-purple-500/90 flex items-center justify-center mr-3 shadow-md group-hover:shadow-purple-500/50 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold drop-shadow group-hover:text-purple-200 transition-colors duration-300 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">Program Highlights</h3>
                        </div>
                        <div className="space-y-2.5">
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-2.5 text-lg">•</span>
                            <span>Industry expert sessions</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-2.5 text-lg">•</span>
                            <span>Smart contract workshops</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-2.5 text-lg">•</span>
                            <span>Web3 keynote presentations</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-2.5 text-lg">•</span>
                            <span>Q&A with industry leaders</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-2.5 text-lg">•</span>
                            <span>Hackathon with prizes</span>
                          </div>
                        </div>
                      </div>

                      {/* Third column - Benefits & Pricing */}
                      <div className="bg-gradient-to-br from-white/10 to-white/15 p-6 rounded-xl backdrop-blur-md border border-white/20 h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600/90 to-purple-500/90 flex items-center justify-center mr-3 shadow-md group-hover:shadow-purple-500/50 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold drop-shadow group-hover:text-purple-200 transition-colors duration-300 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">Benefits & Pricing</h3>
                        </div>
                        <div className="space-y-2.5 mb-4">
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-2.5 text-lg">•</span>
                            <span>IIIT Sri City Certificate</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-2.5 text-lg">•</span>
                            <span>Course materials</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-2.5 text-lg">•</span>
                            <span>Industry networking</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-2.5 text-lg">•</span>
                            <span>Career guidance</span>
                          </div>
                        </div>

                        <div className="mt-4 bg-gradient-to-r from-white/15 to-white/20 p-4 rounded-lg shadow-inner group-hover:from-white/20 group-hover:to-white/25 transition-all duration-300 border border-white/20">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-white/90">Regular:</span>
                            <span className="font-bold text-lg">₹799</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-white/90">With Referral:</span>
                            <span className="font-bold text-lg text-purple-300">₹599</span>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flex flex-col md:flex-row gap-4">
                        <a
                          href="https://forms.gle/x4Cej5WX152fwts59"
                          className="flex-1 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold rounded-lg transition-all duration-300 text-lg text-center backdrop-blur-md shadow-lg hover:shadow-purple-500/40 border border-white/20 hover:translate-y-[-3px]"
                        >
                          Register Now
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16">
              <div
                className="max-w-6xl mx-auto w-full bg-gradient-to-r from-purple-800/30 via-indigo-700/40 to-blue-600/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.4)] border border-white/30 transition-all duration-300 hover:shadow-[0_0_60px_rgba(139,92,246,0.5)]"
                style={{
                  boxShadow: "0 10px 40px 0 rgba(31, 38, 135, 0.35)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)"
                }}
              >
                <div className="relative p-6 sm:p-8 md:p-10 before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl">
                  <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-4 lg:mb-0 [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">Become an Ambassador</h2>
                      <div className="flex items-center px-4 py-2 bg-white/15 rounded-full backdrop-blur-md border border-white/20 shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <div className="px-3 py-1 bg-gradient-to-r from-purple-600/70 to-blue-600/70 rounded-full text-white font-semibold mr-3">
                          Register by June 24, 2025
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-white mb-8">
                      {/* First column - How to Become an Ambassador */}
                      <div className="bg-gradient-to-br from-white/10 to-white/15 p-6 rounded-xl backdrop-blur-md border border-white/20 h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600/90 to-purple-500/90 flex items-center justify-center mr-3 shadow-md group-hover:shadow-purple-500/50 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold drop-shadow group-hover:text-purple-200 transition-colors duration-300 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">How to Become an Ambassador</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="flex items-center justify-center text-sm font-semibold w-6 h-6 bg-purple-600/30 rounded-full mr-2.5 text-white border border-purple-400/30">1</span>
                            <span>Register on web3ssh.dev</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="flex items-center justify-center text-sm font-semibold w-6 h-6 bg-purple-600/30 rounded-full mr-2.5 text-white border border-purple-400/30">2</span>
                            <span>Get your referral code by email</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="flex items-center justify-center text-sm font-semibold w-6 h-6 bg-purple-600/30 rounded-full mr-2.5 text-white border border-purple-400/30">3</span>
                            <span>Share code with your network</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="flex items-center justify-center text-sm font-semibold w-6 h-6 bg-purple-600/30 rounded-full mr-2.5 text-white border border-purple-400/30">4</span>
                            <span>Track referrals on dashboard</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="flex items-center justify-center text-sm font-semibold w-6 h-6 bg-purple-600/30 rounded-full mr-2.5 text-white border border-purple-400/30">5</span>
                            <span>Get notified on successful use</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="flex items-center justify-center text-sm font-semibold w-6 h-6 bg-purple-600/30 rounded-full mr-2.5 text-white border border-purple-400/30">6</span>
                            <span>Register with exclusive discounts</span>
                          </div>
                        </div>
                      </div>

                      {/* Second column - Benefits */}
                      <div className="bg-gradient-to-br from-white/10 to-white/15 p-6 rounded-xl backdrop-blur-md border border-white/20 h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600/90 to-purple-500/90 flex items-center justify-center mr-3 shadow-md group-hover:shadow-purple-500/50 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold drop-shadow group-hover:text-purple-200 transition-colors duration-300 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">Benefits & Rewards</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-white/15 p-3 rounded-lg shadow-inner border border-white/20 hover:bg-white/20 transition-colors duration-300 group-hover:translate-y-[-2px] flex items-center">
                            <div className="w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center mr-3 border border-purple-400/30">
                              <span className="text-white text-xs font-bold">1+</span>
                            </div>
                            <span className="text-white">Certificate of Appreciation</span>
                          </div>
                          <div className="bg-white/15 p-3 rounded-lg shadow-inner border border-white/20 hover:bg-white/20 transition-colors duration-300 group-hover:translate-y-[-2px] flex items-center">
                            <div className="w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center mr-3 border border-purple-400/30">
                              <span className="text-white text-xs font-bold">5+</span>
                            </div>
                            <span className="text-white">Special Edition T-shirt</span>
                          </div>
                          <div className="bg-white/15 p-3 rounded-lg shadow-inner border border-white/20 hover:bg-white/20 transition-colors duration-300 group-hover:translate-y-[-2px] flex items-center">
                            <div className="w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center mr-3 border border-purple-400/30">
                              <span className="text-white text-xs font-bold">10+</span>
                            </div>
                            <span className="text-white">Complete Goodies Kit</span>
                          </div>
                          <div className="bg-white/15 p-3 rounded-lg shadow-inner border border-white/20 hover:bg-white/20 transition-colors duration-300 group-hover:translate-y-[-2px] flex items-center">
                            <div className="w-6 h-6 bg-purple-500/30 rounded-full flex items-center justify-center mr-3 border border-purple-400/30">
                              <span className="text-white text-xs font-bold">15+</span>
                            </div>
                            <span className="text-white">Top 5: Premium Kit + Shoutout</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <a
                          href="https://forms.gle/bBEfJZCfH51HKHW36"
                          className="flex-1 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold rounded-lg transition-all duration-300 text-lg text-center backdrop-blur-md shadow-lg hover:shadow-purple-500/40 border border-white/20 hover:translate-y-[-3px]"
                        >
                          Register as Ambassador
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <div className="relative z-20">
          <Footer />
        </div>
      </div>
    </>
  );
}