// import test from 'tape';
import React from 'react';
import SpcComponent from './index';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

const testData = {
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
};

describe('The Chart Component', () => {
	it('Should Render Chart Element', () => {
		const body = document.body;
		body.insertAdjacentHTML('afterbegin', '<div id="chart-test"></div>');
		const chartTestElement = document.getElementById('chart-test');

		const wrapper = mount(<SpcComponent {...testData} />, { attachTo: chartTestElement });
		expect(wrapper.html().toString().search('mh-spc-chart')).toBeGreaterThan(-1);
		wrapper.detach();
		body.removeChild(chartTestElement);
	})

	it('Should Render an Message When No Plot Point Data Is Passed', () => {
		const td = Object.assign({}, testData);
		td.chartData.plotPoints = [];
		const wrapper = mount(<SpcComponent {...testData} />);
		expect(wrapper.html()).toBe('<div class="spc-error">Incorrect data sent to SPC chart.</div>');
	})

	it('Should Render an Message When Incorrect Plot Point Data Is Passed', () => {
		const td = Object.assign({}, testData);
		td.chartData.plotPoints = [{ x: 10, y:20}, { x: 20, y: 30}, { x: 30 }];
		const wrapper = mount(<SpcComponent {...testData} />);
		expect(wrapper.html()).toBe('<div class="spc-error">Incorrect data sent to SPC chart.</div>');
	})
})