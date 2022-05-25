/**
 * Home controller
 */
 import admin from "firebase-admin";
 import { cert } from "firebase-admin/app";
 import Pusher from "pusher";
 
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
 const path = "/UsersData/" + process.env.SECRET
 const userRef = db.ref(path);
 const data = [];
 let sensorData;
 let newSensorData;

 const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true,
});
 
 /**
  * Encapsulates a home controller.
  */
 export class HomeController {
   async getSensorData(req, res, next) {
     try {
       await userRef
       .child("readings")
       .limitToLast(5)
       .once("value", (snap) => {
         sensorData = snap.val();
       });

       Object.values(sensorData).forEach(val => {
         data.push(val)
       })

       res.status(200).json(sensorData);
     } catch (e) {
       next(e);
     }
   }

   async getNewerData (req, res, next) {
     try {
      await userRef
      .child("readings")
      .limitToLast(1)
      .once("value", (snap) => {
        newSensorData = snap.val();
      });
      data.push(newSensorData);
     } catch (e) {
       next(e);
     }
   }
 }
 