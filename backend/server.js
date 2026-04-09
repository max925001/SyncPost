console.log('--- STARTING SERVER PROCESS ---');
import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import connectDB from './config/db.js';
import postRoutes from './routes/post.routes.js';
import { handleSocketConnection } from './socket/socket.handler.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/posts', postRoutes);

// Create HTTP server for WebSocket integration
const server = createServer(app);

// WebSocket Server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  handleSocketConnection(ws);
});

// Start Server
server.listen(port, () => {
  console.log(`Backend Server running on port ${port}`);
  console.log(`WebSocket Server integrated with HTTP server`);
});
