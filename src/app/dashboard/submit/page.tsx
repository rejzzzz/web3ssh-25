'use client';

import { useAuth } from 'contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SubmissionForm from 'components/dashboard/SubmissionForm';
import SubmissionSuccess from 'components/dashboard/SubmissionSuccess';

export default function SubmitPage() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [submissionId, setSubmissionId] = useState<string>('');

  useEffect(() => {
    // Redirect to dashboard if not authenticated
    if (!isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmissionSuccess = (id: string) => {
    setSubmissionId(id);
    setSubmissionStatus('success');
  };

  const handleSubmissionError = () => {
    setSubmissionStatus('error');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (submissionStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <SubmissionSuccess submissionId={submissionId} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header with user info and logout */}
        <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-white">
                  Project Submission
                </h1>
                <p className="text-gray-300 text-sm">Welcome, {user.name}</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <SubmissionForm
              participantInfo={user}
              submissionWindow={{
                isOpen: true,
                startTime: new Date('2024-01-01'),
                endTime: new Date('2030-12-31'),
                timeRemaining: 999999999,
              }}
              onSuccess={handleSubmissionSuccess}
              onError={handleSubmissionError}
              isLoading={submissionStatus === 'loading'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
