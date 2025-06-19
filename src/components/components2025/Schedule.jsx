'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Code2,
  Lightbulb,
  Trophy,
  Coffee,
  MessageSquare,
  Presentation,
  CheckCircle,
  Star,
  BookOpen,
  User,
  Crown,
  Sparkles,
  Mic,
  Award,
  Zap
} from 'lucide-react';

// Session type mappings with icons and colors
const sessionTypes = {
  'Inauguration': { icon: Star, color: 'from-yellow-400 to-orange-500', bgColor: 'bg-yellow-500/20' },
  'Coding session': { icon: Code2, color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-500/20' },
  'Key note': { icon: Presentation, color: 'from-purple-400 to-pink-500', bgColor: 'bg-purple-500/20' },
  'Fire-side Chat': { icon: MessageSquare, color: 'from-orange-400 to-red-500', bgColor: 'bg-orange-500/20' },
  'Assignment': { icon: CheckCircle, color: 'from-green-400 to-emerald-500', bgColor: 'bg-green-500/20' },
  'Team Building': { icon: Users, color: 'from-indigo-400 to-purple-500', bgColor: 'bg-indigo-500/20' },
  'Feedback Session': { icon: MessageSquare, color: 'from-pink-400 to-rose-500', bgColor: 'bg-pink-500/20' },
  'Hackathon PS Discussion': { icon: Lightbulb, color: 'from-amber-400 to-yellow-500', bgColor: 'bg-amber-500/20' },
  'Hackathon Start': { icon: Trophy, color: 'from-emerald-400 to-teal-500', bgColor: 'bg-emerald-500/20' },
  'Hackathon': { icon: Trophy, color: 'from-red-400 to-pink-500', bgColor: 'bg-red-500/20' },
  'Check-in': { icon: Clock, color: 'from-gray-400 to-slate-500', bgColor: 'bg-gray-500/20' },
  'Hackathon Final Day & Evaluation': { icon: Trophy, color: 'from-violet-400 to-purple-500', bgColor: 'bg-violet-500/20' },
  'Closing Ceremony': { icon: Star, color: 'from-golden-400 to-yellow-500', bgColor: 'bg-yellow-500/20' },
};

const getSessionType = (title) => {
  const key = Object.keys(sessionTypes).find(type => title.includes(type));
  return sessionTypes[key] || { icon: Clock, color: 'from-gray-400 to-slate-500', bgColor: 'bg-gray-500/20' };
};

export const Schedule = () => {
  const [activeDate, setActiveDate] = useState('29 June 2025');

  const scheduleData = {
    '29 June 2025': [
      { time: '10:00-10:30', title: 'Inauguration', first: true },
      { time: '10:30-11:45', title: 'Coding session 1', topic: 'Solidity Session' },
      { time: '12:00-12:45', title: 'Key note 1', speaker: 'Ravikant Agarwal' },
      { time: '14:00-15:30', title: 'Coding session 2', topic: 'Solidity Session' },
      { time: '15:45-16:30', title: 'Team Building Activity 1', last: true },
    ],
    '30 June 2025': [
      { time: '09:30-09:45', title: 'Assignment 1', first: true },
      { time: '09:45-11:45', title: 'Coding session 3', topic: 'Solidity Session' },
      { time: '12:00-12:45', title: 'Fire-side Chat 1' },
      { time: '14:00-15:30', title: 'Coding session 4', topic: 'Foundry Session' },
      { time: '15:45-16:30', title: 'Key note 2', speaker: 'Yip Thy Diep Ta', last: true },
    ],
    '01 July 2025': [
      { time: '09:30-09:45', title: 'Assignment 2', first: true },
      { time: '09:45-11:45', title: 'Coding session 5', topic: 'Foundry Session' },
      { time: '12:00-12:45', title: 'Key note 3', speaker: 'Lauri Peltonen' },
      { time: '14:00-15:30', title: 'Coding session 6', topic: 'DeFI and NFT Session' },
      { time: '15:45-16:30', title: 'Team Building Activity 2', last: true },
    ],
    '02 July 2025': [
      { time: '09:30-09:45', title: 'Assignment 3', first: true },
      { time: '09:45-11:45', title: 'Coding session 7', topic: 'DeFI and NFT Session' },
      { time: '12:00-12:45', title: 'Key note 4', speaker: 'Kamlesh Nagware' },
      { time: '14:00-15:30', title: 'Coding session 8', topic: 'Web Integration Session' },
      { time: '15:45-16:30', title: 'Fire-side Chat 2', last: true },
    ],
    '03 July 2025': [
      { time: '09:30-09:45', title: 'Assignment 4', first: true },
      { time: '09:45-11:45', title: 'Coding session 9', topic: 'Web Integration Session' },
      { time: '12:00-12:45', title: 'Key note 5', speaker: 'Prasanna Lohar' },
      { time: '14:00-15:30', title: 'Coding session 10', topic: 'IPFS and Market places' },
      { time: '15:45-16:45', title: 'Feedback and testimonials' },
      { time: '17:00-18:00', title: 'Hackathon PS Discussion' },
      { time: '18:00-18:45', title: 'Key note 6', speaker: 'Sarah Benson' },
      { time: '19:00', title: 'Hackathon Start', last: true },
    ],
    '04 July 2025': [
      { time: '18:00', title: 'Hackathon Check-in', last: true },
    ],
    '05 July 2025': [
      { time: '18:00', title: 'Hackathon Ends', last: true },
    ],
    '06 July 2025': [
      {
        time: '09:30',
        title: 'Hackathon Final Day & Evaluation',
        first: true,
      },
      { time: '18:00', title: 'Closing Ceremony', last: true },
    ],
  };

  return (
    <section
      id="schedule"
      className="relative mx-auto px-4 sm:px-6 md:px-8 max-w-7xl py-12 sm:py-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Schedule
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto"
          >
            Journey through 8 days of intensive learning, coding, and innovation
          </motion.p>
        </motion.div>

        {/* Enhanced Day Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 p-4">
            {Object.keys(scheduleData).map((date, index) => {
              const isActive = activeDate === date;
              return (
                <motion.div
                  key={date}
                  onClick={() => setActiveDate(date)}
                  className="cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    {/* Active indicator glow */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl blur-xl opacity-60"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 0.6 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <div
                      className={`relative flex flex-col items-center p-3 sm:p-4 rounded-2xl border transition-all duration-300 ${isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 shadow-lg shadow-cyan-500/25'
                        : 'bg-white/5 border-white/20 group-hover:bg-white/10 group-hover:border-white/30'
                        }`}
                    >
                      {/* Day number */}
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-bold text-sm sm:text-base mb-2 ${isActive
                          ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-white'
                          : 'bg-white/10 text-gray-300 group-hover:bg-white/20'
                          }`}
                      >
                        {index + 1}
                      </div>

                      {/* Date text */}
                      <div className={`text-xs sm:text-sm font-medium text-center ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                        }`}>
                        <div className="font-semibold">
                          {date.split(' ')[0]} {date.split(' ')[1]}
                        </div>
                        <div className="text-xs opacity-75">
                          {date.split(' ')[2]}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Selected Date Display */}
        <motion.div
          key={activeDate}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-sm">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <span className="text-white text-lg sm:text-xl font-semibold">
              {activeDate}
            </span>
          </div>
        </motion.div>

        {/* Schedule Events */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            {scheduleData[activeDate].map((event, index) => {
              const sessionInfo = getSessionType(event.title);
              const Icon = sessionInfo.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative"
                >
                  {/* Connection line for timeline */}
                  {!event.last && (
                    <div className="absolute left-8 sm:left-10 top-16 sm:top-20 w-0.5 h-4 sm:h-6 bg-gradient-to-b from-cyan-400/50 to-purple-400/50"></div>
                  )}

                  <div
                    className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-cyan-500/10 bg-gradient-to-r from-gray-900/30 to-gray-800/30 backdrop-blur-sm border border-white/5"
                  >
                    {/* Background glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${sessionInfo.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}></div>

                    {/* Time Section */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Icon */}
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${sessionInfo.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>

                      {/* Time display */}
                      <div className="text-center sm:text-left">
                        <div className="text-white font-bold text-lg sm:text-xl">
                          {event.time}
                        </div>
                        <div className="text-gray-400 text-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span className="hidden sm:inline">{activeDate}</span>
                          <span className="sm:hidden">Today</span>
                        </div>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-xl sm:text-2xl group-hover:text-cyan-300 transition-colors duration-300">
                            {event.title}
                          </h3>
                          {/* Coding Session Topic */}
                          {event.topic && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2, duration: 0.4 }}
                              className="mt-2 flex items-center gap-2"
                            >
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 backdrop-blur-sm">
                                <BookOpen className="w-4 h-4 text-blue-400" />
                                <span className="text-blue-300 font-semibold text-sm">
                                  {event.topic}
                                </span>
                              </div>
                            </motion.div>
                          )}

                          {/* Keynote Speaker - Same size as topics */}
                          {event.speaker && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3, duration: 0.4 }}
                              className="mt-2 flex items-center gap-2"
                            >
                              <div className="relative">
                                {/* Star indicator - positioned outside */}
                                <div className="absolute -top-2 -left-2 z-10">
                                  <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                                    <Star className="w-2 h-2 text-white fill-current" />
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-amber-500/20 border border-purple-400/30 backdrop-blur-sm group/speaker hover:border-purple-400/40 transition-all duration-300">
                                  <User className="w-4 h-4 text-purple-400" />
                                  <span className="text-purple-300 font-semibold text-sm group-hover/speaker:text-purple-200 transition-colors duration-300">
                                    {event.speaker}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Session type badge */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${sessionInfo.bgColor} border border-white/20`}>
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${sessionInfo.color}`}></div>
                          <span className="text-white/90">
                            {Object.keys(sessionTypes).find(type => event.title.includes(type)) || 'Session'}
                          </span>
                        </div>
                      </div>

                      {/* Event description or details could go here */}
                      <div className="mt-2 flex items-center gap-4 text-gray-400 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>Online</span>
                        </div>
                        {event.title.includes('Hackathon') && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>Team Event</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Event Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600/10 to-cyan-600/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {scheduleData[activeDate].length} events scheduled for {activeDate}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
