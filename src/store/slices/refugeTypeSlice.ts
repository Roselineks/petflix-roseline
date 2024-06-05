import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios-movies';  
import { IMovieDetails } from './movieDetailsSlice';
import { RootState } from '../index';

// Define the initial state of the refuge types slice
const initialState:  { data: IMovieDetails[] } = {
    data: [],
  }
  

// Async thunk action for fetching refuge types
export const getRefugeTypesAsync = createAsyncThunk<any[], void, { state: RootState }>(
  'refugeType/getRefugeTypes',
  async () => {
    const response = await axios.get('/api/refugeS');
    // Return serializable part of the Axios response
    return response.data;
  }
);

// Slice for refuge types
const refugeTypeSlice = createSlice({
  name: 'refugeType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRefugeTypesAsync.fulfilled, (state, { payload }) => {
        state.data = payload;
    });
    // Handle other states like pending and rejected if necessary
},
});

export default refugeTypeSlice.reducer;
