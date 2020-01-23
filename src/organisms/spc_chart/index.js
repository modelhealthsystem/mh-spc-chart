import React from 'react';
import Highcharts from 'highcharts';
import HcExport from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official';
import './styles.css';

HcExport(Highcharts)

export default (props) => {
    let { chartOptions, chartData, limits } = props;

    // Generate default structure to handle null props
    let co = Object.assign({ title: null, xAxis: {}, yAxis: {} }, chartOptions);
    let cd = Object.assign({ description: null, plotPoints: [] }, chartData);
    let lim = Object.assign({ upper: {}, mean: {}, lower: {} }, limits);
    let error = { flag: false, message: '' };
    
    const generateXaxis = () => {
        const xAxis = {
            min: co.xAxis.min || null,
            max: co.xAxis.max || null,
            title: {
                text: co.xAxis.title || null
            }
        }
        return xAxis;
    }

    const generateYaxis = () => {
        const yAxis = {
            min: co.xAxis.min || null,
            max: co.xAxis.max || null,
            title: {
                text: co.yAxis.title || null
            },
            plotLines: generatePlotLines()
        }
        return yAxis;
    }

    const generatePlotLines = () => {
        return [
            {
                className: 'control-limit-2',
                color: lim.upper.hexColor || '#51C2F0',
                dashStyle: 'Dash',
                width: lim.upper.width || 1,
                value: lim.upper.value || 0,
                label: {
                    align: 'right',
                    text: lim.upper.text || '',
                    style: {
                        fontSize: '10px',
                        color: lim.upper.hexColor || '#51C2F0'
                    }
                }
            },
            {
                className: 'control-limit-2',
                color: lim.lower.hexColor || '#51C2F0',
                dashStyle: 'Dash',
                width: lim.lower.width || 1,
                value: lim.lower.value || 0,
                label: {
                    align: 'right',
                    text: lim.lower.text || '',
                    style: {
                        fontSize: '10px',
                        color: lim.lower.hexColor || '#51C2F0'
                    }
                }
            },
            {
                className: 'mean-data-line',
                color: lim.mean.hexColor || '#8897A1',
                width: lim.mean.width || 1,
                value: lim.mean.value || 0,
                label: {
                    align: 'right',
                    text: lim.mean.text || '',
                    style: {
                        fontSize: '10px',
                        color: lim.mean.hexColor || '#8897A1'
                    }
                }
            }
        ]
    }
    
    if (cd.plotPoints.length > 0) {
        const { plotPoints: dataArray } = cd;

        // Iterate over plot points and check if they are in the correct format for rendering i.e. [{ x: 1, y: 1 }]
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
        if (axisCount.x !== plotPointArrayLength || axisCount.y !== plotPointArrayLength) error = { flag: true, message: "Incorrect data sent to SPC chart." };
    } else {
        error = { flag: true, message: "Incorrect data sent to SPC chart." };
    }

    const options = {
        chart: {
            className: 'mh-spc-chart',
            height: (9 / 16 * 100) + '%'
        },
        title: {
            text: co.title || ''
        },
        credits: {
            enabled: false
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            floating: false
        },
        xAxis: generateXaxis(),
        yAxis: generateYaxis(),
        series: [
            {
                type: 'line',
                name: cd.description || '',
                className: 'main-data-line',
                data: cd.plotPoints,
                marker: {
                    symbol: 'circle',
                    radius: 4,
                }
            }
        ],
        tooltip: {
            enabled: true
        },
        exporting: {
            enabled: co.export || false,
            filename: co.title || "chart",
            buttons: {
                contextButton: {
                    text: 'Options'
                }
            }
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
                            options={options}
                        />
                    </div>
            }
        </>
    );
}