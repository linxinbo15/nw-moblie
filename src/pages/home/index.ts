import dayjs from 'dayjs';
/**
 * 获取随机数
 *
 * @param {number} [num=100]
 * @returns
 *
 * @memberOf DashboardBase
 */
 export function getRandomArray(num = 100) {
    let resultNum = Number((Math.random() * num).toFixed(0));
  
    if (resultNum <= 1) {
      resultNum = 1;
    }
  
    return resultNum;
  }
/**
 *  线性图表数据源
 *
 * @export
 * @param {Array<string>} [dateTime=[]]
 * @returns {*}
 */
 export function getLineChartDataSet({
    dateTime = [],
    placeholderColor,
    borderColor,
  }: { dateTime?: Array<string> } & TChartColor) {
    const divideNum = 10;
    const timeArray = [];
    const inArray = [];
    const outArray = [];
    for (let i = 0; i < divideNum; i++) {
      if (dateTime.length > 0) {
        const dateAbsTime: number = (new Date(dateTime[1]).getTime() - new Date(dateTime[0]).getTime()) / divideNum;
        const enhandTime: number = new Date(dateTime[0]).getTime() + dateAbsTime * i;
        // console.log('dateAbsTime..', dateAbsTime, enhandTime);
        timeArray.push(dayjs(enhandTime).format('MM-DD'));
      } else {
        timeArray.push(
          dayjs()
            .subtract(divideNum - i, 'day')
            .format('MM-DD'),
        );
      }
  
      inArray.push(getRandomArray().toString());
      outArray.push(getRandomArray().toString());
    }
  
    const dataSet = {
      // color: chartListColor(),
      tooltip: {
        trigger: 'axis',
        position: [0, 0], // 位置
        backgroundColor: '#F3F6FB',
        transitionDuration: 0, // 解决光标移动到某个坐标的时候tooltip像从底部飞出来一样动画效果
        // formatter:'<div style="display:flex;justify-content: space-between;"><span >{b0}</span><span >万份收益：{c0}</span></div>',
        // formatter: '<div ><span style="float:left;margin-left:8px;">{b0}</span><span style="float:right;margin-right:8px;">万份收益：<span style="color:#FF1F46;">+{c0}%</span></span></div>',
        formatter: function (params) {
          let html = '';
          let con = '';
          for (let i = 0, len = params.length; i < len; i++) {
            con += `<div style="text-align:center;margin-left:5px;"> ${
              params[i].seriesName
            }：<span style="${
              Number(params[i].data) > 0
                ? 'color:#FF1F46;'
                : Number(params[i].data) < 0
                ? 'color:#00C853;'
                : ''
            }">${Number(params[i].data).toFixed(2)}%</span></div>`;
          }
          html = `<div style="padding:5px;text-align:center;display:flex;flex-direction:row;justify-content: center;flex-wrap:wrap;"><div>${params[0].name}</div>${con}</div>`;
          return html;
        },
        hideDelay: 100,
        textStyle: {
          color: '#333',
          fontSize: 12,
          height: '18px',
          fontWeight: 500,
          fontFamily: 'PingFangSC,Noto Sans CJK SC ,Source Han Sans CN'
        },
        padding: 0,
        extraCssText: 'width:100%;z-index:10001;box-sizing: border-box;box-shadow: 0 0 0 rgba(0,0,0,0);',
      },
      grid: {
        left: '0',
        right: '20px',
        top: '5px',
        bottom: '36px',
        containLabel: true,
      },
      legend: {
        left: 'center',
        bottom: '0',
        orient: 'horizontal', // legend 横向布局。
        data: ['本月', '上月'],
        textStyle: {
          fontSize: 12,
          color: placeholderColor,
        },
      },
      xAxis: {
        type: 'category',
        data: timeArray,
        boundaryGap: false,
        axisLabel: {
          color: placeholderColor,
        },
        axisLine: {
          lineStyle: {
            width: 1,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: placeholderColor,
        },
        splitLine: {
          lineStyle: {
            color: borderColor,
          },
        },
      },
      series: [
        {
          name: '本月',
          data: outArray,
          type: 'line',
          smooth: false,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            normal: {
              borderColor,
              borderWidth: 1,
            },
          },
          areaStyle: {
            normal: {
              opacity: 0.1,
            },
          },
        },
        {
          name: '上月',
          data: inArray,
          type: 'line',
          smooth: false,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            normal: {
              borderColor,
              borderWidth: 1,
            },
          },
        },
      ],
    };
    return dataSet;
  }