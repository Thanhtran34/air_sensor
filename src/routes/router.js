/**
 * The routes.
 */
 import express from "express";
 import { HomeController } from "../controllers/homeController.js";
 
 export const router = express.Router();
 const controller = new HomeController();
 
 router.get("/", (req, res, next) => controller.getSensorData(req, res, next));
 router.use("*", (req, res, next) => {
   const error = new Error();
   error.status = 404;
   error.message = "Not Found";
   next(error);
 });
 