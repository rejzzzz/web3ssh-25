'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
    Users,
    Code,
    Settings,
    TrendingUp,
    Search,
    Palette,
    X,
    GraduationCap
} from 'lucide-react';

// Import team data
import facultyData from '../../data/2025/team/faculty_organizer.json';
import organizersData from '../../data/2025/team/event_organizer.json';
import techTeamData from '../../data/2025/team/tech_team.json';
import managementTeamData from '../../data/2025/team/management_team.json';
import marketingTeamData from '../../data/2025/team/marketing_team.json';
import researchTeamData from '../../data/2025/team/research_team.json';
import designTeamData from '../../data/2025/team/design_team.json';

interface TeamMember {
    name: string;
    ug?: string;
    team?: string;
    role?: string;
    image: string;
}

interface TeamSection {
    title: string;
    icon: React.ComponentType<any>;
    data: TeamMember[];
    color: string;
    description: string;
}

const TeamMemberCard = ({ member, color, delay }: { member: TeamMember; color: string; delay: number }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    // Track animation state
    React.useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [isInView, hasAnimated]);

    // Clean image path
    const imagePath = member.image.replace('../../../../public', '');

    return (
        <>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: hasAnimated ? delay : 0 }}
                whileHover={{ y: -5 }}
                onClick={() => setIsModalOpen(true)}
                className="relative group cursor-pointer"
            >
                {/* Background Glow */}
                <div
                    className={`absolute inset-0 bg-gradient-to-r ${color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity blur-xl duration-300`}
                />

                <div
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                    }}
                    className="relative p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden h-full flex flex-col"
                >
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                        <div className="w-full h-full bg-gradient-to-br from-white to-transparent rounded-full transform translate-x-8 -translate-y-8" />
                    </div>

                    {/* Profile Image */}
                    <div className="relative z-10 mb-4">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-full opacity-20 blur-md`} />
                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20">
                                <img
                                    src={imagePath}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top"
                                    style={{ objectPosition: 'center top' }}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/team/default.jpg';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Member Info */}
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                {member.name}
                            </h3>

                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${color} text-white border border-current/20 mb-2`}>
                                {member.team || member.role}
                            </div>

                            <p className="text-gray-300 text-sm font-mono">
                                {member.ug || 'Faculty'}
                            </p>
                        </div>
                    </div>

                    {/* Hover Effect */}
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                    />
                </div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '20px',
                            }}
                            className="relative max-w-md w-full p-6 shadow-2xl border border-white/20"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Modal Content */}
                            <div className="text-center">
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-full opacity-30 blur-lg`} />
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/30">
                                        <img
                                            src={imagePath}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-top"
                                            style={{ objectPosition: 'center top' }}
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = '/team/default.jpg';
                                            }}
                                        />
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-2">{member.name}</h2>
                                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${color} text-white mb-4`}>
                                    {member.team || member.role}
                                </div>
                                <p className="text-gray-300 font-mono mb-6">{member.ug || 'Faculty'}</p>

                                <div className="text-gray-400 text-sm">
                                    Passionate contributor to Web3SSH 2025
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const TeamSection = ({ section }: { section: TeamSection }) => {
    const Icon = section.icon;
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-150px" });

    // Track animation state
    React.useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true);
        }
    }, [isInView, hasAnimated]);

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0 }}
            animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-20"
        >
            {/* Section Header */}
            <div className="text-center mb-12">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={hasAnimated ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: hasAnimated ? 0.2 : 0, type: 'spring', stiffness: 200, damping: 20 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${section.color} shadow-lg mb-6`}
                >
                    <Icon className="w-8 h-8 text-white" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: hasAnimated ? 0.3 : 0, duration: 0.6 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
                >
                    {section.title}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                    transition={{ delay: hasAnimated ? 0.4 : 0, duration: 0.6 }}
                    className="text-gray-300 text-lg max-w-2xl mx-auto"
                >
                    {section.description}
                </motion.p>
            </div>

            {/* Team Members Layout */}
            {section.data.length === 2 ? (
                // Special layout for 2-member teams (Event Organizers, Design Team) - Left and Right positioning
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 max-w-4xl mx-auto">
                    <div className="w-full max-w-sm">
                        <TeamMemberCard
                            key={`${section.data[0].name}-0`}
                            member={section.data[0]}
                            color={section.color}
                            delay={hasAnimated ? 0 : 0}
                        />
                    </div>
                    <div className="w-full max-w-sm">
                        <TeamMemberCard
                            key={`${section.data[1].name}-1`}
                            member={section.data[1]}
                            color={section.color}
                            delay={hasAnimated ? 0.1 : 0}
                        />
                    </div>
                </div>
            ) : section.data.length === 3 ? (
                // Special layout for 3-member teams (Faculty Coordinators) - Centered layout
                <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {section.data.map((member, memberIndex) => (
                        <div key={`${member.name}-${memberIndex}`} className="w-full max-w-sm">
                            <TeamMemberCard
                                member={member}
                                color={section.color}
                                delay={hasAnimated ? memberIndex * 0.1 : 0}
                            />
                        </div>
                    ))}
                </div>
            ) : section.data.length === 5 ? (
                // Special layout for 5-member teams (Tech Team)
                <div className="max-w-6xl mx-auto">
                    {/* First row - 4 members */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {section.data.slice(0, 4).map((member, memberIndex) => (
                            <TeamMemberCard
                                key={`${member.name}-${memberIndex}`}
                                member={member}
                                color={section.color}
                                delay={hasAnimated ? memberIndex * 0.1 : 0}
                            />
                        ))}
                    </div>
                    {/* Second row - 1 member perfectly centered */}
                    <div className="flex justify-center">
                        <div style={{ width: 'calc((100% - 1.5rem * 3) / 4)' }} className="lg:block hidden">
                            <TeamMemberCard
                                key={`${section.data[4].name}-4`}
                                member={section.data[4]}
                                color={section.color}
                                delay={hasAnimated ? 0.4 : 0}
                            />
                        </div>
                        {/* Mobile and tablet view - full width centered */}
                        <div className="w-full max-w-sm lg:hidden">
                            <TeamMemberCard
                                key={`${section.data[4].name}-4-mobile`}
                                member={section.data[4]}
                                color={section.color}
                                delay={hasAnimated ? 0.4 : 0}
                            />
                        </div>
                    </div>
                </div>
            ) : section.data.length === 9 ? (
                // Special layout for 9-member teams (Marketing Team)
                <div className="max-w-6xl mx-auto">
                    {/* First row - 4 members */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {section.data.slice(0, 4).map((member, memberIndex) => (
                            <TeamMemberCard
                                key={`${member.name}-${memberIndex}`}
                                member={member}
                                color={section.color}
                                delay={hasAnimated ? memberIndex * 0.1 : 0}
                            />
                        ))}
                    </div>
                    {/* Second row - 4 members */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {section.data.slice(4, 8).map((member, memberIndex) => (
                            <TeamMemberCard
                                key={`${member.name}-${memberIndex + 4}`}
                                member={member}
                                color={section.color}
                                delay={hasAnimated ? (memberIndex + 4) * 0.1 : 0}
                            />
                        ))}
                    </div>
                    {/* Third row - 1 member perfectly centered */}
                    <div className="flex justify-center">
                        <div style={{ width: 'calc((100% - 1.5rem * 3) / 4)' }} className="lg:block hidden">
                            <TeamMemberCard
                                key={`${section.data[8].name}-8`}
                                member={section.data[8]}
                                color={section.color}
                                delay={hasAnimated ? 0.8 : 0}
                            />
                        </div>
                        {/* Mobile and tablet view - full width centered */}
                        <div className="w-full max-w-sm lg:hidden">
                            <TeamMemberCard
                                key={`${section.data[8].name}-8-mobile`}
                                member={section.data[8]}
                                color={section.color}
                                delay={hasAnimated ? 0.8 : 0}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                // Regular grid layout for teams with other member counts
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {section.data.map((member, memberIndex) => (
                        <TeamMemberCard
                            key={`${member.name}-${memberIndex}`}
                            member={member}
                            color={section.color}
                            delay={hasAnimated ? memberIndex * 0.1 : 0}
                        />
                    ))}
                </div>
            )}
        </motion.section>
    );
};

export default function TeamPage() {
    const teamSections: TeamSection[] = [
        {
            title: "Faculty Coordinators",
            icon: GraduationCap,
            data: facultyData,
            color: "from-yellow-600 to-orange-700",
            description: "Distinguished faculty members providing academic guidance and leadership for Web3SSH 2025."
        },
        {
            title: "Student Coordinators",
            icon: Users,
            data: organizersData,
            color: "from-purple-600 to-indigo-700",
            description: "The visionary student leaders orchestrating Web3SSH 2025, bringing together innovation and education."
        },
        {
            title: "Tech Team",
            icon: Code,
            data: techTeamData,
            color: "from-emerald-500 to-teal-600",
            description: "Technical architects building the digital infrastructure and innovative solutions for our event."
        },
        {
            title: "Management Team",
            icon: Settings,
            data: managementTeamData,
            color: "from-orange-500 to-red-600",
            description: "Strategic coordinators ensuring seamless execution and exceptional event experience."
        },
        {
            title: "Marketing Team",
            icon: TrendingUp,
            data: marketingTeamData,
            color: "from-pink-500 to-rose-600",
            description: "Creative storytellers amplifying our message and building community connections."
        },
        {
            title: "Research Team",
            icon: Search,
            data: researchTeamData,
            color: "from-cyan-500 to-blue-600",
            description: "Knowledge explorers driving cutting-edge research and educational content development."
        },
        {
            title: "Design Team",
            icon: Palette,
            data: designTeamData,
            color: "from-violet-500 to-purple-600",
            description: "Visual innovators crafting beautiful experiences and memorable brand interactions."
        }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-cyan-200"
                        >
                            Our Amazing Team
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-gray-300 text-xl sm:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed"
                        >
                            Meet the passionate individuals behind Web3SSH 2025 - a diverse group of innovators,
                            creators, and visionaries working together to bring you an extraordinary Web3 experience.
                        </motion.p>


                    </motion.div>

                    {/* Team Sections */}
                    {teamSections.map((section) => (
                        <TeamSection key={section.title} section={section} />
                    ))}

                    {/* Call to Action */}

                </div>
            </div>
        </div>
    );
}
