<template>
  <div id="app">
    <h1>Air Quality visualization</h1>
    <p>
      This apps collects sensor data from its IoT thing and shows the air
      quality (humidity - °C, temperature - °C and gas level) for your room or
      wherever you are through your wi-fi connection. Data is sent in every 5 minutes.
    </p>
    <p>
      Humidity is measured by DHT11 sensor and gas level is measured by MQ35
      sensor. The data is collected for the <strong>last hour</strong>.
    </p>
    <p>
      <i
        >(Humidity is defined as the proportion of water in the air. Relative
        Humidity (RH). Humidity Accuracy: ±5%RH. Temperature Accuracy: ±2%
        °C)</i
      >
    </p>
    <p>
      <i
        >(Gas contains NH3, Nox, CO2, Alcohol, Benzene, Smoke. Gas level is
        measured to detect harmful gas in the environment.)</i>
    </p>
     <button @click="fetchData()" class="btn btn-success">
        CHECK
      </button>
    <div v-if="axisData.length > 0">
    <svg id="svg1"></svg>
    </div>
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
          <td>{{ data.z }}</td>
          <td>{{ data.g }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Pusher from "pusher-js";
import * as d3 from "d3";

const socket = new Pusher("0ce0e5f137bf3b35eb23", {
  cluster: "eu",
  encrypted: true,
});
const channel = socket.subscribe("poll-channel");

export default {
  name: "App",
  data() {
    return {
      axisData: [],
      diagrams: [
        { diagram: "Bar Chart1" },
        { diagram: "Bar Chart2" },
        { diagram: "Bar Chart3" },
      ],
    };
  },
  methods: {
    fetchData() {
      setInterval(() => {
        axios
          .get("http://localhost:8080/data")
          // eslint-disable-next-line no-unused-vars
          .then((response) => {
            channel.bind("update-poll", (data) => {
              this.axisData = data.newData.map((el) => ({
                x:
                  new Date(el.timestamp * 1000).getHours().toString() +
                  ":" +
                  new Date(el.timestamp * 1000).getMinutes().toString(),
                y: parseFloat(el.humidity),
                z: parseFloat(el.temperature),
                g: parseFloat(el.gas),
              })
              );
            });
            this.renderHumidityChart();
          })
          .catch((error) => {
            console.log(error);
          });
      }, 15000);
    },
    renderHumidityChart() {
      const height = 600;
      const roundedHeight = Math.ceil((height + 1) / 10) * 10;
      const width = 850;
     
      // set the ranges
      const xScale = d3
        .scaleBand()
        .domain(this.axisData.map((dataPoint) => dataPoint.x))
        .range([0, width])
        .padding(0.2);

      const yScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([roundedHeight, 10]);

      const container = d3
        .select("#svg1")
        .classed("chart-container", true)
        .style("height", `${roundedHeight}px`)
        .style("width", `${width}px`);

      // eslint-disable-next-line no-unused-vars
      container
        .selectAll(".bar")
        .data(this.axisData)
        .enter()
        .append("rect")
        .classed("bar", true)
        .attr("width", xScale.bandwidth())
        .attr("height", (data) => roundedHeight - yScale(data.y))
        .attr("x", (data) => xScale(data.x))
        .attr("y", (data) => yScale(data.y));
      // add the x Axis
      container
        .append("g")
        .attr("transform", "translate(0," + roundedHeight + ")")
        .style("font", "16px times")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "translate(-15, 15) rotate(-45)");

      // add the y Axis
      container
        .append("g")
        .style("font", "16px times")
        .call(d3.axisLeft(yScale));

      container
        .append("text")
        .attr("x", width / 2)
        .attr("y", "20px")
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .text("Humidity Barchart");

      const texts = container
        .selectAll(".mytexts")
        .data(this.axisData)
        .enter()
        .append("text");
      texts
        .attr("class", "value")
        .attr("x", function (d) {
          return xScale(d.x);
        })
        .attr("y", function (d) {
          return yScale(d.y);
        })
        .attr("dx", 18)
        .attr("dy", "1.2em")
        .attr("text-anchor", "end")
        .text(function (d) {
          return d.y;
        })
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr("font-size", "18px")
        .attr("color", "black");

      const line = d3
        .line()
        .x(function (d) {
          return xScale(d.x) + xScale.bandwidth() / 3;
        })
        .y(function (d) {
          return yScale(d.y);
        })
        .curve(d3.curveMonotoneX);

      container
        .append("path")
        .attr("class", "line") // Assign a class for styling
        .attr("d", line(this.axisData)); // 11. Calls the line generator
    },
  },
  updated() {
    this.renderHumidityChart();
  },
  beforeUpdate() {
    const svg = d3.select("svg");
    svg.selectAll("*").remove();
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

.chart-container,
#svg1,
#svg2,
#svg3 {
  border: 2px solid navy;
  margin-top: 4em;
  margin-left: 30px;
  margin-right: auto;
  overflow: visible;
}

text {
  fill: rgb(11, 11, 64);
  font-size: smaller;
}

path.domain {
  stroke: transparent;
}

.line {
  fill: none;
  stroke: rgb(225, 68, 65);
  stroke-width: 3;
}

.bar {
  fill: rgb(80, 120, 231);
}

.bar:hover {fill: orange; }
</style>
