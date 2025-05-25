import { google } from 'googleapis';

/**
 * Interface for Ambassador data
 */
export interface Ambassador {
  name: string;
  referralCode: string;
  college: string;
  participants: number;
}

/**
 * Interface for the return data from fetchAmbassadorsData
 */
export interface AmbassadorsResponse {
  ambassadorsData: Ambassador[];
  totalParticipantsInSheet: number;
}

/**
 * Configure Google Sheets API authentication client
 */
let cachedAuthClient: any = null;

const getAuthClient = () => {
  try {
    // Reuse the same auth client to avoid re-authentication
    if (cachedAuthClient) {
      return cachedAuthClient;
    }

    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      "",
      process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );
    
    // Set timeouts for faster responses
    auth.timeout = 10000; // 10 second timeout
    
    // Cache the client
    cachedAuthClient = auth;
    
    return auth;
  } catch (error) {
    console.error('Error creating auth client:', error);
    throw error;
  }
};


/**
 * Fetch data from Google Sheets and process it
 */
export async function fetchAmbassadorsData(): Promise<AmbassadorsResponse> {
  try {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    
    console.log('Fetching ambassadors data...');
    const startTime = Date.now();
    
    // Use batchGet to fetch all ranges in a single API call for maximum efficiency
    // Limit range to 100 rows to reduce data transfer
    const batchResponse = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: process.env.GOOGLE_AMBASSADORS_SHEET_ID,
      ranges: [
        'C2:D100',  // Ambassador names and colleges (limited to 100 rows)
        'I2:I100'   // Ambassador referral codes (limited to 100 rows)
      ]
    });
    
    const participantsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_PARTICIPANTS_SHEET_ID,
      range: 'K2:K100',  // Participant referral codes only (limited to 100 rows)
    });
    
    console.log(`Sheet fetch took ${Date.now() - startTime}ms`);
    
    const ambassadorInfo = batchResponse.data.valueRanges?.[0]?.values || [];
    const ambassadorReferralCodes = batchResponse.data.valueRanges?.[1]?.values || [];
    const participantReferralCodes = participantsResponse.data.values || [];
    
    console.log(`Found ${ambassadorInfo.length} ambassadors and ${participantReferralCodes.length} participants`);
    
    // Create a map of referral codes to participant counts for O(n) lookup
    const referralCodeCounts = new Map<string, number>();
    
    // Count participants by referral code efficiently
    const processTime = Date.now();
    participantReferralCodes.forEach(participant => {
      const referralCode = participant[0]?.trim();
      if (referralCode) {
        referralCodeCounts.set(referralCode, (referralCodeCounts.get(referralCode) || 0) + 1);
      }
    });
    
    console.log(`Processing took ${Date.now() - processTime}ms`);
    console.log(`Found ${referralCodeCounts.size} unique referral codes in participants`);
    
    // Process the ambassador data efficiently
    const mappingStart = Date.now();
    const leaderboardData = ambassadorInfo
      .map((ambassador, index) => {
        const name = ambassador[0] || '';  // Column C - Name
        const college = ambassador[1] || '';  // Column D - College
        const referralCode = ambassadorReferralCodes[index]?.[0] || '';  // Column I - Referral Code
        
        if (!name || !referralCode?.trim()) {
          return null;
        }
        
        const participants = referralCodeCounts.get(referralCode.trim()) || 0;
        
        if (participants > 0) {
          console.log(`✅ Ambassador ${name} with code ${referralCode} has ${participants} participants`);
        }
        
        return {
          name,
          referralCode: referralCode.trim(),
          college,
          participants
        };
      })
      .filter((ambassador): ambassador is Ambassador => ambassador !== null);
    
    console.log(`Data mapping took ${Date.now() - mappingStart}ms`);
    
    // Sort by participant count (highest first)
    const sortingStart = Date.now();
    const sortedLeaderboardData = leaderboardData.sort((a, b) => b.participants - a.participants);
    console.log(`Sorting took ${Date.now() - sortingStart}ms`);
    
    // Log sample leaderboard data for debugging (use already sorted data)
    if (sortedLeaderboardData.length > 0) {
      console.log(`Total ambassadors with valid data: ${sortedLeaderboardData.length}`);
      console.log(`Top 3 ambassadors:`, sortedLeaderboardData.slice(0, 3));
    } else {
      console.log('No valid ambassador data found');
    }
    
    return {
      ambassadorsData: sortedLeaderboardData,
      totalParticipantsInSheet: participantReferralCodes.length
    };
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
}
