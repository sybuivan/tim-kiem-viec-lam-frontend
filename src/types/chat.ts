export interface IRoom {
  id_user: string;
  id_company: string;
  id_room?: string;
  fullName?: string;
}

export interface IRoomList {
  rooms: IRoom[];
  total: number;
}

export interface IMessage {
  id_user: string;
  id_company: string;
  id_room: string;
  message: string;
  id_chat?: string;
  sender?: string;
  fullName?: string;
}

export interface IMessageList {
  messages: IMessage[];
  room: IRoom;
}
