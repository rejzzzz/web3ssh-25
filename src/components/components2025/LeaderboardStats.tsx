'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Award, TrendingUp, Target } from 'lucide-react';
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
      className="relative p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-white to-transparent rounded-full transform translate-x-8 -translate-y-8" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className={`p-3 rounded-xl bg-gradient-to-r ${color} shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>

          {trend && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2 }}
              className="flex items-center space-x-1 px-2 py-1 bg-emerald-400/20 rounded-full border border-emerald-400/30"
            >
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">
                +{trend}%
              </span>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.1 }}
          className="text-3xl font-bold text-white mb-2"
        >
          {value}
        </motion.div>

        <div className="text-gray-300 text-sm font-medium mb-1">{label}</div>
        <div className="text-gray-400 text-xs">{description}</div>
      </div>
    </div>
  </motion.div>
);

interface LeaderboardStatsProps {
  data: LeaderboardData | null;
}

export default function LeaderboardStats({ data }: LeaderboardStatsProps) {
  const statsData = [
    {
      icon: Users,
      value: data?.totalAmbassadors || 0,
      label: 'Total Ambassadors',
      description: 'Active community leaders',
      color: 'from-gray-600 to-gray-700',
      delay: 0.1,
      trend: 12,
    },
    {
      icon: Trophy,
      value: data?.totalParticipantsWithReferrals || 0,
      label: 'Successful Referrals',
      description: 'Participants recruited',
      color: 'from-emerald-500 to-teal-600',
      delay: 0.2,
      trend: 25,
    },
    {
      icon: Award,
      value: data?.totalParticipantsInSheet || 0,
      label: 'Total Participants',
      description: 'Event registrations',
      color: 'from-purple-600 to-indigo-700',
      delay: 0.3,
      trend: 18,
    },
    {
      icon: Target,
      value: data?.totalParticipantsWithoutReferrals || 0,
      label: 'Direct Signups',
      description: 'Without referral codes',
      color: 'from-blue-500 to-cyan-600',
      delay: 0.4,
      trend: 8,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </motion.div>
  );
}
