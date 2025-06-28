'use client';

interface RulesProps {
    rules: string[];
}

export default function Rules({ rules }: RulesProps) {
    return (
        <section className="bg-gradient-to-r from-purple-800/30 via-indigo-700/40 to-blue-600/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.4)] border border-white/30">
            <div className="relative p-6 sm:p-8 before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl">
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
                            <svg className="w-8 h-8 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Rules & Guidelines
                        </h2>
                        <p className="text-gray-300">
                            Please read these carefully and ensure compliance throughout the hackathon
                        </p>
                    </div>

                    {/* Rules Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {rules.map((rule, index) => (
                            <div
                                key={index}
                                className="bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg transform-gpu"
                                style={{ 
                                    animationDelay: `${index * 0.1}s`,
                                    animation: 'fadeIn 0.6s ease-out forwards'
                                }}
                            >
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-4 border border-red-500/30">
                                        <span className="text-red-400 font-bold text-sm">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-gray-300 leading-relaxed">
                                            {rule}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Important Notice */}
                    <div className="mt-8 p-6 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-start">
                            <svg className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <div>
                                <h4 className="text-yellow-400 font-semibold mb-2">
                                    Important Notice
                                </h4>
                                <div className="text-yellow-200 text-sm space-y-1">
                                    <p>• Violation of any rule may result in disqualification</p>
                                    <p>• If you have questions about rules, ask organizers immediately</p>
                                    <p>• Code of conduct applies to all interactions during the event</p>
                                    <p>• Report any issues or violations to the organizing team</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact for Clarifications */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Need clarification on any rule?
                            <a
                                href="mailto:support@web3ssh.dev"
                                className="text-blue-400 hover:text-blue-300 ml-1 underline"
                            >
                                Contact our team
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
