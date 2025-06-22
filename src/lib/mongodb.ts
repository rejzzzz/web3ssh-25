import { MongoClient, Db } from 'mongodb';

// Skip MongoDB connection if using mock data
if (process.env.USE_MOCK_DATA !== 'true' && !process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/web3ssh_test';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Don't initialize MongoDB if using mock data
if (process.env.USE_MOCK_DATA === 'true') {
  // Create a dummy promise for mock mode
  clientPromise = Promise.reject(new Error('MongoDB disabled - using mock data'));
} else if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Database helper functions
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db('web3ssh_hackathon');
}

// Collection names
export const COLLECTIONS = {
  PARTICIPANTS: 'participants',
  SUBMISSIONS: 'submissions',
  HACKATHON_CONFIG: 'hackathon_config',
} as const;
