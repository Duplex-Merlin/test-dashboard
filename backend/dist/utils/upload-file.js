"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const uploadDirectory = "./uploads";
if (!fs_1.default.existsSync(uploadDirectory)) {
    fs_1.default.mkdirSync(uploadDirectory);
}
// Configure Multer for image uploads
const storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, uploadDirectory); // Utilisez le dossier 'uploads' pour le stockage des images
    },
    filename: function (req, file, callback) {
        const ext = path_1.default.extname(file.originalname);
        callback(null, Date.now() + ext); // Nom de fichier unique
    },
});
exports.upload = (0, multer_1.default)({
    limits: {
        fileSize: 1024 * 1024 * 10, // 10 MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error("Seuls les fichiers JPEG et PNG sont autorisés."));
        }
    },
    storage: storage,
});
