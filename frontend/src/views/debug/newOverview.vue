<template>
    <div style="display: flex">
        <div
            ref="map"
            id="map"
        ></div>
        <div style="height: 300px; width: 300px; overflow: auto">
            <Table
                :link="link"
                :header="['地区', '数量(所)']"
                isShowButton
                ButtonName="详情"
                @detail="outFrame"
            >
            </Table>
        </div>
        <PopFrame v-if="appear">
            <div style="width: 50%; margin: 50px auto">
                <Board>
                    <Title title="分类树"></Title>
                </Board>
                <Board
                    style="
                        min-height: 400px;
                        max-height: 500px; /* 设置容器的最大高度 */
                        overflow-y: auto; /* 添加垂直滚动条 */
                    "
                >
                    <Tree :model="treeData"></Tree>
                </Board>
                <Board class="flex-row-right">
                    <Button
                        @clickIt="exitFrame"
                        style="padding: 0 3em"
                    >
                        返回
                    </Button>
                </Board>
            </div>
        </PopFrame>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import * as echarts from 'echarts'
import { chinaMap } from '../../utils/chinaMap'
import Tree from '../mainBoard/overview/components/Tree.vue'
import treeData from '../mainBoard/overview/tree.json'
export default {
    components: {
        Tree
    },
    data() {
        return {
            treeData: treeData,
            link: [],
            province: '',
            appear: false,
            frameTree: []
        }
    },
    methods: {
        ProvinceSize(name) {
            for (let i = 0; i < treeData.length; i++) {
                if (name.includes(treeData[i].name)) {
                    return treeData[i].children.length
                }
            }
            return 0
        },
        outFrame(item) {
            for (let i = 0; i < treeData.length; i++) {
                if (item.source.includes(treeData[i].name)) {
                    for (let j = 0; j < treeData[i].children.length; j++) {
                        if (treeData[i].children[j].name === item.source) {
                            this.treeData = treeData[i].children[j].children
                        }
                    }
                    break
                }
            }
            this.$store.commit('tree/show')
        },
        exitFrame() {
            this.$store.commit('tree/show')
        }
    },
    mounted() {
        const chinamap = echarts.init(this.$refs.map)
        echarts.registerMap('chinaMap', chinaMap) // 注册地图
        const option = {
            geo: {
                map: 'chinaMap', // 绘画的地图
                zoom: 1.2, // 缩放比例
                itemStyle: {
                    // 每一项的样式
                    areaColor: '#fff', // 地区颜色
                    borderColor: '#666', // 边框颜色
                    borderWidth: '0.3', // 边框宽度
                    opacity: 1 // 不透明度
                },
                label: {
                    // 文字
                    show: true, // 展示文字
                    fontSize: 8 // 字体大小
                },
                emphasis: {
                    // 附加属性（强调）
                    itemStyle: {
                        areaColor: '#b4ffff' // 鼠标经过的颜色
                    },
                    select: {
                        // 选中设置
                        itemStyle: {
                            areaColor: '#0f2c66' // 选中颜色设置
                        }
                    }
                }
            },
            tooltip: {
                // 提示框
                show: true, // 默认展示
                trigger: 'item', // 触发展示每一项
                triggerOn: 'click', // 触发形式（点击）
                // formatter: function (params) {
                //     const provinceSize = this.ProvinceSize(params.name)
                //     console.log('000')
                //     return `名称：${params.name} <br/>大学数量:${provinceSize}`
                // },
                // 弹窗样式
                padding: 3, // 内边距
                borderColor: '#333',
                backgroundColor: 'rgba(50,50,50,0.7)', //
                textStyle: {
                    // 文本样式
                    color: '#fff'
                }
            },
            zoom: 1, //  地图放大
            aspectScale: 0.8, //  地图宽高比例
            roam: true //  地图缩放、平移
        }
        chinamap.setOption(option)
        // 获得点击省份的名称
        chinamap.on('click', (params) => {
            if (params.componentType === 'geo') {
                this.province = params.name // 将选中的省份名称赋值给province属性
            }
        })
    },
    created() {
        this.link = [{ source: '中国', target: '2889' }]
    },
    watch: {
        isShow() {
            this.appear = !this.appear
        },
        province() {
            const link = []
            for (let i = 0; i < treeData.length; i++) {
                if (this.province.includes(treeData[i].name)) {
                    treeData[i].children.forEach((item) => {
                        link.push({
                            source: item.name,
                            target: item.children.length
                        })
                    })
                    break
                }
            }
            this.link = link
        }
    },
    computed: {
        ...mapState({
            isShow: (state) => state.tree.isShow
        })
    }
}
</script>

<style scoped>
#map {
    width: 800px;
    height: 600px;
    /* background-color: #111; */
    margin: 0 auto;
}
</style>
