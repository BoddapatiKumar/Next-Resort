const { default: mongoose } = require("mongoose")

const DBconnection = async () => {
    if (mongoose.connection.readyState === 1) {
      console.log('✅ Already connected to MongoDB');
      return;
    }
  
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ Connected to MongoDB');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
    }
  };
  

export default DBconnection;