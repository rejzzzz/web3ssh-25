import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from 'lib/mongodb';
import { submissionSchema } from 'lib/validation';
import User from 'models/user';
import Project from 'models/project';
import type { IUserModel, IProjectModel } from 'types/models';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

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

    const updateData = validationResult.data;

    // Connect to database
    await connectToDatabase();

    // Verify user exists
    const user = await (User as IUserModel).findByEmailAndUID(
      updateData.email,
      updateData.uid,
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

    // Find project by submission ID and verify ownership
    const project = await (Project as IProjectModel).findBySubmissionId(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found.' },
        { status: 404 },
      );
    }

    // Verify user owns this project
    if (
      project.email !== updateData.email.toLowerCase() ||
      project.uid !== updateData.uid
    ) {
      return NextResponse.json(
        { success: false, message: 'You can only update your own projects.' },
        { status: 403 },
      );
    }

    // Update project
    const updatedProject = await Project.findByIdAndUpdate(
      project._id,
      {
        projectName: updateData.projectName,
        teamName: updateData.teamName,
        participantNames: updateData.participantNames,
        description: updateData.description,
        problemStatement: updateData.problemStatement,
        solutionOverview: updateData.solutionOverview,
        technologiesUsed: updateData.technologiesUsed,
        demoVideoLink: updateData.demoVideoLink,
        githubRepoLink: updateData.githubRepoLink,
        liveDemoLink: updateData.liveDemoLink,
        supportingFiles: updateData.supportingFiles || [],
        termsAccepted: updateData.termsAccepted,
      },
      { new: true },
    );

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, message: 'Failed to update project.' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully.',
      project: {
        submissionId: updatedProject.submissionId,
        projectName: updatedProject.projectName,
        teamName: updatedProject.teamName,
        updatedAt: updatedProject.updatedAt,
      },
    });
  } catch (error) {
    console.error('Project update error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error. Please try again later.',
      },
      { status: 500 },
    );
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // Connect to database
    await connectToDatabase();

    // Find project by submission ID
    const project = await (Project as IProjectModel).findBySubmissionId(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found.' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      project: {
        submissionId: project.submissionId,
        email: project.email,
        uid: project.uid,
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
    console.error('Project fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error. Please try again later.',
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // Parse request body for user verification
    const body = await request.json();
    const { email, uid } = body;

    if (!email || !uid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email and UID are required for verification.',
        },
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

    // Find project by submission ID and verify ownership
    const project = await (Project as IProjectModel).findBySubmissionId(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found.' },
        { status: 404 },
      );
    }

    // Verify user owns this project
    if (project.email !== email.toLowerCase() || project.uid !== uid) {
      return NextResponse.json(
        { success: false, message: 'You can only delete your own projects.' },
        { status: 403 },
      );
    }

    // Delete project
    await Project.findByIdAndDelete(project._id);

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    console.error('Project deletion error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error. Please try again later.',
      },
      { status: 500 },
    );
  }
}
