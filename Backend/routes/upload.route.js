import express from "express";
import multer from "multer";
import cloudinary from "../cloudinary/cloudinaryConfig.js";
import secureRoute from "../middleware/secureRoutes.js";
import User from "../models/user.model.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", secureRoute, upload.single("image"), async (req, res) => {
  console.log(req.file);
  if(req.file ===undefined) {
    await User.findOneAndUpdate({_id: req.user._id},{
    fullname: req.body.newName,
    bio: req.body.bio
  })

  return res.json({ message:"Profile has been updated" });

  }
  else
  {
    try {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      //console.log(req.body);
      const result = await cloudinary.uploader.upload(base64Image, {
      folder: "profilePics",
      });

      console.log("✅ Upload success:", result.secure_url);
  //console.log(req.user);
  await User.findOneAndUpdate({_id: req.user._id},{
    fullname: req.body.newName,
    bio: req.body.bio,
    image: result.secure_url
  })
  return res.json({ url: result.secure_url });
} catch (uploadErr) {
  console.error("❌ Cloudinary Upload Error:", uploadErr);
  return res.status(500).json({ error: uploadErr.message });
}
  }
  
});

export default router;
