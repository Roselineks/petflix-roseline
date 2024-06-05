import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios-movies';  
import { IMovieDetails } from './movieDetailsSlice';
import { RootState } from '../index';

// Define the initial state of the control types slice
const initialState:  { data: IMovieDetails[] } = {
    data: [],
  }
  

// Async thunk action for fetching control types
export const getControlsAsync = createAsyncThunk<any[], void, { state: RootState }>(
  'controlType/getControls',
  async () => {
    const response = await axios.get('/api/controls');
    // Return serializable part of the Axios response
    return response.data;
  }
);

// Slice for control types
const controlTypeSlice = createSlice({
  name: 'controlType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getControlsAsync.fulfilled, (state, { payload }) => {
        state.data = payload;
    });
    // Handle other states like pending and rejected if necessary
},
});

export default controlTypeSlice.reducer;
