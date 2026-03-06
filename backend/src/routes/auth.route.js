import express from "express";
import { bookService, forgotPassword, getMe, loginUser, logoutUser, myAccount, registerUser, resetPassword, serviceDetails } from "../controller/user.controller.js";
import { verifyUser } from "../middlewares/user.middleware.js";
import { allServices } from "../controller/services.controller.js";

const router = express.Router();


/**
 * /api/auth/
 */
router.get("/", (req, res) => {
    res.send("Auth route");
});

/**
 * /api/auth/register
 */
router.post("/register", registerUser);

/**
 * /api/auth/login
 */
router.post("/login", loginUser);

/**
 * /api/auth/logout
 */
router.post("/logout", logoutUser);

/**
 * /api/auth/book-service
 */
router.post("/book-service", verifyUser, bookService);

/**
 * /api/auth/my-account
 */
router.get("/my-account", verifyUser, myAccount);

/**
 * /api/auth/all-services
 */
router.get("/all-services", allServices);

/**
 * /api/auth/me
 */
router.get("/me", verifyUser, getMe);

/**
 * /api/auth/service-details/:id
 */
router.get("/service-details/:id", verifyUser, serviceDetails);

/**
 * /api/auth/forgot-password
 */
router.post("/forgot-password", forgotPassword);

/**
 * /api/auth/reset-password
 */
router.post("/reset-password/:token", resetPassword);



export default router;