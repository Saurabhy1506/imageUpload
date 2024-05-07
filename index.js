const express = require("express");
const app = express();
require("dotenv").config();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { connectToDB } = require("./db/db");
const { imageModel } = require("./model/imageModel");

const path = require('path')
app.set("view engine","ejs");
app.set("views", path.resolve("./views"))
app.use(express.json())

connectToDB();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const random = uuidv4();
    cb(null, random + "" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const PORT = process.env.PORT || 3001;

app.post("/", upload.single("myfile"), async (req, res) => {
    // console.log(req.file.path);
    if (!req.file || !req.file.path) {
        return res.status(400).json({ success: false, message: "File path is missing" });
    }try{
  const result = await cloudinary.uploader.upload(req.file.path);
  console.log(result);

  const newImage = new imageModel({
    imageUrl: result.secure_url,
    fileName: result.original_filename,
    uploadDate:result.created_at
  })
   await newImage.save()
   .then(()=>{
    console.log("image saved in database");
   })

  fs.unlink(req.file.path, (err) => {
    if (err) console.log(err);
    else {
      console.log("\nDeleted file");
    }
  });
  res.json({
    success:true,
    message:"Image uploaded successful"
  });
}
catch(err){
    console.log(err);
}
});

app.get('/images',async(req,res)=>{
  const allImageData = await imageModel.find()
  .then((data)=>{
   res.status(200).json({success:true,message:data})
  })
})

app.get("/uploadImage",(req,res)=>{
   return res.render("homepage")
})
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
