const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
  }
});

// Handle incoming socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle real-time data updates
  socket.on('dataUpdate', (data) => {
    console.log('Received data update:', data);

    // Process the data and send updates to other clients
    // ...
    // io.emit('dataUpdate', processedData);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(3000, () => {
  console.log('Server is running on port 3000');
});