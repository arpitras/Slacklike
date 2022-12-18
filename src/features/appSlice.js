import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    roomId: null,
    name: null,
    key: ""
  },

  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
      state.name = action.payload.name;
      state.key = action.payload.key;
      state.value += 1;
    },


  },
});

export const { enterRoom } = appSlice.actions;

export const selectRoomId = (state) => {
  return {
    roomId: state.app.roomId,
    name: state.app.name,
    key: state.app.key
  }
};


export default appSlice.reducer;
