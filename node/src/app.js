import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 80;

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(express.static('src/ui'));


var lat = -6.910241336884786;
var long = 107.56719714121705;

io.on('connection', (socket) => {
    console.log('New Connection');

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
    socket.emit('lat',lat);
    socket.emit('long',long);
});

httpServer.listen(PORT, () => {
    console.log('Running on : ', httpServer.address());
});
