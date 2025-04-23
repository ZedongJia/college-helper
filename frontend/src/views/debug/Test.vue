<template>
    <div style="display: flex">
        <div
            ref="map"
            id="map"
        ></div>
        <div style="width: 200px">
            <Table
                :link="link"
                :header="['地区', '数量(所)']"
                isShowButton
                ButtonName="详情"
                @detail="detail"
            >
            </Table>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import { chinaMap } from '../../utils/chinaMap'
export default {
    data() {
        return {
            name: 'value',
            link: [],
            province: ''
        }
    },
    method() {},
    mounted() {
        const chinamap = echarts.init(this.$refs.map)
        echarts.registerMap('chinaMap', chinaMap) //  注册地图
        const option = {
            geo: {
                map: 'chinaMap', //  绘画的地图
                zoom: 1.2, //  缩放比例
                itemStyle: {
                    //  每一项的样式
                    areaColor: '#fff', //  地区颜色
                    borderColor: '#666', //  边框颜色
                    borderWidth: '0.3', //  边框宽度
                    opacity: 1 //  不透明度
                },
                label: {
                    //  文字
                    show: true, //  展示文字
                    fontSize: 8 //  字体大小
                },
                emphasis: {
                    //  附加属性（强调）
                    itemStyle: {
                        areaColor: '#b4ffff' //  鼠标经过的颜色
                    },
                    select: {
                        //  选中设置
                        itemStyle: {
                            areaColor: '#0f2c66' //  选中颜色设置
                        }
                    }
                },
                tooltip: {
                    // 提示框
                    show: true, // 默认展示
                    trigger: 'item', // 触发展示每一项
                    triggerOn: 'click', // 触发形式（点击）
                    formatter(parmas) {
                        return `名称：${parmas.name} <br/>确诊人数：${parmas.value}`
                    },
                    // 弹窗样式
                    padding: 3, // 内边距
                    borderColor: '#333',
                    backgroundColor: 'rgba(50,50,50,0.7)', //
                    textStyle: {
                        // 文本样式
                        color: '#fff'
                    }
                }
            },
            zoom: 1, //  地图放大
            aspectScale: 0.8, //  地图宽高比例
            roam: true //  地图缩放、平移
        }
        chinamap.setOption(option)
    },
    created() {
        this.link = [{ source: '中国', target: '2889' }]
    }
}
</script>
<style>
#map {
    width: 800px;
    height: 600px;
    /* background-color: #111; */
    margin: 0 auto;
}
</style>
