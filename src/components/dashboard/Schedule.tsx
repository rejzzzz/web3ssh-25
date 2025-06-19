'use client';

import { ScheduleEvent } from 'types/dashboard';
import { formatDate } from 'lib/dashboard-utils';

interface ScheduleProps {
    events: ScheduleEvent[];
}

export default function Schedule({ events }: ScheduleProps) {
    const getEventIcon = (type: ScheduleEvent['type']) => {
        switch (type) {
            case 'ceremony':
                return '🎉';
            case 'workshop':
                return '🛠️';
            case 'mentorship':
                return '👨‍🏫';
            case 'deadline':
                return '⏰';
            case 'judging':
                return '⚖️';
            default:
                return '📅';
        }
    };

    const getEventColor = (type: ScheduleEvent['type']) => {
        switch (type) {
            case 'ceremony':
                return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400';
            case 'workshop':
                return 'border-blue-500/30 bg-blue-500/10 text-blue-400';
            case 'mentorship':
                return 'border-green-500/30 bg-green-500/10 text-green-400';
            case 'deadline':
                return 'border-red-500/30 bg-red-500/10 text-red-400';
            case 'judging':
                return 'border-purple-500/30 bg-purple-500/10 text-purple-400';
            default:
                return 'border-gray-500/30 bg-gray-500/10 text-gray-400';
        }
    };

    return (
        <section className="bg-gradient-to-r from-purple-800/30 via-indigo-700/40 to-blue-600/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.4)] border border-white/30">
            <div className="relative p-6 sm:p-8 before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl">
                <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Hackathon Schedule
                        </h2>
                        <p className="text-gray-300">
                            Key events and milestones during the 48-hour challenge
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-green-400"></div>

                        {/* Events */}
                        <div className="space-y-6">
                            {events.map((event, index) => (
                                <div key={event.id} className="relative flex items-start">
                                    {/* Timeline Dot */}
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg z-10 ${getEventColor(event.type)}`}>
                                        {getEventIcon(event.type)}
                                    </div>

                                    {/* Event Content */}
                                    <div className="ml-6 flex-1">
                                        <div className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/15 transition-colors duration-200">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                                <h3 className="text-lg font-semibold text-white">
                                                    {event.title}
                                                </h3>
                                                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEventColor(event.type)}`}>
                                                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                                </div>
                                            </div>

                                            <p className="text-gray-300 mb-3">
                                                {event.description}
                                            </p>

                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-400">
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {formatDate(event.startTime)}
                                                </div>
                                                {event.startTime.getTime() !== event.endTime.getTime() && (
                                                    <div className="flex items-center">
                                                        <span className="mx-2">→</span>
                                                        {formatDate(event.endTime)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timezone Notice */}
                    <div className="mt-8 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-blue-400 text-sm">
                                All times are displayed in your local timezone. Make sure to convert accordingly if you're in a different timezone.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
