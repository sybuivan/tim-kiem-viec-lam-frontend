export interface IRoom {
  id_user: string;
  id_company: string;
  id_room?: string;
  fullName?: string;
  message?: string;
  created_at?: string;
  avatar?: string;
  logo?: string;
  name_job?: string;
  id_job?: string;
}

export interface IRoomList {
  rooms: IRoom[];
  total: number;
}

export interface IMessage {
  id_user: string;
  id_company: string;
  message: string;
  id_chat?: string;
  sender?: 'user' | 'company';
  id_room?: string;
  fullName?: string;
  created_at?: string;
  id_job?: string;
}

export interface IMessageList {
  messages: IMessage[];
  room: IRoom;
}

export interface IMessageJob {
  id_company: string;
  id_user: string;
  id_job: string;
  logo: string;
  name_company: string;
  name_job: string;
}
