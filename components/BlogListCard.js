"use client";

import { useState } from "react";
import EditBlog from "./EditBlog";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const url = process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/";

const BlogListCard = ({ blogData }) => {
  //console.log(blogData.blogThumbnail)

  const router = useRouter();

  const [editBlog, setEditBlog] = useState(false);
  const [delBlog, setDelBlog] = useState(false);

  const handleReadBlog = () => {
    // const blog=Object.keys(blogData)
    router.push(`/viewblog/${blogData._id}`);
  };

  const discardBlogUpdate = () => {
    setEditBlog(false);
  };

  const confirmDelBlog = async () => {
    try {
      const res = await fetch(url + "api/blogs/userblogs", {
        method: "DELETE",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify(blogData._id),
      });
      if (res.ok) {
        const response = await res.json();
        console.log("Blog Deleted", response);
        toast.success(response.message);
      }
    } catch (error) {
      console.log("Error in deleting blog", error);
      toast.error("Error in deleting blog");
    }
  };

  return (
    <>
      <Toaster />
      <div className="    rounded-sm grid sm:grid-cols-12">
        <div className="sm:col-span-4 ">
          <img
            src={blogData.blogThumbnail}
            alt="blog image"
            className="object-cover"
          />
        </div>
        <div className="sm:col-span-8 flex flex-col justify-center gap-4 px-4 ">
          <div className="font-light">{blogData.blogCategory}</div>
          <div className="font-semibold text-lg">{blogData.blogTitle}</div>
          <div className="flex items-center justify-between font-medium">
            <button
              onClick={() => handleReadBlog()}
              className="hover:bg-blue-500 hover:text-white px-6 py-2 border shadow-md rounded-sm font-medium"
            >
              Read
            </button>
            <button
              onClick={() => setEditBlog(true)}
              className="hover:bg-yellow-500 px-6 py-2 border shadow-md rounded-sm"
            >
              Edit
            </button>
            <button
              onClick={() => setDelBlog(true)}
              className="hover:bg-red-500 hover:text-white px-6 py-2 border shadow-md rounded-sm"
            >
              Delete
            </button>
          </div>
          {delBlog && (
            <div
              onClick={() => setDelBlog(false)}
              className="blur-background"
            />
          )}
          {delBlog && (
            <div className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] p-2 w-[250px] sm:w-[500px] sm:flex sm:flex-col border rounded-md bg-white">
              <div className="py-4 text-lg font-medium">Confirm Delete?</div>
              <div className="font-semibold flex items-center justify-around gap-2">
                <button
                  onClick={() => confirmDelBlog()}
                  className="hover:bg-red-500 hover:text-white px-6 py-2 border shadow-md rounded-sm"
                >
                  Yes
                </button>
                <button
                  onClick={() => setDelBlog(false)}
                  className="hover:bg-slate-500 hover:text-white px-6 py-2 border shadow-md rounded-sm"
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {editBlog && (
        <div className=" ">
          <EditBlog blogData={blogData} discardBlogUpdate={discardBlogUpdate} />
        </div>
      )}
    </>
  );
};

export default BlogListCard;
