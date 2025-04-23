<template>
    <div class="wrapper">
        <Board
            ><div
                ref="map"
                id="map"
            ></div
        ></Board>
        <div class="overview-table">
            <div
                style="transition: 0.5s"
                :class="{ 'table-fold': isFold, 'table-unfold': !isFold }"
            >
                <Table
                    style="padding: 0"
                    :link="link"
                    :header="['地区', '大学数量']"
                    :colWidth="[50, 35, 15]"
                    isShowButton
                    ButtonName="详情"
                    @detail="outFrame"
                >
                </Table>
            </div>
            <div
                @click="isFold = !isFold"
                class="fold-button flex-row-center"
            >
                <ion-icon
                    v-if="isFold"
                    style="transform: scale(1.5)"
                    name="caret-down-outline"
                ></ion-icon>
                <ion-icon
                    v-if="!isFold"
                    style="transform: scale(1.5)"
                    name="caret-up-outline"
                ></ion-icon>
            </div>
        </div>
        <PopFrame v-if="appear">
            <div style="width: 50%; margin: 50px auto">
                <Board>
                    <Title title="大学专业概览"></Title>
                </Board>
                <Board style="min-height: 400px; max-height: 500px; /* 设置容器的最大高度 */ overflow-y: auto; /* 添加垂直滚动条 */">
                    <Tree :model="tempData"></Tree>
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
import { chinaMap } from '@/utils/chinaMap'
import Tree from './components/Tree'
export default {
    components: {
        Tree
    },
    data() {
        return {
            link: [],
            province: '',
            appear: false,
            dataList: [],
            isFold: true,
            tempData: []
        }
    },
    methods: {
        ProvinceSize(name) {
            let size = 0
            for (let i = 0; i < this.treeData.length; i++) {
                if (name.includes(this.treeData[i].name)) {
                    for (let j = 0; j < this.treeData[i].children.length; j++) {
                        size += this.treeData[i].children[j].children.length
                    }
                    return size
                }
            }
            return 0
        },
        outFrame(item) {
            for (let i = 0; i < this.treeData.length; i++) {
                if (item.source.includes(this.treeData[i].name)) {
                    for (let j = 0; j < this.treeData[i].children.length; j++) {
                        if (this.treeData[i].children[j].name === item.source) {
                            this.tempData = this.treeData[i].children[j].children
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
                zoom: 1.6, // 缩放比例
                itemStyle: {
                    // 每一项的样式
                    areaColor: '#fff', // 地区颜色
                    borderColor: 'RGB(70,130,180)', // 边框颜色
                    borderWidth: '0.5', // 边框宽度
                    opacity: 1 // 不透明度
                },
                label: {
                    // 文字
                    show: true, // 展示文字
                    fontSize: 14 // 字体大小
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
                },
                x: '15%',
                y: '30%'
            },
            visualMap: {
                min: 0,
                max: 170,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 取值范围的文字
                inRange: {
                    color: ['white', '#2E75B6'] // 取值范围的颜色
                },
                textStyle: {
                    color: 'RGB(70,130,180)' // 取值范围文字的颜色
                },
                show: true // 图注
            },
            series: [
                {
                    name: '信息量',
                    type: 'map',
                    geoIndex: 0,
                    data: this.dataList
                }
            ],
            zoom: 1, //  地图放大
            aspectScale: 0.8, //  地图宽高比例
            roam: true, //  地图缩放、平移
            scaleLimit: {
                min: 1, // 最小1倍
                max: 40 // 最大3倍
            }
        }
        chinamap.setOption(option)
        // 获得点击省份的名称
        chinamap.on('click', (params) => {
            if (params.componentType === 'series') {
                this.province = params.name // 将选中的省份名称赋值给province属性
            }
        })
        window.addEventListener('resize', () => {
            chinamap.resize()
        })
    },
    created() {
        this.tempData = this.treeData
        this.link = [{ source: '中国', target: '2889' }]
        for (let i = 0; i < this.treeData.length; i++) {
            this.dataList.push({
                name: this.treeData[i].name,
                value: this.ProvinceSize(this.treeData[i].name)
            })
        }
    },
    watch: {
        isShow() {
            this.appear = !this.appear
        },
        province() {
            const link = []
            for (let i = 0; i < this.treeData.length; i++) {
                if (this.province.includes(this.treeData[i].name)) {
                    this.treeData[i].children.forEach((item) => {
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
            isShow: (state) => state.tree.isShow,
            treeData: (state) => state.tree.treeData
        })
    }
}
</script>

<style>
#map {
    width: 100%;
    height: 500px;
    /* background-color: #111; */
    margin: 0;
}

.overview-table {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 400px;
    border-radius: 10px;
    box-shadow: -5px 5px 10px grey;
}

/* scrollbar */
.table-fold::-webkit-scrollbar,
.table-unfold::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: var(--bg-color);
}

.table-fold::-webkit-scrollbar-thumb,
.table-unfold::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: var(--item-bg-color);
}

.table-fold::-webkit-scrollbar-button,
.table-unfold::-webkit-scrollbar-button {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: var(--item-bg-color);
}

.table-fold,
.table-unfold {
    overflow-y: auto;
}

.table-fold {
    max-height: 150px;
}

.table-unfold {
    max-height: 400px;
}

.fold-button {
    cursor: pointer;
    height: 32px;
}
</style>
