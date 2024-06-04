import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const PORT = 4000;
const server = createServer(app);
app.use(cors());

const socketIO = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

socketIO.on('connection', (socket) => {
    console.log(` ${socket.id} user just connected!`);

    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
      });

    socket.on('newUser',(data)=>{
        users.push(data);
        socketIO.emit('newUserResponse',users);
    });
    socket.on('disconnect', () => {
        console.log(' A user disconnected');
        users = users.filter((user)=>user.socketID !== socket.id);
        socketIO.emit('newUserResponse',users);
        socket.disconnect();
    });
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
