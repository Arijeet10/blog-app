"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const url = process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/";

const EditBlog = ({ blogData, discardBlogUpdate }) => {
  const [blog, setBlog] = useState({
    _id: blogData._id,
    blogTitle: "",
    blogData: "",
  });

  //to save data from React Quill input form
  const [value, setValue] = useState("");

  //update blog api request
  const handleUpdateBlog = async () => {

    //add React Quill data to send to backend
    setBlog({
      ...blog,
      blogData: value,
    })
    // console.log(blog);


    try {
      const res = await fetch(url + "api/blogs/userblogs", {
        method: "PATCH",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify(blog),
      });
      const response = await res.json();
      if (res.ok) {
        console.log("Blog Updated", response);
        toast.success(response.message);
        discardBlogUpdate();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log("Error in updating blog", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="" />
      <div className="w-full sm:w-[800px] h-[600px] bg-white z-50 overflow-scroll hide-scrollbar   absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] border border-black m-8">
        <div className="flex justify-between p-2">
          <div className="font-medium text-3xl">Update Blog Post</div>
          <button
            onClick={discardBlogUpdate}
            className="hover:bg-slate-500 hover:text-white font-medium p-2 rounded-sm"
          >
            Discard
          </button>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4 p-4 "
        >
          <div className="flex items-center justify-start gap-2 p-2">
            <label htmlFor="blogbanner" className="font-medium">
              Blog Thumbnail:
            </label>
            <img src={blogData.blogThumbnail} width={300} height={100} />
          </div>
          <div className="p-2 font-medium flex items-center justify-start gap-2">
            <label htmlFor="category">Category:</label>
            <input
              id="category"
              value={blogData.blogCategory}
              className=" text-slate-600 font-semibold"
              readOnly
            />
          </div>
          <input
            required
            placeholder={blogData.blogTitle}
            value={blog.blogTitle}
            onChange={(e) =>
              setBlog({
                ...blog,
                blogTitle: e.target.value,
              })
            }
            className="p-2 font-medium text-lg focus:outline-none"
          />
          <ReactQuill className="w-full h-[300px] overflow-scroll hide-scrollbar" placeholder={blogData.blogData} theme="snow" value={value} onChange={setValue} />
          <div>
            <button
              onClick={() => handleUpdateBlog()}
              className="hover:bg-blue-500 hover:text-white font-medium p-2 rounded-sm my-2"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBlog;
