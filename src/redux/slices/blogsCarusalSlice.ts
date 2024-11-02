// store/blogsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import restEndPoints from "../../data/restEndPoints.json";
import { BlogCarausalData } from "../../types/types";
import axiosInstance from "../../utils/axiosInstance";

// Define the initial state interface
export interface BlogCarausalInitialStates {
  data: BlogCarausalData[];
  loading: boolean;
  error: string | null;
}

// Create the async thunk for fetching blogs
export const fetchBlogs = createAsyncThunk<BlogCarausalData[]>(
  "blogCarausal/fetchBlogs",
  async () => {
    const response = await axiosInstance.get(`/${restEndPoints.blogCarausal}`);
    return response.data;
  }
);

// Define the initial state
const initialState: BlogCarausalInitialStates = {
  data: [],
  loading: true,
  error: null,
};

// Create the slice
const blogsCarausalSlice = createSlice({
  name: "blogCarausal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBlogs.fulfilled,
        (state, action: PayloadAction<BlogCarausalData[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch blogs";
      });
  },
});

export default blogsCarausalSlice.reducer;
