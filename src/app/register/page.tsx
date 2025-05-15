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
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-4 lg:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">Web3 Summer School & Hackathon</h2>
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
                        <div className="flex items-center mb-5">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600/90 to-purple-500/90 flex items-center justify-center mr-3 shadow-md group-hover:shadow-purple-500/50 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold drop-shadow group-hover:text-purple-200 transition-colors duration-300 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">Program Overview</h3>
                        </div>
                        <p className="text-white/90 mb-5 group-hover:text-white transition-colors duration-300">A week-long immersive program designed to propel your knowledge and skills in Web3 technologies and blockchain development.</p>
                        <div className="space-y-3">
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-3 text-lg">•</span>
                            <span>Full 8-day intensive program</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-3 text-lg">•</span>
                            <span>Daily sessions from 9:45 AM to 5:00 PM IST</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-3 text-lg">•</span>
                            <span>Fully online, accessible from anywhere</span>
                          </div>
                          <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-3 text-lg">•</span>
                            <span>Open to beginners and experienced developers</span>
                          </div>
                        </div>
                      </div>

                      {/* Second column - Program Highlights */}
                      <div className="bg-gradient-to-br from-white/10 to-white/15 p-6 rounded-xl backdrop-blur-md border border-white/20 h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
                        <div className="flex items-center mb-5">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600/90 to-purple-500/90 flex items-center justify-center mr-3 shadow-md group-hover:shadow-purple-500/50 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold drop-shadow group-hover:text-purple-200 transition-colors duration-300 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">Program Highlights</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-3 text-lg mt-1">•</span>
                            <span>Insights from leading experts representing prominent blockchain companies and institutions.
                            </span>
                          </div>
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-3 text-lg mt-1">•</span>
                            <span>
                              Skill-building workshops offering hands-on experience with smart contracts, DApps, and blockchain fundamentals.
                            </span>
                          </div>
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-3 text-lg mt-1">•</span>
                            <span>
                              Inspiring keynote sessions exploring the evolution of Web3, the impact of tokenization, and future industry trends.
                            </span>
                          </div>
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-3 text-lg mt-1">•</span>
                            <span>
                              Interactive Q&A sessions with top industry leaders.
                            </span>
                          </div>
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-3 text-lg mt-1">•</span>
                            <span>
                              Competitive Hackathon offering significant prizes and valuable industry recognition
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Third column - Benefits & Registration */}
                      <div className="bg-gradient-to-br from-white/10 to-white/15 p-6 rounded-xl backdrop-blur-md border border-white/20 h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
                        <div className="flex items-center mb-5">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600/90 to-purple-500/90 flex items-center justify-center mr-3 shadow-md group-hover:shadow-purple-500/50 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold drop-shadow group-hover:text-purple-200 transition-colors duration-300 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">Benefits & Registration</h3>
                        </div>
                        <div className="space-y-3 mb-5">
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-3 text-lg mt-1">•</span>
                            <span>Certificate of participation from IIIT Sri City</span>
                          </div>
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-3 text-lg mt-1">•</span>
                            <span>Comprehensive suite of educational resources and materials</span>
                          </div>
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-3 text-lg mt-1">•</span>
                            <span>Opportunities for professional networking with industry experts</span>
                          </div>
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-purple-300 mr-3 text-lg mt-1">•</span>
                            <span>Sessions focused on career readiness and placement support</span>
                          </div>
                        </div>

                        <div className="mt-5 bg-gradient-to-r from-white/15 to-white/25 p-5 rounded-lg shadow-inner group-hover:from-white/20 group-hover:to-white/30 transition-all duration-300 border border-white/20">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold">Regular Fee:</span>
                            <span className="font-bold text-lg">₹799</span>
                          </div>
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">With Referral:</span>
                            <span className="font-bold text-lg text-purple-300">₹599</span>
                          </div>
                          <p className="text-sm text-white/80 mb-3 italic">* Apply a valid referral code during registration to benefit from a discount. (Information on obtaining codes from our Ambassadors can often be found on LinkedIn.)</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mt-8">
                      <a
                        href="https://forms.gle/cycBNcRgkxvkQCHq5"
                        className="flex-1 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold rounded-lg transition-all duration-300 text-xl text-center backdrop-blur-md shadow-lg hover:shadow-purple-500/40 border border-white/20 hover:translate-y-[-3px]"
                      >
                        Register Now
                      </a>
                    </div>

                    <p className="text-sm text-white/70 text-center mt-6">
                      By registering, you agree to our Terms of Service and Privacy Policy. Limited slots available.
                    </p>
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
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-4 lg:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">Become an Ambassador</h2>
                      <div className="flex items-center px-4 py-2 bg-white/15 rounded-full backdrop-blur-md border border-white/20 shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <div className="px-3 py-1 bg-gradient-to-r from-purple-600/70 to-blue-600/70 rounded-full text-white font-semibold mr-3">
                          Register before May 15, 2025
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-white mb-8">
                      {/* First column - How to Become an Ambassador */}
                      <div className="bg-gradient-to-br from-white/10 to-white/15 p-6 rounded-xl backdrop-blur-md border border-white/20 h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
                        <div className="flex items-center mb-5">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600/90 to-purple-500/90 flex items-center justify-center mr-3 shadow-md group-hover:shadow-purple-500/50 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold drop-shadow group-hover:text-purple-200 transition-colors duration-300 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">How to Become an Ambassador</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="flex items-center justify-center text-lg font-semibold w-8 h-8 bg-purple-600/30 rounded-full mr-3 text-white border border-purple-400/30">1</span>
                            <span>
                              Complete your Ambassador registration on web3ssh.dev.
                            </span>
                          </div>
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="flex items-center justify-center text-lg font-semibold w-8 h-8 bg-purple-600/30 rounded-full mr-3 text-white border border-purple-400/30">2</span>
                            <span>
                              Your unique referral code will be provided via email.
                            </span>
                          </div>
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="flex items-center justify-center text-lg font-semibold w-8 h-8 bg-purple-600/30 rounded-full mr-3 text-white border border-purple-400/30">3</span>
                            <span>
                              Share your code with your network and relevant communities.
                            </span>
                          </div>
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="flex items-center justify-center text-lg font-semibold w-8 h-8 bg-purple-600/30 rounded-full mr-3 text-white border border-purple-400/30">4</span>
                            <span>
                              Share your code with your network and relevant communities.
                            </span>
                          </div>
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="flex items-center justify-center text-lg font-semibold w-8 h-8 bg-purple-600/30 rounded-full mr-3 text-white border border-purple-400/30">5</span>
                            <span>
                              You will receive notification upon successful application of your code.
                            </span>
                          </div>
                          <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                            <span className="flex items-center justify-center text-lg font-semibold w-8 h-8 bg-purple-600/30 rounded-full mr-3 text-white border border-purple-400/30">6</span>
                            <span>
                              Finalize your registration for the exclusive Ambassador Fare.
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Second column - Benefits */}
                      <div className="bg-gradient-to-br from-white/10 to-white/15 p-6 rounded-xl backdrop-blur-md border border-white/20 h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group">
                        <div className="flex items-center mb-5">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600/90 to-purple-500/90 flex items-center justify-center mr-3 shadow-md group-hover:shadow-purple-500/50 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-semibold drop-shadow group-hover:text-purple-200 transition-colors duration-300 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">Benefits & Rewards</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-white/15 p-4 rounded-lg shadow-inner border border-white/20 hover:bg-white/20 transition-colors duration-300 group-hover:translate-y-[-2px]">
                            <div className="font-semibold mb-2 text-purple-200 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">Certificate of Appreciation</div>
                            <p className="text-white/90">Ambassador certificate for getting your first referral</p>
                          </div>
                          <div className="bg-white/15 p-4 rounded-lg shadow-inner border border-white/20 hover:bg-white/20 transition-colors duration-300 group-hover:translate-y-[-2px]">
                            <div className="font-semibold mb-2 text-purple-200 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">5 Registrations</div>
                            <p className="text-white/90">Special Edition T-shirt</p>
                          </div>
                          <div className="bg-white/15 p-4 rounded-lg shadow-inner border border-white/20 hover:bg-white/20 transition-colors duration-300 group-hover:translate-y-[-2px]">
                            <div className="font-semibold mb-2 text-purple-200 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">10 Registrations</div>
                            <p className="text-white/90">Goodies Kit</p>
                          </div>
                          <div className="bg-white/15 p-4 rounded-lg shadow-inner border border-white/20 hover:bg-white/20 transition-colors duration-300 group-hover:translate-y-[-2px]">
                            <div className="font-semibold mb-2 text-purple-200 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">Top 5 Ambassadors (Minimum 15 Registrations)</div>
                            <p className="text-white/90">Special Goodies Kit + Social Media Shoutout</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mt-8">
                      <a
                        href="https://forms.gle/K41G1GBuLo43DBjy9"
                        className="flex-1 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold rounded-lg transition-all duration-300 text-xl text-center backdrop-blur-md shadow-lg hover:shadow-purple-500/40 border border-white/20 hover:translate-y-[-3px]"
                      >
                        Register as Ambassador
                      </a>
                    </div>

                    <p className="text-sm text-white/70 text-center mt-6">
                      <b>Ambassador registrations close on May 20th, 2025. Limited slots available.</b>
                    </p>
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