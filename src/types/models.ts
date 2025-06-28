import { Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Model<IUser> {
  findByEmailAndUID(email: string, uid: string): Promise<IUser | null>;
}

export interface IProject extends Document {
  email: string;
  uid: string;
  projectName: string;
  teamName?: string;
  participantNames: string[];
  description: string;
  problemStatement: string;
  solutionOverview: string;
  technologiesUsed: string[];
  demoVideoLink?: string;
  githubRepoLink: string;
  liveDemoLink?: string;
  supportingFiles: string[];
  termsAccepted: boolean;
  submissionId?: string;
  submissionNumber?: number;
  submissionTimestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProjectModel extends Model<IProject> {
  findByUser(email: string, uid: string): Promise<IProject | null>;
  findBySubmissionId(submissionId: string): Promise<IProject | null>;
}
