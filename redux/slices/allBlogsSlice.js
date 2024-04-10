import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState={
    allBlogs:[]
}

const url =process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/";


export const allBlogsAPI=createAsyncThunk("allBlogsAPI",async()=>{
    try {
        const res=await fetch(url+"api/blogs/all",{
            method:"GET",
            headers:{
                accept:"application/json"
            }
        });
        if(res.ok){
            const response=await res.json()
            console.log(response.message);
            return response.allBlogs;
        }
    } catch (error) {
        console.log("Error:",error);
    }
})

export const allBlogsSlice=createSlice({
    name:"allblogs",
    initialState,
    extraReducers:builder=>{
        builder.addCase(allBlogsAPI.fulfilled,(state,action)=>{
            state.allBlogs=action.payload;
        })
    }
})

export default allBlogsSlice.reducer;