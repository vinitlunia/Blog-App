import mongoose from "mongoose";
import { Blog } from "../model/blog.model.js";
import { v2 as cloudinary } from 'cloudinary';
import { User } from "../model/user.model.js";

export const createBlog = async (req,res) => {
    try {
 
     if(!req.files || Object.keys(req.files).length===0){
         return req.status(400).json({message: "Blog Image is required"})
     }
     const {blogImage} = req.files;

     const allowedFormets = ["image/jpeg","image/png","image/webp"];
     if(!allowedFormets.includes(blogImage.mimetype)){
         return req.status(400).json({message: "Invalid photo formets.Only jpg and png are allowed"})
     } 

     const {title,category,about} = req.body;
     if(!title || !category || !about ){
         return res.status(400).json({message: "title,category & about are required filds"})
     }

     const adminName = req?.user?.name;
     const adminPhoto = req?.user?.photo?.url;
     const createdBy = req?.user?._id;

     const cloudinaryRespones = await cloudinary.uploader.upload(
         blogImage.tempFilePath
     )
 
     if(!cloudinaryRespones || cloudinaryRespones.error){
         console.log(cloudinaryRespones.error);
         
     }

     const blogData = {
        title,
        about,
        category,
        adminName,
        adminPhoto,
        createdBy,
        blogImage:{
         public_id: cloudinaryRespones.public_id,
         url: cloudinaryRespones.url,
     }};

      const blog = await Blog.create(blogData);
      res.status(201).json({
        message: "Blog created successfully",
        blog,
      })

    
     
    } catch (error) {
     console.log(error);
     return res.status(500).json({error: "Internal Server Error"})
     
     
    }
     
     
 }

 export const deleteBlog = async(req,res)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
        return res.status(400).json({message: "Blog not found"})
    }
    await blog.deleteOne();
    res.status(200).json({message: "Blog deleted successfully"})
 };

 export const getAllBlogs = async(req,res) =>{
    try {
        const allBlogs = await Blog.find();
        res.status(200).json(allBlogs)
        
    } catch (error) {
        console.log(error);
        
    }
 }

 export const getSigleBlogs = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid Blog Id"})
    }
    const blog = await Blog.findById(id)
    if(!blog){
        return res.status(400).json({message: "Blog not found"})
    }
    res.status(200).json(blog)
 }

 export const getMyBlogs = async(req,res) =>{
    const createdBy = req.user._id;
    const myBlog = await Blog.find({createdBy})
    res.status(200).json(myBlog)
 }

 export const updatedBlog = async(req,res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid Blog id"})
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id,req.body,{new: true});
    if(!updatedBlog){
        return res.status(404).json({message: "Blog not found"})
    }
    res.status(200).json(updatedBlog)
 }

 export const getMyProfile = async(req,res) =>{
    const user = await req.user;
    res.status(200).json(user);
 }

 export const getAdmins = async(req,res) =>{
    const admins = await User.find({role: "admin"});
    res.status(200).json(admins)
 }