"use client";

import Navbar from "@/components/Navbar";
import ReadBlog from "@/components/ReadBlog";
import { useEffect, useState } from "react";


const url = process.env.NEXT_PUBLIC_ROOT_URL || "http://localhost:3000/";


const ViewBlogPage = ({params}) => {

    //console.log(params.blogID)

    const [blog,setBlog]=useState()

    const getBlogData=async()=>{
        try {
            const res=await fetch(url+"api/blogs/view",{
                method:"POST",
                headers:{
                    accept:"application/json"
                },
                body:JSON.stringify(params.blogID)
            })
            if(res.ok){
                const response=await res.json();
                console.log("Blog data fetched!!",response.message)
                setBlog(response.blog)
            }
        } catch (error) {
            console.log("Error",error)
        }
    };

    useEffect(() => {
      getBlogData();
    }, [])
    

    return ( 
        <>
            <Navbar />
            <ReadBlog blog={blog} />
        </>
     );
}
 
export default ViewBlogPage;