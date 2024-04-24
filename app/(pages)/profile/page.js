"use client";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import { addProfileReducer } from "@/redux/slices/profileSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import BlogPost from "@/components/BlogPost";
const BlogPost = dynamic(() => import("@/components/BlogPost"), {
  ssr: false,
});
import BlogsList from "@/components/BlogList";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

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
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>      {loading ? (
        <div className="">
          Loading....
        </div>
      ) : (
        <>
          <div className={`grid gap-4 sm:grid-cols-12 p-2 ${createBlog && "hidden"}`}>
            <div className="sm:col-span-4 border  rounded-md shadow-lg p-2 flex flex-col justify-around">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-4">
                  <div className="text-3xl ">Hi {profileData?.username}</div>
                  <div className="font-medium">
                    Your Email:{" "}
                    <span className="font-normal text-slate-600">{profileData?.email}</span>
                  </div>
                </div>
                <img
                    src="/undraw_pic_profile.svg"
                    alt="profile image"
                    className="w-20 h-20"
                  />
              </div>
              <div className="flex justify-start">
                <button
                  onClick={() => setCreateBlog(true)}
                  className="hover:bg-blue-500  hover:text-white hover:border-none   font-semibold px-6 py-2 border shadow-md  rounded-sm"
                >
                  Create Blog
                </button>
              </div>
            </div>
            <div className="border rounded-md sm:col-span-8">
              {!createBlog && <BlogsList userID={profileData?._id} />}
            </div>
          </div>
        </>
      )}

      {createBlog && (
        <BlogPost discardBlog={discardBlog} profileData={profileData} />
      )}
      <Footer />
    </>
  );
};

export default Profile;
