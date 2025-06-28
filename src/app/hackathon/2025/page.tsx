'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  Award,
  MessageCircle,
  HelpCircle,
  Star,
  ExternalLink,
  Code,
  Zap,
  Crown,
  Medal,
  Target,
  Lightbulb,
  BookOpen,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import Navbar2025 from '@components/components2025/Navbar2025';
import Footer2025 from '@components/components2025/Footer2025';

// Import data
import faqData from '@data/2025/faq2025.json';

export default function Hackathon2025Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Event Overview', icon: BookOpen },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'rules', label: 'Rules & Guidelines', icon: Target },
    { id: 'prizes', label: 'Prizes & Awards', icon: Trophy },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  const scheduleData = {
    '29 June 2025': [
      { time: '10:00-10:30', title: 'Inauguration', type: 'ceremony' },
      {
        time: '10:30-11:45',
        title: 'Coding session 1',
        topic: 'Solidity Session',
        type: 'workshop',
      },
      {
        time: '12:00-12:45',
        title: 'Key note 1',
        speaker: 'Ravikant Agarwal',
        type: 'keynote',
      },
      {
        time: '14:00-15:30',
        title: 'Coding session 2',
        topic: 'Solidity Session',
        type: 'workshop',
      },
      {
        time: '15:45-16:30',
        title: 'Team Building Activity 1',
        type: 'activity',
      },
    ],
    '30 June 2025': [
      { time: '09:30-09:45', title: 'Assignment 1', type: 'assignment' },
      {
        time: '09:45-11:45',
        title: 'Coding session 3',
        topic: 'Solidity Session',
        type: 'workshop',
      },
      {
        time: '12:00-12:45',
        title: 'Key note 2',
        speaker: 'Yip Thy Diep Ta',
        type: 'keynote',
      },
      {
        time: '14:00-15:30',
        title: 'Coding session 4',
        topic: 'Advanced Solidity',
        type: 'workshop',
      },
      { time: '15:45-16:30', title: 'Fire-side Chat 1', type: 'chat' },
    ],
    '01 July 2025': [
      { time: '09:30-09:45', title: 'Assignment 2', type: 'assignment' },
      {
        time: '09:45-11:45',
        title: 'Coding session 5',
        topic: 'DeFi Session',
        type: 'workshop',
      },
      {
        time: '12:00-12:45',
        title: 'Key note 3',
        speaker: 'Prasanna Lohar',
        type: 'keynote',
      },
      {
        time: '14:00-15:30',
        title: 'Coding session 6',
        topic: 'DeFi Session',
        type: 'workshop',
      },
      {
        time: '15:45-16:30',
        title: 'Team Building Activity 2',
        type: 'activity',
      },
    ],
    '02 July 2025': [
      { time: '09:30-09:45', title: 'Assignment 3', type: 'assignment' },
      {
        time: '09:45-11:45',
        title: 'Coding session 7',
        topic: 'NFT Session',
        type: 'workshop',
      },
      {
        time: '12:00-12:45',
        title: 'Key note 4',
        speaker: 'TBA',
        type: 'keynote',
      },
      {
        time: '14:00-15:30',
        title: 'Coding session 8',
        topic: 'NFT Session',
        type: 'workshop',
      },
      { time: '15:45-16:30', title: 'Fire-side Chat 2', type: 'chat' },
    ],
    '03 July 2025': [
      {
        time: '09:45-11:45',
        title: 'Coding session 9',
        topic: 'Web Integration Session',
        type: 'workshop',
      },
      {
        time: '12:00-12:45',
        title: 'Key note 5',
        speaker: 'Prasanna Lohar',
        type: 'keynote',
      },
      {
        time: '14:00-15:30',
        title: 'Coding session 10',
        topic: 'IPFS and Market places',
        type: 'workshop',
      },
      {
        time: '15:45-16:45',
        title: 'Feedback and testimonials',
        type: 'feedback',
      },
      {
        time: '17:00-18:00',
        title: 'Hackathon PS Discussion',
        type: 'discussion',
      },
      {
        time: '18:00-18:45',
        title: 'Key note 6',
        speaker: 'Sarah Benson',
        type: 'keynote',
      },
      { time: '19:00', title: 'Hackathon Start', type: 'hackathon' },
    ],
    '04 July 2025': [
      { time: '18:00', title: 'Hackathon Check-in', type: 'checkin' },
    ],
    '05 July 2025': [
      { time: '18:00', title: 'Hackathon Ends', type: 'hackathon' },
    ],
    '06 July 2025': [
      {
        time: '09:30',
        title: 'Hackathon Final Day & Evaluation',
        type: 'evaluation',
      },
      { time: '18:00', title: 'Closing Ceremony', type: 'ceremony' },
    ],
  };

  const rulesData = [
    {
      category: 'Team Formation',
      rules: [
        'Teams must consist of 1-4 members',
        'Team formation can happen before or during the event',
        'Solo participation is allowed and encouraged',
        'Cross-institutional teams are welcome',
      ],
    },
    {
      category: 'Project Guidelines',
      rules: [
        'Projects must be built during the hackathon timeframe',
        'Use of existing codebases/libraries is allowed but must be declared',
        'Projects must incorporate Web3/blockchain technologies',
        'All code must be open source and published on GitHub',
      ],
    },
    {
      category: 'Submission Requirements',
      rules: [
        'Submit through the official dashboard before deadline',
        'Include working demo (video or live link)',
        'Provide comprehensive documentation',
        'Source code must be accessible via GitHub repository',
      ],
    },
    {
      category: 'Code of Conduct',
      rules: [
        'Maintain respectful and inclusive behavior',
        'No plagiarism or intellectual property violations',
        'Follow all platform terms of service',
        'Report any issues to event organizers immediately',
      ],
    },
  ];

  const prizesData = [
    {
      position: '1st Place',
      amount: '$500',
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-500/20',
      description: 'Champion Team + Goodies + Certificates',
    },
    {
      position: '2nd Place',
      amount: '$300',
      icon: Medal,
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-500/20',
      description: 'Runner-up Team + Goodies + Certificates',
    },
    {
      position: '3rd Place',
      amount: '$200',
      icon: Award,
      color: 'from-amber-500 to-amber-700',
      bgColor: 'bg-amber-500/20',
      description: 'Third Place Team + Goodies + Certificates',
    },
    {
      position: 'Special Mentions',
      amount: 'Goodies',
      icon: Star,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-500/20',
      description: 'Innovation, Design, and Tech Excellence Awards',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ceremony':
        return Star;
      case 'workshop':
        return Code;
      case 'keynote':
        return Users;
      case 'activity':
        return Heart;
      case 'assignment':
        return BookOpen;
      case 'chat':
        return MessageCircle;
      case 'hackathon':
        return Trophy;
      case 'checkin':
        return Clock;
      case 'evaluation':
        return Target;
      case 'discussion':
        return Lightbulb;
      case 'feedback':
        return MessageCircle;
      default:
        return Clock;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ceremony':
        return 'from-yellow-400 to-golden-500';
      case 'workshop':
        return 'from-blue-400 to-indigo-500';
      case 'keynote':
        return 'from-purple-400 to-violet-500';
      case 'activity':
        return 'from-pink-400 to-rose-500';
      case 'assignment':
        return 'from-green-400 to-emerald-500';
      case 'chat':
        return 'from-orange-400 to-red-500';
      case 'hackathon':
        return 'from-red-400 to-pink-500';
      case 'checkin':
        return 'from-gray-400 to-slate-500';
      case 'evaluation':
        return 'from-violet-400 to-purple-500';
      case 'discussion':
        return 'from-amber-400 to-yellow-500';
      case 'feedback':
        return 'from-cyan-400 to-blue-500';
      default:
        return 'from-gray-400 to-slate-500';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400">
                Web3SSH 2025
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-6">
                Summer School & Hackathon
              </p>
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                }}
                className="p-6 max-w-4xl mx-auto border border-white/20"
              >
                <p className="text-lg text-gray-200 leading-relaxed">
                  Join us for an incredible week-long journey into the world of
                  Web3 and blockchain technology. Learn from industry experts,
                  build amazing projects, and compete for exciting prizes!
                </p>
              </div>
            </motion.div>

            {/* Key Information */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                }}
                className="p-6 border border-white/20"
              >
                <Calendar className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Duration</h3>
                <p className="text-gray-300">
                  Summer School: 29 June - 3 July 2025
                  <br />
                  Hackathon: 3 July - 6 July 2025
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                }}
                className="p-6 border border-white/20"
              >
                <Clock className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Format</h3>
                <p className="text-gray-300">
                  Online Event
                  <br />
                  Global Participation
                  <br />
                  24/7 Support Available
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                }}
                className="p-6 border border-white/20"
              >
                <Trophy className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Prizes</h3>
                <p className="text-gray-300">
                  $1000+ Prize Pool
                  <br />
                  Certificates for All
                  <br />
                  Special Recognition Awards
                </p>
              </motion.div>
            </div>

            {/* Objectives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
              }}
              className="p-8 border border-white/20"
            >
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Target className="w-8 h-8 text-cyan-400" />
                Learning Objectives
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                    <p className="text-gray-300">
                      Master Solidity programming and smart contract development
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <p className="text-gray-300">
                      Explore DeFi protocols and decentralized applications
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                    <p className="text-gray-300">
                      Build and deploy NFT marketplaces
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <p className="text-gray-300">
                      Integrate IPFS for decentralized storage
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                    <p className="text-gray-300">
                      Network with industry professionals and peers
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <p className="text-gray-300">
                      Create real-world blockchain solutions
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Event Schedule
              </h2>
              <p className="text-xl text-gray-300">
                Complete timeline for Web3SSH 2025
              </p>
            </motion.div>

            {Object.entries(scheduleData).map(([date, events], dateIndex) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: dateIndex * 0.1 }}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                }}
                className="p-6 border border-white/20"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-cyan-400" />
                  {date}
                </h3>
                <div className="space-y-4">
                  {events.map((event, eventIndex) => {
                    const TypeIcon = getTypeIcon(event.type);
                    const typeColor = getTypeColor(event.type);

                    return (
                      <motion.div
                        key={eventIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: dateIndex * 0.1 + eventIndex * 0.05,
                        }}
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          backdropFilter: 'blur(5px)',
                          borderRadius: '12px',
                        }}
                        className="flex items-center gap-4 p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                      >
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-r ${typeColor} shadow-lg`}
                        >
                          <TypeIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <h4 className="text-lg font-semibold text-white">
                                {event.title}
                              </h4>
                              {(event as any).topic && (
                                <p className="text-cyan-400 text-sm">
                                  {(event as any).topic}
                                </p>
                              )}
                              {(event as any).speaker && (
                                <p className="text-purple-400 text-sm">
                                  Speaker: {(event as any).speaker}
                                </p>
                              )}
                            </div>
                            <div className="text-sm text-gray-300 font-medium bg-white/10 px-3 py-1 rounded-full">
                              {event.time}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'rules':
        return (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Rules & Guidelines
              </h2>
              <p className="text-xl text-gray-300">
                Important information for all participants
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {rulesData.map((section, index) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                  }}
                  className="p-6 border border-white/20"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <Target className="w-6 h-6 text-cyan-400" />
                    {section.category}
                  </h3>
                  <ul className="space-y-3">
                    {section.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300">{rule}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
              }}
              className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 p-6 border border-yellow-500/30"
            >
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Important Notice
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    By participating in Web3SSH 2025, you agree to abide by all
                    rules and guidelines. Violation of any rules may result in
                    disqualification from the event. If you have any questions,
                    please contact our support team immediately.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 'prizes':
        return (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Prizes & Awards
              </h2>
              <p className="text-xl text-gray-300">
                Compete for amazing prizes and recognition
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {prizesData.map((prize, index) => {
                const IconComponent = prize.icon;
                return (
                  <motion.div
                    key={prize.position}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '20px',
                    }}
                    className={`${prize.bgColor} p-6 border border-white/20 text-center hover:scale-105 transition-all duration-300 group`}
                  >
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${prize.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {prize.position}
                    </h3>
                    <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-3">
                      {prize.amount}
                    </p>
                    <p className="text-gray-300 text-sm">{prize.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Judging Criteria */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
              }}
              className="p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-400" />
                Judging Criteria
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Innovation
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Creativity and uniqueness of the solution
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Technical Excellence
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Code quality and technical implementation
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Impact
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Real-world applicability and potential
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Presentation
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Demo quality and communication
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-300">
                Find answers to common questions
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                  }}
                  className="p-6 border border-white/20"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 leading-relaxed pl-8">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
              }}
              className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 p-6 border border-purple-500/30 text-center"
            >
              <MessageCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-300 mb-4">
                Our support team is here to help! Reach out to us through any of
                our communication channels.
              </p>
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div className="text-white">
      <Navbar2025 />

      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Hackathon Dashboard 2025
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your complete guide to Web3SSH 2025
          </p>

          {/* Submit Project Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Link href="/dashboard">
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 group transform hover:-translate-y-1 transition duration-400">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-lg font-semibold text-white backdrop-blur-3xl hover:bg-slate-900 transition-colors">
                  <Trophy className="w-5 h-5 mr-2" />
                  Submit Your Project
                  <ExternalLink className="w-4 h-4 ml-2" />
                </span>
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
          }}
          className="p-2 mb-8 border border-white/20"
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-sm md:text-base ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer2025 />
    </div>
  );
}
