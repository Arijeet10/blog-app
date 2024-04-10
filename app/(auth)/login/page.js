"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast,{Toaster} from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {useDispatch} from "react-redux";
import { removeProfileReducer } from "@/redux/slices/profileSlice";


const url =process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/";


const Login = () => {
  const dispatch=useDispatch()

  dispatch(removeProfileReducer({}));


  const router=useRouter();

  const [user,setUser]=useState({
    email:"",
    password:""
  });

  const [loading,setLoading]=useState(false);

  const handleLogin=async()=>{
    try {
      setLoading(true)
      const res=await fetch(url+"api/users/login",{
        method:"POST",
        headers:{
          accept:"application/json"
        },
        cache:"no-store",
        body:JSON.stringify(user)
      });
      const response=await res.json();

      if(res.ok){
        toast.success(response.message);
        router.push("/profile");
      }else{
        toast.error(response.error);
        console.log(response.error);
      }
    } catch (error) {
      console.log("Login Unsuccessful",error);
      toast.error("Login Unsuccessful");
    } finally{
      setLoading(false);
    }
  }


  return (
    <>
      <div className="">
        <div className={`bg-gradient-to-r from-[#ffffff] to-[#424242] fixed top-0 left-0 w-screen h-screen`} />
        <div className="sm:w-1/4 absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] shadow-2xl bg-white  flex flex-col gap-4 p-4 border border-black rounded-md ">
          <div className="flex flex-col items-start gap-2">
            <div className="text-3xl font-semibold">Login</div>
            <div className="text-slate-400 font-light">
              Doesn't have an account yet?{" "}
              <span className="hover:bg-blue-500 p-2 rounded-sm hover:text-white text-black font-medium">
                <Link href="/register">Sign Up</Link>
              </span>{" "}
            </div>
          </div>
          <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email ID"
              className="border border-black rounded-sm p-2"
              required
              value={user.email}
              onChange={(e)=>setUser({...user,email:e.target.value})}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-black rounded-sm p-2"
              required
              value={user.password}
              onChange={(e)=>setUser({...user,password:e.target.value})}
            />
            <button 
              onClick={()=>handleLogin()}
              className="hover:bg-blue-500 bg-black text-white font-medium rounded-sm px-6 py-2"
            >
              Login
            </button>
            {loading && <div className="flex justify-center"><AiOutlineLoading3Quarters /></div>}
            <Toaster />
          </form>
        </div>

      </div>
    </>
  );
};

export default Login;
