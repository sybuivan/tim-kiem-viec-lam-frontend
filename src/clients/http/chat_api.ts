import { IMessageList, IRoom, IRoomList, IMessage } from 'src/types/chat';
import { createClient } from './axios_client';

const client = createClient();

export const chatApi = {
  createRoom: (data: IRoom) => {
    return client.post<{ room: IRoom }>(`/chat/create-room`, data);
  },
  getRoom: (id_user: string, id_role: string) => {
    return client.get<IRoomList>(`/chat/get-room/${id_user}/${id_role}`);
  },
  getMessages: (id_room: string, id_role: string) => {
    return client.get<IMessageList>(`/chat/get-messages/${id_room}/${id_role}`);
  },

  createMessage: (data: IMessage) => {
    return client.post<{ message: IMessage }>(`/chat/chat-message`, data);
  },
  createNewMessage: (data: IMessage) => {
    return client.post<{ message: IMessage }>(`/chat/chat-new-message`, data);
  },
};
