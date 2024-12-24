const WebSocket = require('ws');
const port = 'ws://localhost:5000/speed'
const socket = new WebSocket(port);

socket.on('open', () => {
    console.log('WebSocket connection established on port:', port);
});

socket.on('message', (data) => {
    console.log('Received:', JSON.parse(data));
});

socket.on('close', () => {
    console.log('WebSocket connection closed');
});

socket.on('error', (error) => {
    console.error('WebSocket error:', error);
});