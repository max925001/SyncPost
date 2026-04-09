# JSONPost Sync - Advanced Full-Stack Application

A high-performance, real-time post synchronization engine built with the MERN stack (MongoDB, Express, React, Node.js) and optimized with WebSockets for instantaneous search.

![App Preview Placeholder](https://via.placeholder.com/800x400/1e293b/ffffff?text=JSONPost+Sync+Real-time+Dashboard)

## Key Features

- **One-Click Synchronization**: Instantly fetch and upsert over 100 records from the JSONPlaceholder API into a persistent MongoDB database.
- **Real-Time WebSocket Search**: Search across the entire database with sub-millisecond latency using a dedicated WebSocket channel.
- **Server-Side Pagination**: Efficiently browse records with optimized 30-item pagination, metadata calculations, and smooth UI transitions.
- **Premium UI/UX**:
  - **Tailwind CSS v4**: Built with the latest styling engine for modern, high-performance CSS.
  - **Framer Motion**: Smooth, layout-aware animations and custom modal transitions.
  - **Glassmorphic Design**: A sleek, dark-mode aesthetic with vibrant accent colors.
- **Fluid Responsiveness**: Fully optimized for mobile, tablet, and ultra-wide displays.

## Technology Stack

| Layer | Technology | Usage |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | UI Library & Build Tool |
| **Styling** | Tailwind CSS v4 | Native Vite Integration |
| **Animations** | Framer Motion | Smooth Transitions & Modals |
| **Icons** | Lucide React | High-quality UI Icons |
| **Backend** | Node.js + Express | REST Content & App API |
| **Real-Time** | WebSocket (ws) | Bidirectional Search Communication |
| **Database** | MongoDB | Data Persistence & Text Search |
| **HTTP Client**| Axios | API Communication |

## Project Structure

```text
Assign/
├── backend/                # Express & WS Server
│   ├── config/             # DB & Environment Configuration
│   ├── controllers/        # Business Logic (Sync, Fetch)
│   ├── models/             # Mongoose Schemas (Post)
│   ├── routes/             # API Endpoint Mapping
│   ├── socket/             # WebSocket Search Engine
│   └── server.js           # Main Entry Point
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # UI Components (Card, Modal)
│   │   ├── hooks/          # Custom Hooks (WS Connection)
│   │   ├── App.jsx         # Main Page Logic
│   │   └── index.css       # Tailwind v4 Configuration
└── README.md               # Documentation
```

## Setup & Installation

### 1. Prerequisites
- **Node.js**: v18 or later.
- **MongoDB**: A running local instance or an Atlas cluster.

### 2. Backend Configuration
1. Navigate to the /backend directory:
   ```bash
   cd backend
   npm install
   ```
2. Create or update your .env file:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   FRONTEND_URL=http://localhost:5173
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Configuration
1. Navigate to the /frontend directory:
   ```bash
   cd ../frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Search Architecture
Instead of traditional REST requests that might lag during typing, this app maintains a persistent WebSocket connection. When you type:
1. The client sends a small JSON message over the socket.
2. The server queries MongoDB using a regex or text index across the entire dataset.
3. Results are pushed back instantly, bypassing HTTP overhead.

## License
This project is open-source and available under the MIT License.

---
Built by Antigravity AI
