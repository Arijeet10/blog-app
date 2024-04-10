"use client";

import { useState } from "react";
import toast,{Toaster} from "react-hot-toast";

const url =process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/";


const EditBlog = ({ blogData,discardBlogUpdate }) => {
  const [blog, setBlog] = useState({
    _id: blogData._id,
    blogTitle: "",
    blogData: "",
  });

  const handleUpdateBlog = async() => {
    console.log(blog);
    try {
        const res=await fetch(url+"api/blogs/userblogs",{
            method:"PATCH",
            headers:{
                accept:"application/json"
            },
            body:JSON.stringify(blog)
        })
        const response=await res.json()
        if(res.ok){
            console.log("Blog Updated",response);
            toast.success(response.message)
            discardBlogUpdate()
        }else{
            toast.error(response.error)
        }
    } catch (error) {
        console.log("Error in updating blog",error)
    }
  };

  return (
    <>
    <Toaster />
      <div className="border border-black m-8">
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
          className="flex flex-col p-4 "
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
              className="border border-black font-normal"
              readOnly
            />
          </div>
          <input
            required
            value={blog.blogTitle}
            onChange={(e) =>
              setBlog({
                ...blog,
                blogTitle: e.target.value,
              })
            }
            placeholder="Blog Title..."
            className="border border-black p-2 font-medium text-lg focus:border-none"
          />
          <textarea
            required
            value={blog.blogData}
            onChange={(e) =>
              setBlog({
                ...blog,
                blogData: e.target.value,
              })
            }
            placeholder="Write your blog here...."
            rows="20"
            className="border border-black p-2 focus:border-none"
          />
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
