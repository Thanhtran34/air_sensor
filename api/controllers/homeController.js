/**
 * Home controller
 */
import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import Pusher from "pusher";

// Credentials for firebase real time database
admin.initializeApp({
  credential: cert({
    type: process.env.TYPE,
    project_id: process.env.ID,
    private_key_id: process.env.KEY_ID,
    private_key: process.env.KEY.replace(/\\n/g, '\n'),
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
const path = "/UsersData/" + process.env.SECRET; // path to data for air quality
const userRef = db.ref(path);

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
  // Method to retrieve humidity data from firebase
  async getHumidity(req, res, next) {
    try {
      const humiditySensor = [];
      let humidityData;
      await userRef
        .child("readings")
        .limitToLast(12)
        .once("value", (snap) => {
          humidityData = snap.val();
        });

      Object.values(humidityData).map((el) => {
        humiditySensor.push({
          humidity: el.humidity,
          timestamp: el.timestamp,
        });
      });
      res.status(200).json({ hRecords: humiditySensor });
    } catch (e) {
      next(e);
    }
  }

  // Method to get data for temperature from firebase
  async getTemperature(req, res, next) {
    try {
      const temperatureSensor = [];
      let temperatureData;
      await userRef
        .child("readings")
        .limitToLast(12)
        .once("value", (snap) => {
          temperatureData = snap.val();
        });
      Object.values(temperatureData).map((el) => {
        temperatureSensor.push({
          temperature: el.temperature,
          timestamp: el.timestamp,
        });
      });
      res.status(200).json({ tRecords: temperatureSensor });
    } catch (e) {
      next(e);
    }
  }

  // Method to get data of gas level from firebase
  async getGas(req, res, next) {
    try {
      let gasData;
      const gasSensor = [];
      await userRef
        .child("readings")
        .limitToLast(12)
        .once("value", (snap) => {
          gasData = snap.val();
        });

      Object.values(gasData).map((el) => {
        gasSensor.push({
          gas: el.gas,
          timestamp: el.timestamp,
        });
      });
      res.status(200).json({ gRecords: gasSensor });
    } catch (e) {
      next(e);
    }
  }

  // Method to get all sensor data from firebase
  async getAllData(req, res, next) {
    try {
      let sensor;
      await userRef
        .child("readings")
        .limitToLast(12)
        .once("value", (snap) => {
          sensor = snap.val();
        });
      res.status(200).json({ dataPoints: Object.values(sensor) });
    } catch (e) {
      next(e);
    }
  }

  // Method to get latest sensor data from firebase
  async getNewestData(req, res, next) {
    try {
      let sensor;
      await userRef
        .child("readings")
        .limitToLast(1)
        .once("value", (snap) => {
          sensor = snap.val();
        });
      res.status(200).json({ dataPoints: Object.values(sensor) });
    } catch (e) {
      next(e);
    }
  }

  // form single TD default
  getInfoW(req, res, next) {
    try {
      res.set("Content-Type", "application/td+json");
      res.json({
        "@context": "https://www.w3.org/2019/wot/td/v1",
        id: "https://air-quality-sensor.herokuapp.com/",
        title: "AirQualitySensor",
        description:
          "A NodeMCU ESP8266 with connected temp/humidity, gas sensors.",
        securityDefinitions: { nosec_sc: { scheme: "nosec" } },
        security: "nosec_sc",
        properties: {
          status: {
            type: 'object',
            properties: {
              timestamp: 'string',
              humidity: 'float',
              temperature: 'float',
              gas: 'float'
            },
            forms: [{ href: 'https://air-quality-sensor.herokuapp.com/status' }]
          },
          temperature: {
            type: "object",
            properties: {
              timestamp: "string",
              temperature: "float",
            },
            forms: [
              { href: "https://air-quality-sensor.herokuapp.com/temperature" },
            ],
          },
          humidity: {
            type: "object",
            properties: {
              timestamp: "string",
              humidity: "float",
            },
            forms: [
              { href: "https://air-quality-sensor.herokuapp.com/humidity" },
            ],
          },
          gasLevel: {
            type: "object",
            properties: {
              timestamp: "float",
              gas: "float",
            },
            forms: [{ href: "https://air-quality-sensor.herokuapp.com/gas" }],
          },
          airQuality: {
            type: 'object',
            properties: {
              timestamp: 'string',
              humidity: 'float',
              temperature: 'float',
              gas: 'float'
            },
            forms: [{ href: 'https://air-quality-sensor.herokuapp.com' }]
          },
        },
      });
    } catch (e) {
      res.status(400).send(e.errors);
      next();
    }
  }

  async updateData(req, res, next) {
    try {
      let sensor;
        await userRef
        .child("readings")
        .limitToLast(12)
        .once("value", (snap) => {
          sensor = snap.val();
        });
        
        const poll = Object.values(sensor);
        pusher.trigger('poll-channel', 'update-poll', {
          newData: poll,
        });
      res.send({
        success: true,
        dataPoints: poll
      })
    } catch (e) {
      next(e);
    }
  }
}
