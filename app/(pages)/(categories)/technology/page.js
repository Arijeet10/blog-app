"use client";

import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { allBlogsAPI } from "@/redux/slices/allBlogsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TechnologyBlogs = () => {

    const dispatch = useDispatch();
    const allBlogsData = useSelector((data) => data.allBlogsSlice.allBlogs);
    //console.log(allBlogsData)
  
    const [technologyBlogs, setTechnologyBlogs] = useState();
  
    //take only entertainment category blogs
    useEffect(() => {
      const technology = allBlogsData.filter((item) => {
        if (item.blogCategory == "Technology") {
          return item;
        }
      });
      setTechnologyBlogs(technology);
    }, [allBlogsData]);
  
    //get all blogs
    useEffect(() => {
      dispatch(allBlogsAPI());
    }, []);

    return ( 
        <>
        <Navbar />
        <div className="p-4">
        <div className="text-3xl sm:text-5xl font-semibold">Technology Blogs</div>
        <div className="py-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {technologyBlogs && technologyBlogs.map((item,i)=>{
              return <BlogCard key={i} data={item} />
          })}
        </div>
        </div>
        <Footer />
        </>
     );
}
 
export default TechnologyBlogs;