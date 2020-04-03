# NHS SPC Component

### Installation
___
Once imported use the following to add the module to your code:

#### ES6

    import SPCComponent from 'nhs-spc-chart-component';

#### < ES6

    var SPCComponent = require('nhs-spc-chart-component');

### Packaging
___
For Linux/OSX environments

    npm run package

For Windows environments

    npm run package_win

### Parameters
___
The component takes the following parameters:
| Parameter | Required? | Description |
| --------- | --------- | ----------- |
| chartOptions | mandatory | [chartOptions](#chartOptions) object |
| chartData | mandatory | [chartData](#chartData) object |
| limits | optional | [limits](#limits) object |
| | | |

#### chartOptions

| Parameter  | Required? | Description                                                                         |
| ---------- | --------- | ----------------------------------------------------------------------------------- |
| title      | mandatory | The title of the overall chart                                                      |
| styledMode | mandatory | True/False value to overwrite the default chart stylesheet. (Defaults to false).    |
| xAxis      | mandatory | Object. Contains `title`, `min` and `max` parameters relating to the chart's X Axis |
| yAxis      | mandatory | Object. Contains `title`, `min` and `max` parameters relating to the chart's Y Axis |

#### chartData

| Parameter   | Required? | Description                                                                         |
| ----------- | --------- | ----------------------------------------------------------------------------------- |
| description | optional  | Name of data line, to identify in the legend.                                       |
| plotPoints  | optional  | Array of `{ x: 0, y: 0 }` object values representing plot points for the chart data |

#### limits

| Parameter | Required? | Description                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rules     | optional  | Array of string values containing the name of the ruleset. E.g. `['Western Electric]`                                                                                                                                                                                                                                                                                                                                                               |
| upper     | optional  | Object controlling the chart's upper limit. Contains:<br />`anomalyColor`: String value accepting literal, Hex and RGB colour values to style anomaly points outside rule limits<br />`hexColor`: String value in Hex format to colour limit line<br/>`text`: String value to identify limit in the legend<br/>`values`: Array of numeric values plotting the limit line on the chart. Length must equal the length of the plotPoints array.        |
| mean      | optional  | Object controlling the chart's mean/average limit. Contains:<br />`anomalyColor`: String value accepting literal, Hex and RGB colour values to style anomaly points outside rule limits<br />`hexColor`: String value in Hex format to colour limit line<br/>`text`: String value to identify limit in the legend<br/>`values`: Array of numeric values plotting the limit line on the chart. Length must equal the length of the plotPoints array. |
| lower     | optional  | Object controlling the chart's lower limit. Contains:<br />`anomalyColor`: String value accepting literal, Hex and RGB colour values to style anomaly points outside rule limits<br />`hexColor`: String value in Hex format to colour limit line<br/>`text`: String value to identify limit in the legend<br/>`values`: Array of numeric values plotting the limit line on the chart. Length must equal the length of the plotPoints array.        |
