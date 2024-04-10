import {NextResponse} from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/utils/libs/models/userModel";
import { connectMongoDB } from "@/utils/libs/mongodb";

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

export async function GET(req){
    try {
        const userID=await getTokenData(req);
        await connectMongoDB();
        const user=await User.findOne({_id:userID}).select("-password");
        return NextResponse.json({message:"User found",user});

    } catch (error) {
        return NextResponse.json({error:"Error in getting token data",error},{status:500});
    }
}