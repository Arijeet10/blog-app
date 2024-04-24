"use client";

import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { allBlogsAPI } from "@/redux/slices/allBlogsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Entertainment = () => {
  const dispatch = useDispatch();
  const allBlogsData = useSelector((data) => data.allBlogsSlice.allBlogs);
  //console.log(allBlogsData)

  const [entertainmentBlogs, setEntertainmentBlogs] = useState();

  //take only entertainment category blogs
  useEffect(() => {
    const entertainment = allBlogsData.filter((item) => {
      if (item.blogCategory == "Entertainment") {
        return item;
      }
    });
    setEntertainmentBlogs(entertainment);
  }, [allBlogsData]);

  //get all blogs
  useEffect(() => {
    dispatch(allBlogsAPI());
  }, []);

  return (
    <>
      <div className="sticky top-0">
        <Navbar />
      </div>
      <div className="p-4">
      <div className="text-3xl sm:text-5xl font-semibold">Entertainment Blogs</div>
      <div className="py-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {entertainmentBlogs && entertainmentBlogs.map((item,i)=>{
            return <BlogCard key={i} data={item} />
        })}
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Entertainment;
