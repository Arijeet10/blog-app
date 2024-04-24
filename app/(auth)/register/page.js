"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast,{Toaster} from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Navbar from "@/components/Navbar";

const url =process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/";

const Register = () => {
  const router = useRouter();

  //store the input data
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  //loading state
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      //api request
      const res = await fetch(url+"api/users/signup", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(user),
      })
      //take the response message or error data from api
      const response=await res.json();
      
      //check for errors
      if(!res.ok){
        console.log(response.error);
        toast.error(response.error);
      }else{
        // sign up success
        console.log("Signup Done", response.message);
        router.push("/login");
      }

    } catch (error) {
      console.log("Signup failed", error);
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
            <div
              className={`bg-gradient-to-r from-[#ffffff] to-[#424242] fixed top-0 left-0 w-screen h-screen`}
            />
            <div className="sm:w-2/5 absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] shadow-2xl bg-white  flex flex-col gap-4 p-4 border border-black rounded-md ">
              <div className="flex flex-col lg:flex-row items-start lg:items-end lg:justify-between gap-2">
                <div className="text-3xl font-semibold">Register</div>
                <div className="text-slate-400 font-light">
                  Have an account?{" "}
                  <span className="hover:bg-blue-500 p-2 rounded-sm hover:text-white text-black font-medium">
                    <Link href="/login">Sign In</Link>
                  </span>{" "}
                </div>
              </div>
              <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="border border-black rounded-sm p-2"
                  required
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email ID"
                  className="border border-black rounded-sm p-2"
                  required
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-black rounded-sm p-2"
                  required
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <button
                  onClick={() => handleSignUp()}
                  className="hover:bg-blue-500 bg-black text-white font-medium rounded-sm px-6 py-2"
                >
                  Sign Up
                </button>
                {loading && <div className="flex justify-center"><AiOutlineLoading3Quarters /></div>}
                  <Toaster />
              </form>
            </div>
      </div>
    </>
  );
};

export default Register;
