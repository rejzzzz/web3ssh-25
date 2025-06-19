// Types for Web3 Hackathon Dashboard

export interface Participant {
  _id?: string;
  email: string;
  uid: string;
  name: string;
  teamId?: string;
  teamName?: string;
  registeredAt: Date;
  isVerified: boolean;
}

export interface Submission {
  _id?: string;
  participantEmail: string;
  participantUID: string;
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
  submissionTimestamp: Date;
  termsAccepted: boolean;
  submissionId: string;
}

export interface HackathonConfig {
  _id?: string;
  configKey: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
}

export interface VerificationRequest {
  email: string;
  uid: string;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  participantInfo?: {
    name: string;
    teamId?: string;
    teamName?: string;
  };
}

export interface SubmissionRequest {
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
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
}

export interface DashboardState {
  isVerified: boolean;
  participantInfo: Participant | null;
  submissionStatus: 'idle' | 'loading' | 'success' | 'error';
  currentStep: 'info' | 'verify' | 'submit' | 'success';
  submissionWindow: {
    isOpen: boolean;
    startTime: Date | null;
    endTime: Date | null;
    timeRemaining: number;
  };
}

export interface HackathonInfo {
  name: string;
  dates: {
    start: Date;
    end: Date;
  };
  duration: string;
  theme: string;
  objectives: string[];
  schedule: ScheduleEvent[];
  rules: string[];
  judgingCriteria: JudgingCriterion[];
  resources: Resource[];
  faqs: FAQ[];
}

export interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  type: 'ceremony' | 'workshop' | 'mentorship' | 'deadline' | 'judging';
}

export interface JudgingCriterion {
  id: string;
  name: string;
  description: string;
  weight: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'documentation' | 'starter-kit' | 'api' | 'sponsor' | 'contact';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
