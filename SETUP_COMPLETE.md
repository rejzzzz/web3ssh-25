# Web3SSH MongoDB Setup - Complete Restructure

## ✅ Completed Tasks

### 1. Database Models

- **Removed**: All mock data and old collection-based approach
- **Created**: Clean Mongoose models with TypeScript support
  - `User` model: Simple user verification with email + UID
  - `Project` model: Complete project submission with auto-generated submission IDs

### 2. API Endpoints

- **Updated**: `/api/verify-participant` - Uses User model for verification
- **Updated**: `/api/submit-project` - Uses Project model for submissions
- **Created**: `/api/projects/[id]` - CRUD operations for individual projects
  - GET: Retrieve project by submission ID
  - PUT: Update project by submission ID
  - DELETE: Delete project by submission ID
- **Created**: `/api/user-projects` - Get user's project
- **Updated**: `/api/hackathon-status` - Simplified test mode

### 3. Database Connection

- **Replaced**: Old MongoDB client with Mongoose connection
- **Simplified**: Connection handling in `src/lib/mongodb.ts`

### 4. Type Safety

- **Added**: TypeScript interfaces for models (`src/types/models.ts`)
- **Updated**: Dashboard types to match new structure
- **Fixed**: All TypeScript compilation errors

## 🚀 Quick Start Guide

### 1. Set up MongoDB

```bash
# Make sure you have MONGODB_URI in your .env.local
echo "MONGODB_URI=mongodb://localhost:27017/web3ssh_hackathon" >> .env.local
```

### 2. Add Test Users

```bash
# Run the populate script to add sample users
node scripts/populate-users.js
```

### 3. Test the APIs

```bash
# Start the development server
npm run dev

# In another terminal, run the API tests
./scripts/test-api.sh
```

### 4. Test Credentials

After running the populate script, you can test with:

- Email: `test@web3ssh.com`, UID: `TEST001`
- Email: `john.doe@example.com`, UID: `IIITS2025001`
- Email: `jane.smith@example.com`, UID: `IIITS2025002`

## 📋 API Usage Examples

### Verify User

```bash
curl -X POST http://localhost:3000/api/verify-participant \
  -H "Content-Type: application/json" \
  -d '{"email":"test@web3ssh.com","uid":"TEST001"}'
```

### Submit Project

```bash
curl -X POST http://localhost:3000/api/submit-project \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@web3ssh.com",
    "uid": "TEST001",
    "projectName": "My Awesome Project",
    "teamName": "Dream Team",
    "participantNames": ["Test User"],
    "description": "An innovative blockchain solution",
    "problemStatement": "Solving real-world problems",
    "solutionOverview": "Using cutting-edge technology",
    "technologiesUsed": ["React", "Node.js", "MongoDB"],
    "githubRepoLink": "https://github.com/user/project",
    "termsAccepted": true
  }'
```

### Get User's Project

```bash
curl -X POST http://localhost:3000/api/user-projects \
  -H "Content-Type: application/json" \
  -d '{"email":"test@web3ssh.com","uid":"TEST001"}'
```

### Get Project by ID

```bash
curl http://localhost:3000/api/projects/WEB3SSH_1719123456789_abc123def
```

## 🗂️ File Structure

```
src/
├── lib/
│   ├── mongodb.ts          # Mongoose connection
│   └── validation.ts       # Zod schemas
├── models/
│   ├── user.ts            # User model with TypeScript
│   ├── project.ts         # Project model with TypeScript
│   └── index.ts           # Model exports
├── types/
│   ├── models.ts          # Mongoose model interfaces
│   └── dashboard.ts       # API response types
└── app/api/
    ├── verify-participant/route.ts    # User verification
    ├── submit-project/route.ts        # Project submission
    ├── projects/[id]/route.ts         # Project CRUD
    ├── user-projects/route.ts         # User's projects
    └── hackathon-status/route.ts      # Status endpoint
```

## 🔄 Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, lowercase),
  uid: String (unique),
  createdAt: Date,
  updatedAt: Date
}
```

### Projects Collection

```javascript
{
  _id: ObjectId,
  email: String,
  uid: String,
  projectName: String,
  teamName: String,
  participantNames: [String],
  description: String,
  problemStatement: String,
  solutionOverview: String,
  technologiesUsed: [String],
  demoVideoLink: String,
  githubRepoLink: String,
  liveDemoLink: String,
  supportingFiles: [String],
  termsAccepted: Boolean,
  submissionId: String (unique, auto-generated),
  submissionTimestamp: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## ✨ Features

- ✅ Clean MongoDB models with Mongoose
- ✅ TypeScript support throughout
- ✅ User verification by email + UID
- ✅ Project CRUD operations
- ✅ Automatic submission ID generation
- ✅ Proper error handling and validation
- ✅ No mock data dependencies
- ✅ Ready for production deployment

## 🧪 Testing

The system is now ready for testing with real MongoDB data. All mock data has been removed and the API endpoints work with the actual database models.
