import {configureStore} from "@reduxjs/toolkit";
import profileSlice from "./slices/profileSlice";
import blogSlice from "./slices/blogSlice";
import allBlogsSlice from "./slices/allBlogsSlice";

export const store=configureStore({
    reducer:{
        profileSlice,
        blogSlice,
        allBlogsSlice
    }
});