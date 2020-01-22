import React, { Component } from 'react';
import SpcChartComponent from '../../organisms/spc_chart';

export default class SpcChart extends Component {

  state = {
    chartOptions: {
      title: 'Onion Consumption SPC Chart',
      xAxis: {
        title: 'Time (days)',
        min: null,
        max: null
      },
      yAxis: {
        title: 'Onions',
        min: null,
        max: null
      },
    },
    chartData: {
      description: 'Onions Consumed',
      plotPoints: [
        { x: 0, y: 3},
        { x: 10, y: 25},
        { x: 20, y: 10},
        { x: 30, y: 53},
        { x: 40, y: 40},
        { x: 50, y: 60},
        { x: 60, y: 2},
        { x: 70, y: 15},
        { x: 80, y: 45},
        { x: 90, y: 52},
      ]
    },
    limits: {
      upper: {
        hexColor: '#51C2F0',
        width: 1,
        text: 'Upper Limit',
        value: 50
      },
      mean: {
        hexColor: '#8897A1',
        width: 1,
        text: 'Mean',
        value: 30
      },
      lower: {
        hexColor: '#8897A1',
        width: 1,
        text: 'Lower Limit',
        value: 10
      }
    }
  }
  
  render() {
    return <SpcChartComponent {...this.state} />;
  }
}
