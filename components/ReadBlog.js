"use client";

import { useSelector, useDispatch } from "react-redux";
import BlogCard from "./BlogCard";
import { useEffect } from "react";
import { allBlogsAPI } from "@/redux/slices/allBlogsSlice";

const ReadBlog = ({ blog }) => {
  const dispatch = useDispatch();

  const allBlogsData = useSelector((data) => data.allBlogsSlice.allBlogs);

  useEffect(() => {
    dispatch(allBlogsAPI());
  }, []);

  return (
    <>
      {blog ? (
        <div className="p-4 sm:grid sm:gap-2 sm:grid-cols-12">
          <div className="sm:col-span-8">
            <div className="">
              <img
                src={blog?.blogThumbnail}
                alt="blog thumbnail"
                className="rounded-lg "
              />
            </div>
            <div className="py-4 flex items-center gap-2">
              <img
                src="/undraw_pic_profile.svg"
                alt="profile image"
                className="w-20 h-20"
              />
              
              <div className="font-semibold">Author: <span className="font-light">{blog?.author}</span></div>
            </div>
            <div className="p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="text-5xl font-bold">{blog?.blogTitle}</div>
                <div className="text-slate-600 font-semibold text-xl italic">
                  {blog?.blogCategory}
                </div>
              </div>
              <div className="font-light text-lg">{blog?.blogData}</div>
            </div>
          </div>
          <div className="sm:col-span-4 ">
            <div className="font-semibold">Other Blogs</div>
            <div className="grid gap-4">
              {allBlogsData &&
                allBlogsData.map((item, i) => {
                  return <BlogCard data={item} />;
                })}
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
          Loading...{" "}
        </div>
      )}
    </>
  );
};

export default ReadBlog;
