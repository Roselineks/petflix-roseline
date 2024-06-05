import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios-movies';
import { RootState } from '../index';
import { IMovieDetails } from './movieDetailsSlice';


const initialState:  { data: IMovieDetails[] } = {
  data: [],
}

// Ensure unique action identifiers for each thunk
export const getHorsesAsync = createAsyncThunk<IMovieDetails[], void, { state: RootState }>(
    'action/getActionMovies',
    async () => {
        const randomNum = Math.floor(Math.random() * 2) + 1;
        const response = await axios.get(`/api/horses/${randomNum}`);
        console.log("test", response.data);
        // Assurez-vous de ne retourner que la partie sérialisable de la réponse Axios
        return response.data;
    }
    );

const Horses = createSlice({
    name: 'actionMovie',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHorsesAsync.fulfilled, (state, { payload }) => {
            state.data = payload;
        });
        // Handle other states like pending and rejected if necessary
    },
});

export default Horses.reducer;