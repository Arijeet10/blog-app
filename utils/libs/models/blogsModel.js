import mongoose,{Schema} from "mongoose";

const BlogModel=new Schema({
    "userID":String,
    "author":String,
    "blogTitle":String,
    "blogData":String,
    "blogCategory":String,
    "blogThumbnail":String,
    "publishDate":Date
})

const Blog=mongoose.models.Blog||mongoose.model("Blog",BlogModel);
export default Blog;


