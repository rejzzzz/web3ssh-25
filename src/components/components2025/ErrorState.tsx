'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle, Wifi, Server } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  const getErrorIcon = () => {
    if (error.includes('timeout')) return Wifi;
    if (error.includes('Network')) return Server;
    return AlertCircle;
  };

  const ErrorIcon = getErrorIcon();

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background matching your website's gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:24px_24px]"></div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-32 h-32 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-400/30 relative"
          style={{
            backdropFilter: 'blur(10px)',
          }}
        >
          <ErrorIcon className="w-16 h-16 text-red-400" />

          {/* Pulse rings */}
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border-2 border-red-400 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-0 border-2 border-red-400 rounded-full"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-6"
        >
          Connection Error
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
          }}
          className="border border-red-400/30 p-6 mb-8"
        >
          <p className="text-red-300 mb-4 font-medium">{error}</p>

          <div className="text-gray-300 text-sm">
            {error.includes('timeout') && (
              <p>
                The request took too long to complete. Please check your
                internet connection.
              </p>
            )}
            {error.includes('Network') && (
              <p>
                Unable to connect to the server. Please try again in a moment.
              </p>
            )}
            {!error.includes('timeout') && !error.includes('Network') && (
              <p>
                Something went wrong while loading the data. Our team has been
                notified.
              </p>
            )}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-xl transition-all shadow-lg font-medium flex items-center space-x-3 mx-auto"
        >
          <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          <span>Try Again</span>
        </motion.button>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-gray-400 text-sm"
        >
          <p>
            If the problem persists, please refresh the page or contact support.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
