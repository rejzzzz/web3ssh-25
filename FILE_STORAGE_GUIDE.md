# File Upload Integration Guide

## Current State
- File uploads are currently **simulated** in `/api/upload/route.ts`
- Returns placeholder URLs: `https://storage.web3ssh.dev/uploads/[fileId]_[filename]`
- Actual files are **NOT stored anywhere** yet

## Production File Storage Options

### Option 1: Cloudinary (Recommended)
```bash
# Add to .env.local
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Option 2: AWS S3
```bash
# Add to .env.local
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=web3ssh-hackathon-files
```

### Option 3: Google Cloud Storage
```bash
# Add to .env.local
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_KEYFILE=/path/to/service-account.json
GOOGLE_CLOUD_BUCKET=web3ssh-hackathon-files
```

## Data Storage Locations

### 1. File Storage (Cloud)
- **Participant uploaded files**: Cloud storage (Cloudinary/AWS/GCS)
- **File organization**: `/submissions/[submission-id]/[participant-uid]/[filename]`
- **Access**: Direct URLs stored in MongoDB

### 2. Metadata Storage (MongoDB)
- **Participant info**: `participants` collection
- **Submissions**: `submissions` collection
- **File URLs**: Stored as strings in `submissions.supportingFiles` array

### 3. Database Collections Structure

#### Participants Collection
```javascript
{
  _id: ObjectId,
  email: "user@example.com",
  uid: "participant-uid",
  name: "John Doe",
  teamId: "team-123",
  teamName: "Amazing Team",
  registeredAt: Date,
  isVerified: true
}
```

#### Submissions Collection
```javascript
{
  _id: ObjectId,
  participantEmail: "user@example.com",
  participantUID: "participant-uid",
  projectName: "My Web3 Project",
  teamName: "Amazing Team",
  participantNames: ["John Doe", "Jane Smith"],
  description: "Project description...",
  problemStatement: "Problem we're solving...",
  solutionOverview: "Our solution...",
  technologiesUsed: ["React", "Solidity", "IPFS"],
  demoVideoLink: "https://youtube.com/watch?v=...",
  githubRepoLink: "https://github.com/user/project",
  liveDemoLink: "https://project-demo.com",
  supportingFiles: [
    "https://res.cloudinary.com/web3ssh/raw/upload/v1/submissions/SUB123/project-doc.pdf",
    "https://res.cloudinary.com/web3ssh/raw/upload/v1/submissions/SUB123/additional-files.zip"
  ],
  submissionTimestamp: Date,
  termsAccepted: true,
  submissionId: "SUB-1234567890"
}
```

## File Size & Type Limits

### Current Limits (in /api/upload/route.ts)
- **Max file size**: 10MB per file
- **Allowed types**: 
  - Images: JPEG, PNG, GIF
  - Documents: PDF, DOC, DOCX, TXT
  - Archives: ZIP

### Recommended Production Limits
- **Individual file**: 50MB max
- **Total per submission**: 200MB max
- **Additional types**: MP4 (demo videos), PPT, XLS

## Security Considerations

### File Upload Security
1. **File type validation**: Check MIME types and file extensions
2. **Virus scanning**: Integrate with ClamAV or similar
3. **File size limits**: Prevent abuse
4. **Access control**: Signed URLs for private access
5. **Content filtering**: Block executable files

### Access Control
1. **Participant files**: Only accessible by participant and judges
2. **Judge access**: Temporary signed URLs during judging period
3. **Public demos**: Public access for demo videos/links only

## Implementation Status

### ✅ Completed
- File upload API structure
- Form validation
- File type restrictions
- MongoDB integration setup
- UI components for file upload

### ⏳ Pending (Current Placeholder Implementation)
- Actual cloud storage integration
- File size progress indicators
- Error handling for failed uploads
- File deletion/replacement capability
- Secure file access controls

## Next Steps to Enable Real File Storage

1. **Choose storage provider** (Cloudinary recommended)
2. **Set up cloud storage account**
3. **Configure environment variables**
4. **Replace placeholder code in `/api/upload/route.ts`**
5. **Test file upload flow**
6. **Set up file access controls**

## Cost Estimates (Monthly)

### Cloudinary
- **Free tier**: 25GB storage, 25GB bandwidth
- **Paid**: $99/month for 100GB storage, 100GB bandwidth

### AWS S3
- **Storage**: ~$2.30 per 100GB/month
- **Transfer**: ~$9.00 per 100GB/month
- **Requests**: ~$0.40 per 100K requests

### Google Cloud Storage
- **Storage**: ~$2.00 per 100GB/month
- **Transfer**: ~$12.00 per 100GB/month (first 1GB free)
