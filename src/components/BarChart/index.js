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

class BarChart extends Component {
  componentDidMount() {
    // 初始化
    var barChart = echarts.init(document.getElementById('bar'));
    // 绘制图表
    barChart.setOption({
      title: {
        text: 'Register Customers (Users)',
      },
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Customers',
          type: 'bar',
          barWidth: '40%',
          data: [2, 4, 9, 13, 14, 7, 9],
        },
      ],
    });
  }
  render() {
    return <div id="bar" style={{ width: '40%', height: 250 }}></div>;
  }
}

export default BarChart;
