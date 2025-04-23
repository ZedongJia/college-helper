import * as echarts from 'echarts'
/**
 * 生成关系图
 * @param {*} element 树节点
 * @param {*} data 数据
 */
function generateLineChart (element, dataX, dataY) {
    // todo
    const option = {
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            formatter: function(a) {
            /*
            a:代表参数,
            a['data']:代表series[{data:[]}]参数
            */
                return (
                    `
                    <div style="font-size: 16px;height: 210px;padding: 5px;
                        background-image: linear-gradient(to top, #65bd60 0%, #5ac1a8 25%, #3ec6ed 50%, #b7ddb7 75%, #fef381 100%);
                      border-image: radial-gradient(circle, rgba(111, 185, 242, 0.86), rgba(0, 0, 0, 0.2)) 1 1;
                      backdrop-filter: blur(10px);">
                        <div style="margin: 3px; font-size: 16px; color: black;">
                            <p>高考分数：${a[0].data.rank}分</br></p>
                            <p>${a[0].data.batch_name}: ${a[0].data.controlscore}分</br></p>
                            <p>同分人数：${a[0].data.num}人</br></p>
                            <p>排名区间：${a[0].data.rank_range}</br></p>
                            <p>历史同位次考生得分：</br></p>
                            <div style="margin-left: 7px;">
                                <p>${a[0].data.appositive_fraction[0].score}分 (${a[0].data.appositive_fraction[0].year}年）</p>
                            </div>
                            <div style="margin-left: 7px;">
                                <p>${a[0].data.appositive_fraction[1].score}分 (${a[0].data.appositive_fraction[1].year}年）</p>
                            </div>
                            <div style="margin-left: 7px;">
                                <p>${a[0].data.appositive_fraction[2].score}分 (${a[0].data.appositive_fraction[2].year}年）</p>
                            </div>
                        </div>
                    </div>
                    `
                )
            }
        },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: {
            type: 'category',
            data: dataX,
            name: '分数',
            nameTextStyle: {
                fontWeight: 'bolder',
                fontSize: 20
            }
        },
        yAxis: {
            type: 'value',
            name: '人数',
            nameTextStyle: {
                fontWeight: 'bolder',
                fontSize: 20
            },
            axisLabel: {
                formatter: '{value}'
            },
            axisLine: {
                show: true
            },
            axisTick: {
                show: true
            }
        },
        series: [
            {
                name: '人数',
                type: 'line',
                data: dataY
            }
        ]
    }
    const newChart = echarts.init(element)
    // 渲染人物关系图
    newChart.setOption(option)
    // window.addEventListener('resize', resizeCharts);
    // 监听
    const listeningChart = () => {
        newChart.resize()
    }
    window.addEventListener('resize', listeningChart)
    return listeningChart
}

export { generateLineChart }
