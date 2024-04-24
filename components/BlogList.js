"use client";

import { getAPIUserBlogs, getUserIDReducer } from "@/redux/slices/blogSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogListCard from "./BlogListCard";

const BlogsList = ({ userID }) => {
  const dispatch = useDispatch();
  //takes user id to fetch the blogs
  dispatch(getUserIDReducer(userID));
  //const apiUserID=useSelector(data=>data.blogSlice.userID)

  //get list of user blogs
  const apiUserBlogData = useSelector(
    (data) => data.blogSlice.apiUserBlogData.userBlogs
  );
  //console.log(apiUserBlogData);

  useEffect(() => {
    //fetches all blogs of particular user
    dispatch(getAPIUserBlogs(userID));
  }, [userID]);


  return (
    <>
      <div>
        <div className="text-xl font-semibold text-center">Blogs Published</div>

        <div className="grid gap-2 m-2">
          {apiUserBlogData ? (
            apiUserBlogData.map((item, i) => {
              return (
                <>
                  <BlogListCard key={i} blogData={item} />
                </>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogsList;
