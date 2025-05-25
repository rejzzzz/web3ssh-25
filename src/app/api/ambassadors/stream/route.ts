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

  const stream = new ReadableStream({
    start(controller) {
      console.log('🔗 SSE Connection opened');

      // Fetch initial data if needed
      if (!cachedData || Date.now() - lastFetch > FETCH_INTERVAL) {
        updateData().then(() => {
          // Send initial data after fetch
          if (cachedData && !controller.desiredSize === null) {
            try {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(cachedData)}\n\n`),
              );
            } catch (err) {
              console.log('Initial send failed - controller closed');
            }
          }
        });
      } else if (cachedData) {
        // Send cached data immediately
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(cachedData)}\n\n`),
          );
        } catch (err) {
          console.log('Initial cached send failed - controller closed');
        }
      }

      // Setup interval for updates
      const interval = setInterval(async () => {
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
              console.log(
                '📡 Send failed - controller closed, stopping interval',
              );
              clearInterval(interval);
            }
          }
        }
      }, 1000);

      // Cleanup on abort signal (when client disconnects)
      request.signal.addEventListener('abort', () => {
        console.log('🚪 Client disconnected, cleaning up');
        clearInterval(interval);
        try {
          controller.close();
        } catch (err) {
          // Controller might already be closed
        }
      });

      // Auto-cleanup after 5 minutes
      const cleanup = setTimeout(() => {
        console.log('⏰ 5-minute timeout, closing connection');
        clearInterval(interval);
        try {
          controller.close();
        } catch (err) {
          // Controller might already be closed
        }
      }, 300000);

      // Clear timeout if connection ends early
      request.signal.addEventListener('abort', () => {
        clearTimeout(cleanup);
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
