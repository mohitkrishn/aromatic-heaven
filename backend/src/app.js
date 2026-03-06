//create the server
//config the server

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true
}));

//auth routes
app.use("/api/auth", authRoute);

//admin routes
app.use("/api/admin", adminRoute);

export default app;