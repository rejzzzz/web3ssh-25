import mongoose, { Schema } from 'mongoose';
import { IProject, IProjectModel } from '../types/models';
import Counter from './counter';

const projectSchema = new Schema<IProject>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    uid: {
      type: String,
      required: true,
      trim: true,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    teamName: {
      type: String,
      trim: true,
    },
    tracks: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    participantNames: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    problemStatement: {
      type: String,
      required: true,
    },
    solutionOverview: {
      type: String,
      required: true,
    },
    technologiesUsed: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    demoVideoLink: {
      type: String,
      trim: true,
    },
    githubRepoLink: {
      type: String,
      required: true,
      trim: true,
    },
    liveDemoLink: {
      type: String,
      trim: true,
    },
    supportingFiles: [
      {
        type: String,
        validate: {
          validator: function (v: string) {
            // Validate Google Docs/Drive URLs
            const googleDocsRegex = /^https:\/\/(docs|drive)\.google\.com\/.+/;
            return !v || googleDocsRegex.test(v);
          },
          message:
            'Supporting files must be valid Google Docs or Google Drive links',
        },
      },
    ],
    termsAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
    submissionId: {
      type: String,
      unique: true,
    },
    submissionNumber: {
      type: Number,
      unique: true,
    },
    submissionTimestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'projects',
  },
);

// Indexes for better performance

// Static methods
projectSchema.statics.findByUser = function (email: string, uid: string) {
  return this.findOne({
    email: email.toLowerCase().trim(),
    uid: uid.trim(),
  });
};

projectSchema.statics.findBySubmissionId = function (submissionId: string) {
  return this.findOne({ submissionId });
};

// Generate submission ID and number before saving
projectSchema.pre('save', async function (next) {
  if (!this.submissionId) {
    this.submissionId = `WEB3SSH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  if (!this.submissionNumber) {
    try {
      // Use atomic counter to generate submission number
      // This prevents race conditions during concurrent submissions
      this.submissionNumber = await Counter.getNextSequence('submissionNumber');
    } catch (error) {
      console.error('Error generating submission number:', error);
      // Fallback: use timestamp-based number to ensure uniqueness
      this.submissionNumber = Date.now() % 1000000; // Last 6 digits of timestamp
    }
  }

  next();
});

// Export the model
const Project =
  (mongoose.models.Project as IProjectModel) ||
  mongoose.model<IProject, IProjectModel>('Project', projectSchema);
export default Project;
