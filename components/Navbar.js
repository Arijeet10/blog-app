"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";

import { useEffect, useState } from "react";

const url = process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/";

const Navbar = () => {
  const router = useRouter();

  const [sidebar, setSidebar] = useState(false);
  const [profile,setProfile]=useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  //get profile data
  const profileData = useSelector((data) => data.profileSlice.profileData);
  //console.log(profileData);

  useEffect(() => {
    if(profileData?.username){
      setProfile(true)
    }
  }, [profileData])
  

  //logout
  const handleLogout = async () => {
    try {
      await fetch(url + "api/users/logout/", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
        cache: "no-store",
      });
      toast.success("Logged Out");
      setProfile(false);
      //go to login page
      router.push("/login");
    } catch (error) {
      console.log("Logout error", error);
      toast.error("Logout error");
    }
  };

  return (
    <>
      <Toaster />
      <div className=" w-full shadow-md bg-white z-50 p-2 lg:px-2 lg:py-0 lg:grid  lg:grid-cols-4 lg:justify-between">
        <div className="p-2 lg:col-span-3 bg-white z-50  flex md:flex-col lg:flex-row items-center justify-between">
          <div className=" text-2xl font-extrabold ">
            Bloggle
          </div>
          {/* Mobile View */}
          <div onClick={() => handleSidebar()} className={`md:hidden bg-white z-50`}>
            <TbLayoutSidebarRightExpandFilled className="w-10 h-10" />
            <div className={`${sidebar ? "block" : "hidden"} fixed top-0 right-0 bg-white z-50 shadow-lg w-2/4 h-full py-2`}>
              <div className="pt-2">
                <TbLayoutSidebarRightCollapseFilled className="w-10 h-10" />
              </div>
              <div className="border-b border-slate-400 w-full pt-4" />
              <div className="font-medium bg-white z-50 grid gap-2 p-4 justify-center">
                <Link
                  href="/homepage"
                  className="text-center hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2 "
                >
                  Home
                </Link>
                <Link
                  href="/entertainment"
                  className="text-center hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2"
                >
                  Entertainment
                </Link>
                <Link
                  href="/lifestyle"
                  className="text-center hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2"
                >
                  Lifestyle
                </Link>
                <Link
                  href="/science"
                  className="text-center hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2"
                >
                  Science
                </Link>
                <Link
                  href="/technology"
                  className="text-center hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2"
                >
                  Technology
                </Link>
                <Link
                  href="/health"
                  className="text-center hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2"
                >
                  Health
                </Link>
                <Link
                  href="/others"
                  className="text-center hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2"
                >
                  Others
                </Link>
              </div>
              <div className="bg-white z-50 flex flex-col sm:flex-row items-center justify-between p-2">
                {profile ? (
                  <>
                    <button
                      onClick={() => router.push("/profile")}
                      className="hover:bg-blue-500 hover:text-white p-2 rounded-sm "
                    >
                      Welcome {profileData?.username}
                    </button>
                    <button
                      onClick={() => handleLogout()}
                      className={`hover:bg-red-500 hover:text-white text-red-500 font-semibold p-2 rounded-sm `}
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={`hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2 `}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/register"
                      className={`hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2 `}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Desktop View */}
          <div
            className={`hidden font-medium md:flex flex-col md:flex-row items-center justify-center gap-2`}
          >
            <Link
              href="/homepage"
              className="hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2"
            >
              Home
            </Link>
            <Link
              href="/entertainment"
              className="hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2"
            >
              Entertainment
            </Link>
            <Link
              href="/lifestyle"
              className="hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2"
            >
              Lifestyle
            </Link>
            <Link href="/science" className="hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2">
              Science
            </Link>
            <Link
              href="/technology"
              className="hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2"
            >
              Technology
            </Link>
            <Link href="/health" className="hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2">
              Health
            </Link>
            <Link href="/others" className="hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2">
              Others
            </Link>
          </div>
        </div>
        <div
          className={`lg:col-span-1 font-medium text-slate-500 hidden md:flex  items-center justify-between lg:justify-center lg:gap-2`}
        >
          {profile ? (
            <>
              <button
                onClick={() => router.push("/profile")}
                className="hover:bg-blue-500 hover:text-white p-2 rounded-sm "
              >
                Welcome {profileData?.username}
              </button>
              <button
                onClick={() => handleLogout()}
                className={`hover:bg-red-500 hover:text-white text-red-500 font-semibold p-2 rounded-sm `}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2 `}
              >
                Log In
              </Link>
              <Link
                href="/register"
                className={`hover:bg-black hover:text-white hover:font-semibold rounded-sm p-2 `}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="border-b overflow-visible border-slate-400" />
    </>
  );
};

export default Navbar;
