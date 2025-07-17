import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.LOCAL_UPLOAD_DIR || "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

export default upload;
