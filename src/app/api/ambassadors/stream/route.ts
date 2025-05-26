import { fetchAmbassadorsData } from '@utils/googleSheetsApi';

// Background data store
let cachedData: any = null;
let lastFetch = 0;
const FETCH_INTERVAL = 30000; // 30 seconds

// Background polling
const updateData = async () => {
  try {
    const { ambassadorsData, totalParticipantsInSheet } =
      await fetchAmbassadorsData();
    cachedData = {
      success: true,
      data: ambassadorsData,
      lastUpdated: new Date().toISOString(),
      totalAmbassadors: ambassadorsData.length,
      totalParticipantsInSheet,
      totalParticipantsWithReferrals: ambassadorsData.reduce(
        (sum, a) => sum + a.participants,
        0,
      ),
    };
    lastFetch = Date.now();
  } catch (error) {
    console.error('Background fetch error:', error);
  }
};

export async function GET(request: Request) {
  const encoder = new TextEncoder();

  // Return immediately during build to prevent timeouts
  if (process.env.NODE_ENV === 'production' && !cachedData) {
    return new Response('SSE not available during build', { status: 503 });
  }

  const stream = new ReadableStream({
    start(controller) {
      console.log('🔗 SSE Connection opened');

      // Send initial data if available
      if (cachedData) {
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(cachedData)}\n\n`),
          );
        } catch (err) {
          console.log('Initial send failed - controller closed');
        }
      }

      // Setup interval for updates (only in runtime, not build)
      let interval: NodeJS.Timeout;

      if (process.env.NODE_ENV !== 'production' || typeof window !== 'undefined') {
        interval = setInterval(async () => {
          // Check if controller is still open
          if (controller.desiredSize === null) {
            console.log('🔒 Controller closed, stopping interval');
            clearInterval(interval);
            return;
          }

          // Check if we need fresh data
          if (Date.now() - lastFetch > FETCH_INTERVAL) {
            await updateData();

            // Send data only if controller is still open
            if (cachedData && controller.desiredSize !== null) {
              try {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify(cachedData)}\n\n`),
                );
              } catch (err) {
                console.log('Send failed - controller closed, stopping interval');
                clearInterval(interval);
              }
            }
          }
        }, 1000);
      }

      // Cleanup on abort signal
      request.signal.addEventListener('abort', () => {
        console.log('🚪 Client disconnected, cleaning up');
        if (interval) clearInterval(interval);
        try {
          controller.close();
        } catch (err) {
          // Controller already closed
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
}
