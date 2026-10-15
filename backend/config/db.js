import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-resume-parser';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 5000,
    });

    isConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${uri}: ${error.message}`);
    console.warn(`[MongoDB Note] The Express server will continue running. Resume comparison operations work in memory, and results will be saved to MongoDB once the database is active.`);
  }

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.warn('[MongoDB] Disconnected from database.');
  });

  mongoose.connection.on('reconnected', () => {
    isConnected = true;
    console.log('[MongoDB] Reconnected to database.');
  });
}

export function isDbConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}
