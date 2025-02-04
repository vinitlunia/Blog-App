import express from "express"
import dotenv from "dotenv"
import mongoose from 'mongoose'
import userRoute from './routes/user.routes.js'
import blogRoute from './routes/blog.routes.js'
import fileUpload from "express-fileupload"
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser'
import cors from "cors";
const app = express();
dotenv.config()

const port = process.env.PORT
const MONGO_URL = process.env.MONGO_URI
// console.log(MONGO_URL);


//medelware..
app.use(express.json())
app.use(cookieParser());
app.use(
    cors({ 
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods:["GET","POST","PUT","DELETE","PATCH"],

 }));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
)


//DB code...

try {
    mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDb");
    
} catch (error) {
    console.log(error);
    
    
}

//define routes

app.use("/api/users",userRoute)
app.use("/api/blogs",blogRoute)



//Cloudnary Configuration

 cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECRET_KEY,
});

app.get('/', (req, res) => {
  res.send('Hello vinit!')
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})