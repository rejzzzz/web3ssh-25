import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from 'lib/mongodb';
import { getTimeRemaining, isSubmissionWindowOpen } from 'lib/dashboard-utils';

export async function GET(request: NextRequest) {
  try {
    // For testing purposes, return a submission window that's always open
    // In production, this would fetch from MongoDB
    const startTime = new Date('2024-01-01T00:00:00Z'); // Past date to ensure window is open
    const endTime = new Date('2030-12-31T23:59:59Z'); // Future date to keep window open
    
    const windowOpen = isSubmissionWindowOpen(startTime, endTime);
    const timeRemaining = getTimeRemaining(endTime);

    return NextResponse.json({
      isOpen: true, // Force open for testing
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      timeRemaining,
      message: 'Submission window is open (TEST MODE)',
    });

    // Original MongoDB code commented out for testing
    /*
    // Connect to database
    const db = await getDatabase();
    const configCollection = db.collection(COLLECTIONS.HACKATHON_CONFIG);

    // Get submission window configuration
    const submissionConfig = await configCollection.findOne({
      configKey: 'submission_window',
      isActive: true,
    });

    if (!submissionConfig) {
      return NextResponse.json({
        isOpen: false,
        startTime: null,
        endTime: null,
        timeRemaining: { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 },
        message: 'Submission window not configured',
      });
    }

    const startTime = new Date(submissionConfig.startTime);
    const endTime = new Date(submissionConfig.endTime);
    const windowOpen = isSubmissionWindowOpen(startTime, endTime);
    const timeRemaining = getTimeRemaining(endTime);

    return NextResponse.json({
      isOpen: windowOpen,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      timeRemaining,
      message: windowOpen ? 
        'Submission window is open' : 
        timeRemaining.total <= 0 ? 'Submission window has closed' : 'Submission window has not started yet',
    });
    */

  } catch (error) {
    console.error('Hackathon status API error:', error);
    return NextResponse.json(
      { 
        isOpen: true, // Force open even on error for testing
        startTime: new Date('2024-01-01T00:00:00Z').toISOString(),
        endTime: new Date('2030-12-31T23:59:59Z').toISOString(),
        timeRemaining: { days: 2000, hours: 0, minutes: 0, seconds: 0, total: 172800000000 },
        message: 'Submission window is open (TEST MODE - ERROR FALLBACK)',
      },
      { status: 500 }
    );
  }
}
