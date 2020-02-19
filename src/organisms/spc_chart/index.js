import React from 'react';
import Highcharts from 'highcharts';
import HcExport from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official';
import './styles.css';

HcExport(Highcharts)

export default (props) => {
    let { chartOptions, chartData, limits } = props;

    // Generate default structure to handle null props
    let co = Object.assign({ title: null, xAxis: {}, yAxis: {}, legend: {} }, chartOptions);
    let cd = Object.assign({ description: null, plotPoints: [] }, chartData);
    let lim = Object.assign({ upper: {}, mean: {}, lower: {} }, limits);
    let error = { flag: false, message: '' };
    
    const generateStyledMode = () => {
        if (co.styledMode && typeof co.styledMode === 'boolean') {
            return co.styledMode;
        }
        return false;
    }
    
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
            min: co.yAxis.min || null,
            max: co.yAxis.max || null,
            title: {
                text: co.yAxis.title || null
            }
        }
        return yAxis;
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
                if (Object.keys(plotPoint).includes(axis) && (plotPoint[axis] !== null && plotPoint[axis] !== undefined) && typeof(plotPoint[axis]) === 'number') axisCount[axis]++;
            });
        });
        if (axisCount.x !== plotPointArrayLength || axisCount.y !== plotPointArrayLength) error = { flag: true, message: "Incorrect data sent to SPC chart." };
    } else {
        error = { flag: true, message: "Incorrect data sent to SPC chart." };
    }
    
    const calculateLimits = () => {
        const limitObject = {
            type: 'spline',
            name: null,
            description: null,
            className: 'control-limit-2',
            pointStart: (cd.plotPoints && Array.isArray(cd.plotPoints) && cd.plotPoints.length > 0) ? cd.plotPoints[0].x : 0,
            color: null,
            data: [],
            dataLabels: [{ enabled: false }],
            marker: { enabled: false },
            dashStyle: 'shortdot',
            showInLegend: true,
            states: {
                hover: {
                    enabled: false,
                    marker: { enabled: false }
                },
                inactive: { opacity: 1 }
            },
            enableMouseTracking: false
        };

        const calculationData = cd.plotPoints.map((pp, idx) => ({
            data: pp.y,
            amr: (cd.plotPoints.length-1 === idx) ? null : Math.abs(pp.y - cd.plotPoints[idx + 1].y),
            mean: cd.plotPoints.map(pp => pp.y).reduce((a,b) => a + b, 0) / cd.plotPoints.length
        }));

        const amrList = calculationData.map(cd => cd.amr).filter(Number);
        const averageAMR = amrList.reduce((a,b) => a + b, 0) / amrList.length;
        
        const upperLimit = Object.assign({}, ...[limitObject, { 
            name: lim.upper.text || '', 
            description: lim.upper.text || '',
            color: lim.upper.hexColor || undefined,
            data: (lim.upper.values && Array.isArray(lim.upper.values) && lim.upper.values.length > 0 && lim.upper.values.length >= cd.plotPoints.length) 
                ? lim.upper.values 
                : calculationData.map(d => d.mean + 2.66 * averageAMR)
        }]);

        const meanLimit = Object.assign({}, ...[limitObject, { 
            name: lim.mean.text || '', 
            description: lim.mean.text || '', 
            color: lim.mean.hexColor || undefined,
            data: (lim.mean.values && Array.isArray(lim.mean.values) && lim.mean.values.length > 0 && lim.mean.values.length >= cd.plotPoints.length) 
                ? lim.mean.values 
                : calculationData.map(d => d.mean) 
        }]);
        
        const lowerLimit = Object.assign({}, ...[limitObject, { 
            name: lim.lower.text || '', 
            description: lim.lower.text || '', 
            color: lim.lower.hexColor || undefined,
            data: (lim.lower.values && Array.isArray(lim.lower.values) && lim.lower.values.length > 0 && lim.lower.values.length >= cd.plotPoints.length) 
                ? lim.lower.values 
                : calculationData.map(d => d.mean - 2.66 * averageAMR ) 
        }]);

        return [upperLimit, meanLimit, lowerLimit]
    }

    const options = {
        chart: {
            className: 'mh-spc-chart',
            height: (9 / 16 * 100) + '%',
            styledMode: generateStyledMode()
        },
        title: {
            text: co.title || ''
        },
        credits: {
            enabled: false
        },
        legend: {
            align: co.legend.justify || 'center',
            verticalAlign: co.legend.verticalAlign || 'bottom',
            layout: co.legend.layout || 'horizontal',
            floating: co.legend.hover || false
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
                },
                states: {
                    inactive: {
                        opacity: 1
                    }
                }
            },
            ...calculateLimits()
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