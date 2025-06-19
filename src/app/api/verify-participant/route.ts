import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, COLLECTIONS } from 'lib/mongodb';
import { verificationSchema } from 'lib/validation';
import { VerificationResponse } from 'types/dashboard';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const minute = 60 * 1000;
  const limit = 5; // 5 attempts per minute

  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + minute });
    return false;
  }

  if (record.count >= limit) {
    return true;
  }

  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many verification attempts. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = verificationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid input data',
          errors: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const { email, uid } = validationResult.data;

    // Connect to database
    const db = await getDatabase();
    const participantsCollection = db.collection(COLLECTIONS.PARTICIPANTS);

    // Find participant by email and UID
    const participant = await participantsCollection.findOne({
      email: email.toLowerCase(),
      uid: uid,
    });

    if (!participant) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email or UID. Please check your credentials or contact support.' 
        },
        { status: 401 }
      );
    }

    // Return success with participant info
    const response: VerificationResponse = {
      success: true,
      message: 'Participant verified successfully.',
      participantInfo: {
        name: participant.name,
        teamId: participant.teamId,
        teamName: participant.teamName,
      },
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Verification API error:', error);
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
