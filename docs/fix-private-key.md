# How to Fix Your Google Sheets API Authentication

The error you're seeing (`error:1E08010C:DECODER routines::unsupported`) indicates that your private key is invalid. Here's how to fix it:

## Step 1: Find Your Service Account Key File

When you created your Google Service Account, you should have downloaded a JSON key file. This file contains the private key you need.

If you don't have this file:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "IAM & Admin" > "Service accounts"
3. Find your service account "ambassador-leaderboard@optimum-library-460906-u9.iam.gserviceaccount.com"
4. Click on it, then go to the "Keys" tab
5. Click "Add Key" > "Create new key"
6. Select JSON format and click "Create"
7. A new key file will be downloaded to your computer

## Step 2: Extract the Private Key

1. Open the downloaded JSON file in a text editor
2. Find the `"private_key"` field
3. Copy the ENTIRE value of the private key, including the quotes

It should look something like:
```
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBAD....many lines of characters...\n-----END PRIVATE KEY-----\n"
```

## Step 3: Update Your .env.local File

1. Open your `.env.local` file
2. Replace the placeholder private key with your actual private key:

```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBAD....your actual key here....n-----END PRIVATE KEY-----\n"
```

Important notes:
- Keep the surrounding quotes `"..."` 
- Keep the `\n` characters exactly as they appear in the JSON file
- Do NOT replace `\n` with actual new lines
- The key should be a single line in your .env file

## Step 4: Test Again

After updating your private key, run the test script again:

```bash
node scripts/test-sheets-api.mjs
```

## Troubleshooting

If you still have issues:

1. **Double check the key format**. Make sure you've copied the entire key exactly as it appears in the JSON file.

2. **Check for escape characters**. In some cases, you might need to double-escape the newlines with `\\n` instead of `\n`.

3. **Verify that your service account has access to the Google Sheets**. Make sure you've shared both sheets with your service account email.

4. **Verify the spreadsheet IDs**. Make sure the IDs in your .env.local file match the actual IDs in your Google Sheets URLs.

Good luck!
