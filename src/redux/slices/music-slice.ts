import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type musicType } from "../../types/music";

type MusicState = {
  music: musicType;
};

const initialState = {} as MusicState;

export const musicSlice = createSlice({
  name: "Messages",
  initialState,
  reducers: {
    setMusic: (state, action: PayloadAction<MusicState["music"]>) => {
      state.music = action.payload;
    },
  },
});

export const { setMusic } = musicSlice.actions;
export default musicSlice.reducer;
