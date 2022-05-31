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
  </div>
</template>

<script>
import BarChart from "./components/BarChart.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    BarChart,
  },
  data() {
    return {
      axisData: [],
      diagrams: [{ diagram: "Bar Chart1" }, { diagram: "Bar Chart2" }, { diagram: "Bar Chart3" }, { diagram: "Donut Chart1" } ],
    };
  },
  methods: {
    collectData() {
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

button {
  width: auto;
  height: auto;
  font-weight: bold;
  font-size: 1rem;
  background-color: rgb(113, 160, 190);
}

</style>
