import * as io from 'socket.io-client';

export const socketIo = io.connect('http://localhost:5000');
