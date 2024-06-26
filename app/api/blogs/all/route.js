import Blog from "@/utils/libs/models/blogsModel";
import { connectMongoDB } from "@/utils/libs/mongodb";
import {NextResponse} from "next/server";

connectMongoDB();

//exporting OPTIONS async function in routes handler 
export async function OPTIONS(request) {
    const allowedOrigin = request.headers.get("origin");
    const response = new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
    });
  
    return response;
  }

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