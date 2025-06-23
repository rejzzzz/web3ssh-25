'use client';

import { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from 'components/auth/ProtectedRoute';
import { motion } from 'framer-motion';
import { LogOut, User, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import SubmissionForm from 'components/dashboard/SubmissionForm';

interface SubmissionWindow {
  isOpen: boolean;
  startTime: Date | null;
  endTime: Date | null;
  timeRemaining: number;
}

export default function ProjectSubmissionPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [submissionWindow, setSubmissionWindow] = useState<SubmissionWindow>({
    isOpen: false,
    startTime: null,
    endTime: null,
    timeRemaining: 0,
  });
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [submissionId, setSubmissionId] = useState<string>('');

  // Fetch hackathon status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/hackathon-status');
        const data = await response.json();

        setSubmissionWindow({
          isOpen: data.isOpen,
          startTime: data.startTime ? new Date(data.startTime) : null,
          endTime: data.endTime ? new Date(data.endTime) : null,
          timeRemaining: data.timeRemaining?.total || 0,
        });
      } catch (error) {
        console.error('Failed to fetch hackathon status:', error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const handleSubmissionSuccess = (id: string) => {
    setSubmissionStatus('success');
    setSubmissionId(id);
  };

  const handleSubmissionError = () => {
    setSubmissionStatus('error');
  };

  const handleLogout = () => {
    logout();
    router.push('/dashboard');
  };

  if (!user) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">
                      Welcome, {user.name}
                    </h1>
                    <p className="text-sm text-gray-300">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Submission Status */}
                  <div className="flex items-center space-x-2">
                    {submissionWindow.isOpen ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-sm text-green-400">
                          Submissions Open
                        </span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm text-yellow-400">
                          Submissions Closed
                        </span>
                      </>
                    )}
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            {submissionStatus === 'success' ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-gradient-to-r from-green-800/30 via-emerald-700/40 to-green-600/30 rounded-2xl p-8 border border-green-500/30">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Project Submitted Successfully! 🎉
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Your project has been submitted and assigned ID: <br />
                    <span className="font-mono text-blue-400 text-lg">
                      {submissionId}
                    </span>
                  </p>
                  <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                    <p className="text-sm text-gray-300">
                      You can now relax! Your submission is complete and our
                      judges will review it. Good luck in the hackathon! 🚀
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Submission Form */
              <div className="max-w-4xl mx-auto">
                {!submissionWindow.isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg flex items-center"
                  >
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                    <p className="text-yellow-400 text-sm">
                      Submission window is currently closed. Please check back
                      during the submission period.
                    </p>
                  </motion.div>
                )}

                <SubmissionForm
                  participantInfo={user}
                  submissionWindow={submissionWindow}
                  onSuccess={handleSubmissionSuccess}
                  onError={handleSubmissionError}
                  isLoading={submissionStatus === 'loading'}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
