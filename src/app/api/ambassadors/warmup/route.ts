import { NextResponse } from 'next/server';

/**
 * Warmup endpoint to pre-compile the API routes and establish connections
 */
export async function GET() {
    try {
        // Just return a simple response to warm up the server
        return NextResponse.json({
            success: true,
            message: 'API warmed up',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Warmup failed' },
            { status: 500 }
        );
    }
}
