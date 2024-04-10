import {NextResponse} from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/utils/libs/models/userModel";
import { connectMongoDB } from "@/utils/libs/mongodb";

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