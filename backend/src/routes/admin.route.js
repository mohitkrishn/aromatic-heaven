import express from 'express';
import upload from '../middlewares/uploadFile.middleware.js';
import multer from 'multer';
import { addService, getAllBookings, loginAdmin, logoutAdmin, registerAdmin } from '../controller/admin.controller.js';
import { verifyAdmin } from '../middlewares/admin.middleware.js';

const router = express.Router();

/**
 * /api/admin/register
 */

router.post("/register", registerAdmin);

/**
 * /api/admin/login
 */
router.post("/login", loginAdmin);

/**
 * /api/admin/logout
 */
router.post("/logout", logoutAdmin);

/**
 * /api/admin/add-new
*/
router.post("/add-new", verifyAdmin, (req, res, next) => {

    upload.single("image")(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    message: "File size should be less than 5MB"
                });
            } else if (err) {
                return res.status(400).json({ success: false, message: err.message });
            }
        }

        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        next(); //call the controller function
    });

}, addService);

/**
 * /api/admin/all-bookings
 */
router.get("/all-bookings", verifyAdmin, getAllBookings);


export default router;