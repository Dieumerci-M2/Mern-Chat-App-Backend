import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import * as socketIo from 'socket.io';
import userRoute from './Routes/UserRoute.js';
import chatRoute from './Routes/ChatRoute.js';
import messageRoute from './Routes/MessageRoute.js';
import notFound from './middlewares/errorMiddleware.js';
import ConnectionDB from './config/db.js';

const app = express();

const Port = process.env.Port || 6600;

dotenv.config();

ConnectionDB();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('API is Runnig verry Well');
});

app.options(/.*/, (req, res) => {
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Origin', `http://${req.hostname}:5173`);
  res.end();
});
app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/message', messageRoute);

app.use(notFound);

const server = http.createServer(app);

const io = new socketIo.Server(server, {
  setTimeout: 60000,
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  console.log('Connected to socket.io');
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected');

    socket.on('join chat', (room) => {
      socket.join(room);
      console.log(`User Joined Room: ${room}`);
    });
    socket.on('typing', (room) => socket.in(room).emit('typing'));
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    socket.on('new message', (newMessageRecieved) => {
      const { chat } = newMessageRecieved;

      if (!chat.users) return console.log('chat.users not defined');

      chat.users.forEach((user) => {
        if (user._id === newMessageRecieved.sender._id) return;

        socket.in(user._id).emit('message recieved', newMessageRecieved);
      });
    });

    socket.off('setup', () => {
      console.log('USER DISCONNECTED');
      socket.leave(userData._id);
    });
  });
});

const serverTest = app.listen(Port, () => console.log(`server is running to port http://localhost:${Port}`));

export default serverTest;