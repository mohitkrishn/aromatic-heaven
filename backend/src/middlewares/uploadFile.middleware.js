import multer from "multer";

const storage = multer.memoryStorage();

//custom filter function to check file type
const filterFile = (req, file, cb) => {
    if (file.mimetype && (
        file.mimetype.startsWith("image/jpeg")
        || file.mimetype.startsWith("image/png")
        || file.mimetype.startsWith("image/jpg")
        || file.mimetype.startsWith("image/webp")
        || file.mimetype.startsWith("image/avif")
    )) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
}

const upload = multer({ 
    storage, 
    fileFilter: filterFile,
    limits: { fileSize: 5 * 1024 * 1024 }
 });

export default upload;