import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './spcChart.css';

var yMean = 30,
    yMax = 60,
    yMin = 0,
    numPoints = 20,
    xDiff = 10,
    xMax = numPoints * xDiff;

const options = {
    chart: {
        className: 'spc-chart',
        height: '300px'
    },
    xAxis: {
        min: 0,
        max: xMax,
        title: {
            text: 'SPC Chart'
        }
    },
    yAxis: {
        min: 0,
        max: yMax,
        title: {
            text: ''
        },
        plotLines: [
            {
                className: 'control-limit-2',
                color: '#51C2F0',
                dashStyle: 'Dash',
                width: 1,
                value: 50,
                label: {
                    align: 'right',
                    text: 'UCL',
                    style: {
                        fontSize: '10px',
                        color: '#51C2F0'
                    }
                }
            },
            {
                className: 'control-limit-2',
                color: '#51C2F0',
                dashStyle: 'Dash',
                width: 1,
                value: 10,
                label: {
                    align: 'right',
                    text: 'LCL',
                    style: {
                        fontSize: '10px',
                        color: '#51C2F0'
                    }
                }
            },
            {
                className: 'mean-data-line',
                color: '#8897A1',
                width: 1,
                value: yMean,
                label: {
                    align: 'right',
                    text: 'Cl - Mean',
                    style: {
                        fontSize: '10px'
                    }
                }
            },
        ]
    },
    title: {
        text: ''
    },
    credits: {
        enabled: false
    },
    legend: {
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
        floating: true
    },
    series: [
        {
            type: 'line',
            name: 'Your score',
            className: 'main-data-line',
            data: getSpcData(),
            marker: {
                symbol: 'circle',
                radius: 4,
            }
        }
    ],
    tooltip: { 
        //enabled: false,
    },
}

function getSpcData() {
    var data = [];

    for (var i = 1; i <= numPoints; i++) {
        data.push([i * xDiff, randBetween(yMin, yMax)]);
    }

    return data;
}

function randBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const SpcChart = (props) => {
    console.log(props);
    return (
        <div className="spc-chart-container">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
}

export default SpcChart;