import mongoose, { Schema } from 'mongoose';
import { IProject, IProjectModel } from '../types/models';

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
projectSchema.index({ email: 1, uid: 1 });
projectSchema.index({ submissionTimestamp: -1 });

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

// Generate submission ID before saving
projectSchema.pre('save', function (next) {
  if (!this.submissionId) {
    this.submissionId = `WEB3SSH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

// Export the model
const Project =
  (mongoose.models.Project as IProjectModel) ||
  mongoose.model<IProject, IProjectModel>('Project', projectSchema);
export default Project;
