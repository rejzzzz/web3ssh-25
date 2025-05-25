import { fetchAmbassadorsData } from '@utils/googleSheetsApi';
import { NextResponse } from 'next/server';

// Set revalidation period to 1 hour (3600 seconds)
export const revalidate = 3600;

// In-memory cache for the leaderboard data
let cachedData: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

/**
 * GET handler for the ambassadors leaderboard API route
 * Fetches data from Google Sheets and returns the processed leaderboard data
 */
export async function GET() {
  try {
    const now = Date.now();
    
    // Check if we have valid cached data
    if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log('Returning cached leaderboard data');
      return NextResponse.json(cachedData);
    }
    
    console.log('Fetching fresh leaderboard data...');
    const startTime = Date.now();
    
    // Remove timeout race condition - direct call
    const { ambassadorsData, totalParticipantsInSheet } = await fetchAmbassadorsData();
    
    const fetchTime = Date.now() - startTime;
    console.log(`Total fetch time: ${fetchTime}ms`);
    
    // Add timing for response data processing
    const processingStart = Date.now();
    
    // Calculate participants statistics efficiently in one pass
    const totalParticipantsWithReferrals = ambassadorsData.reduce((sum: number, ambassador: any) => sum + ambassador.participants, 0);
    
    const responseData = { 
      success: true, 
      data: ambassadorsData,
      lastUpdated: new Date().toISOString(),
      totalAmbassadors: ambassadorsData.length,
      totalParticipantsInSheet: totalParticipantsInSheet,
      totalParticipantsWithReferrals,
      totalParticipantsWithoutReferrals: totalParticipantsInSheet - totalParticipantsWithReferrals,
      fetchTimeMs: fetchTime
    };
    
    const processingTime = Date.now() - processingStart;
    console.log(`Response processing time: ${processingTime}ms`);
    
    // Cache the response
    const cacheStart = Date.now();
    cachedData = responseData;
    cacheTimestamp = now;
    const cacheTime = Date.now() - cacheStart;
    console.log(`Cache storage time: ${cacheTime}ms`);
    
    const totalTime = Date.now() - startTime;
    console.log(`Total API route time: ${totalTime}ms`);
    
    return NextResponse.json(responseData);
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
