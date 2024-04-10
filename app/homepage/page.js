"use client";


import FeaturedBlogs from "@/components/FeaturedBlogs";
import Footer from "@/components/Footer";
import LatestBlogs from "@/components/LatestBlogs";
import Navbar from "@/components/Navbar";
import { allBlogsAPI } from "@/redux/slices/allBlogsSlice";
import { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";


const Homepage = () => {

  const dispatch=useDispatch();
  const allBlogsData=useSelector(data=>data.allBlogsSlice.allBlogs)
  //console.log(allBlogsData)

  useEffect(() => {
    dispatch(allBlogsAPI());
  }, [])
  

  return (
    <>
        <Navbar  />
        <FeaturedBlogs data={allBlogsData} />
        <LatestBlogs blogsData={allBlogsData} />
        <Footer />
    </>
  );
};

export default Homepage;
