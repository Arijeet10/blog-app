import Blog from "@/utils/libs/models/blogsModel";
import User from "@/utils/libs/models/userModel";
import { connectMongoDB } from "@/utils/libs/mongodb";
import {NextResponse} from "next/server";

connectMongoDB();

//create new blogs
export async function POST(req){
    try {
        const body=await req.json();
        const {userID,author,blogTitle,blogData,blogCategory,blogThumbnail}=body;
        //console.log(body);
        if(!userID){
            return NextResponse.json({error:"No user id given"},{status:404});
        }
        //check if user profile exists
        const user=await User.findOne({_id:userID});
        // console.log(user)
        if(!user){
            return NextResponse.json({error:"No profile found, register an account before creating blogs"},{status:404});
        }
        if(!blogTitle||!blogData){
            return NextResponse.json({error:"Data is empty"},{status:404});
        }

        //console.log(userID,author,blogTitle,blogData,blogCategory)
        const newBlog=await new Blog({
            userID,
            author,
            blogTitle,
            blogData,
            blogCategory,
            blogThumbnail,
            publishDate:Date.now()
        })
        //console.log(newBlog)
        const savedNewBlog=await newBlog.save();
        //console.log(savedNewBlog)
        return NextResponse.json({message:"Blog Post created successfully",savedNewBlog},{status:201});


    } catch (error) {
        return NextResponse.json({error:"Error in posting blog",error},{status:500});
    }
}

