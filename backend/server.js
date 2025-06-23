import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from "http";
import connectDB from './lib/db.js';

// Create an Express app and an HTTP server
const app = express();
const server = http.createServer(app);

// Middleware setup
app.use(cors());
app.use(express.json());

app.use("/api/status", (req, res) => {
    res.send("Server is live");
});

// Connect to MongoDB using Mongoose
const startServer = async () => {
  try {
    await connectDB();
    
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();