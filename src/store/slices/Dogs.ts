import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios-movies';
import { RootState } from '../index';
import { IMovieDetails } from './movieDetailsSlice';
import exp from 'constants';


const initialState:  { data: IMovieDetails[] } = {
  data: [],
}

// Ensure unique action identifiers for each thunk
export const getDogsAsync = createAsyncThunk<IMovieDetails[], void, { state: RootState }>(
    'action/getActionMovies',
    async () => {
        const randomNum = Math.floor(Math.random() * 2) + 1;
        const response = await axios.get(`/api/dogs/${randomNum}`);
        console.log("test", response.data);
        // Assurez-vous de ne retourner que la partie sérialisable de la réponse Axios
        return response.data;
    }
    );


const Dogs = createSlice({
    name: 'actionMovie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDogsAsync.fulfilled, (state, { payload }) => {
            state.data = payload;
        });
        // Handle other states like pending and rejected if necessary
    },
});

export default Dogs.reducer;