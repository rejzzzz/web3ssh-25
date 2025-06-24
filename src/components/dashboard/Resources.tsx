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
        <section className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8">
                {/* Header - Consistent with other components */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
                        Resources & Tools
                    </h2>
                    <p className="text-lg text-gray-300 mb-4">
                        Essential resources to build your Web3 project
                    </p>
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full backdrop-blur-md border border-white/30">
                        <span className="text-white font-medium">
                            Development Resources • APIs • Documentation
                        </span>
                    </div>
                </div>

                {/* Resource Categories - Consistent styling with other sections */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                    {Object.entries(groupedResources).map(([category, categoryResources]) => (
                        <div key={category} className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                            {/* Category Header */}
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                                    <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                                        {getCategoryIcon(category as Resource['category'])}
                                    </span>
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
                                        className="block bg-white/5 p-4 rounded-lg border border-white/10 group"
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
                <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                            💡
                        </span>
                        Need Help?
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="text-2xl mb-2">💬</div>
                            <p className="font-medium text-purple-400 mb-1">Discord</p>
                            <p className="text-xs text-gray-400">Real-time help</p>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="text-2xl mb-2">👨‍🏫</div>
                            <p className="font-medium text-green-400 mb-1">Mentors</p>
                            <p className="text-xs text-gray-400">Expert guidance</p>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="text-2xl mb-2">📧</div>
                            <p className="font-medium text-blue-400 mb-1">Support</p>
                            <p className="text-xs text-gray-400">Technical issues</p>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="text-2xl mb-2">📖</div>
                            <p className="font-medium text-yellow-400 mb-1">Docs</p>
                            <p className="text-xs text-gray-400">Knowledge base</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
