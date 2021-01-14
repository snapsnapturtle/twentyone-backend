import ioServer from 'socket.io';
import { server } from './express';

// @ts-ignore
export const io = ioServer(server, {
    cors: {
        origin: '*'
    }
});
