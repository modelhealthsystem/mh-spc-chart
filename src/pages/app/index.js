import React, { Component } from "react";
import SpcChartComponent from "../../organisms/spc_chart";

export default class SpcChart extends Component {
  state = {
    chartOptions: {
      title: "Water Consumption SPC Chart",
      styledMode: false,
      xAxis: {
        title: "Time (days)",
        min: null,
        max: null
      },
      yAxis: {
        title: "Water (ml)",
        min: null,
        max: null
      }
    },
    chartData: {
      description: "Water Intake",
      plotPoints: [
        { x: 1, y: 35 },
        { x: 2, y: 34 },
        { x: 3, y: 28 },
        { x: 4, y: 27 },
        { x: 5, y: 29 },
        { x: 6, y: 26.5 },
        { x: 7, y: 32 },
        { x: 8, y: 24 },
        { x: 9, y: 27.5 }
      ]
    },
    limits: {
      rules: ["Western Electric"],
      upper: {
        anomalyColor: "orange",
        hexColor: "#7FBF7F",
        text: "Upper CL",
        values: [33, 33, 33, 31, 31, 31, 31, 31, 31]
      },
      mean: {
        hexColor: "#8897A1",
        text: "Mean",
        values: [30, 30, 30, 28, 28, 28, 28, 28, 28]
      },
      lower: {
        anomalyColor: "orange",
        hexColor: "#B20000",
        text: "Lower CL",
        values: [23, 23, 23, 27.25, 27.25, 27.25, 27.25, 27.25, 27.25]
      }
    }
  };

  render() {
    return <SpcChartComponent {...this.state} />;
  }
}
