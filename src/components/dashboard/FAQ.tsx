'use client';

import { useState } from 'react';
import { FAQ as FAQType } from 'types/dashboard';

interface FAQProps {
    faqs: FAQType[];
}

export default function FAQ({ faqs }: FAQProps) {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const toggleItem = (id: string) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(id)) {
            newOpenItems.delete(id);
        } else {
            newOpenItems.add(id);
        }
        setOpenItems(newOpenItems);
    };

    // Get unique categories
    const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

    // Filter FAQs by selected category
    const filteredFaqs = selectedCategory === 'all'
        ? faqs
        : faqs.filter(faq => faq.category === selectedCategory);

    const getCategoryDisplayName = (category: string) => {
        if (category === 'all') return 'All Questions';
        return category.charAt(0).toUpperCase() + category.slice(1);
    };

    return (
        <section className="bg-gradient-to-r from-purple-800/30 via-indigo-700/40 to-blue-600/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.4)] border border-white/30">
            <div className="relative p-6 sm:p-8 before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl">
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
                            <svg className="w-8 h-8 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-300">
                            Find answers to common questions about the hackathon
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                        ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                                        : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20'
                                    }`}
                            >
                                {getCategoryDisplayName(category)}
                            </button>
                        ))}
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-4">
                        {filteredFaqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white/10 rounded-lg border border-white/20 overflow-hidden hover:bg-white/15 transition-colors duration-200"
                            >
                                <button
                                    onClick={() => toggleItem(faq.id)}
                                    className="w-full p-4 text-left flex items-center justify-between"
                                >
                                    <h3 className="text-white font-medium pr-4">
                                        {faq.question}
                                    </h3>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                                            {getCategoryDisplayName(faq.category)}
                                        </span>
                                        <svg
                                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openItems.has(faq.id) ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ${openItems.has(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <div className="px-4 pb-4">
                                        <div className="border-t border-white/10 pt-4">
                                            <p className="text-gray-300 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-400">No questions found for this category.</p>
                        </div>
                    )}

                    {/* Contact for More Help */}
                    <div className="mt-8 p-6 bg-green-500/20 border border-green-500/30 rounded-lg">
                        <h4 className="text-green-400 font-semibold mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                            </svg>
                            Still Have Questions?
                        </h4>
                        <p className="text-green-200 text-sm mb-4">
                            Can't find what you're looking for? We're here to help!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="mailto:support@web3ssh.dev"
                                className="flex items-center justify-center px-4 py-2 bg-green-600/30 hover:bg-green-600/50 text-green-300 rounded-lg transition-colors duration-200 border border-green-500/30"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email Support
                            </a>
                            <a
                                href="https://discord.gg/web3ssh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 rounded-lg transition-colors duration-200 border border-purple-500/30"
                            >
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                                Join Discord
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
