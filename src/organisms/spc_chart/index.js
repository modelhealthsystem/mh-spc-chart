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
    let lim = Object.assign({ rules: [], upper: {}, mean: {}, lower: {} }, limits);
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

    const calculationData = cd.plotPoints.map((pp, idx) => ({
        data: pp.y,
        amr: (cd.plotPoints.length-1 === idx) ? null : Math.abs(pp.y - cd.plotPoints[idx + 1].y),
        mean: cd.plotPoints.map(pp => pp.y).reduce((a,b) => a + b, 0) / cd.plotPoints.length
    }));

    const createLimitObject = (limit, type) => {
        const baseObject = {
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
        const createLimitData = () => {
            if (limit.values && Array.isArray(limit.values) && limit.values.length > 0 && limit.values.length >= cd.plotPoints.length) return limit.values;
            const amrList = calculationData.map(cd => cd.amr).filter(Boolean);
            const amr = amrList.reduce((a,b) => b += a) / calculationData.map(cd => cd.amr).filter(Boolean).length;
            
            switch(type) {
                case 'upper': return calculationData.map(d => d.mean + 2.66 * amr);
                case 'mean': return calculationData.map(d => d.mean);
                case 'lower': return calculationData.map(d => d.mean - 2.66 * amr);
                default: return limit.values;
            }
        }
        return Object.assign({}, ...[baseObject, { 
            name: limit.text || '', 
            description: limit.text || '',
            color: limit.hexColor || undefined,
            data: createLimitData()
        }]);
    }
    
    const upperLimit = createLimitObject(lim.upper, 'upper');
    const meanLimit = createLimitObject(lim.mean, 'mean');    
    const lowerLimit = createLimitObject(lim.lower, 'lower');

    const limitArray = [upperLimit, meanLimit, lowerLimit]

    const _plotPoints = cd.plotPoints.map((p, idx) => {
        const upperLimitValue = upperLimit.data[idx];
        const lowerLimitValue = lowerLimit.data[idx];
        const ruleSet = [p];
        if (lim.rules && Array.isArray(lim.rules) && lim.rules.length > 0) {
            lim.rules.forEach(r => {
                switch(r.trim().toLowerCase()) {
                    case 'western electric': 
                        ruleSet.push({ color: (p.y > upperLimitValue) ? lim.upper.anomalyColor || 'red' : (p.y < lowerLimitValue) ? lim.lower.anomalyColor || 'red' : null });
                        break;
                    default: 
                        ruleSet.push({});
                        break;
                }
            })
        }
        
        return Object.assign({}, ...ruleSet);
    })

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
                data: _plotPoints,
                marker: {
                    symbol: 'circle',
                    radius: 4
                }
            },
            ...limitArray
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