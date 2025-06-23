import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;

declare global {
  var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

let cached = global._mongoosePromise;

if (!cached) {
  cached = global._mongoosePromise = mongoose.connect(uri);
}

export async function connectToDatabase() {
  return cached;
}
