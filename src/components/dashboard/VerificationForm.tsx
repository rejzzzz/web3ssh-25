'use client';

import { useState } from 'react';
import { VerificationRequest, VerificationResponse } from 'types/dashboard';

interface VerificationFormProps {
  onSuccess: (participantInfo: any) => void;
  isLoading: boolean;
}

export default function VerificationForm({
  onSuccess,
  isLoading,
}: VerificationFormProps) {
  const [formData, setFormData] = useState<VerificationRequest>({
    email: '',
    uid: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.uid) {
      newErrors.uid = 'UID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('/api/verify-participant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: VerificationResponse = await response.json();

      if (data.success && data.user) {
        onSuccess(data.user);
      } else {
        setSubmitError(data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setSubmitError('Network error. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-800/30 via-indigo-700/40 to-blue-600/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.4)] border border-white/30">
      <div className="relative p-6 sm:p-8 before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl">
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Verify Your Participation
            </h2>
            <p className="text-gray-300">
              Enter your registration details to access the project submission
              form
            </p>
          </div>

          {/* Team Verification Info */}
          <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500/30 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  <strong className="text-blue-400">Only one teammate needs to verify.</strong> You can add team members in the next step.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Registered Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Enter your registered email"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* UID Field */}
            <div>
              <label
                htmlFor="uid"
                className="block text-sm font-medium text-white mb-2"
              >
                Unique Identifier (UID)
              </label>
              <input
                type="text"
                id="uid"
                name="uid"
                value={formData.uid}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.uid ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Enter your UID from registration email"
                disabled={isLoading}
              />
              {errors.uid && (
                <p className="mt-1 text-sm text-red-400">{errors.uid}</p>
              )}
              <p className="mt-1 text-sm text-gray-400">
                Check your registration confirmation email for your UID
              </p>
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{submitError}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Verifying...
                </div>
              ) : (
                'Verify & Continue'
              )}
            </button>
          </form>

          {/* Help Section */}
          <div className="mt-8 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
            <h4 className="text-yellow-400 font-medium mb-2">Need Help?</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>• Check your email for registration confirmation</p>
              <p>• Your UID should be in the format: participant_xxx_xxx</p>
              <p>• Contact support if you can&apos;t find your credentials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
