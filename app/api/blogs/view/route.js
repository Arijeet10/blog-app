import Blog from "@/utils/libs/models/blogsModel";
import { connectMongoDB } from "@/utils/libs/mongodb";
import { connect } from "mongoose";
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