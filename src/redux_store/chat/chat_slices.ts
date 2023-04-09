import { createSlice } from '@reduxjs/toolkit';
import { IRoomList, IMessageList, IRoom } from 'src/types/chat';
import {
  createRoom,
  getRoom,
  getMessages,
  createMessage,
} from './chat_actions';

interface IChatSlice {
  roomList: IRoomList;
  messageList: IMessageList;
  selectedRoom: IRoom;
}

const initialState: IChatSlice = {
  roomList: {
    rooms: [],
    total: 0,
  },
  messageList: {
    messages: [],
    room: {
      id_company: '',
      id_user: '',
      fullName: '',
      id_room: '',
    },
  },
  selectedRoom: {
    id_company: '',
    id_user: '',
    fullName: '',
    id_room: '',
  },
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUserRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },

    setMessageList: (state, action) => {
      state.messageList.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRoom.fulfilled, (state, action) => {
      const payload = action.payload.room;
      state.roomList.rooms.push(payload);
    });
    builder.addCase(getRoom.fulfilled, (state, action) => {
      state.roomList = action.payload;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messageList = action.payload;
    });
    builder.addCase(createMessage.fulfilled, (state, action) => {
      // state.messageList.messages.push(action.payload.message);
    });
  },
});

const { actions, reducer } = chatSlice;
export const { setUserRoom, setMessageList } = actions;
export default reducer;
