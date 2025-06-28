import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from 'lib/mongodb';
import User from 'models/user';
import Project from 'models/project';
import type { IUserModel, IProjectModel } from 'types/models';

export async function POST(request: NextRequest) {
  try {
    // Parse request body for user verification
    const body = await request.json();
    const { email, uid } = body;

    if (!email || !uid) {
      return NextResponse.json(
        { success: false, message: 'Email and UID are required.' },
        { status: 400 },
      );
    }

    // Connect to database
    await connectToDatabase();

    // Verify user exists
    const user = await (User as IUserModel).findByEmailAndUID(email, uid);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found. Please verify your credentials first.',
        },
        { status: 403 },
      );
    }

    // Find user's project
    const project = await (Project as IProjectModel).findByUser(email, uid);

    if (!project) {
      return NextResponse.json({
        success: true,
        message: 'No projects found.',
        project: null,
      });
    }

    return NextResponse.json({
      success: true,
      project: {
        submissionId: project.submissionId,
        projectName: project.projectName,
        teamName: project.teamName,
        participantNames: project.participantNames,
        description: project.description,
        problemStatement: project.problemStatement,
        solutionOverview: project.solutionOverview,
        technologiesUsed: project.technologiesUsed,
        demoVideoLink: project.demoVideoLink,
        githubRepoLink: project.githubRepoLink,
        liveDemoLink: project.liveDemoLink,
        supportingFiles: project.supportingFiles,
        termsAccepted: project.termsAccepted,
        submissionTimestamp: project.submissionTimestamp,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
    });
  } catch (error) {
    console.error('User projects fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error. Please try again later.',
      },
      { status: 500 },
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed. Use POST with email and uid in body.' },
    { status: 405 },
  );
}
