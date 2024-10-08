const mongoose = require('mongoose');

// Create a separate connection for each database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      /* useNewUrlParser: true,
      useUnifiedTopology: true, */
    });
    console.log('MongoDB child connected');
  } catch (error) {
    console.error('MongoDB child connection error:', error);
    process.exit(1);
  }
};

const connectParentDB = async () => {
  try {
    const parentDB = mongoose.createConnection(process.env.MONGO_PARENT_URI, {
      /* useNewUrlParser: true,
      useUnifiedTopology: true, */
    });
    console.log('MongoDB parent database connected');
    
    // You can return or export this connection if needed elsewhere
    return parentDB;
  } catch (error) {
    console.error('MongoDB parent database connection error:', error);
    process.exit(1);
  }
};

module.exports = { connectDB, connectParentDB };
