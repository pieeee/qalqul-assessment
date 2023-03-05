import { createSlice } from "@reduxjs/toolkit";
import { IRegistrationModal } from "@types";
import { RootState } from "..";

const initialState: IRegistrationModal = {
  show: false,
};

export const registrationModalSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.show = !state.show;
    },
  },
});

export const { toggleModal } = registrationModalSlice.actions;

export const selectRegistrationModal = (state: RootState) =>
  state.registration.show;

export default registrationModalSlice.reducer;
