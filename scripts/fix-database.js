#!/usr/bin/env node

import mongoose from 'mongoose';

async function fixDatabase() {
  try {
    // Connect to MongoDB
    const MONGODB_URI =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/web3ssh';
    console.log('Connecting to MongoDB:', MONGODB_URI);

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Get the projects collection
    const db = mongoose.connection.db;
    const projectsCollection = db.collection('projects');

    // Check existing indexes
    console.log('\n=== Current indexes ===');
    const indexes = await projectsCollection.listIndexes().toArray();
    indexes.forEach((index) => {
      console.log(`Index: ${index.name}`, index.key);
    });

    // Drop problematic indexes
    console.log('\n=== Fixing indexes ===');

    try {
      // Drop the problematic submissionNumber index if it exists
      await projectsCollection.dropIndex('submissionNumber_1');
      console.log('✓ Dropped submissionNumber_1 index');
    } catch (error) {
      console.log('submissionNumber_1 index does not exist or already dropped');
    }

    // Check if there are duplicate submissionId indexes
    const submissionIdIndexes = indexes.filter(
      (index) => index.name.includes('submissionId') && index.name !== '_id_',
    );

    if (submissionIdIndexes.length > 1) {
      console.log('Found duplicate submissionId indexes, cleaning up...');
      for (const index of submissionIdIndexes.slice(1)) {
        try {
          await projectsCollection.dropIndex(index.name);
          console.log(`✓ Dropped duplicate index: ${index.name}`);
        } catch (error) {
          console.log(`Failed to drop ${index.name}:`, error.message);
        }
      }
    }

    // Clear any existing projects with null submissionNumber
    console.log('\n=== Cleaning data ===');
    const deleteResult = await projectsCollection.deleteMany({
      submissionNumber: null,
    });
    console.log(
      `✓ Deleted ${deleteResult.deletedCount} projects with null submissionNumber`,
    );

    // Remove any projects without proper submissionId
    const deleteResult2 = await projectsCollection.deleteMany({
      submissionId: { $exists: false },
    });
    console.log(
      `✓ Deleted ${deleteResult2.deletedCount} projects without submissionId`,
    );

    // Show final indexes
    console.log('\n=== Final indexes ===');
    const finalIndexes = await projectsCollection.listIndexes().toArray();
    finalIndexes.forEach((index) => {
      console.log(`Index: ${index.name}`, index.key);
    });

    console.log('\n✅ Database cleanup completed successfully!');
  } catch (error) {
    console.error('❌ Database cleanup failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

fixDatabase();
