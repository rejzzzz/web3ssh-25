'use client';

import { useState, useEffect } from 'react';
import { DashboardState } from 'types/dashboard';
import { HACKATHON_INFO, getTimeRemaining } from 'lib/dashboard-utils';
import DashboardHeader from 'components/dashboard/DashboardHeader';
import EventOverview from 'components/dashboard/EventOverview';
import Schedule from 'components/dashboard/Schedule';
import Rules from 'components/dashboard/Rules';
import JudgingCriteria from 'components/dashboard/JudgingCriteria';
import Resources from 'components/dashboard/Resources';
import FAQ from 'components/dashboard/FAQ';
import VerificationForm from 'components/dashboard/VerificationForm';
import SubmissionForm from 'components/dashboard/SubmissionForm';
import SubmissionSuccess from 'components/dashboard/SubmissionSuccess';

export default function DashboardPage() {
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    isVerified: false,
    participantInfo: null,
    submissionStatus: 'idle',
    currentStep: 'info',
    submissionWindow: {
      isOpen: false,
      startTime: null,
      endTime: null,
      timeRemaining: 0,
    },
  });

  // Fetch hackathon status on component mount
  useEffect(() => {
    const fetchHackathonStatus = async () => {
      try {
        const response = await fetch('/api/hackathon-status');
        const data = await response.json();

        setDashboardState((prev) => ({
          ...prev,
          submissionWindow: {
            isOpen: data.isOpen,
            startTime: data.startTime ? new Date(data.startTime) : null,
            endTime: data.endTime ? new Date(data.endTime) : null,
            timeRemaining: data.timeRemaining?.total || 0,
          },
        }));
      } catch (error) {
        console.error('Failed to fetch hackathon status:', error);
      }
    };

    fetchHackathonStatus();
    // Refresh status every 2 minutes to reduce load
    const interval = setInterval(fetchHackathonStatus, 120000);
    return () => clearInterval(interval);
  }, []);

  // Update countdown timer - optimized for smoother performance
  useEffect(() => {
    if (!dashboardState.submissionWindow.endTime) return;

    let animationFrame: number;
    
    const updateCountdown = () => {
      const timeRemaining = getTimeRemaining(
        dashboardState.submissionWindow.endTime!,
      );
      
      setDashboardState((prev) => {
        // Only update if time has actually changed to prevent unnecessary re-renders
        if (prev.submissionWindow.timeRemaining !== timeRemaining.total) {
          return {
            ...prev,
            submissionWindow: {
              ...prev.submissionWindow,
              timeRemaining: timeRemaining.total,
            },
          };
        }
        return prev;
      });
      
      // Use requestAnimationFrame for smoother updates
      animationFrame = requestAnimationFrame(() => {
        setTimeout(updateCountdown, 1000);
      });
    };

    updateCountdown();
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [dashboardState.submissionWindow.endTime]);

  const handleVerificationSuccess = (participantInfo: any) => {
    setDashboardState((prev) => ({
      ...prev,
      isVerified: true,
      participantInfo,
      currentStep: 'submit',
    }));
  };

  const handleSubmissionSuccess = (_submissionId: string) => {
    setDashboardState((prev) => ({
      ...prev,
      submissionStatus: 'success',
      currentStep: 'success',
    }));
  };

  const handleSubmissionError = () => {
    setDashboardState((prev) => ({
      ...prev,
      submissionStatus: 'error',
    }));
  };

  const handleStepChange = (step: DashboardState['currentStep']) => {
    // Prevent direct access to submit step without verification
    if (step === 'submit' && !dashboardState.isVerified) {
      // Show a brief notification and redirect to verify step
      setDashboardState((prev) => ({
        ...prev,
        currentStep: 'submit', // Still set to submit to show the verification message
      }));
    } else if (step === 'success' && dashboardState.submissionStatus !== 'success') {
      // Prevent direct access to success page without successful submission
      setDashboardState((prev) => ({
        ...prev,
        currentStep: 'info',
      }));
    } else {
      setDashboardState((prev) => ({
        ...prev,
        currentStep: step,
      }));
    }
    
    // Smooth scroll to top when changing steps
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 scroll-smooth">
      {/* Background Elements - Optimized for better performance */}
      <div className="fixed inset-0 pointer-events-none will-change-transform">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <DashboardHeader
          submissionWindow={dashboardState.submissionWindow}
          currentStep={dashboardState.currentStep}
          onStepChange={handleStepChange}
          isVerified={dashboardState.isVerified}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Content - Optimized transitions */}
          {dashboardState.currentStep === 'info' && (
            <div className="space-y-12 animate-fadeIn">
              <EventOverview />
              <Schedule events={HACKATHON_INFO.schedule} />
              <Rules rules={HACKATHON_INFO.rules} />
              <JudgingCriteria criteria={HACKATHON_INFO.judgingCriteria} />
              <Resources resources={HACKATHON_INFO.resources} />
              <FAQ faqs={HACKATHON_INFO.faqs} />
            </div>
          )}

          {dashboardState.currentStep === 'verify' && (
            <div className="max-w-2xl mx-auto animate-slideIn">
              <VerificationForm
                onSuccess={handleVerificationSuccess}
                isLoading={dashboardState.submissionStatus === 'loading'}
              />
            </div>
          )}

          {dashboardState.currentStep === 'submit' && (
            <div className="max-w-4xl mx-auto animate-slideIn">
              {dashboardState.isVerified ? (
                <SubmissionForm
                  participantInfo={dashboardState.participantInfo}
                  submissionWindow={dashboardState.submissionWindow}
                  onSuccess={handleSubmissionSuccess}
                  onError={handleSubmissionError}
                  isLoading={dashboardState.submissionStatus === 'loading'}
                />
              ) : (
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-8 text-center">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Verification Required</h3>
                  <p className="text-gray-300 mb-2">
                    Please verify yourself as a participant before submitting your project.
                  </p>
                  <p className="text-blue-300 text-sm mb-6">
                    <strong>Note:</strong> Only one teammate needs to verify to unlock project submission for the entire team.
                  </p>
                  <button
                    onClick={() => handleStepChange('verify')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Go to Verification
                  </button>
                </div>
              )}
            </div>
          )}

          {dashboardState.currentStep === 'success' && (
            <div className="max-w-2xl mx-auto animate-bounceIn">
              <SubmissionSuccess />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
