'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LeaderboardHeader from './LeaderboardHeader';
import LeaderboardStats from './LeaderboardStats';
import LeaderboardControls from './LeaderboardControls';
import LeaderboardTable from './LeaderboardTable';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

export interface Ambassador {
  name: string;
  referralCode: string;
  college: string;
  participants: number;
}

export interface LeaderboardData {
  success: boolean;
  data: Ambassador[];
  lastUpdated: string;
  totalAmbassadors: number;
  totalParticipantsInSheet: number;
  totalParticipantsWithReferrals: number;
  totalParticipantsWithoutReferrals?: number;
  fetchTimeMs?: number;
}

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyWithParticipants, setShowOnlyWithParticipants] =
    useState(true); // Default to true
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('table');

  const fetchLeaderboard = async (isInitial = false, forceRefresh = false) => {
    try {
      if (!isInitial) setRefreshing(true);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      // Add force refresh parameter when explicitly requested
      const url = forceRefresh
        ? '/api/ambassadors/leaderboard?refresh=true'
        : '/api/ambassadors/leaderboard';

      const response = await fetch(url, {
        signal: controller.signal,
        cache: 'no-store',
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setLeaderboardData(data);
        setError(null);
        if (data.fetchTimeMs) {
          console.log(`API fetch completed in ${data.fetchTimeMs}ms`);
        }
      } else {
        setError(data.error || 'Failed to fetch leaderboard data');
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timed out. Please try again.');
        } else {
          setError(`Network error: ${err.message}`);
        }
      } else {
        setError('Network error occurred');
      }
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchLeaderboard(false, true); // Force refresh when user clicks refresh
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchLeaderboard(true);
  };

  // Filter and sort logic - Filter to show only active ambassadors by default
  const filteredData =
    leaderboardData?.data
      .filter((ambassador) => {
        // First filter: only show ambassadors with participants > 0 (active ambassadors)
        const isActive = ambassador.participants > 0;

        // Search filter
        const matchesSearch =
          ambassador.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ambassador.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ambassador.referralCode
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        // Additional filter toggle (in case user wants to see all active ambassadors or just some)
        const matchesFilter = showOnlyWithParticipants
          ? ambassador.participants > 0
          : isActive;

        return isActive && matchesSearch && matchesFilter;
      })
      ?.sort((a, b) => {
        return sortOrder === 'desc'
          ? b.participants - a.participants
          : a.participants - b.participants;
      }) || [];

  // Calculate active ambassadors count for footer
  const activeAmbassadorsCount =
    leaderboardData?.data.filter((ambassador) => ambassador.participants > 0)
      .length || 0;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchLeaderboard(true);
    }
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background matching your website's gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <LeaderboardHeader />

          <LeaderboardStats data={leaderboardData} />

          <LeaderboardControls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showOnlyWithParticipants={showOnlyWithParticipants}
            setShowOnlyWithParticipants={setShowOnlyWithParticipants}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            viewMode={viewMode}
            setViewMode={setViewMode}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />

          <LeaderboardTable
            data={filteredData}
            viewMode={viewMode}
            searchTerm={searchTerm}
            showOnlyWithParticipants={showOnlyWithParticipants}
          />

          {/* Footer matching your theme */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
              }}
              className="p-6 shadow-lg inline-block"
            >
              <div className="flex items-center justify-center space-x-6 text-gray-300 text-sm flex-wrap gap-4">
                <span>
                  <strong className="text-white">{filteredData.length}</strong>{' '}
                  active ambassadors shown
                </span>
                <span>
                  <strong className="text-white">
                    {activeAmbassadorsCount}
                  </strong>{' '}
                  total active ambassadors
                </span>
                <span>
                  <strong className="text-white">
                    {leaderboardData?.totalParticipantsWithReferrals || 0}
                  </strong>{' '}
                  total referrals
                </span>
                {leaderboardData?.fetchTimeMs && (
                  <span>
                    Fetched in{' '}
                    <strong className="text-white">
                      {leaderboardData.fetchTimeMs}ms
                    </strong>
                  </span>
                )}
              </div>
              {leaderboardData?.lastUpdated && (
                <div className="mt-2 text-xs text-gray-400">
                  Last updated:{' '}
                  {new Date(leaderboardData.lastUpdated).toLocaleString()}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
