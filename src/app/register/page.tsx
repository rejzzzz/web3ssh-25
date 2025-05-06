import Navbar from '@components/components2025/Navbar2025';
import Footer from '@components/components2025/Footer2025';
// Saved as a draft

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <div className="gradient-bg">
          <div className="gradients-container">
            <div className="g1"></div>
            <div className="g2"></div>
            <div className="g3"></div>
            <div className="g4"></div>
            <div className="g5"></div>
          </div>
        </div>
        <div className="flex flex-col min-h-screen pb-20">
          <div className="min-h-[32rem] flex justify-center items-center p-4 pt-28 relative z-10">
            <div
              className="max-w-6xl w-full bg-gradient-to-r from-purple-800/15 via-indigo-700/25 to-blue-600/15 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.25)] border border-white/20"
              style={{
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)", // Reduced shadow opacity
                backdropFilter: "blur(8px)", // Reduced blur from 20px to 8px
                WebkitBackdropFilter: "blur(8px)" // Reduced blur from 20px to 8px
              }}
            >
              <div className="relative p-8 md:p-10 before:absolute before:inset-0 before:bg-white/5 before:rounded-2xl">
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-3 lg:mb-0">Web3 Summer School & Hackathon</h2>
                    <div className="flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
                      <div className="px-3 py-1 bg-purple-600/50 rounded-full text-white font-semibold mr-3">
                        June 29 - July 6, 2025
                      </div>
                      <span className="text-white font-medium">Online Event</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-white mb-8">
                    {/* First column - Program Overview */}
                    <div className="bg-white/5 p-6 rounded-xl backdrop-blur-md border border-white/10 h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-violet-600/50 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold drop-shadow">Program Overview</h3>
                      </div>
                      <p className="text-white/90 mb-4">A week-long immersive program designed to propel your knowledge and skills in Web3 technologies and blockchain development.</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="text-purple-300 mr-2">•</span>
                          <span>Full 8-day intensive program</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-purple-300 mr-2">•</span>
                          <span>Daily sessions from 9:45 AM to 5:00 PM IST</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-purple-300 mr-2">•</span>
                          <span>Fully online, accessible from anywhere</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-purple-300 mr-2">•</span>
                          <span>Open to beginners and experienced developers</span>
                        </div>
                      </div>
                    </div>

                    {/* Second column - Program Highlights */}
                    <div className="bg-white/5 p-6 rounded-xl backdrop-blur-md border border-white/10 h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-violet-600/50 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold drop-shadow">Program Highlights</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">•</span>
                          <span>Insights from leading experts representing prominent blockchain companies and institutions.
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">•</span>
                          <span>
                            Skill-building workshops offering hands-on experience with smart contracts, DApps, and blockchain fundamentals.
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">•</span>
                          <span>
                            Inspiring keynote sessions exploring the evolution of Web3, the impact of tokenization, and future industry trends.
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">•</span>
                          <span>
                            Interactive Q&A sessions with top industry leaders.
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">•</span>
                          <span>
                            Competitive Hackathon offering significant prizes and valuable industry recognition
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Third column - Benefits & Registration */}
                    <div className="bg-white/5 p-6 rounded-xl backdrop-blur-md border border-white/10 h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-violet-600/50 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold drop-shadow">Benefits & Registration</h3>
                      </div>
                      <div className="space-y-2 mb-5">
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">•</span>
                          <span>Certificate of participation from IIIT Sri City</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">•</span>
                          <span>Comprehensive suite of educational resources and materials</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">•</span>
                          <span>Opportunities for professional networking with industry experts</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">•</span>
                          <span>Sessions focused on career readiness and placement support</span>
                        </div>
                      </div>

                      <div className="mt-4 bg-white/10 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">Regular Fee:</span>
                          <span className="font-bold">₹799</span>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">With Referral:</span>
                          <span className="font-bold text-purple-300">₹599</span>
                        </div>
                        <p className="text-xs text-white/70 mb-3">* Apply a valid referral code during registration to benefit from a discount. (Information on obtaining codes from our Ambassadors can often be found on LinkedIn.)</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <a
                      href="#register-form"
                      className="flex-1 py-4 bg-violet-600/80 hover:bg-violet-500/80 text-white font-bold rounded-lg transition-all duration-300 text-xl text-center backdrop-blur-md shadow-lg border border-white/10"
                    >
                      Register Now
                    </a>
                    {/* <a
                      href="#schedule"
                      className="flex-1 py-4 bg-transparent hover:bg-white/10 text-white font-bold rounded-lg transition-all duration-300 text-xl text-center backdrop-blur-md shadow-lg border border-white/20"
                    >
                      View Full Schedule
                    </a> */}
                  </div>

                  <p className="text-sm text-white/70 text-center mt-6">
                    By registering, you agree to our Terms of Service and Privacy Policy. Limited slots available.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="min-h-[32rem] flex justify-center items-center p-4 pt-28 relative z-10">
            <div
              className="max-w-6xl w-full bg-gradient-to-r from-purple-800/15 via-indigo-700/25 to-blue-600/15 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.25)] border border-white/20"
              style={{
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)", // Reduced shadow opacity
                backdropFilter: "blur(8px)", // Reduced blur from 20px to 8px
                WebkitBackdropFilter: "blur(8px)" // Reduced blur from 20px to 8px
              }}
            >
              <div className="relative p-8 md:p-10 before:absolute before:inset-0 before:bg-white/5 before:rounded-2xl">
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-3 lg:mb-0">Become an Ambassador</h2>
                    <div className="flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
                      <div className="px-3 py-1 bg-purple-600/50 rounded-full text-white font-semibold mr-3">
                        Register before May 15, 2025
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-white mb-8">
                    {/* First column - How to Become an Ambassador */}
                    <div className="bg-white/5 p-6 rounded-xl backdrop-blur-md border border-white/10 h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-violet-600/50 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold drop-shadow">How to Become an Ambassador</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">1.</span>
                          <span>
                            Complete your Ambassador registration on web3ssh.dev.
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">2.</span>
                          <span>
                            Your unique referral code will be provided via email.
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">3.</span>
                          <span>
                            Share your code with your network and relevant communities.
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">4.</span>
                          <span>
                            Share your code with your network and relevant communities.
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">5.</span>
                          <span>
                            You will receive notification upon successful application of your code.
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-purple-300 mr-2 mt-1">6.</span>
                          <span>
                            Finalize your registration for the exclusive Ambassador Fare.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Second column - Benefits */}
                    <div className="bg-white/5 p-6 rounded-xl backdrop-blur-md border border-white/10 h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-violet-600/50 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold drop-shadow">Benefits & Rewards</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white/10 p-4 rounded-lg">
                          <div className="font-semibold mb-2">Minimal Qualification</div>
                          <p className="text-white/90">Ambassador certificate for getting your first referral</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                          <div className="font-semibold mb-2">5 Registrations</div>
                          <p className="text-white/90">Special Edition T-shirt</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                          <div className="font-semibold mb-2">10 Registrations</div>
                          <p className="text-white/90">Goodies Kit</p>
                        </div>
                        <div className="bg-white/10 p-4 rounded-lg">
                          <div className="font-semibold mb-2">Top 5 Ambassadors (15+ Registrations)</div>
                          <p className="text-white/90">Special Goodies Kit + Social Media Shoutout</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <a
                      href="#register-ambassador"
                      className="flex-1 py-4 bg-violet-600/80 hover:bg-violet-500/80 text-white font-bold rounded-lg transition-all duration-300 text-xl text-center backdrop-blur-md shadow-lg border border-white/10"
                    >
                      Register as Ambassador
                    </a>
                    {/* <a
                      href="#learn-more"
                      className="flex-1 py-4 bg-transparent hover:bg-white/10 text-white font-bold rounded-lg transition-all duration-300 text-xl text-center backdrop-blur-md shadow-lg border border-white/20"
                    >
                      Learn More
                    </a> */}
                  </div>

                  <p className="text-sm text-white/70 text-center mt-6">
                    <b>Ambassador registrations close on May 20th, 2025. Limited slots available.</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}