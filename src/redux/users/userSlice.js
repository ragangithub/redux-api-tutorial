import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const url = "https://randomuser.me/api/?results=5";

const initialState = {
  users: [],
  isLoading: true,
  error: "",
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data.results;
  } catch (error) {
    return isRejectedWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
