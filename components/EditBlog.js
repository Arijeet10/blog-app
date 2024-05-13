"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const url = process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/";

const EditBlog = ({ blogData, discardBlogUpdate }) => {

  //console.log(blogData.blogData)

  const [blog, setBlog] = useState({
    _id: blogData._id,
    blogTitle: blogData.blogTitle,
    blogData: blogData.blogData,
  });

  //to save data from React Quill input form
  const [value, setValue] = useState(blogData.blogData);

  useEffect(() => {
    setBlog({
      ...blog,
      blogData: value,
    });
  }, [value])
  

  //update blog api request
  const handleUpdateBlog = async () => {
    //add React Quill data to send to backend

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
      <div
        onClick={discardBlogUpdate}
        className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50"
      />
      <div className="w-full sm:w-[800px] h-[500px] bg-white z-50 overflow-scroll hide-scrollbar   absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] border shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2">
          <div className="font-medium text-3xl">Update Blog Post</div>
          <div className="flex items-center justify-between sm:gap-2">
            <button
              onClick={() => handleUpdateBlog()}
              className="hover:bg-blue-500 hover:text-white font-medium px-6 py-2 border shadow-md rounded-sm my-2"
            >
              Update Blog
            </button>
            <button
              onClick={discardBlogUpdate}
              className="hover:bg-slate-500 hover:text-white font-medium px-6 py-2 border shadow-md rounded-sm"
            >
              Discard
            </button>
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="h-full flex flex-col gap-2 p-2 "
        >
          <div className="flex items-center justify-start gap-2 p-2">
            <label htmlFor="blogbanner" className="font-medium">
              Blog Thumbnail:
            </label>
            <img src={blogData.blogThumbnail} width={100} height={50} />
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
              setBlog(prevState=>({
                ...prevState,
                blogTitle: e.target.value,
              }))
            }
            className="p-2 font-medium text-lg focus:outline-none"
          />
          <ReactQuill
            className="w-full h-[250px] overflow-scroll hide-scrollbar"
            placeholder={blogData.blogData}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </form>
      </div>
    </>
  );
};

export default EditBlog;
