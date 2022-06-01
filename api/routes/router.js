/**
 * The routes.
 */
 import express from "express";
 import { HomeController } from "../controllers/homeController.js";
 
 export const router = express.Router();
 const controller = new HomeController();
 
 router.get("/", (req, res, next) =>{ controller.getAllData(req, res, next)});
 router.get("/humidity", (req, res, next) => controller.getHumidity(req, res, next));
 router.get("/temperature", (req, res, next) => controller.getTemperature(req, res, next));
 router.get("/gas", (req, res, next) => controller.getGas(req, res, next));
 router.get("/status", (req, res, next) => controller.getNewestData(req, res, next));
 router.get("/thing", (req, res, next) => controller.getInfoW(req, res, next));
 router.get("/data", (req, res, next) => controller.updateData(req, res, next));

 router.use("*", (req, res, next) => {
   const error = new Error();
   error.status = 404;
   error.message = "Not Found";
   next(error);
 });
 