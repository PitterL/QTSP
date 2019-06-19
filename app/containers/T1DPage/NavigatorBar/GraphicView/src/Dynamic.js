import React, { Component } from 'react';
import {cloneDeep} from 'lodash';
import ReactEcharts from 'components/echarts-for-react';

export default class Dynamic extends Component {
  constructor(props) {
    super(props);
    this.timeTicket = null;
    this.count = 51;
    this.getInitialState = () => ({option: this.getOption()});
    this.fetchNewDate = () => {
      let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
      const option = cloneDeep(this.state.option); // immutable
      option.title.text = 'Hello Echarts-for-react.' + new Date().getSeconds();
      let data0 = option.series[0].data;
      let data1 = option.series[1].data;
      data0.shift();
      data0.push(Math.round(Math.random() * 1000));
      data1.shift();
      data1.push((Math.random() * 10 + 5).toFixed(1) - 0);
  
      option.xAxis[0].data.shift();
      option.xAxis[0].data.push(axisData);
      option.xAxis[1].data.shift();
      option.xAxis[1].data.push(this.count++);
  
      this.setState({
        option,
      });
    };

    this.getOption = () => ({
      title: {
        text:'Hello Echarts-for-react.',
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:['最新成交价', '预购队列']
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
        }
      },
      grid: {
        top: 60,
        left: 30,
        right: 30,
        bottom:30,
        //width: "100%",
        //height: "100%"
      },
      dataZoom: {
        show: true,
        start: 0,
        end: 100
      },
      visualMap: {
        show: true,
        min: 0,
        max: 1000,
        color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
          '#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
          '#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0']
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: (function (){
            let now = new Date();
            let res = [];
            let len = 50;
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
              now = new Date(now - 2000);
            }
            return res;
          })()
        },
        {
          type: 'category',
          boundaryGap: true,
          data: (function (){
            let res = [];
            let len = 50;
            while (len--) {
              res.push(50 - len + 1);
            }
            return res;
          })()
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '价格',
          max: 20,
          min: 0,
          boundaryGap: [0.2, 0.2]
        },
        {
          type: 'value',
          scale: true,
          name: '预购量',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name:'预购队列',
          type:'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 4,
            }
          },
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return idx * 10;
          },
          animationDelayUpdate: function (idx) {
            return idx * 10;
          },
          data:(function (){
            let res = [];
            let len = 50;
            while (len--) {
              res.push(Math.round(Math.random() * 1000));
            }
            return res;
          })()
        },
        {
          name:'最新成交价',
          type:'line',
          data:(function (){
            let res = [];
            let len = 0;
            while (len < 50) {
              res.push((Math.random()*10 + 5).toFixed(1) - 0);
              len++;
            }
            return res;
          })()
        }
      ]
    });  

    this.state = this.getInitialState();
  }


  componentDidMount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
    this.timeTicket = setInterval(this.fetchNewDate, 1000);
  };

  componentWillUnmount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
  };

  render() {
    console.log("<Dynamic> props", this.props);
    return (
        <div className='parent' style={{...this.props.style}}>
          <label> use React state to render dynamic chart</label>
          <ReactEcharts ref='echarts_react'
            option={this.state.option}
            style={this.props.style} />
        </div>
    );
  }
}
