import { fetchAmbassadorsData } from '@utils/googleSheetsApi';
import { NextResponse } from 'next/server';

// Set revalidation period to 1 hour (3600 seconds)
export const revalidate = 3600;

/**
 * GET handler for the ambassadors leaderboard API route
 * Fetches data from Google Sheets and returns the processed leaderboard data
 */
export async function GET() {
  try {
    const { ambassadorsData, totalParticipantsInSheet } = await fetchAmbassadorsData();
    
    return NextResponse.json({ 
      success: true, 
      data: ambassadorsData,
      lastUpdated: new Date().toISOString(),
      totalAmbassadors: ambassadorsData.length,
      totalParticipantsInSheet: totalParticipantsInSheet,
      totalParticipantsWithReferrals: ambassadorsData.reduce((sum: number, ambassador: any) => sum + ambassador.participants, 0),
      totalParticipantsWithoutReferrals: totalParticipantsInSheet - ambassadorsData.reduce((sum: number, ambassador: any) => sum + ambassador.participants, 0)
    });
  } catch (error) {
    console.error('Error in leaderboard API route:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch leaderboard data' 
      },
      { status: 500 }
    );
  }
}
