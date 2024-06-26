import Blog from "@/utils/libs/models/blogsModel";
import { connectMongoDB } from "@/utils/libs/mongodb";
import { NextResponse } from "next/server";

//connect to database
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

//get all the blogs data of particular user
export async function POST(req) {
  try {
    const userID = await req.json();
    //console.log(userID)
    if (!userID) {
      return NextResponse.json({ error: "No user id given" }, { status: 404 });
    }
    //get all blogs data with the user id of particular user
    const userBlogs = await Blog.find({ userID });
    //check if there are blogs created by user or not
    // if(!userBlogs){
    //     return NextResponse.json({message:"No blogs created by the user",userBlogs},{status:200});
    // }
    return NextResponse.json(
      { message: "Blogs Data fetched successfull", userBlogs },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error in getting blog lists", error },
      { status: 500 }
    );
  }
}

//update a particular blog
export async function PATCH(req) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: "No data given" }, { status: 404 });
    }
    const { _id, blogTitle, blogData } = body;

    //check if data is given to update or not
    if (!blogTitle && !blogData) {
      return NextResponse.json(
        { error: "No blog data given to update" },
        { status: 404 }
      );
    }

    //check if blog is in the database or not
    const blog = await Blog.findOne({ _id });
    if (!blog) {
      return NextResponse.json(
        { error: "Cannot find the particular blog" },
        { status: 404 }
      );
    }

    //if no blog Title given, update only blog data
    if (!blogTitle) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        _id,
        { blogData },
        { new: true }
      );
      return NextResponse.json(
        { message: "Blog Data Updated", updatedBlog },
        { status: 201 }
      );
    }

    //if no blog data but new blog title given then update only blog Title
    if (!blogData) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        _id,
        { blogTitle },
        { new: true }
      );
      return NextResponse.json(
        { message: "Blog Title Updated", updatedBlog },
        { status: 201 }
      );
    }

    //update both blogTitle and blogData
    const updatedBlog = await Blog.findByIdAndUpdate(
      _id,
      { blogTitle, blogData },
      { new: true }
    );
    return NextResponse.json(
      { message: "Blog Title and Data Updated", updatedBlog },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error in updating", error },
      { status: 500 }
    );
  }
}

//delete a blog
export async function DELETE(req) {
  try {
    const _id = await req.json();
    if (!_id) {
      return NextResponse.json({ error: "No blog id founde" }, { status: 404 });
    }
    const deletedBlog = await Blog.findByIdAndDelete({ _id });
    console.log(deletedBlog);
    return NextResponse.json({ message: "Blog Deleted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error in deleting", error },
      { status: 500 }
    );
  }
}
