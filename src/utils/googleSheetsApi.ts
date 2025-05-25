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
const getAuthClient = () => {
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      "",
      process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );
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
    
    // Get sheet details first
    const ambassadorsSpreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_AMBASSADORS_SHEET_ID,
    });
    
    const participantsSpreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_PARTICIPANTS_SHEET_ID,
    });
    
    const ambassadorSheetName = ambassadorsSpreadsheet.data.sheets?.[0]?.properties?.title || 'Sheet1';
    const participantSheetName = participantsSpreadsheet.data.sheets?.[0]?.properties?.title || 'Sheet1';
    
    console.log(`Detected sheet names: Ambassador="${ambassadorSheetName}", Participant="${participantSheetName}"`);
    
    // Use detected sheet names with ranges
    // Fetch ambassadors data - include column J which contains referral codes
    const ambassadorsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_AMBASSADORS_SHEET_ID,
      range: `${ambassadorSheetName}!A2:J`,  // A to J (timestamp to referral code)
    });
    
    // Fetch participants data
    const participantsResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_PARTICIPANTS_SHEET_ID,
      range: `${participantSheetName}!A2:L`,  // A to L to include referral codes in column K
    });
    
    const ambassadors = ambassadorsResponse.data.values || [];
    const participants = participantsResponse.data.values || [];
    
    console.log(`Found ${ambassadors.length} ambassadors and ${participants.length} participants`);
    
    // Get the correct column index for referral codes from env variable (should be 10 for column K)
    const referralColumnIndex = parseInt(process.env.GOOGLE_REFERRAL_CODE_COLUMN_INDEX || '10');
    console.log(`Using referral column index: ${referralColumnIndex} for participant sheet`);
    
    // Debug: Check some referral codes from participants
    if (participants.length > 0) {
      console.log(`Sample participant referral codes: ${participants.slice(0, 3).map(p => p[referralColumnIndex]).join(', ')}`);
    }
    
    // Process the data to create the leaderboard
    const leaderboardData = ambassadors
      .filter(ambassador => ambassador[2]) // Filter out rows with no name
      .map(ambassador => {
        // From the debug output, column mapping for ambassadors:
        // Timestamp(0), Email Address(1), Name(2), Institute Name(3), ID Proof(4), Mobile(5), Doubts(6), Empty(7), Referral Code(8), Mail Sent(9)
        const name = ambassador[2] || '';  // Column C - Name
        const college = ambassador[3] || '';  // Column D - Institute Name
        const referralCode = ambassador[8] || '';  // Column I - Referral Code (index 8)
        
        console.log(`Processing ambassador: ${name}, referral code: ${referralCode}`);
        
        // Count how many participants used this ambassador's referral code
        const participantCount = participants.filter(participant => {
          // Check if participant has a referral code at column K (index 10)
          // and if it matches this ambassador's code
          const participantReferralCode = participant[referralColumnIndex];
          return participantReferralCode && 
                 participantReferralCode.trim() === referralCode.trim();
        }).length;
        
        // Log if we found participants for this referral code
        if (participantCount > 0) {
          console.log(`✅ Ambassador ${name} with code ${referralCode} has ${participantCount} participants`);
        }
        
        return {
          name,
          referralCode,
          college,
          participants: participantCount
        };
      })
      // Filter out entries with invalid or empty referral codes
      .filter(ambassador => ambassador.referralCode && ambassador.referralCode.trim() !== '');
    
    // Log sample leaderboard data for debugging
    if (leaderboardData.length > 0) {
      console.log(`Total ambassadors with valid data: ${leaderboardData.length}`);
      console.log(`Top 3 ambassadors:`, leaderboardData.sort((a, b) => b.participants - a.participants).slice(0, 3));
    } else {
      console.log('No valid ambassador data found');
    }
    
    // Sort by participant count (highest first)
    const sortedLeaderboardData = leaderboardData.sort((a, b) => b.participants - a.participants);
    
    return {
      ambassadorsData: sortedLeaderboardData,
      totalParticipantsInSheet: participants.length
    };
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
}
