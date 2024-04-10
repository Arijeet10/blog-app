import User from "@/utils/libs/models/userModel";
import {NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "@/utils/libs/mongodb";

export async function POST(req){
    try {
        const body=await req.json();
        const {email,password}=body;
        if(!email || !password){
            return NextResponse.json({error:"Invalid Credentials",body},{status:404})
        }
        await connectMongoDB();
        const user=await User.findOne({email});
        //check if user exists
        if(!user){
            return NextResponse.json({error:"User doesn't exist"},{status:404});
        }
        //check if password is correct
        const validPassword=await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({error:"Invalid Password",password},{status:404});
        }
        //token data
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }
        //create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET, {expiresIn: "1d"});

        const response=NextResponse.json({message:"Login successful"},{success:true});
        response.cookies.set("token",token,{
            httpOnly:true,
        })

        return response;

    } catch (error) {
        return NextResponse.json({error:"Error in logging user",error},{status:500})
    }
}