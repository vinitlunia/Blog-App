import { User } from "../model/user.model.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcryptjs'
import createTokenAndSaveCookies from '../jwt/AuthToken.js';

export const register = async (req,res) => {
   try {
    if(!req.files || Object.keys(req.files).length===0){
        return req.status(400).json({message: "User photo is required"})
    }
    const {photo} = req.files;
    const allowedFormets = ["image/jpeg","image/png","image/webp"];
    if(!allowedFormets.includes(photo.mimetype)){
        return req.status(400).json({message: "Invalid photo formets.Only jpg and png are allowed"})
    } 
    const {name,email,password,phone,role,education} = req.body;
    if(!name || !email || !password || !phone || !role|| !education ||!photo){
        return res.status(400).json({message: "Please fill required filds"})
    }
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: "User already exists with this email"})
    }
    const cloudinaryRespones = await cloudinary.uploader.upload(
        photo.tempFilePath
    )

    if(!cloudinaryRespones || cloudinaryRespones.error){
        console.log(cloudinaryRespones.error);
        
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User ({email,name,password:hashedPassword,phone,role,education,photo:{
        public_id: cloudinaryRespones.public_id,
        url: cloudinaryRespones.url,
    }});
    await newUser.save();
    if(newUser){
       const token = await createTokenAndSaveCookies(newUser._id,res)
         res.status(201).json({message: "User registerd successfully",newUser,token: token})
         console.log("SignUp :",token);
    }
    
    
   } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
        return res.status(400).json({ message: "Email already exists. Please use a different email." });
    }
    console.log(error);
    return res.status(500).json({error: "Internal Server Error"})
    
    
   }
    
    
}

export const login = async (req, res) => {
    try {
        const { email, password, role,photo } = req.body;
        console.log(req.body);
        
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Please fill required fields" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (user.role !== role) {
            return res.status(400).json({ message: `Given role ${role} not found` });
        }

        const token = await createTokenAndSaveCookies(user._id, res);
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                photo: user.photo,
            },
            token,
        });
        console.log("Login:",token);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req,res) =>{
    try {
        res.clearCookie("jwt");
        res.status(200).json({message: "User logged out successfully"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error" })
        
    }
}
