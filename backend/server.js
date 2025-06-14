const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const setupFormSocket = require('./socket/formSocket');

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

setupFormSocket(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    