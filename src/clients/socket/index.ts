import * as io from 'socket.io-client';
import { baseURL } from 'src/config';

export const socketIo = io.connect(baseURL);
