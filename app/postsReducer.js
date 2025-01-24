import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
    posts: [],
    status: 'idle',
    error: null,
    loadedCount: 0,
    hasMore: true,
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (skip = 0) => {
        const response = await fetch(`${API_BASE_URL}/hw/feed.json?skip=${skip}`);
            let data = await response.json();
            if(!import.meta.env.DEV){
                data=JSON.parse(data.contents);
            }

            return data;
    }
);
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        toggleLike: (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            if(state.posts[index].didLike){
                state.posts[index].didLike=false;
                state.posts[index].likes--;
            }else{
                state.posts[index].didLike=true;
                state.posts[index].likes++;
            }
        },
        impression: (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            const itemId = state.posts[index].id;
            if(!state.posts[index].impressionSent) {
                state.posts[index].impressionSent=true;
                fetch(`${API_BASE_URL}/Impression/?itemId=${itemId}`,{
                    method: 'GET',
                    mode: 'no-cors',
                    cache: 'no-cache'
                })
                    .then(response => {
                        if (response.ok) {

                            localStorage.setItem(`impression_sent_${itemId}`, 'true');
                        } else {
                            console.error("Failed to send impression.");
                        }
                    })
                    .catch(error => console.error("Error:", error));

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
                state.posts = [...state.posts, ...action.payload.data]; // הוספת הפוסטים החדשים ל-Redux state
                state.loadedCount += action.payload.data.length; // עדכון המונה
                state.hasMore=action.payload.hasMore;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
})

// Action creators are generated for each case reducer function
export const { toggleLike, impression } = postsSlice.actions

export default postsSlice.reducer