import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';

class StackChart extends Component {
  componentDidMount() {
    // 初始化
    var stackChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    stackChart.setOption({
      title: {
        text: 'Home | Auto Insurances',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: 'red',
          },
        },
      },
      legend: {
        data: ['Home Insurance', 'Auto Insurance'],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [
            'First Season',
            'Second Season',
            'Third Season',
            'Fourth Season',
          ],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Home Insurance',
          type: 'line',
          stack: 'total count',
          areaStyle: {},
          data: [2, 10, 18, 13],
        },
        {
          name: 'Auto Insurance',
          type: 'line',
          stack: 'total count',
          areaStyle: {},
          data: [5, 9, 14, 10],
        },
      ],
    });
  }
  render() {
    return (
      <div
        id="main"
        style={{ width: '41%', height: 250, marginRight: '110px' }}
      ></div>
    );
  }
}

export default StackChart;
