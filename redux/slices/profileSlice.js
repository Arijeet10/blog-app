import {createSlice} from "@reduxjs/toolkit";

const initialState={
    profileData:{}
}

export const profileSlice=createSlice({
    name:"profile",
    initialState,
    reducers:{
        addProfileReducer:(state,action)=>{
            //console.log(action.payload);
            state.profileData=action.payload;
        },
        removeProfileReducer:(state,action)=>{
            state.profileData=action.payload;
        }
    }
})

export const {addProfileReducer,removeProfileReducer}=profileSlice.actions;
export default profileSlice.reducer;