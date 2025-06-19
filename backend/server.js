const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./database/db");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const userRoutes = require("./routes/userRoutes");
const incRoutes = require("./routes/incidentRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const chatRoutes = require('./routes/chatRoutes')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// Test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

// Define the path to social media app build
const socialMediaAppPath = path.join(__dirname, '../social_media_app/client/build');
const indexPath = path.join(socialMediaAppPath, 'index.html');

// Setup social media app routes
const setupSocialMediaApp = () => {
  // Check if social media app build exists
  if (fs.existsSync(indexPath)) {
    console.log('✅ Social Media App build found at:', socialMediaAppPath);
    console.log('✅ Index file found at:', indexPath);
    
    // Serve static files from the social media app build directory
    app.use('/social-media-app', express.static(socialMediaAppPath));
    
    // Route to serve the social media app index.html for all routes
    app.get('/social-media-app*', (req, res) => {
      console.log('✅ Serving Social Media App route:', req.path);
      res.sendFile(indexPath);
    });
    
    // Test route for social media app
    app.get('/social-media-app-test', (req, res) => {
      res.json({ 
        message: 'Social Media App route is working!',
        buildPath: socialMediaAppPath,
        indexPath: indexPath,
        exists: fs.existsSync(indexPath)
      });
    });
  } else {
    console.log('❌ Social Media App build not found at:', socialMediaAppPath);
    console.log('Please run: cd social_media_app/client && npm run build');
  }
};

const start = async () => {
  try {
    // Try to connect to MongoDB, but don't fail if it doesn't work
    try {
      await connectDB(process.env.MONGO_URL);
      console.log(`Mongo Connected!!!`);
    } catch (dbError) {
      console.log('⚠️ MongoDB connection failed:', dbError.message);
      console.log('⚠️ Server will start without database connection');
    }
    
    // Setup social media app routes
    setupSocialMediaApp();
    
    // Setup API routes
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/incidents", incRoutes);
    app.use("/api/v1/emergency", emergencyRoutes);
    app.use('/api/v1/chats',chatRoutes)
    
    app.use(errorHandler);
    
    app.listen(port, () => {
      console.log(`Server started on ${port}`);
      console.log(`Social Media App available at: http://localhost:${port}/social-media-app`);
    });
  } catch (err) {
    console.log('Server startup error:', err);
  }
};

start();
