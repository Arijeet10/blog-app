"use client";

import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { allBlogsAPI } from "@/redux/slices/allBlogsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LifestyleBlogs = () => {

    const dispatch = useDispatch();
    const allBlogsData = useSelector((data) => data.allBlogsSlice.allBlogs);
    //console.log(allBlogsData)
  
    const [lifestyleBlogs, setLifestyleBlogs] = useState();
  
    //take only entertainment category blogs
    useEffect(() => {
      const lifestyle = allBlogsData.filter((item) => {
        if (item.blogCategory == "Lifestyle") {
          return item;
        }
      });
      setLifestyleBlogs(lifestyle);
    }, [allBlogsData]);
  
    //get all blogs
    useEffect(() => {
      dispatch(allBlogsAPI());
    }, []);

    return ( 
        <>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>        <div className="p-4">
        <div className="text-3xl sm:text-5xl font-semibold">Lifestyle Blogs</div>
        <div className="py-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {lifestyleBlogs && lifestyleBlogs.map((item,i)=>{
              return <BlogCard key={i} data={item} />
          })}
        </div>
        </div>
        <Footer />
        </>
     );
}
 
export default LifestyleBlogs;