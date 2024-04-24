"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const url = process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/";

const BlogPost = ({ discardBlog, profileData }) => {
  const router = useRouter();

  const [blog, setBlog] = useState({
    userID: profileData._id,
    author: profileData.username,
    blogTitle: "",
    blogData: "",
    blogCategory: "Others",
    blogThumbnail: "",
  });

  //to save data from React Quill input form
  const [value, setValue] = useState("");

  const [loading, setLoading] = useState(false);

  const [previewImg, setPreviewImg] = useState();

  //converting the uploaded image into base64
  const convertToBase64 = (e) => {
    //console.log(e);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      //console.log(reader.result);
      setPreviewImg(reader.result);
      setBlog({ ...blog, blogThumbnail: reader.result });
      //console.log(blogData.blogThumbnail)
    };
    reader.onerror = (error) => {
      console.log("FileReader Error: ", error);
    };
  };

  //create blog post
  const postBlog = async () => {
    //console.log(blog);
    setBlog({
      ...blog,
      blogData: value,
    });
    try {
      setLoading(true);
      const res = await fetch(url + "api/blogs/create", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: JSON.stringify(blog),
      });
      const response = res.json();
      console.log(res);
      if (res.ok) {
        console.log("Blog Posted", response.message);
        toast.success(response.message);
        discardBlog(); //close create blog form
      } else {
        console.log("Blog couldn't be posted", response.error);
        toast.error(response.error);
      }
    } catch (error) {
      console.log("Error in saving blog", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="border border-black rounded-sm  m-8">
        <div className="flex justify-between p-2">
          <div className="font-medium text-3xl">Create Blog Post</div>
          <button
            onClick={discardBlog}
            className="hover:bg-slate-500 hover:text-white font-medium p-2 rounded-sm"
          >
            Discard
          </button>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-2 p-4 "
        >
          <div className="flex items-center justify-start gap-2 p-2">
            <label htmlFor="blogbanner" className="font-medium">
              Blog Thumbnail:
            </label>
            <input
              id="blogbanner"
              type="file"
              accept="image/*"
              onChange={(e) => convertToBase64(e)}
              className="border  p-2"
            />
            {previewImg == "" || previewImg == null ? (
              ""
            ) : (
              <img src={previewImg} width={100} height={100} />
            )}
          </div>
          <div className="p-2 font-medium flex items-center justify-start gap-2">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={blog.blogCategory}
              onChange={(e) =>
                setBlog({
                  ...blog,
                  blogCategory: e.target.value,
                })
              }
              className="border  font-normal"
            >
              <option disabled>Choose</option>
              <option value="Others">Others</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Health">Health</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
            </select>
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
            className=" p-2 font-medium text-lg focus:outline-none"
          />
          {/* <textarea
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
          /> */}
          <ReactQuill
            className="w-full h-[300px] overflow-scroll hide-scrollbar"
            placeholder="Write your blog here...."
            theme="snow"
            value={value}
            onChange={setValue}
          />

          <div>
            <button
              onClick={() => postBlog()}
              className="hover:bg-blue-500 hover:text-white font-medium p-2 rounded-sm my-2"
            >
              Post Blog
            </button>
            {loading && <div className="px-4">Publishing....</div>}
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogPost;
