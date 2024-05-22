import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: false,
    error: null,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        updatePost: (state, action) => {
            state.posts = [action.payload, ...state.posts.filter(post => post.$id !== action.payload.$id)];
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { addPost, updatePost, setPosts, setLoading, setError } = postsSlice.actions;

export default postsSlice.reducer;
