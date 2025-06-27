'use client';

import { HACKATHON_INFO } from 'lib/dashboard-utils';

export default function EventOverview() {
  return (
    <section className="bg-gradient-to-r from-purple-800/30 via-indigo-700/40 to-blue-600/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.4)] border border-white/30">
      <div className="relative p-6 sm:p-8 md:p-10 before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl">
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {HACKATHON_INFO.name}
            </h2>
            <p className="text-lg text-gray-300 mb-4">{HACKATHON_INFO.theme}</p>
            <div className="inline-flex items-center px-4 py-2 bg-white/15 rounded-full backdrop-blur-md border border-white/20">
              <span className="text-white font-medium">
                {HACKATHON_INFO.duration} Challenge • July 3-6, 2025
              </span>
            </div>
          </div>

          {/* Key Objectives */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-6 rounded-xl border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Key Objectives
              </h3>
              <div className="space-y-3">
                {HACKATHON_INFO.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-xl border border-white/20 flex flex-col h-full">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                What You&apos;ll Gain
              </h3>
              <p className="text-gray-300 mb-3">
                Unlock a world of opportunities and skills by participating in the
                Web3SSH Hackathon:
              </p>
              <div className="space-y-3 flex-1">
                <div className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 mr-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-300">
                    Hands-on experience with cutting-edge Web3 technologies
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 mr-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 01-8 0"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-300">
                    Mentorship from industry experts and thought leaders
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 mr-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-300">
                    Recognition and prizes for outstanding projects
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 mr-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 17l4 4 4-4m0-5V3"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-300">
                    Certificate from IIIT Sri City
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink-500/20 text-pink-400 mr-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a4 4 0 00-3-3.87"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-300">
                    Networking opportunities with like-minded developers
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 mr-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 20h9"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-300">
                    Access to exclusive hackathon resources and tools
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 mr-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-300">
                    Boost your portfolio and career prospects
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-2xl font-bold text-blue-400">48</div>
              <div className="text-sm text-gray-300">Hours</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-2xl font-bold text-green-400">1-4</div>
              <div className="text-sm text-gray-300">Team Size</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-2xl font-bold text-purple-400">Web3</div>
              <div className="text-sm text-gray-300">Focus</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="text-2xl font-bold text-yellow-400">Online</div>
              <div className="text-sm text-gray-300">Format</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
