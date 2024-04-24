"use client";

import FeaturedBlogs from "@/components/FeaturedBlogs";
import Footer from "@/components/Footer";
import LatestBlogs from "@/components/LatestBlogs";
import Navbar from "@/components/Navbar";
import { allBlogsAPI } from "@/redux/slices/allBlogsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Homepage = () => {
  const dispatch = useDispatch();
  const allBlogsData = useSelector((data) => data.allBlogsSlice.allBlogs);
  //console.log(allBlogsData)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allBlogsData.length > 0) {
      setLoading(false);
    }
  }, [allBlogsData]);

  useEffect(() => {
    dispatch(allBlogsAPI());
  }, []);

  return (
    <>
      <div className="sticky top-0">
        <Navbar />
      </div>
      {loading ? (
        <div className="">Loading...</div>
      ) : (
        <div className="py-8">
          <FeaturedBlogs data={allBlogsData} />
          <LatestBlogs blogsData={allBlogsData} />
        </div>
      )}

      <Footer />
    </>
  );
};

export default Homepage;
