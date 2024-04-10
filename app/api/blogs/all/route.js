import Blog from "@/utils/libs/models/blogsModel";
import { connectMongoDB } from "@/utils/libs/mongodb";
import {NextResponse} from "next/server";

connectMongoDB();

export async function GET(){
    try {
        const allBlogs=await Blog.find();
        //check if no blogs are there or not
        if(!allBlogs){
            return NextResponse.json({message:"No Blogs found",allBlogs},{status:200});
        }
        return NextResponse.json({message:"Blogs fetched successfully",allBlogs},{status:201});
    } catch (error) {
        return NextResponse.json({error:"Error in getting all blogs",error},{status:500});
    }
}