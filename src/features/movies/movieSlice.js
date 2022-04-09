import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi'
import { APIKey } from '../../common/apis/MovieApiKey'

export const fetchAsyncMovies = createAsyncThunk(
    "movies/fetchAsyncMovies",
    async () => {
        const movieText= "Harry";
        const response = await movieApi.get(
            `?apikey=${APIKey}&s=${movieText}&type=movie`
            )
      
      return response.data;
    }
)

export const fetchAsyncShows = createAsyncThunk(
    "movies/fetchAsyncShows",
    async () => {
        const seriesText= "Friends";
        const response = await movieApi.get(
            `?apikey=${APIKey}&s=${seriesText}&type=series`
            )
      
      return response.data;
    }
)

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    "movies/fetchAsyncMovieOrShowDetail",
    async (id) => {
        const response = await movieApi.get(
            `?apikey=${APIKey}&i=${id}&Plot=full`
            )
      
      return response.data;
    }
)

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {}
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovies: (state, { payload }) => {
            state.movies = payload
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("Pending")
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("Movies Fetched Successfully")
            return { ...state, movies: payload}
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected")
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("Shows Fetched Successfully")
            return { ...state, shows: payload}
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log("Shows Fetched Successfully")
            return { ...state, selectMovieOrShow: payload}
        }
    }
})

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export default movieSlice.reducer;