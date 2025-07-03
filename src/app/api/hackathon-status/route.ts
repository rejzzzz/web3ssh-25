import { NextResponse } from 'next/server';
import { getTimeRemaining, isSubmissionWindowOpen } from 'lib/dashboard-utils';

export async function GET() {
  try {
    // Submission window: July 3-5, 2025 (Hackathon period)
    // Submissions open at start of hackathon and close at the end
    // IST is UTC+5:30, so to convert to UTC we subtract 5 hours 30 minutes
    const startTime = new Date('2025-07-03T14:00:00Z'); // 7:30 PM IST = 2:00 PM UTC
    const endTime = new Date('2025-07-05T14:00:00Z'); // 7:30 PM IST = 2:00 PM UTC

    const windowOpen = isSubmissionWindowOpen(startTime, endTime);
    const timeRemaining = getTimeRemaining(endTime);

    return NextResponse.json({
      isOpen: windowOpen,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      timeRemaining,
      message: windowOpen
        ? 'Submission window is open'
        : 'Submissions open July 3-5, 2025',
    });
  } catch (error) {
    console.error('Hackathon status API error:', error);
    return NextResponse.json(
      {
        isOpen: false, // Submissions closed by default on error
        startTime: new Date('2025-07-03T00:00:00Z').toISOString(),
        endTime: new Date('2025-07-06T23:59:59Z').toISOString(),
        timeRemaining: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          total: 0,
        },
        message: 'Submissions open July 3-6, 2025 (ERROR FALLBACK)',
      },
      { status: 500 },
    );
  }
}
