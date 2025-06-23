import { z } from 'zod';

// Participant verification schema
export const verificationSchema = z.object({
  email: z.string().email('Invalid email format'),
  uid: z.string().min(1, 'UID is required').max(100, 'UID too long'),
});

// Project submission schema
export const submissionSchema = z.object({
  email: z.string().email('Invalid email format'),
  uid: z.string().min(1, 'UID is required'),
  projectName: z
    .string()
    .min(1, 'Project name is required')
    .max(200, 'Project name too long'),
  teamName: z.string().max(200, 'Team name too long').optional(),
  participantNames: z
    .array(z.string().min(1, 'Participant name cannot be empty'))
    .min(1, 'At least one participant required'),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(5000, 'Description too long'),
  problemStatement: z
    .string()
    .min(20, 'Problem statement must be at least 20 characters')
    .max(2000, 'Problem statement too long'),
  solutionOverview: z
    .string()
    .min(20, 'Solution overview must be at least 20 characters')
    .max(2000, 'Solution overview too long'),
  technologiesUsed: z
    .array(z.string().min(1, 'Technology name cannot be empty'))
    .min(1, 'At least one technology required'),
  demoVideoLink: z
    .string()
    .url('Invalid demo video URL')
    .optional()
    .or(z.literal('')),
  githubRepoLink: z.string().url('Invalid GitHub repository URL'),
  liveDemoLink: z
    .string()
    .url('Invalid live demo URL')
    .optional()
    .or(z.literal('')),
  supportingFiles: z
    .array(
      z
        .string()
        .url(
          "Invalid Google Docs URL. Please ensure it's a valid Google Docs/Drive link",
        ),
    )
    .optional()
    .default([]),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, 'You must accept the terms and conditions'),
});

// File upload schema
export const fileUploadSchema = z.object({
  fileName: z.string().min(1, 'File name is required'),
  fileType: z.string().min(1, 'File type is required'),
  fileSize: z
    .number()
    .max(10 * 1024 * 1024, 'File size must be less than 10MB'), // 10MB limit
});

// Hackathon config schema
export const hackathonConfigSchema = z.object({
  configKey: z.string().min(1, 'Config key is required'),
  startTime: z.date(),
  endTime: z.date(),
  isActive: z.boolean(),
});

export type VerificationInput = z.infer<typeof verificationSchema>;
export type SubmissionInput = z.infer<typeof submissionSchema>;
export type FileUploadInput = z.infer<typeof fileUploadSchema>;
export type HackathonConfigInput = z.infer<typeof hackathonConfigSchema>;
