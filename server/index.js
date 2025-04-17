const express = require('express');  // Import express module
const cors = require('cors');  // Import CORS module
const http = require('http');  // Needed to create an HTTP server
const { Server } = require('socket.io');
const { startDatabasePolling } = require('./jobs/databaseUpdates');

// Import route modules
const cleaningProtocolRoutes = require('./routes/cleaningProtocolRoutes');
const ppeDetailsRoutes = require('./routes/ppeDetailsRoutes');
const handHygieneRoutes = require('./routes/handHygieneDetailsRoutes');
const wasteDetailsRoutes = require('./routes/wasteDetailsRoutes');
const labDataRoutes = require('./routes/labDataRoutes');
const wardDataRoutes = require('./routes/wardDataRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const cleaningTimingsRoutes = require('./routes/cleaningTimingRoutes');  // Fixed typo here
const prioritiesRoutes = require('./routes/prioritiesRoutes');
const cleaningLogRoutes = require('./routes/cleaningLogRoutes');
const staffnformationRoutes = require('./routes/staffRoutes');

const app = express();  // Initialize the express app
app.use(express.json());  // Middleware for JSON parsing
app.use(cors());  // Middleware for CORS

// Define your API routes
app.use('/api', cleaningProtocolRoutes);
app.use('/api', ppeDetailsRoutes);
app.use('/api', handHygieneRoutes);
app.use('/api', wasteDetailsRoutes);
app.use('/api', labDataRoutes);
app.use('/api', wardDataRoutes);
app.use('/api', tasksRoutes);
app.use('/api', cleaningTimingsRoutes);
app.use('/api', prioritiesRoutes);
app.use('/api', cleaningLogRoutes);
app.use('/api', staffnformationRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
  }
});

io.on("connection", (socket) => {
  //console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

//console.log("Starting database polling...");
startDatabasePolling(io);

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});