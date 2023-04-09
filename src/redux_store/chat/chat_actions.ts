import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatApi } from 'src/clients/http/chat_api';
import { IMessageList, IRoom, IRoomList, IMessage } from 'src/types/chat';
import { toastMessage } from 'src/utils/toast';

export const createRoom = createAsyncThunk<{ room: IRoom }, IRoom>(
  'chat/createRoom',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await chatApi.createRoom(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const getRoom = createAsyncThunk<
  IRoomList,
  { id_user: string; id_role: string }
>('chat/getRoom', async ({ id_user, id_role }, { rejectWithValue }) => {
  try {
    const { data } = await chatApi.getRoom(id_user, id_role);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});

export const getMessages = createAsyncThunk<IMessageList, string>(
  'chat/getMessages',
  async (id_room, { rejectWithValue }) => {
    try {
      const { data } = await chatApi.getMessages(id_room);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const createMessage = createAsyncThunk<{ message: IMessage }, IMessage>(
  'chat/createMessage',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await chatApi.createMessage(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
