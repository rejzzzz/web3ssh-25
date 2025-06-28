# MongoDB Atlas Setup Guide for Web3SSH 2025 Dashboard

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (choose FREE M0 tier)
4. Select region closest to your users (e.g., Mumbai/Singapore for India)

## Step 2: Database Configuration
1. **Database Name**: `web3ssh_2025`
2. **Collections to create**:
   - `participants`
   - `submissions` 
   - `hackathon_config`

## Step 3: Security Setup
1. **Database User**: Create with read/write permissions
2. **Network Access**: Add your IP (or 0.0.0.0/0 for development)
3. **Connection String**: Get from Atlas dashboard

## Step 4: Indexes for Performance
```javascript
// Create these indexes in MongoDB Compass or Atlas UI
db.participants.createIndex({ "email": 1 }, { unique: true })
db.participants.createIndex({ "uid": 1 }, { unique: true })
db.participants.createIndex({ "email": 1, "uid": 1 }) // compound for verification

db.submissions.createIndex({ "participantEmail": 1 })
db.submissions.createIndex({ "submissionTimestamp": -1 })
db.submissions.createIndex({ "submissionId": 1 }, { unique: true })
```

## Step 5: Environment Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/web3ssh_2025
MONGODB_DB=web3ssh_2025
```

## Step 6: Sample Data Structure
```javascript
// Sample participant document
{
  "_id": ObjectId("..."),
  "email": "john@example.com",
  "uid": "WEB3SSH2025_001",
  "name": "John Doe",
  "teamId": "team_001",
  "teamName": "BlockChain Builders",
  "registeredAt": ISODate("2025-06-01T10:00:00Z"),
  "isVerified": false
}

// Sample hackathon config
{
  "_id": ObjectId("..."),
  "configKey": "submission_window",
  "startTime": ISODate("2025-07-03T00:00:00Z"),
  "endTime": ISODate("2025-07-05T00:00:00Z"),
  "isActive": true,
  "maxFileSize": 10485760, // 10MB
  "allowedFileTypes": [".pdf", ".pptx", ".docx"]
}
```

## Tools You'll Need
1. **MongoDB Compass**: GUI for database management
2. **VS Code Extension**: MongoDB for VS Code
3. **Atlas Dashboard**: Web interface for monitoring

## Next Steps
1. Set up Atlas cluster
2. Install dependencies: `pnpm add mongodb mongoose`
3. Create database connection utility
4. Implement API routes
5. Test with sample data
