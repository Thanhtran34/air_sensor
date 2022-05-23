/**
 * Home controller
 */
 import admin from "firebase-admin";
 import { cert } from "firebase-admin/app";
 
 admin.initializeApp({
   credential: cert({
     type: process.env.TYPE,
     project_id: process.env.ID,
     private_key_id: process.env.KEY_ID,
     private_key: process.env.KEY,
     client_email:process.env.EMAIL,
     client_id: process.env.CLIENT,
     auth_uri: process.env.AUTH_URI,
     token_uri: process.env.TOKEN_URI,
     auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
     client_x509_cert_url: process.env.CLIENT_CERT,
   }),
   databaseURL: process.env.DATABASE,
 });
 const db = admin.database();
 const userRef = db.ref("/UsersData");
 
 /**
  * Encapsulates a home controller.
  */
 export class HomeController {
   async getSensorData(req, res, next) {
     try {
       await userRef.once("value", (snap) => {
         res.status(200).json({ "users": snap.val() });
       });
     } catch (e) {
       next(e);
     }
   }
 }
 