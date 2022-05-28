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
    client_email: process.env.EMAIL,
    client_id: process.env.CLIENT,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
    client_x509_cert_url: process.env.CLIENT_CERT,
  }),
  databaseURL: process.env.DATABASE,
});
const db = admin.database();
const path = "/UsersData/" + process.env.SECRET;
const userRef = db.ref(path);
const data = [];
const humiditySensor = [];
const temperatureSensor = [];
const gasSensor = [];
let humidityData;
let temperatureData;
let gasData;
let sensor;
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
  async getHumidity(req, res, next) {
    try {
      await userRef
        .child("readings")
        .limitToLast(6)
        .once("value", (snap) => {
          humidityData = snap.val();
        });

      Object.values(humidityData).forEach((val) => {
        humiditySensor.push({
          humidity: val.humidity,
          timestamp: val.timestamp,
        });
      });
      res.status(200).json({ hRecords: humiditySensor });
    } catch (e) {
      next(e);
    }
  }

  async getTemperature(req, res, next) {
    try {
      await userRef
        .child("readings")
        .limitToLast(6)
        .once("value", (snap) => {
          temperatureData = snap.val();
        });

      Object.values(temperatureData).forEach((val) => {
        temperatureSensor.push({
          temperature: val.temperature,
          timestamp: val.timestamp,
        });
      });
      res.status(200).json({ tRecords: temperatureSensor });
    } catch (e) {
      next(e);
    }
  }

  async getHumAndTem(req, res, next) {
    try {
      await userRef
        .child("readings")
        .limitToLast(6)
        .once("value", (snap) => {
          sensor = snap.val();
        });

      Object.values(sensor).forEach((val) => {
        data.push({
          humidity: val.humidity,
          temperature: val.temperature,
          timestamp: val.timestamp,
        });
      });
      res.status(200).json({ dataPoints: data });
    } catch (e) {
      next(e);
    }
  }

  async getGas(req, res, next) {
    try {
      await userRef
        .child("readings")
        .limitToLast(6)
        .once("value", (snap) => {
          gasData = snap.val();
        });

      Object.values(gasData).forEach((val) => {
        gasSensor.push({
          gas: val.gas,
          timestamp: val.timestamp,
        });
      });
      res.status(200).json({ gRecords: gasSensor });
    } catch (e) {
      next(e);
    }
  }

  updateData(req, res, next) {
    try {
      let newPoint;
      setInterval(async () => {
        await userRef
          .child("readings")
          .limitToLast(1)
          .once("value", (snap) => {
            newSensorData = snap.val();
          });

        newPoint = Object.values(newSensorData).pop();

        data.push(newPoint);
        pusher.trigger("air-quality", "new-quality", {
          dataPoint: newPoint,
        });
      }, 2000);
      res.send({
        success: true,
        dataPoint: newPoint
      });
    } catch (e) {
      next(e);
    }
  }
}
