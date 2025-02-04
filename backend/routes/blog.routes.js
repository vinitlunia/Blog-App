import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getMyBlogs, getSigleBlogs, updatedBlog } from '../controller/blog.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';

const router = express.Router()

router.post("/create",isAuthenticated,isAdmin("admin"),createBlog)
router.delete("/delete/:id",isAuthenticated,isAdmin("admin"),deleteBlog)
router.get("/all-blogs",isAuthenticated,getAllBlogs)
router.get("/single-blogs/:id",isAuthenticated,getSigleBlogs)
router.get("/my-blogs",isAuthenticated,isAdmin("admin"), getMyBlogs)
router.put("/update/:id",isAuthenticated,isAdmin("admin"), updatedBlog)

export default router;