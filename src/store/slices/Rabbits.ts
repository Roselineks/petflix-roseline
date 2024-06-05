import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios-movies';
import { RootState } from '../index';
import { IMovieDetails } from './movieDetailsSlice';


const initialState:  { data: IMovieDetails[] } = {
  data: [],
}

// Ensure unique action identifiers for each thunk
export const getRabbitsAsync = createAsyncThunk<IMovieDetails[], void, { state: RootState }>(
    'action/getActionMovies',
    async () => {
        const randomNum = Math.floor(Math.random() * 2) + 1;
        const response = await axios.get(`/api/rabbits/${randomNum}`);
        console.log("test", response);
        // Assurez-vous de ne retourner que la partie sérialisable de la réponse Axios
        return response.data;
    }
    );

const Rabbits = createSlice({
    name: 'actionMovie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRabbitsAsync.fulfilled, (state, { payload }) => {
            state.data = payload;
        });
        // Handle other states like pending and rejected if necessary
    },
});

export default Rabbits.reducer;