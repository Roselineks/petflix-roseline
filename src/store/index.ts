import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import ReadyAdopt from './slices/ReadyAdopt'
import searchMovie from './slices/searchSlice'
import MovieDetailsReducer from './slices/movieDetailsSlice'
import Dogs from './slices/Dogs'
import Cats from './slices/Cats'
import Horses from './slices/Horses'
import Rodents from './slices/Rodents'
import Rabbits from './slices/Rabbits'
import Birds from './slices/Birds'
import animalTypeSlice from './slices/animalTypeSlice'
import refugeTypeSlice from './slices/refugeTypeSlice'
import controlSlice from './slices/controlSlice'

export const store = configureStore({
  reducer: {
    ReadyAdopt: ReadyAdopt,
    searchMovie: searchMovie,
    movieDetails: MovieDetailsReducer,
    Dogs: Dogs,
    Cats: Cats,
    Horses: Horses,
    Rodents: Rodents,
    Rabbits: Rabbits,
    Birds: Birds,
    animalTypeSlice:animalTypeSlice,
    refugeTypeSlice:refugeTypeSlice,
    controlSlice:controlSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
