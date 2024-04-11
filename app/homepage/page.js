"use client";


import FeaturedBlogs from "@/components/FeaturedBlogs";
import Footer from "@/components/Footer";
import LatestBlogs from "@/components/LatestBlogs";
import Navbar from "@/components/Navbar";
import { allBlogsAPI } from "@/redux/slices/allBlogsSlice";
import { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";


const Homepage = () => {

  const dispatch=useDispatch();
  const allBlogsData=useSelector(data=>data.allBlogsSlice.allBlogs)
  //console.log(allBlogsData)

  const [loading,setLoading]=useState(false);

  useEffect(() => {
    dispatch(allBlogsAPI());
  }, [])
  

  return (
    <>
        <Navbar  />
        {loading?(
          <div className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">Loading...</div>
        ):(
          <>
        <FeaturedBlogs data={allBlogsData} />
        <LatestBlogs blogsData={allBlogsData} />
        </>
        )}

        <Footer />
    </>
  );
};

export default Homepage;
