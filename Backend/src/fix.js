// fixMongoIndex.js
require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');

async function fixMongoIssues() {
  try {
    // MongoDB connect karein
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/CODEPULSE');
    console.log('📡 Connected to MongoDB');

    // 1. Index remove karein
    try {
      await mongoose.connection.collection('users').dropIndex('problemSolved_1');
      console.log('✅ problemSolved index removed');
    } catch (e) {
      console.log('ℹ️  Index not found or already removed');
    }

    // 2. Existing data fix karein
    const updateResult = await mongoose.connection.collection('users').updateMany(
      { 
        $or: [
          { problemSolved: { $exists: false } },
          { problemSolved: null },
          { problemSolved: undefined },
          { $and: [
            { problemSolved: { $exists: true } },
            { problemSolved: { $type: 'number' } } // Agar koi number mein hai to array mein convert karein
          ]}
        ]
      },
      { $set: { problemSolved: [] } }
    );
    console.log(`✅ ${updateResult.modifiedCount} users updated`);

    console.log('🎉 All issues fixed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixMongoIssues();