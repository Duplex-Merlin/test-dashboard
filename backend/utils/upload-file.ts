import path from "path";
import fs from "fs";
import multer from "multer";

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    //@ts-ignore
    const uploadDirectory = `./uploads/${req.tenantId}`;
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }
    callback(null, uploadDirectory);
  },
  filename: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    callback(null, Date.now() + ext); // Nom de fichier unique
  },
});

export const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Seuls les fichiers JPEG et PNG sont autorisés."));
    }
  },
  storage: storage,
});
