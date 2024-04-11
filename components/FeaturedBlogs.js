"use client";

import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

const FeaturedBlogs = ({ data }) => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  const generateFeaturedBlogs = () => {
    const featured = data.filter((item) => {
      if (item.userID == "66155e51218afac4f738ade1") {
        return item;
      }
    });
    //console.log(featured);
    setFeaturedBlogs(featured);
  };

  useEffect(() => {
    generateFeaturedBlogs();
  }, [data]);

  return (
    <>
      {featuredBlogs?.length == 0 ? (
        <div className="">Loading Featured blogs...</div>
      ) : (
        <div className="px-6 py-2 ">
          <div className="">
            <div className="text-3xl sm:text-5xl font-semibold">Featured</div>
          </div>
          <div className="py-2 grid sm:grid-cols-3 sm:grid-rows-2 sm:items-stretch gap-2">
            <div className="sm:col-span-2 sm:row-span-2 sm:flex sm:justify-center sm:items-stretch">
              <BlogCard data={featuredBlogs[0]} />
            </div>
            <div className="sm:col-span-1 sm:row-span-1">
              <BlogCard data={featuredBlogs[1]} />
            </div>
            <div className="sm:col-span-1 sm:row-span-1">
              <BlogCard data={featuredBlogs[2]} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedBlogs;
