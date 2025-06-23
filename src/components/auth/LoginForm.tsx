'use client';

import { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    uid: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
    if (isSuccess) {
      setIsSuccess(false);
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

    const success = await login(formData.email, formData.uid);

    if (success) {
      setIsSuccess(true);
      setSubmitError('');
      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push('/submit');
      }, 1500);
    } else {
      setIsSuccess(false);

      // Provide more specific error messages
      const emailDomain = formData.email.split('@')[1];
      let errorMessage =
        'Invalid credentials. Please check your email and UID.';

      if (emailDomain && !emailDomain.includes('iiits.in')) {
        errorMessage =
          'Please use your IIIT Sri City email address (ending with @iiits.in).';
      } else if (!formData.uid.startsWith('SSH25')) {
        errorMessage =
          'Invalid UID format. Your UID should start with "SSH25" followed by numbers.';
      } else {
        errorMessage =
          'Email or UID not found. Please check your registration confirmation email or contact support.';
      }

      setSubmitError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-gradient-to-r from-purple-800/30 via-indigo-700/40 to-blue-600/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.4)] border border-white/30">
          <div className="relative p-8 before:absolute before:inset-0 before:bg-white/10 before:rounded-2xl">
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Web3SSH 2025
                </h1>
                <h2 className="text-xl font-semibold text-blue-400 mb-2">
                  Participant Login
                </h2>
                <p className="text-gray-300">
                  Enter your credentials to access the project submission portal
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    <User className="w-4 h-4 inline mr-2" />
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
                    placeholder="aadi.p23@iiits.in"
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
                    <Lock className="w-4 h-4 inline mr-2" />
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
                    placeholder="SSH259023"
                    disabled={isLoading}
                  />
                  {errors.uid && (
                    <p className="mt-1 text-sm text-red-400">{errors.uid}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-400">
                    Check your registration confirmation for your UID
                  </p>
                </div>

                {/* Submit Error */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{submitError}</p>
                  </motion.div>
                )}

                {/* Success Message */}
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <p className="text-green-400 text-sm">
                      Login successful! Redirecting to submission page...
                    </p>
                  </motion.div>
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
                    'Login & Continue'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
