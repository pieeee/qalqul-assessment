import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@types";
import { v4 } from "uuid";
import { RootState } from "..";

interface IUserState {
  user?: IUser | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<Omit<IUser, "id">>) => {
      state.user = { id: v4(), ...action.payload };
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { saveUser, updateUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
