import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserDetails } from "../../types/types";

interface UserState {
  user: UserDetails | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<UserDetails | null>) {
      state.user = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
