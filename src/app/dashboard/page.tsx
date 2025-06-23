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
    // Refresh status every minute
    const interval = setInterval(fetchHackathonStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // Update countdown timer
  useEffect(() => {
    if (!dashboardState.submissionWindow.endTime) return;

    const updateCountdown = () => {
      const timeRemaining = getTimeRemaining(
        dashboardState.submissionWindow.endTime!,
      );
      setDashboardState((prev) => ({
        ...prev,
        submissionWindow: {
          ...prev.submissionWindow,
          timeRemaining: timeRemaining.total,
        },
      }));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
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
    setDashboardState((prev) => ({
      ...prev,
      currentStep: step,
    }));
  };

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
        {/* Header */}
        <DashboardHeader
          submissionWindow={dashboardState.submissionWindow}
          currentStep={dashboardState.currentStep}
          onStepChange={handleStepChange}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Content */}
          {dashboardState.currentStep === 'info' && (
            <div className="space-y-16">
              <EventOverview />
              <Schedule events={HACKATHON_INFO.schedule} />
              <Rules rules={HACKATHON_INFO.rules} />
              <JudgingCriteria criteria={HACKATHON_INFO.judgingCriteria} />
              <Resources resources={HACKATHON_INFO.resources} />
              <FAQ faqs={HACKATHON_INFO.faqs} />
            </div>
          )}

          {dashboardState.currentStep === 'verify' && (
            <div className="max-w-2xl mx-auto">
              <VerificationForm
                onSuccess={handleVerificationSuccess}
                isLoading={dashboardState.submissionStatus === 'loading'}
              />
            </div>
          )}

          {dashboardState.currentStep === 'submit' &&
            dashboardState.isVerified && (
              <div className="max-w-4xl mx-auto">
                <SubmissionForm
                  participantInfo={dashboardState.participantInfo}
                  submissionWindow={dashboardState.submissionWindow}
                  onSuccess={handleSubmissionSuccess}
                  onError={handleSubmissionError}
                  isLoading={dashboardState.submissionStatus === 'loading'}
                />
              </div>
            )}

          {dashboardState.currentStep === 'success' && (
            <div className="max-w-2xl mx-auto">
              <SubmissionSuccess />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
