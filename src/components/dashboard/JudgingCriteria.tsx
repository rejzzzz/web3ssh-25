'use client';

import { JudgingCriterion } from 'types/dashboard';

interface JudgingCriteriaProps {
    criteria: JudgingCriterion[];
}

export default function JudgingCriteria({ criteria }: JudgingCriteriaProps) {
    const getColorByWeight = (weight: number) => {
        if (weight >= 25) return 'border-red-500/30 bg-red-500/10 text-red-400';
        if (weight >= 20) return 'border-orange-500/30 bg-orange-500/10 text-orange-400';
        if (weight >= 15) return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400';
        return 'border-blue-500/30 bg-blue-500/10 text-blue-400';
    };

    return (
        <section className="bg-gradient-to-r from-purple-800/30 via-indigo-700/40 to-blue-600/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.4)] border border-white/30">
            <div className="relative p-6 sm:p-8 before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl">
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
                            <svg className="w-8 h-8 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Judging Criteria
                        </h2>
                        <p className="text-gray-300">
                            Your project will be evaluated based on these criteria
                        </p>
                    </div>

                    {/* Criteria Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {criteria.map((criterion) => (
                            <div
                                key={criterion.id}
                                className="bg-white/10 p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-200 hover:scale-105"
                            >
                                {/* Weight Badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-white">
                                        {criterion.name}
                                    </h3>
                                    <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getColorByWeight(criterion.weight)}`}>
                                        {criterion.weight}%
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-300 leading-relaxed mb-4">
                                    {criterion.description}
                                </p>

                                {/* Weight Bar */}
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${criterion.weight >= 25 ? 'bg-red-400' :
                                                criterion.weight >= 20 ? 'bg-orange-400' :
                                                    criterion.weight >= 15 ? 'bg-yellow-400' : 'bg-blue-400'
                                            }`}
                                        style={{ width: `${criterion.weight}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total Weight Verification */}
                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-green-400 text-sm">
                                Total Weight: {criteria.reduce((sum, c) => sum + c.weight, 0)}%
                                {criteria.reduce((sum, c) => sum + c.weight, 0) === 100 && " ✓"}
                            </p>
                        </div>
                    </div>

                    {/* Tips for Success */}
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-6">
                        <h4 className="text-blue-400 font-semibold mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Tips for Success
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-4 text-sm text-blue-200">
                            <div>
                                <p className="font-medium mb-1">Innovation & Creativity:</p>
                                <p>Think outside the box, solve real problems uniquely</p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">Technical Excellence:</p>
                                <p>Write clean code, use best practices, document well</p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">User Experience:</p>
                                <p>Make it intuitive, accessible, and visually appealing</p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">Real-world Impact:</p>
                                <p>Address genuine needs, show potential for adoption</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
