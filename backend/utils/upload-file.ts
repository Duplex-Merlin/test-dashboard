import path from "path";
import fs from "fs";
import multer from "multer";

const uploadDirectory = "./uploads";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadDirectory); // Utilisez le dossier 'uploads' pour le stockage des images
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
