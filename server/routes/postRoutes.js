import express from "express";
import * as dotenv from "dotenv";
import{v2 as cloudinary} from "cloudinary";
import Post from "../MongoDB/models/post.js";

dotenv.config()

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

router.route("/").get(async (req,res)=>{
    try {
        console.log("Tal")
        const posts = await Post.find({});
        console.log("Tal2")
        res.status(200).json({success: true, data: posts});
    }catch (e) {
        res.status(500).json({success: false, message: e});
    }

})
router.route('/').post(async (req,res)=> {
    try {

        const {name, prompt, photo} = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        console.log("problem is here2");
        console.log(photoUrl);
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })
        console.log("problem is here3");
        res.status(201).json({success: newPost, data: newPost});
        console.log("problem is here4");

    }catch (e) {
        res.status(500).json({success: false, message: e.message});
        console.log("error creating new post",e);

    }

});

export default router;