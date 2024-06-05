import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios-movies';  
import { IMovieDetails } from './movieDetailsSlice';
import { RootState } from '../index';

// Define the initial state of the animal types slice
const initialState:  { data: IMovieDetails[] } = {
    data: [],
  }
  

// Async thunk action for fetching animal types
export const getAnimalTypesAsync = createAsyncThunk<any[], void, { state: RootState }>(
  'animalType/getAnimalTypes',
  async () => {
    const response = await axios.get('/api/animal-types');
    // Return serializable part of the Axios response
    return response.data;
  }
);

// Slice for animal types
const animalTypeSlice = createSlice({
  name: 'animalType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAnimalTypesAsync.fulfilled, (state, { payload }) => {
        state.data = payload;
    });
    // Handle other states like pending and rejected if necessary
},
});

export default animalTypeSlice.reducer;
