import { NextResponse } from 'next/server';
import { getTimeRemaining, isSubmissionWindowOpen } from 'lib/dashboard-utils';

export async function GET() {
  try {
    // For testing purposes, return a submission window that's always open
    // In production, this would fetch from a configuration collection
    const startTime = new Date('2024-01-01T00:00:00Z'); // Past date to ensure window is open
    const endTime = new Date('2030-12-31T23:59:59Z'); // Future date to keep window open

    const windowOpen = isSubmissionWindowOpen(startTime, endTime);
    const timeRemaining = getTimeRemaining(endTime);

    return NextResponse.json({
      isOpen: windowOpen, // Use the actual calculation
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      timeRemaining,
      message: 'Submission window is open (TEST MODE)',
    });
  } catch (error) {
    console.error('Hackathon status API error:', error);
    return NextResponse.json(
      {
        isOpen: true, // Force open even on error for testing
        startTime: new Date('2024-01-01T00:00:00Z').toISOString(),
        endTime: new Date('2030-12-31T23:59:59Z').toISOString(),
        timeRemaining: {
          days: 2000,
          hours: 0,
          minutes: 0,
          seconds: 0,
          total: 172800000000,
        },
        message: 'Submission window is open (TEST MODE - ERROR FALLBACK)',
      },
      { status: 500 },
    );
  }
}
