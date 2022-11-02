const { Router } = require("express");
const multer = require('multer');
//const { resolve } = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

const cloudinary = require('cloudinary').v2;


cloudinary.config(process.env.CLOUDINARY_URL || '');

const router = Router();


router.post("/", upload.single("file"),  async (req, res) => {
    try {
      const file= req.body;
console.log(req.file.originalname)
      const data = await cloudinary.uploader.upload(`./upload/${req.file.originalname}`);
      console.log(data)
      res.send(data.secure_url)
   
    
    //   res.send(file);

    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  module.exports = router;