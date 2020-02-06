import React, { Component } from 'react';
import SpcChartComponent from '../../organisms/spc_chart';

export default class SpcChart extends Component {

  state = {
    chartOptions: {
      title: 'Water Consumption SPC Chart',
      styledMode: false,
      xAxis: {
        title: 'Time (days)',
        min: null,
        max: null
      },
      yAxis: {
        title: 'Water (ml)',
        min: 750,
        max: null
      },
    },
    chartData: {
      description: 'Water Intake',
      plotPoints: [
        { x: 1, y: 2000},
        { x: 2, y: 3150},
        { x: 3, y: 1350},
        { x: 4, y: 3750},
        { x: 5, y: 750},
        { x: 6, y: 3250},
        { x: 7, y: 3500}
      ]
    },
    limits: {
      upper: {
        hexColor: '#51C2F0',
        width: 1,
        text: 'Overhydrated',
        value: 3250
      },
      mean: {
        hexColor: '#8897A1',
        width: 1,
        text: 'Target',
        value: 2500
      },
      lower: {
        hexColor: '#8897A1',
        width: 1,
        text: 'Underhydrated',
        value: 1750
      }
    }
  }
  
  render() {
    return <SpcChartComponent {...this.state} />;
  }
}
