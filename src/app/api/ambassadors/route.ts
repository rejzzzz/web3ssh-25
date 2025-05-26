import { fetchAmbassadorsData } from '@utils/googleSheetsApi';
import { NextResponse } from 'next/server';

// Reduce revalidation to match cache duration
export const revalidate = 300; // 5 minutes instead of 1 hour

// In-memory cache for the data
let cachedData: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

/**
 * GET handler for the ambassadors API route
 * Fetches data from Google Sheets and returns the processed data
 */
export async function GET(request: Request) {
  try {
    const now = Date.now();

    // Check for force refresh parameter
    const url = new URL(request.url);
    const forceRefresh = url.searchParams.get('refresh') === 'true';

    // Skip cache if force refresh is requested
    if (!forceRefresh) {
      // Check if we have valid cached data
      if (cachedData && now - cacheTimestamp < CACHE_DURATION) {
        console.log(
          `Returning cached ambassador data (${Math.round((now - cacheTimestamp) / 1000)}s old)`,
        );
        return NextResponse.json(cachedData);
      }
    }

    console.log(
      forceRefresh
        ? 'Force refreshing ambassador data...'
        : 'Fetching ambassador data...',
    );
    const startTime = Date.now();

    const { ambassadorsData, totalParticipantsInSheet } =
      await fetchAmbassadorsData();

    const fetchTime = Date.now() - startTime;
    console.log(`Total fetch time: ${fetchTime}ms`);

    // Calculate participants statistics efficiently in one pass
    const totalParticipantsWithReferrals = ambassadorsData.reduce(
      (sum: number, ambassador: any) => sum + ambassador.participants,
      0,
    );

    const responseData = {
      success: true,
      data: ambassadorsData,
      lastUpdated: new Date().toISOString(),
      totalAmbassadors: ambassadorsData.length,
      totalParticipantsInSheet: totalParticipantsInSheet,
      totalParticipantsWithReferrals,
      totalParticipantsWithoutReferrals:
        totalParticipantsInSheet - totalParticipantsWithReferrals,
      fetchTimeMs: fetchTime,
    };

    // Cache the response
    cachedData = responseData;
    cacheTimestamp = now;

    const totalTime = Date.now() - startTime;
    console.log(`Total API route time: ${totalTime}ms`);

    // Add cache control headers
    const response = NextResponse.json(responseData);
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate',
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Error in ambassadors API route:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch ambassador data',
      },
      { status: 500 },
    );
  }
}
