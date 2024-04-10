import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const initialState={
    apiUserBlogData:[],
    //to get blogs of particular user
    userID:""
}
const url =process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/";

export const getAPIUserBlogs=createAsyncThunk("getAPIUserBlogs",async(userID)=>{
    try {
        //console.log(userID)
        const res=await fetch(url+"api/blogs/userblogs",{
            method:"POST",
            headers:{
                accept:"application/json"
            },
            body:JSON.stringify(userID)
        })
        const response=await res.json();
        //console.log(response);
        if(res.ok){
            return response;
        }else{
            return response.error;
        }
        
    } catch (error) {
        console.log("Error in fetching blogs",error)
    }
})

export const blogSlice=createSlice({
    name:"blogs",
    initialState,
    reducers:{
        getUserIDReducer:(state,action)=>{
            state.userID=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAPIUserBlogs.fulfilled,(state,action)=>{
            state.apiUserBlogData=action.payload
        })
    }
})

export const {getUserIDReducer}=blogSlice.actions;
export default blogSlice.reducer;