"use client";

import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { allBlogsAPI } from "@/redux/slices/allBlogsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Others = () => {


    const dispatch = useDispatch();
    const allBlogsData = useSelector((data) => data.allBlogsSlice.allBlogs);
    //console.log(allBlogsData)
  
    const [otherBlogs, setOtherBlogs] = useState();
  
    //take only entertainment category blogs
    useEffect(() => {
      const other = allBlogsData.filter((item) => {
        if (item.blogCategory == "Others") {
          return item;
        }
      });
      setOtherBlogs(other);
    }, [allBlogsData]);
  
    //get all blogs
    useEffect(() => {
      dispatch(allBlogsAPI());
    }, []);

    return ( 
        <>
        <Navbar />
        <div className="p-4">
        <div className="text-5xl font-semibold">Other Blogs</div>
        <div className="py-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {otherBlogs && otherBlogs.map((item,i)=>{
              return <BlogCard key={i} data={item} />
          })}
        </div>
        </div>
        <Footer />
        </>
     );
}
 
export default Others;