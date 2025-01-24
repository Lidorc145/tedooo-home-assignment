import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
    loadedCount: 0,
    hasMore: true,
}

let isFetching = false;
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (skip = 0) => {
        if (isFetching) {
            throw new Error('Fetch already in progress');
        }
        isFetching = true;
        try {
            const response = await fetch(`${API_BASE_URL}/hw/feed.json?skip=${skip}`);
            let data = await response.json();
            if (!import.meta.env.DEV) {
                data = JSON.parse(data.contents);
            }
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
        toggleLike: (state, action) => {
            const post = state.posts.find(post => post.id === action.payload.id);
            if (post) {
                post.didLike = !post.didLike;
                post.likes += post.didLike ? 1 : -1;
            }
        },
        impression: (state, action) => {
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
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = [...state.posts, ...action.payload.data];
                state.loadedCount += action.payload.data.length;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
})

export const {toggleLike, impression} = postsSlice.actions
export default postsSlice.reducer