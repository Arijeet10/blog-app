"use client";

import Navbar from "@/components/Navbar";
import { addProfileReducer } from "@/redux/slices/profileSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogPost from "@/components/BlogPost";
import BlogsList from "@/components/BlogList";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const url = process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const profileData = useSelector((data) => data.profileSlice.profileData);
  //console.log(profileData)
  const [createBlog, setCreateBlog] = useState(false);

  const [loading, setLoading] = useState(true);

  //removes blog post component
  const discardBlog = () => {
    setCreateBlog(false);
  };

  //get user data who is logged in
  const getUserData = async () => {
    const res = await fetch(url + "api/users/profile", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const response = await res.json();
    //console.log(response.user);
    await dispatch(addProfileReducer(response.user));
    setLoading(false);
  };

  //run when component reders first time
  useEffect(() => {
    setLoading(true);
    getUserData();
  }, []);

  return (
    <>
      <Toaster />
      <Navbar />
      {loading ? (
        <div className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
          Loading....
        </div>
      ) : (
        <>
          <div className={`grid gap-4 sm:grid-cols-12 p-2 ${createBlog && "hidden"}`}>
            <div className="sm:col-span-4 border border-black rounded-md shadow-lg p-2 ">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl ">Hi {profileData?.username}</div>
                  <div className="font-medium">
                    Your Email:{" "}
                    <span className="font-normal">{profileData?.email}</span>
                  </div>
                </div>
                <img
                    src="/undraw_pic_profile.svg"
                    alt="profile image"
                    className="w-20 h-20"
                  />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setCreateBlog(true)}
                  className="hover:bg-blue-500  hover:text-white hover:border-none   font-semibold p-2  rounded-sm"
                >
                  Create Blog
                </button>
              </div>
            </div>
            <div className="border border-black rounded-md sm:col-span-8"></div>
            <div className="border border-black rounded-md sm:col-span-8">
              {!createBlog && <BlogsList userID={profileData?._id} />}
            </div>
          </div>
        </>
      )}

      {createBlog && (
        <BlogPost discardBlog={discardBlog} profileData={profileData} />
      )}
    </>
  );
};

export default Profile;
