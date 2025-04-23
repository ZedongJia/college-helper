import * as echarts from 'echarts'
/**
 * 生成关系图
 * @param {*} element 树节点
 * @param {*} data 数据
 * @param {*} link 关系
 * @param {*} isDraggable 是否可拖拽
 * @param {*} isAnimation 是否显示动画
 */
function generateRelationGraph(element, data, link, isDraggable, isAnimation) {
    // todo
    const colors = [
        'RGB(100, 149, 237)', // cornflowerblue（矢车菊蓝）0
        'RGB(72,209,204)', // mediumturquoise（适中的宝石绿）1
        'RGB(255,105,180)', // hotpink（热情的粉红）2
        'RGB(218,112,214)', // orchid（兰花紫）3
        'RGB(50,205,50)', // limegreen（柠檬绿）4
        'RGB(189,183,107)', // darkkhaki（深卡其布）5
        'RGB(255,165,0)', // orange（橙）6
        'RGB(128,0,0)', // maroon（粟色）7
        'RGB(138,43,226)', // blueviolet（蓝紫罗兰）8
        'RGB(72,61,139)', // darkslateblue（深板岩蓝）9
        'RGB(112,128,144)', // slategray（石板灰）10
        'RGB(255,99,71)' // tomato（番茄色）11
    ]
    const option = {
        series: [
            {
                type: 'graph',
                layout: 'force',
                symbolSize: 50,
                roam: isDraggable,
                animation: isAnimation,
                initLayout: 'circular',
                scaleLimit: {
                    min: 0.5, // 最小1倍
                    max: 3 // 最大3倍
                },
                // 数据点
                data: data,
                // 边
                links: link,
                // 数据点名称设置
                label: {
                    show: true,
                    formatter: '{b}',
                    align: 'center',
                    textStyle: {
                        color: 'black', // 设置节点标签字体颜色为白色
                        fontWhite: 'bold'
                    }
                },
                // 边设置
                lineStyle: {
                    color: 'target',
                    opacity: 0.8,
                    width: 2,
                    curveness: 0.1
                },
                itemStyle: {
                    color: (params) => {
                        return colors[params.data.c]
                    }
                },
                // 边上文字设置
                edgeLabel: {
                    show: true,
                    fontSize: 8,
                    color: 'red',
                    formatter: (params) => {
                        return params.data.label
                    }
                },
                // 边的样式
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: [0, 8],
                force: {
                    // 初始化动画
                    layoutAnimation: isAnimation,
                    repulsion: 20,
                    gravity: 0.01,
                    edgeLength: 200
                },
                focus: 'adjacency',
                legendHoverLink: true,
                focusNodeAdjacency: true,
                draggable: true
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

export { generateRelationGraph }
