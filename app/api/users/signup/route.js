import User from "@/utils/libs/models/userModel";
import { connectMongoDB } from "@/utils/libs/mongodb";
import {NextResponse} from "next/server";
import bcryptjs from "bcryptjs";

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

//api to register an account
export async function POST(req){
    try {
        const body=await req.json();
        // console.log(body)
        const {username,email,password}=body;
        // console.log(email,password);
        if(!username || !email || !password){
            return NextResponse.json({error:"Invalid Credentials"},{status:404});
        }
        await connectMongoDB();
        const findUser=await User.findOne({email});
        if(findUser){
            return NextResponse.json({error:"User already exists!"},{status:404});
        }
        //encrypting password
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt)
        //save data
        const newUser=await new User({
            username,
            email,
            password:hashedPassword
        });
        const savedUser=await newUser.save();
        return NextResponse.json({message:"Account created:",savedUser},{status:201});  

    } catch (error) {
        return NextResponse.json({error:"Error in registering user",error},{status:500});
    }
}   

