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

  const [loading,setLoading]=useState(true);
  
  useEffect(() => {
    if(allBlogsData.length>0){
      setLoading(false)
    }
  }, [allBlogsData])
  

  useEffect(() => {
    dispatch(allBlogsAPI());
  }, [])
  

  return (
    <>
        <Navbar  />
        {loading?(
          <div className="">Loading...</div>
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
