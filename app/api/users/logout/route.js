import {NextResponse} from "next/server";

export async function GET(){
    try {
        const response=NextResponse.json({message:"Successfully Logged Out",success:true});
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
        return response;
    } catch (error) {
        return NextResponse.json({message:"Error in logging out",error},{status:500});
    }
}