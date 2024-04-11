"use client";

import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { CgSearchLoading } from "react-icons/cg";


// const url = process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/";

const LatestBlogs = ({ blogsData }) => {
//   const [latestBlogs, setLatestBlogs] = useState();

//   const compareTime = (a, b) => {
//     // Extract time portion of the dates
//     const timeA =
//       a.publishDate.getHours() * 3600 + a.publishDate.getMinutes() * 60 + a.publishDate.getSeconds();
//     const timeB =
//       b.publishDate.getHours() * 3600 + b.publishDate.getMinutes() * 60 + b.publishDate.getSeconds();

//     return timeA - timeB;
//   };

//   useEffect(() => {
//     setLatestBlogs(blogsData.sort(compareTime));
//     console.log(latestBlogs)
//   }, []);

  // const fetchLatestBlogs=async()=>{
  //     try {
  //         const res=await fetch(url+"api/blogs/all",{
  //             method:"GET",
  //             headers:{
  //                 accept:"application/json"
  //             }
  //         })
  //         if(res.ok){
  //             const response=await res.json();
  //             setLatestBlogs(response.allBlogs)
  //         }
  //     } catch (error) {
  //         console.log("Error in fetching latest blogs",error)
  //     }
  // }

  // useEffect(() => {
  //   fetchLatestBlogs();
  // }, [])

  return (
    <>
      <div className="px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-semibold">Latest Blogs</div>
          <div className="font-medium cursor-pointer hover:border-b hover:border-black">
            View All
          </div>
        </div>
        {blogsData?.length == 0 ?(
          <CgSearchLoading 
            className="w-5 h-5"
          />
        ):(
          <div className="py-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {blogsData?.map((item, i) => {
            return <BlogCard key={i} data={item} />;
          })}
        </div>
        )}

      </div>
    </>
  );
};

export default LatestBlogs;
