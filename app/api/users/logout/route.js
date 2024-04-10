import {NextResponse} from "next/server";

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
        const response=NextResponse.json({message:"Successfully Logged Out",success:true});
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
        return response;
    } catch (error) {
        return NextResponse.json({message:"Error in logging out",error},{status:500});
    }
}