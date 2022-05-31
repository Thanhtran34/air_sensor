/**
 * The routes.
 */
 import express from "express";
 import { HomeController } from "../controllers/homeController.js";
 
 export const router = express.Router();
 const controller = new HomeController();
 
 router.get("/api/quality", (req, res, next) =>{ controller.getAllData(req, res, next)})
 router.get("/api/humidity", (req, res, next) => controller.getHumidity(req, res, next));
 router.get("/api/temperature", (req, res, next) => controller.getTemperature(req, res, next));
 router.get("/api/gas", (req, res, next) => controller.getGas(req, res, next));
 router.get("/api/thing", (req, res, next) => controller.getInfoW(req, res, next));

 router.use("*", (req, res, next) => {
   const error = new Error();
   error.status = 404;
   error.message = "Not Found";
   next(error);
 });
 