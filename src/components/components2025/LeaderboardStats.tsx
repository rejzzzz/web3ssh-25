'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, TrendingUp } from 'lucide-react';
import { LeaderboardData } from './LeaderboardPage';

interface StatsCardProps {
  icon: React.ComponentType<any>;
  value: string | number;
  label: string;
  description: string;
  color: string;
  delay: number;
  trend?: number;
}

const StatsCard = ({
  icon: Icon,
  value,
  label,
  description,
  color,
  delay,
  trend,
}: StatsCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, type: 'spring', stiffness: 100 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group relative cursor-pointer"
  >
    <div
      className={`absolute inset-0 bg-gradient-to-r ${color} rounded-2xl opacity-10 group-hover:opacity-20 transition-all duration-300 blur-xl`}
    />

    <div
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
      }}
      className="relative p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-white to-transparent rounded-full transform translate-x-8 -translate-y-8" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className={`p-4 rounded-xl bg-gradient-to-r ${color} shadow-lg`}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          {trend && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2 }}
              className="flex items-center space-x-1 px-3 py-2 bg-emerald-400/20 rounded-full border border-emerald-400/30"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">
                +{trend}%
              </span>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-3"
        >
          {value}
        </motion.div>

        <div className="text-gray-300 text-lg font-medium mb-2">{label}</div>
        <div className="text-gray-400 text-sm">{description}</div>
      </div>
    </div>
  </motion.div>
);

interface LeaderboardStatsProps {
  data: LeaderboardData | null;
}

export default function LeaderboardStats({ data }: LeaderboardStatsProps) {
  // Calculate active ambassadors (those with participants > 0) - with fallback to 0
  const activeAmbassadors = data?.data.filter(
    (ambassador) => ambassador.participants > 0,
  ).length;

  const statsData = [
    {
      icon: Users,
      value: activeAmbassadors || 0,
      label: 'Active Ambassadors',
      description: 'Ambassadors with successful referrals',
      color: 'from-purple-600 to-indigo-700',
      delay: 0.1,
      trend: 25,
    },
    {
      icon: Trophy,
      value: data?.totalParticipantsWithReferrals || 0,
      label: 'Referred Participants',
      description: 'Total participants recruited by ambassadors',
      color: 'from-emerald-500 to-teal-600',
      delay: 0.2,
      trend: 32,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto"
    >
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </motion.div>
  );
}
