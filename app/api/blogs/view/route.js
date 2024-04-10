import Blog from "@/utils/libs/models/blogsModel";
import { connectMongoDB } from "@/utils/libs/mongodb";
import { connect } from "mongoose";
import {NextResponse} from "next/server";

connectMongoDB();

export async function POST(req){

    try {
        const body=await req.json();
        //console.log("Blog ID",body)
        if(!body){
            return NextResponse.json({error:"No blog id given"},{status:404});
        }
        const blog=await Blog.findById(body);
        //console.log(blog)
        if(!blog){
            return NextResponse.json({error:"Cannot find the blog"},{status:404});
        }
        return NextResponse.json({message:"Blog fetched successfully",blog},{status:201});
    } catch (error) {
        return NextResponse.json({error:"Error in viewing blog",error},{status:500})
    }
}