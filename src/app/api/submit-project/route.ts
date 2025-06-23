import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from 'lib/mongodb';
import { submissionSchema } from 'lib/validation';
import { SubmissionResponse } from 'types/dashboard';
import User from 'models/user';
import Project from 'models/project';
import type { IUserModel, IProjectModel } from 'types/models';

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
          errors: validationResult.error.errors,
        },
        { status: 400 },
      );
    }

    const submissionData = validationResult.data;

    // Connect to database
    await connectToDatabase();

    // Verify user exists
    const user = await (User as IUserModel).findByEmailAndUID(
      submissionData.email,
      submissionData.uid,
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found. Please verify your credentials first.',
        },
        { status: 403 },
      );
    }

    // Check if user has already submitted a project
    const existingProject = await (Project as IProjectModel).findByUser(
      submissionData.email,
      submissionData.uid,
    );

    if (existingProject) {
      return NextResponse.json(
        {
          success: false,
          message:
            'You have already submitted a project. Multiple submissions are not allowed. If you have any queries, please contact the organizers.',
          existingProject: {
            submissionId: existingProject.submissionId,
            projectName: existingProject.projectName,
            submissionTimestamp: existingProject.submissionTimestamp,
          },
        },
        { status: 409 },
      );
    }

    // Create new project submission
    console.log('Creating project with data:', {
      email: submissionData.email,
      uid: submissionData.uid,
      projectName: submissionData.projectName,
      // ... other fields
    });

    const project = new Project({
      email: submissionData.email,
      uid: submissionData.uid,
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
      termsAccepted: submissionData.termsAccepted,
    });

    console.log('Project object before save:', project);

    // Save project (submissionId will be auto-generated)
    await project.save();

    console.log('Project saved successfully:', project.submissionId);

    // Return success response
    const response: SubmissionResponse = {
      success: true,
      message: 'Project submitted successfully!',
      submissionId: project.submissionId,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Project submission error:', error);
    console.error('Error name:', error?.name);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);

    // Check if it's a validation error
    if (error?.name === 'ValidationError') {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error: ' + error.message,
          details: error.errors,
        },
        { status: 400 },
      );
    }

    // Check if it's a duplicate key error (MongoDB)
    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message:
            'A project with this information already exists. Please check your submission or contact support.',
        },
        { status: 409 },
      );
    }

    // Check if it's a network/connection error
    if (
      error?.message?.includes('ECONNREFUSED') ||
      error?.message?.includes('timeout')
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Database connection error. Please try again in a moment.',
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          'Internal server error. Please try again later. If the problem persists, contact support.',
      },
      { status: 500 },
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
