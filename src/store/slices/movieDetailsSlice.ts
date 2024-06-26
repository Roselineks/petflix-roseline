import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from '../../axios-movies'
import { RootState } from '../index'

export interface IMovieDetails {
  nom_animal:string
  date_controle:string
  nom_adoptant:string
  adresse_adoptant: string
  nom_refuge:string
  id_type: number
  nom_type: string
  backdrop_path?: string
  poster_path?: string
  title?: any
  name?: any
  vote_average?: any
  release_date?: any
  first_air_date?: any
  runtime?: any
  episode_run_time?: any
  number_of_episodes?: any
  number_of_seasons?: any
  overview?: any
  nom_membre?: any
  prenom_membre?: any
  email_membre?: any
  tel_membre?: any
  genre_ids?: any
}

interface IInitialState {
  isLoading: boolean
  movieDetails: IMovieDetails
}

const media_type = {
  tv: 'tv',
  movie: 'movie',
}

const initialState: IInitialState = {
  isLoading: true,
  movieDetails: {
    nom_animal:'',
    date_controle:'',
    nom_adoptant:'',
    adresse_adoptant: '',
    nom_refuge:'',
    id_type: -1,
    nom_type: '',
    backdrop_path: '',
    poster_path: '',
    title: '',
    name: '',
    vote_average: '',
    release_date: '',
    first_air_date: '',
    runtime: '',
    episode_run_time: '',
    number_of_episodes: '',
    number_of_seasons: '',
    overview: '',
  },
}

export const getMovieDetailsAsync = createAsyncThunk<
  any,
  { mediaType: string; mediaId: string },
  { state: RootState }
>('movieDetails/getMovieDetailsAsync', async ({ mediaType, mediaId }) => {
  let urlPath
  if (mediaType === media_type.movie)
    urlPath = `/movie/${mediaId}?api_key=${process.env.API_KEY}`
  if (mediaType === media_type.tv)
    urlPath = `/tv/${mediaId}?api_key=${process.env.API_KEY}`
  const response = await axios.get(urlPath)
  return response.data
})

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieDetailsAsync.fulfilled, (state, { payload }) => {
      state.isLoading = false
      console.log('state ', state)
      console.log('payload', payload)
      state.movieDetails = payload
    })
    builder.addCase(getMovieDetailsAsync.pending, (state) => {
      state.isLoading = true
    })
  },
})

export default movieDetailsSlice.reducer
