<template>
  <div id="app">
    <button @click="collectData()" class="btn btn-success">SEARCH</button>
    <br />
    <line-chart :axisData="axisData" v-if="axisData.length > 0" />
  </div>
</template>

<script>
import LineChart from "./components/LineChart.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    LineChart,
  },
  data() {
    return {
      axisData: [],
      diagrams: [{ diagram: "Line Chart" }],
    };
  },
  methods: {
    collectData() {
      axios
        .get("http://localhost:8080/api/quality")
        .then((response) => {
          this.axisData = response.data.dataPoints.map((el) => ({
            x: el.timestamp,
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
</style>
