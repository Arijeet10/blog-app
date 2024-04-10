import mongoose,{Schema} from "mongoose";

const UserModel=new Schema({
    "username":{
        type:String,
        unique:true,
        required:true
    },
    "email":{
        type:String,
        unique:true,
        required:true,
    },
    "password":{
        type:String,
        required:true,
    }
});

const User=mongoose.models.User || mongoose.model("User",UserModel);

export default User;


