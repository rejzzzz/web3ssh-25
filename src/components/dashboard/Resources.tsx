'use client';

import { Resource } from 'types/dashboard';

interface ResourcesProps {
    resources: Resource[];
}

export default function Resources({ resources }: ResourcesProps) {
    const getCategoryName = (category: Resource['category']) => {
        switch (category) {
            case 'documentation':
                return 'Documentation';
            case 'starter-kit':
                return 'Starter Kits';
            case 'api':
                return 'APIs & Tools';
            case 'sponsor':
                return 'Sponsor Resources';
            case 'contact':
                return 'Support & Contact';
            default:
                return 'Resources';
        }
    };

    // Group resources by category
    const groupedResources = resources.reduce((acc, resource) => {
        const category = resource.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(resource);
        return acc;
    }, {} as Record<string, Resource[]>);

    return (
        <section className="bg-gradient-to-r from-purple-800/30 via-indigo-700/40 to-blue-600/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.4)] border border-white/30">
            <div className="relative p-6 sm:p-8 md:p-10 before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl">
                <div className="relative z-10">
                {/* Header - Consistent with other components */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Resources & Tools
                    </h2>
                    <p className="text-lg text-gray-300 mb-4">
                        Essential resources to build your Web3 project
                    </p>
                    <div className="inline-flex items-center px-4 py-2 bg-white/15 rounded-full backdrop-blur-md border border-white/20">
                        <span className="text-white font-medium">
                            Development Resources • APIs • Documentation
                        </span>
                    </div>
                </div>

                {/* Resource Categories - Consistent styling with other sections */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                    {Object.entries(groupedResources).map(([category, categoryResources]) => (
                        <div key={category} className="bg-white/10 p-6 rounded-xl border border-white/20">
                            {/* Category Header */}
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
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
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                    {getCategoryName(category as Resource['category'])}
                                </h3>
                            </div>

                            {/* Resources List */}
                            <div className="space-y-3">
                                {categoryResources.map((resource) => (
                                    <a
                                        key={resource.id}
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block bg-white/10 p-4 rounded-lg border border-white/20"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-white font-medium">
                                                {resource.title}
                                            </h4>
                                            <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {resource.description}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Help Section - Consistent styling */}
                <div className="mt-8 p-6 bg-white/10 border border-white/20 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <svg
                            className="w-6 h-6 mr-2 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Need Help?
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-white/10 rounded-lg border border-white/20">
                            <div className="text-2xl mb-2">💬</div>
                            <p className="font-medium text-purple-400 mb-1">Discord</p>
                            <p className="text-xs text-gray-400">Real-time help</p>
                        </div>
                        <div className="text-center p-3 bg-white/10 rounded-lg border border-white/20">
                            <div className="text-2xl mb-2">👨‍🏫</div>
                            <p className="font-medium text-green-400 mb-1">Mentors</p>
                            <p className="text-xs text-gray-400">Expert guidance</p>
                        </div>
                        <div className="text-center p-3 bg-white/10 rounded-lg border border-white/20">
                            <div className="text-2xl mb-2">📧</div>
                            <p className="font-medium text-blue-400 mb-1">Support</p>
                            <p className="text-xs text-gray-400">Technical issues</p>
                        </div>
                        <div className="text-center p-3 bg-white/10 rounded-lg border border-white/20">
                            <div className="text-2xl mb-2">📖</div>
                            <p className="font-medium text-yellow-400 mb-1">Docs</p>
                            <p className="text-xs text-gray-400">Knowledge base</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
}
