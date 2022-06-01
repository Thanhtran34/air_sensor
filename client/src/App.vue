<template>
  <div id="app">
     <h1>Air Quality visualization</h1>
     <p>This apps collects sensor data from its IoT thing and shows the air quality (humidity - °C, temperature - °C and gas level) for your room or wherever you are through your wi-fi connection. </p>
     <p>Humidity is measured by DHT11 sensor and gas level is measured by MQ35 sensor. The data is collected for the <strong>lastest  6 hours</strong>.</p>
      <p>
      <i
        >(Humidity is defined as the proportion of water in the air. Relative Humidity (RH). 
        Humidity Accuracy: ±5%RH. Temperature Accuracy: ±2% °C)</i
      >
    </p>
    <p>
    <i
        >(Gas contains NH3, Nox, CO2, Alcohol, Benzene, Smoke. Gas level is measured to detect harmful gas in the environment.)</i
      >
    </p>
    <button @click="collectData()" class="btn btn-success">CHECK</button>
    <br />
    <bar-chart :axisData="axisData" v-if="axisData.length > 0" />
    <br />
    <table id="firstTable" v-if="axisData.length > 0">
      <thead>
        <tr>
          <th>Time</th>
          <th>Humidity</th>
          <th>Temperature</th>
          <th>Gas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in axisData" :key="index">
          <td>{{ data.x }}</td>
          <td>{{ data.y }}</td>
          <td>{{ data.z}}</td>
          <td>{{ data.g}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BarChart from "./components/BarChart.vue";
import axios from "axios";
import Pusher from 'pusher-js'

export default {
  name: "App",
  components: {
    BarChart,
  },
  data() {
    return {
      axisData: [],
      diagrams: [{ diagram: "Bar Chart1" }, { diagram: "Bar Chart2" }, { diagram: "Bar Chart3" }],
    };
  },
  methods: {
    getData() {
       axios
        .get("http://localhost:8080/api/quality")
        .then((response) => {
          this.axisData = response.data.dataPoints.map((el) => ({
            x: new Date(el.timestamp*1000).getHours().toString() + ":" + new Date(el.timestamp*1000).getMinutes().toString(),
            y: parseFloat(el.humidity),
            z: parseFloat(el.temperature),
            g: parseFloat(el.gas),
          }));
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(this.axisData.splice(0, this.axisData.length), 15000)
    },
    collectData() {
      setInterval(() => {
       this.getData();
      }, 15000)  
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  background-color: rgb(229, 221, 221);
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

h1 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 2rem;
  color: rgb(5, 74, 116);
}

button {
  width: auto;
  height: auto;
  font-weight: bold;
  font-size: 1rem;
  background-color: rgb(113, 160, 190);
}

#firstTable {
  margin-top: 5em;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 75%;
  margin-left: auto;
  margin-right: auto;
}

#firstTable td,
#firstTable th {
  border: 1px solid #ddd;
  padding: 8px;
}

#firstTable tr:nth-child(even) {
  background-color: #f2f2f2;
}

#firstTable tr:hover {
  background-color: #ddd;
}

#firstTable th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #445676;
  color: white;
}

</style>
