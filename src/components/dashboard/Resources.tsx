'use client';

import { Resource } from 'types/dashboard';

interface ResourcesProps {
    resources: Resource[];
}

export default function Resources({ resources }: ResourcesProps) {
    const getCategoryIcon = (category: Resource['category']) => {
        switch (category) {
            case 'documentation':
                return '📚';
            case 'starter-kit':
                return '🚀';
            case 'api':
                return '🔌';
            case 'sponsor':
                return '🏢';
            case 'contact':
                return '💬';
            default:
                return '🔗';
        }
    };

    const getCategoryColor = (category: Resource['category']) => {
        switch (category) {
            case 'documentation':
                return 'border-blue-500/30 bg-blue-500/10 text-blue-400';
            case 'starter-kit':
                return 'border-green-500/30 bg-green-500/10 text-green-400';
            case 'api':
                return 'border-purple-500/30 bg-purple-500/10 text-purple-400';
            case 'sponsor':
                return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400';
            case 'contact':
                return 'border-pink-500/30 bg-pink-500/10 text-pink-400';
            default:
                return 'border-gray-500/30 bg-gray-500/10 text-gray-400';
        }
    };

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
            <div className="relative p-6 sm:p-8 before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl">
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
                            <svg className="w-8 h-8 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Resources & Tools
                        </h2>
                        <p className="text-gray-300">
                            Everything you need to build your Web3 project
                        </p>
                    </div>

                    {/* Resource Categories */}
                    <div className="space-y-8">
                        {Object.entries(groupedResources).map(([category, categoryResources]) => (
                            <div key={category}>
                                {/* Category Header */}
                                <div className="flex items-center mb-4">
                                    <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(category as Resource['category'])}`}>
                                        <span className="mr-2">{getCategoryIcon(category as Resource['category'])}</span>
                                        {getCategoryName(category as Resource['category'])}
                                    </div>
                                    <div className="flex-1 h-px bg-gray-600 ml-4"></div>
                                </div>

                                {/* Resources Grid */}
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categoryResources.map((resource) => (
                                        <a
                                            key={resource.id}
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-200 group"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="text-white font-semibold group-hover:text-blue-300 transition-colors">
                                                    {resource.title}
                                                </h4>
                                                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-300 transition-colors flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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

                    {/* Additional Help */}
                    <div className="mt-8 p-6 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                        <h4 className="text-purple-400 font-semibold mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Need More Help?
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-4 text-sm text-purple-200">
                            <div>
                                <p className="font-medium mb-1">💬 Discord Community</p>
                                <p>Join our Discord for real-time help and networking</p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">👨‍🏫 Mentorship Sessions</p>
                                <p>Book 1-on-1 sessions with industry experts</p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">📧 Email Support</p>
                                <p>Reach out to support@web3ssh.dev for technical issues</p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">📖 Knowledge Base</p>
                                <p>Check our FAQ and documentation for common questions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
