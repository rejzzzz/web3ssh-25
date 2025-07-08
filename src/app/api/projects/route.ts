import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from 'lib/mongodb';
import Project from 'models/project';
import type { IProjectModel } from 'types/models';

export async function GET() {
  try {
    // Connect to database
    await connectToDatabase();

    // Get all projects, sorted by submission number (or creation date)
    const projects = await (Project as IProjectModel)
      .find({})
      .sort({ submissionNumber: 1 }) // Sort by submission number ascending
      .lean(); // Use lean() for better performance

    // Return success response with all projects
    return NextResponse.json(
      {
        success: true,
        message: `Found ${projects.length} projects`,
        count: projects.length,
        projects: projects,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Get projects API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch projects. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: 500 },
    );
  }
}

// Optional: Add filtering and pagination support
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page = 1, limit = 10, track, search } = body;

    // Connect to database
    await connectToDatabase();

    // Build query filters
    const query: any = {};

    // Filter by track if provided
    if (track && track !== 'all') {
      query.tracks = { $in: [track] };
    }

    // Search in project name, team name, or participant names
    if (search) {
      query.$or = [
        { projectName: { $regex: search, $options: 'i' } },
        { teamName: { $regex: search, $options: 'i' } },
        { participantNames: { $regex: search, $options: 'i' } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get projects with pagination
    const [projects, totalCount] = await Promise.all([
      (Project as IProjectModel)
        .find(query)
        .sort({ submissionNumber: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      (Project as IProjectModel).countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      {
        success: true,
        message: `Found ${projects.length} projects`,
        projects: projects,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Get projects with filters API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch projects. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error : undefined,
      },
      { status: 500 },
    );
  }
}
