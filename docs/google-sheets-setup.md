# Setting Up Google Sheets API for Ambassador Leaderboard

This guide will walk you through setting up Google Sheets API for your Ambassador Leaderboard feature.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Make note of your Project ID

## Step 2: Enable the Google Sheets API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press the "Enable" button

## Step 3: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service account"
3. Enter a name for your service account (e.g., "ambassador-leaderboard")
4. Optionally add a description
5. Click "Create and Continue"
6. For the role, select "Basic" > "Viewer" (this is read-only access)
7. Click "Continue"
8. Skip the "Grant users access" step by clicking "Done"

## Step 4: Generate Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Select "JSON" as the key type
5. Click "Create"
6. The key file will be downloaded to your computer automatically

## Step 5: Create/Prepare Your Google Sheets

You need two spreadsheets:

### Ambassadors Sheet
Set up a spreadsheet with these columns (adjust as needed):
- Name
- Referral Code
- College
- Other information

### Participants Sheet
Set up a spreadsheet with a column for referral codes (the column that participants used to sign up).

## Step 6: Share Spreadsheets with Service Account

1. Open both of your Google Sheets
2. Click the "Share" button
3. Add the service account email (it looks like: `account-name@project-id.iam.gserviceaccount.com`)
4. Set permission to "Viewer"
5. Uncheck "Notify people"
6. Click "Share"

## Step 7: Set Up Environment Variables

Create an `.env.local` file in your project root with these variables:

```
GOOGLE_CLIENT_EMAIL=your-service-account@your-project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
GOOGLE_AMBASSADORS_SHEET_ID=your-ambassadors-spreadsheet-id
GOOGLE_PARTICIPANTS_SHEET_ID=your-participants-spreadsheet-id
GOOGLE_AMBASSADORS_SHEET_RANGE=Sheet1!A2:D
GOOGLE_PARTICIPANTS_SHEET_RANGE=Sheet1!A2:G
GOOGLE_REFERRAL_CODE_COLUMN_INDEX=4
```

Notes:
- Get the spreadsheet IDs from the URL of each sheet
- The private key must include `\n` for line breaks
- The referral code column index is 0-based (column A = 0, column E = 4)

## Step 8: Test Your Connection

Run the test script to verify your connection:

```bash
npm install dotenv  # If not already installed
node -r dotenv/config scripts/test-sheets-api.mjs
```

## Step 9: Testing with Postman

1. Start your development server:
```bash
npm run dev
```

2. Open Postman and create a new GET request to:
```
http://localhost:3000/api/ambassadors/leaderboard
```

3. Send the request to verify the API is working correctly

## Troubleshooting

1. **"Invalid Credentials" Error**:
   - Double-check your service account email and private key
   - Make sure the private key includes newline characters (`\n`)
   - The private key should be wrapped in quotes

2. **"Forbidden" Error**:
   - Verify you've shared both spreadsheets with the service account email
   - Check if your Google Sheets are restricted by domain

3. **"Not Found" Error**:
   - Verify the spreadsheet IDs are correct
   - Check that the sheets exist and are not deleted

4. **Empty Data**:
   - Check your sheet ranges to make sure they cover your data
   - Verify the column index for referral codes
