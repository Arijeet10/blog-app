"use client";

import { useRouter } from "next/navigation";

const BlogCard = ({data}) => {

  const router=useRouter()
  const handleviewBlog=()=>{
    router.push(`/viewblog/${data._id}`)
  }

  return (
    <>
      <div onClick={()=>handleviewBlog()} className="hover:cursor-pointer shadow-xl rounded-lg flex flex-col justify-between">
        <div className="">
          <img
            src={data?.blogThumbnail}
            alt="blog banner"
            className="object-cover w-full h-full rounded-t-lg"
          />
        </div>
        <div className="p-4 flex flex-col justify-between">
          <div className="text-lg">{data?.blogCategory}</div>
          <div className="text-xl font-medium">
            {data?.blogTitle}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
