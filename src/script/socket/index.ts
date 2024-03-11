import { Manager } from 'socket.io-client';
import { BASE_URL } from '../constants';
import { BaseRoutes } from '../../public-common/enums/routes/base-routes.enum';
import { MessagesRoutesEnum } from '../../public-common/enums/routes/messages-routes.enum';

const manager = new Manager(BASE_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
  transports: ['websocket'],
});

export const socket = manager.socket(`${BaseRoutes.V1}/${MessagesRoutesEnum.BasePrefix}`);

socket.on('connect', () => {
  console.log('connect');
});

socket.on('disconnect', () => {
  console.log('disconnect');
});
