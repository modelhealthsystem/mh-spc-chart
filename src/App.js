import React, { Component } from 'react';
import SpcChartComponent from './spcChart';

import './App.css';

export default class SpcChart extends Component {

  render() {
    return (
      <div className="App">
        <h1>SPC Chart Component</h1>
        <div className="content-container">
          <SpcChartComponent />
        </div>
      </div>
    );
  }
}
