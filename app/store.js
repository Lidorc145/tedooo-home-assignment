import {configureStore} from '@reduxjs/toolkit'
import postsReducer from './postsReducer'

export const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
})