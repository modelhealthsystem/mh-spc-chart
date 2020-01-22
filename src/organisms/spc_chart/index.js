import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './styles.css';

export default (props) => {
    let error = { flag: false, message: '' };
    let chartData = [];

    const generateXaxis = () => {
        const xAxis = {
            min: props.chartOptions.xAxis.min || null,
            max: props.chartOptions.xAxis.max || null,
            title: {
                text: props.chartOptions.xAxis.title || null
            }
        }
        return xAxis;
    }

    const generateYaxis = () => {
        const yAxis = {
            min: props.chartOptions.xAxis.min || null,
            max: props.chartOptions.xAxis.max || null,
            title: {
                text: props.chartOptions.yAxis.title || null
            },
            plotLines: generatePlotLines()
        }
        return yAxis;
    }

    const generatePlotLines = () => {
        return [
            {
                className: 'control-limit-2',
                color: props.limits.upper.hexColor || '#51C2F0',
                dashStyle: 'Dash',
                width: props.limits.upper.width || 1,
                value: props.limits.upper.value || 0,
                label: {
                    align: 'right',
                    text: props.limits.upper.text || '',
                    style: {
                        fontSize: '10px',
                        color: props.limits.upper.hexColor || '#51C2F0'
                    }
                }
            },
            {
                className: 'control-limit-2',
                color: props.limits.lower.hexColor || '#51C2F0',
                dashStyle: 'Dash',
                width: props.limits.lower.width || 1,
                value: props.limits.lower.value || 0,
                label: {
                    align: 'right',
                    text: props.limits.lower.text || '',
                    style: {
                        fontSize: '10px',
                        color: props.limits.lower.hexColor || '#51C2F0'
                    }
                }
            },
            {
                className: 'mean-data-line',
                color: props.limits.mean.hexColor || '#8897A1',
                width: props.limits.mean.width || 1,
                value: props.limits.mean.value || 0,
                label: {
                    align: 'right',
                    text: props.limits.mean.text || '',
                    style: {
                        fontSize: '10px',
                        color: props.limits.mean.hexColor || '#8897A1'
                    }
                }
            }
        ]
    }
    
    if (props.chartData.plotPoints.length > 0) {
        const { plotPoints: dataArray } = props.chartData;
        const plotPointArrayLength = dataArray.length;
        let axisCount = {
            x: 0,
            y: 0
        };
        dataArray.forEach(plotPoint => {
            ['x', 'y'].forEach(axis => {
                if (Object.keys(plotPoint).includes(axis) && (plotPoint[axis] !== null && plotPoint[axis] !== undefined) && Number.isInteger(plotPoint[axis])) axisCount[axis]++;
            });
        });
        if (axisCount.x === plotPointArrayLength && axisCount.y === plotPointArrayLength) {
            chartData = props.chartData.plotPoints
        } else {
            error = { flag: true, message: "Incorrect data sent to SPC chart." };
        }
    } else {
        error = { flag: true, message: "Incorrect data sent to SPC chart." };
    }

    const chartOptions = {
        chart: {
            className: 'mh-spc-chart',
            height: (9 / 16 * 100) + '%'
        },
        title: {
            text: props.chartOptions.title || ''
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
        xAxis: generateXaxis(),
        yAxis: generateYaxis(),
        series: [
            {
                type: 'line',
                name: props.chartData.description || '',
                className: 'main-data-line',
                data: chartData,
                marker: {
                    symbol: 'circle',
                    radius: 4,
                }
            }
        ],
        tooltip: {
            enabled: true
        }
    }

    return (
        <>
            {
                (error.flag) 
                ? 
                    <div className="spc-error">{error.message}</div>
                :
                    <div className="spc-chart-container">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={chartOptions}
                        />
                    </div>
            }
        </>
    );
}