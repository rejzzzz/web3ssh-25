'use client';

import { useState, useEffect } from 'react';
import { DashboardState } from 'types/dashboard';
import { getTimeRemaining } from 'lib/dashboard-utils';

interface DashboardHeaderProps {
  submissionWindow: DashboardState['submissionWindow'];
  currentStep: DashboardState['currentStep'];
  onStepChange: (step: DashboardState['currentStep']) => void;
  isVerified?: boolean;
}

export default function DashboardHeader({
  submissionWindow,
  currentStep,
  onStepChange,
  isVerified = false,
}: DashboardHeaderProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });

  useEffect(() => {
    if (!submissionWindow.endTime) return;

    const updateCountdown = () => {
      const remaining = getTimeRemaining(submissionWindow.endTime!);
      setTimeRemaining(remaining);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [submissionWindow.endTime]);

  const getStepStatus = (step: DashboardState['currentStep']) => {
    if (step === currentStep) return 'current';

    const stepOrder = ['info', 'verify', 'submit', 'success'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(step);

    // Special logic for verification status
    if (step === 'verify') {
      if (isVerified) return 'completed';
      if (currentStep === 'submit' && !isVerified) return 'required'; // Red state
      return stepIndex < currentIndex ? 'completed' : 'upcoming';
    }

    // Special logic for submit step
    if (step === 'submit') {
      if (!isVerified) return 'locked'; // Cannot access without verification
      return stepIndex < currentIndex ? 'completed' : 'upcoming';
    }

    return stepIndex < currentIndex ? 'completed' : 'upcoming';
  };

  return (
    <div className="bg-black/30 backdrop-blur-md border-b border-white/10 relative z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Title */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-white bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Web3 Hackathon Dashboard
            </h1>
            <p className="text-base text-gray-300 mt-2">
              July 3-6, 2025 • 48 Hour Challenge
            </p>
          </div>

          {/* Countdown Timer */}
          {submissionWindow.isOpen && timeRemaining.total > 0 && (
            <div className="text-center">
              <p className="text-sm text-gray-300 mb-3">
                Submission closes in:
              </p>
              <div className="flex items-center gap-3 text-white">
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-purple-500/30 shadow-lg">
                  <div className="text-xl font-bold">{timeRemaining.days}</div>
                  <div className="text-xs text-gray-300">Days</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-purple-500/30 shadow-lg">
                  <div className="text-xl font-bold">{timeRemaining.hours}</div>
                  <div className="text-xs text-gray-300">Hours</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-purple-500/30 shadow-lg">
                  <div className="text-xl font-bold">
                    {timeRemaining.minutes}
                  </div>
                  <div className="text-xs text-gray-300">Min</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm px-4 py-3 rounded-xl border border-purple-500/30 shadow-lg">
                  <div className="text-xl font-bold">
                    {timeRemaining.seconds}
                  </div>
                  <div className="text-xs text-gray-300">Sec</div>
                </div>
              </div>
            </div>
          )}

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg ${
                submissionWindow.isOpen
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : timeRemaining.total <= 0
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              }`}
            >
              {submissionWindow.isOpen
                ? '🟢 Submissions Open'
                : timeRemaining.total <= 0
                  ? '🔴 Submissions Closed'
                  : '🟡 Starting Soon'}
            </div>
          </div>
        </div>

        {/* Navigation Steps */}
        <div className="mt-6 pb-2">
          <div className="flex items-center justify-center gap-3 overflow-x-auto px-4 py-2 min-h-[60px]">
            <StepButton
              label="Hackathon Info"
              status={getStepStatus('info')}
              onClick={() => onStepChange('info')}
            />
            <StepSeparator />
            <StepButton
              label="Verify Participation"
              status={getStepStatus('verify')}
              onClick={() => onStepChange('verify')}
              disabled={!submissionWindow.isOpen}
            />
            <StepSeparator />
            <StepButton
              label="Submit"
              status={getStepStatus('submit')}
              onClick={() => onStepChange('submit')}
              disabled={!submissionWindow.isOpen}
              requiresVerification={!isVerified}
            />
            <StepSeparator />
            <StepButton
              label="Confirmation"
              status={getStepStatus('success')}
              onClick={() => onStepChange('success')}
              disabled={currentStep !== 'success'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StepButtonProps {
  step: DashboardState['currentStep'];
  label: string;
  status: 'completed' | 'current' | 'upcoming' | 'required' | 'locked';
  onClick: () => void;
  disabled?: boolean;
  requiresVerification?: boolean;
}

function StepButton({
  label,
  status,
  onClick,
  disabled,
  requiresVerification = false,
}: Omit<StepButtonProps, 'step'>) {
  const getButtonStyles = () => {
    if (disabled)
      return 'bg-gray-500/20 text-gray-500 cursor-not-allowed border border-gray-500/20';

    if (requiresVerification) {
      return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 hover:bg-yellow-500/30 hover:shadow-lg transition-all duration-300 relative';
    }

    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300';
      case 'current':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300';
      case 'required':
        return 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 animate-pulse';
      case 'locked':
        return 'bg-gray-500/10 text-gray-500 border border-gray-500/20 cursor-not-allowed opacity-50';
      case 'upcoming':
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30 hover:bg-gray-500/30 hover:border-gray-500/50 hover:shadow-lg transition-all duration-300';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/20';
    }
  };

  const isClickable = !disabled && status !== 'locked';

  return (
    <div className="relative group">
      <button
        onClick={isClickable ? onClick : undefined}
        disabled={disabled || status === 'locked'}
        className={`relative px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap backdrop-blur-sm ${getButtonStyles()}`}
        title={
          status === 'required' 
            ? 'Verification required to proceed' 
            : status === 'locked' 
            ? 'Complete verification first' 
            : requiresVerification 
            ? 'Verification required' 
            : undefined
        }
      >
        {status === 'required' && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></span>
        )}
        {status === 'locked' && (
          <span className="absolute -top-1 -right-1 w-3 h-3 text-gray-500">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </span>
        )}
        {requiresVerification && status !== 'required' && status !== 'locked' && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
        )}
        {label}
      </button>
      
      {/* Custom tooltip for Submit button when verification is required */}
      {requiresVerification && label === 'Submit' && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-gray-900/95 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 shadow-xl border border-gray-600 backdrop-blur-sm">
          Verify as a participant in order to submit
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900/95"></div>
        </div>
      )}
    </div>
  );
}

function StepSeparator() {
  return (
    <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
  );
}
