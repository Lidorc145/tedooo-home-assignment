import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {PostsState, FetchPostsResponse, FetchPostsErrorResponse} from '../types/common';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState:PostsState = {
    posts: [],
    status: 'idle',
    error: null,
    loadedCount: 0,
    hasMore: true,
}

let isFetching = false;
export const fetchPosts = createAsyncThunk<FetchPostsResponse, number, { rejectValue: string }>(
    'posts/fetchPosts',
    async (skip: number = 0) => {
        if (isFetching) {
            throw new Error('Fetch already in progress');
        }
        isFetching = true;
        try {
            const response = await fetch(`${API_BASE_URL}/hw/feed.json?skip=${skip}`);
            let data = await response.json();
            data = JSON.parse(data['contents']);
            return data;
        } finally {
            isFetching = false;
        }
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        toggleLike: (state, action: PayloadAction<{ id: string }>) => {
            const post = state.posts.find(post => post.id === action.payload.id);
            if (post) {
                post.didLike = !post.didLike;
                post.likes += post.didLike ? 1 : -1;
            }
        },
        impression: (state, action: PayloadAction<{ id: string }>) => {
            const post = state.posts.find(post => post.id === action.payload.id);
            if (post && !post.impressionSent && !localStorage.getItem(`impression_sent_${post.id}`)) {
                localStorage.setItem(`impression_sent_${post.id}`, 'true');
                post.impressionSent = true;
                fetch(`https://backend.tedooo.com/?itemId=${post.id}`, {
                    method: 'GET',
                    mode: 'no-cors',
                    cache: 'no-cache',
                })
                    .then(() => {
                        console.log('impression sent for post id: ', post.id);
                    })
                    .catch(error => console.error('Error sending impression:', error));
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state:PostsState ) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state:PostsState, action: PayloadAction<FetchPostsResponse>) => {
                state.status = 'succeeded';
                state.posts = [...state.posts, ...action.payload.data];
                state.loadedCount += action.payload.data.length;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(fetchPosts.rejected, (state:PostsState,  action: FetchPostsErrorResponse) => {
                state.status = 'failed';
                state.error = action.error.message || 'Unknown error';
            });
    },
})

export const {toggleLike, impression} = postsSlice.actions
export default postsSlice.reducer