<template>
  <div>
    <!-- this part is needed to load data for line chart faster-->
    <p style="display: none">{{ axisData }}</p>
    <svg id="svg1"></svg>
    <svg id="svg2"></svg>
    <svg id="svg3"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "BarChart",
  props: ["axisData"],
  computed: {
    filteredData() {
      return this.axisData.filter((el) => el.y);
    },
    maxValue() {
      return Math.max(...this.axisData.map((el) => el.z + el.g));
    },
  },
  methods: {
    renderHumidityChart() {
      const height = 300;
      const roundedHeight = Math.ceil((height + 1) / 10) * 10;
      const width = 450;

      // set the ranges
      const xScale = d3
        .scaleBand()
        .domain(this.filteredData.map((dataPoint) => dataPoint.x))
        .range([0, width])
        .padding(0.2);

      const yScale = d3
        .scaleLinear()
        .domain([0, this.maxValue])
        .range([roundedHeight, 10]);

      const container = d3
        .select("#svg1")
        .classed("chart-container", true)
        .style("height", `${roundedHeight}px`)
        .style("width", `${width}px`);

      // eslint-disable-next-line no-unused-vars
      container
        .selectAll(".bar")
        .data(this.filteredData)
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
        .data(this.filteredData)
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
        .attr("d", line(this.filteredData)); // 11. Calls the line generator
    },
    renderTemperatureChart() {
      const height = 300;
      const roundedHeight = Math.ceil((height + 1) / 10) * 10;
      const width = 450;

      // set the ranges
      const xScale = d3
        .scaleBand()
        .domain(this.filteredData.map((dataPoint) => dataPoint.x))
        .range([0, width])
        .padding(0.2);

      const yScale = d3
        .scaleLinear()
        .domain([0, this.maxValue])
        .range([roundedHeight, 10]);

      const container = d3
        .select("#svg2")
        .classed("chart-container", true)
        .style("height", `${roundedHeight}px`)
        .style("width", `${width}px`);

      // eslint-disable-next-line no-unused-vars
      container
        .selectAll(".bar1")
        .data(this.filteredData)
        .enter()
        .append("rect")
        .classed("bar1", true)
        .attr("width", xScale.bandwidth())
        .attr("height", (data) => roundedHeight - yScale(data.z))
        .attr("x", (data) => xScale(data.x))
        .attr("y", (data) => yScale(data.z));
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
        .text("Temperature Barchart");

      const texts = container
        .selectAll(".mytexts")
        .data(this.filteredData)
        .enter()
        .append("text");
      texts
        .attr("class", "value")
        .attr("x", function (d) {
          return xScale(d.x);
        })
        .attr("y", function (d) {
          return yScale(d.z);
        })
        .attr("dx", 25)
        .attr("dy", "1em")
        .attr("text-anchor", "end")
        .text(function (d) {
          return d.z;
        })
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr("font-size", "18px")
        .attr("color", "black");

      const line = d3
        .line()
        .x(function (d) {
          return xScale(d.x) + xScale.bandwidth() / 2;
        })
        .y(function (d) {
          return yScale(d.z);
        })
        .curve(d3.curveMonotoneX);

      container
        .append("path")
        .attr("class", "line") // Assign a class for styling
        .attr("d", line(this.filteredData)); // 11. Calls the line generator
    },
    renderGasChart() {
      const height = 300;
      const roundedHeight = Math.ceil((height + 1) / 10) * 10;
      const width = 450;

      // set the ranges
      const xScale = d3
        .scaleBand()
        .domain(this.filteredData.map((dataPoint) => dataPoint.x))
        .range([0, width])
        .padding(0.2);

      const yScale = d3
        .scaleLinear()
        .domain([0, this.maxValue])
        .range([roundedHeight, 10]);

      const container = d3
        .select("#svg3")
        .classed("chart-container", true)
        .style("height", `${roundedHeight}px`)
        .style("width", `${width}px`);

      // eslint-disable-next-line no-unused-vars
      container
        .selectAll(".bar2")
        .data(this.filteredData)
        .enter()
        .append("rect")
        .classed("bar2", true)
        .attr("width", xScale.bandwidth())
        .attr("height", (data) => roundedHeight - yScale(data.g))
        .attr("x", (data) => xScale(data.x))
        .attr("y", (data) => yScale(data.g));
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
        .text("Gas Barchart");

      const texts = container
        .selectAll(".mytexts")
        .data(this.filteredData)
        .enter()
        .append("text");
      texts
        .attr("class", "value")
        .attr("x", function (d) {
          return xScale(d.x);
        })
        .attr("y", function (d) {
          return yScale(d.g);
        })
        .attr("dx", 30)
        .attr("dy", "1em")
        .attr("text-anchor", "end")
        .text(function (d) {
          return d.g;
        })
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .attr("font-size", "15px")
        .attr("color", "black");

      const line = d3
        .line()
        .x(function (d) {
          return xScale(d.x) + xScale.bandwidth() / 2;
        })
        .y(function (d) {
          return yScale(d.g);
        })
        .curve(d3.curveMonotoneX);

      container
        .append("path")
        .attr("class", "line") // Assign a class for styling
        .attr("d", line(this.filteredData)); // 11. Calls the line generator
    },
  },
  mounted() {
    this.renderHumidityChart();
    this.renderTemperatureChart();
    this.renderGasChart();
  },
  updated() {
    this.renderHumidityChart();
    this.renderTemperatureChart();
    this.renderGasChart();
  },
  beforeUpdate() {
    const svg = d3.select("svg");
    svg.selectAll("*").remove();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

.bar1 {
  fill: rgb(237, 124, 143);
}

.bar2 {
  fill: rgb(235, 164, 59);
}

</style>
