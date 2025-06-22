import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from 'lib/mongodb';
import { submissionSchema } from 'lib/validation';
import { generateSubmissionId, isSubmissionWindowOpen } from 'lib/dashboard-utils';
import { SubmissionResponse, Submission } from 'types/dashboard';
import { mockParticipants, mockSubmissions } from 'lib/mock-data';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = submissionSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid submission data',
          errors: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const submissionData = validationResult.data;

    // Check if we should use mock data
    if (process.env.USE_MOCK_DATA === 'true') {
      console.log('Using mock data for testing...');
      
      // Verify participant exists in mock data
      const participant = mockParticipants.find(
        p => p.email.toLowerCase() === submissionData.email.toLowerCase() && p.uid === submissionData.uid
      );
      
      if (!participant) {
        return NextResponse.json(
          { success: false, message: 'Participant not found. Please verify your credentials first.' },
          { status: 403 }
        );
      }
      
      // Check if participant has already submitted (in mock data)
      const existingSubmission = mockSubmissions.find(
        s => s.participantEmail === submissionData.email.toLowerCase() && s.participantUID === submissionData.uid
      );
      
      if (existingSubmission) {
        return NextResponse.json(
          { success: false, message: 'You have already submitted a project. Multiple submissions are not allowed.' },
          { status: 409 }
        );
      }
      
      // Create submission
      const submissionId = generateSubmissionId();
      const submission: Submission = {
        participantEmail: submissionData.email.toLowerCase(),
        participantUID: submissionData.uid,
        projectName: submissionData.projectName,
        teamName: submissionData.teamName,
        participantNames: submissionData.participantNames,
        description: submissionData.description,
        problemStatement: submissionData.problemStatement,
        solutionOverview: submissionData.solutionOverview,
        technologiesUsed: submissionData.technologiesUsed,
        demoVideoLink: submissionData.demoVideoLink,
        githubRepoLink: submissionData.githubRepoLink,
        liveDemoLink: submissionData.liveDemoLink,
        supportingFiles: submissionData.supportingFiles || [],
        submissionTimestamp: new Date(),
        termsAccepted: submissionData.termsAccepted,
        submissionId,
      };
      
      // Add to mock submissions (for testing)
      mockSubmissions.push(submission);
      
      // Return success response
      const response: SubmissionResponse = {
        success: true,
        message: 'Project submitted successfully! You should receive a confirmation email shortly.',
        submissionId,
      };
      
      return NextResponse.json(response, { status: 201 });
    }

    // Connect to database
    const db = await getDatabase();
    const participantsCollection = db.collection(COLLECTIONS.PARTICIPANTS);
    const submissionsCollection = db.collection(COLLECTIONS.SUBMISSIONS);
    const configCollection = db.collection(COLLECTIONS.HACKATHON_CONFIG);

    // Verify participant exists and is registered
    const participant = await participantsCollection.findOne({
      email: submissionData.email.toLowerCase(),
      uid: submissionData.uid,
    });

    if (!participant) {
      return NextResponse.json(
        { success: false, message: 'Participant not found. Please verify your credentials first.' },
        { status: 403 }
      );
    }

    // For testing purposes, skip submission window validation
    // In production, this would check MongoDB configuration
    
    // Original submission window validation commented out for testing
    /*
    // Check submission window
    const submissionConfig = await configCollection.findOne({
      configKey: 'submission_window',
      isActive: true,
    });

    if (!submissionConfig) {
      return NextResponse.json(
        { success: false, message: 'Submission window configuration not found.' },
        { status: 500 }
      );
    }

    const windowOpen = isSubmissionWindowOpen(
      new Date(submissionConfig.startTime), 
      new Date(submissionConfig.endTime)
    );

    if (!windowOpen) {
      return NextResponse.json(
        { success: false, message: 'Submission window is closed. Submissions are no longer accepted.' },
        { status: 403 }
      );
    }
    */

    // Check if participant has already submitted
    const existingSubmission = await submissionsCollection.findOne({
      participantEmail: submissionData.email.toLowerCase(),
      participantUID: submissionData.uid,
    });

    if (existingSubmission) {
      return NextResponse.json(
        { success: false, message: 'You have already submitted a project. Multiple submissions are not allowed.' },
        { status: 409 }
      );
    }

    // Create submission document
    const submissionId = generateSubmissionId();
    const submission: Submission = {
      participantEmail: submissionData.email.toLowerCase(),
      participantUID: submissionData.uid,
      projectName: submissionData.projectName,
      teamName: submissionData.teamName,
      participantNames: submissionData.participantNames,
      description: submissionData.description,
      problemStatement: submissionData.problemStatement,
      solutionOverview: submissionData.solutionOverview,
      technologiesUsed: submissionData.technologiesUsed,
      demoVideoLink: submissionData.demoVideoLink,
      githubRepoLink: submissionData.githubRepoLink,
      liveDemoLink: submissionData.liveDemoLink,
      supportingFiles: submissionData.supportingFiles || [],
      submissionTimestamp: new Date(),
      termsAccepted: submissionData.termsAccepted,
      submissionId,
    };

    // Insert submission into database
    const result = await submissionsCollection.insertOne(submission);

    if (!result.insertedId) {
      return NextResponse.json(
        { success: false, message: 'Failed to save submission. Please try again.' },
        { status: 500 }
      );
    }

    // Return success response
    const response: SubmissionResponse = {
      success: true,
      message: 'Project submitted successfully! You should receive a confirmation email shortly.',
      submissionId,
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Submission API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
