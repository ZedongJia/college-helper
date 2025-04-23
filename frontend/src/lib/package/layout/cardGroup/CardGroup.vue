<template>
    <ul
        ref="fa"
        class="cardgroup"
    >
        <li
            v-for="(item, index) in pages"
            :key="index"
            :style="[FirstPage(index), OtherPage(index)]"
            @mousedown="dragstart($event, index)"
            @mousemove="draging($event, index)"
            @mouseup="dragend($event, index)"
            @mouseout="dragend($event, index)"
            @transitionend="onTransitionEnd(index)"
        >
            <Card
                style="
                    cursor: default;
                    position: relative;
                    width: 250px;
                    height: 180px;
                "
            >
                <div
                    style="
                        /* text-align: center; */
                        pointer-events: none;
                        user-select: none;
                        height: 150px;
                        overflow: hidden;
                        z-index: 10;
                    "
                >
                    <h3 style="text-align: center">
                        {{ item.title }}
                    </h3>
                    <hr
                        class="line"
                        style="margin: 1em"
                    />
                    <p
                        style="
                            width: 180px;
                            margin: 0 auto;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            display: -webkit-box;
                            -webkit-line-clamp: 4;
                            -webkit-box-orient: vertical;
                        "
                    >
                        {{ item.content }}
                    </p>
                </div>
                <div
                    style="
                        padding: 0 0 0 10em;
                        user-select: none;
                    "
                >
                    <button
                        @click="skip(item.title, item.link)"
                        style="color: #bd9f67;cursor: pointer;"
                    >
                        Read More
                    </button>
                </div>
            </Card>
        </li>
    </ul>
</template>
<script>
import Card from './Card.vue'
export default {
    name: 'CardGroup',
    components: {
        Card
    },
    props: {
        pages: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data() {
        return {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            // 中心点位置
            midX: 0,
            midY: 0,
            // 偏移量
            poswidth: 0,
            posheight: 0,
            lastPosWidth: 0,
            lastPosHeight: 0,
            rotate: 0,
            // 首张卡牌的索引
            firstPage: 0,
            // 可见卡片的数量
            visible: 3,
            // 是否拖动
            isDraging: false,
            // 是否刷新
            isRefresh: false,
            // 第一张卡片移动偏移量
            firstwidth: 0,
            firstheight: 0
        }
    },
    computed: {
        offsetRatio() {
            const width = this.midX * 2
            const height = this.midY * 2
            const offsetWidth = width - Math.abs(this.lastPosWidth)
            const offsetHeight = height - Math.abs(this.lastPosHeight)
            const ratio =
                1 - (offsetWidth * offsetHeight) / (width * height) || 0
            return ratio > 1 ? 1 : ratio
        }
    },
    methods: {
        skip(name, label) {
            this.$router.push({
                name: 'detailContent',
                query: {
                    name: name,
                    label: label
                }
            })
        },
        dragstart(e, index) {
            if (index === this.firstPage) {
                if (this.isDraging) {
                    return
                }
                this.$refs.fa.style.zIndex = 1000
                // 组件位置初始化
                e.target.style.top = 0
                e.target.style.left = 0
                // 鼠标位置初值
                this.startX = e.clientX
                this.startY = e.clientY
                // 组件中心点位置
                this.midX =
                    parseInt(e.target.style.width) / 2 +
                    parseInt(e.target.style.left)
                this.midY =
                    parseInt(e.target.style.height) / 2 +
                    parseInt(e.target.style.top)
                // 表示正在拖动
                this.isDraging = true
            }
        },
        draging(e, index) {
            if (index === this.firstPage) {
                if (this.isDraging) {
                    // 终点
                    this.endX = e.clientX
                    this.endY = e.clientY
                    // 计算X,Y偏移量
                    this.poswidth = this.endX - this.startX
                    this.posheight = this.endY - this.startY
                    // 重置初始值
                    this.startX = this.endX
                    this.startY = this.endY
                    // 改变组件位置
                    e.target.style.left =
                        parseInt(e.target.style.left) + this.poswidth + 'px'
                    e.target.style.top =
                        parseInt(e.target.style.top) + this.posheight + 'px'
                    // 计算总的偏移量
                    this.lastPosWidth =
                        parseInt(e.target.style.width) / 2 +
                        parseInt(e.target.style.left)
                    this.lastPosHeight =
                        parseInt(e.target.style.height) / 2 +
                        parseInt(e.target.style.top)
                    this.rotate = this.getDistance(
                        this.midX,
                        this.midY,
                        this.lastPosWidth,
                        this.lastPosHeight
                    )
                }
            }
        },
        dragend(e, index) {
            if (index === this.firstPage) {
                // 不再拖动
                this.isDraging = false
                this.$refs.fa.style.zIndex = 1
                e.target.style.left = 0
                e.target.style.top = 0
                if (this.rotate > 100) {
                    this.rotate = 0
                    // 计算划出后最终位置
                    const ratio = Math.abs(
                        this.lastPosHeight / this.lastPosWidth
                    )
                    this.lastPosWidth =
                        this.lastPosWidth >= 0
                            ? this.lastPosWidth + 200
                            : this.lastPosWidth - 200
                    this.lastPosHeight =
                        this.lastPosHeight >= 0
                            ? Math.abs(this.lastPosWidth * ratio)
                            : -Math.abs(this.lastPosWidth * ratio)
                    // 循环firstPage
                    this.firstPage =
                        this.firstPage === this.pages.length - 1
                            ? 0
                            : this.firstPage + 1
                }
                this.poswidth = 0
                this.posheight = 0
                this.lastPosHeight = 0
                this.lastPosWidth = 0
            }
        },
        getDistance(x1, y1, x2, y2) {
            const distance = Math.sqrt(
                Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
            )
            return distance
        },
        isVisible(index, firstPage) {
            const stack = []
            const visible = this.visible
            const length = this.pages.length
            for (let i = 0; i < visible; i++) {
                if (firstPage + i < length) {
                    stack.push(firstPage + i)
                } else {
                    stack.push(firstPage + i - length)
                }
            }
            return stack.indexOf(index) >= 0
        },
        FirstPage(index) {
            const style = {}
            if (index === this.firstPage) {
                style.opacity = 1
                style.zIndex = 3
                style.transition = 'transform ease 1000ms'
                if (this.isRefresh) {
                    style.transform =
                        'translate(' +
                        this.firstwidth +
                        'px,' +
                        this.firstheight +
                        'px)'
                    setTimeout(() => {
                        this.firstPage =
                            this.firstPage === this.pages.length - 1
                                ? 0
                                : this.firstPage + 1
                        this.isRefresh = false
                    }, 1400)
                } else {
                    style.transform =
                        'translate3D(' +
                        this.lastPosWidth / 100 +
                        'px' +
                        ',' +
                        this.lastPosHeight / 100 +
                        'px' +
                        ',0px) '
                }
                return style
            }
        },
        OtherPage(index) {
            const firstPage = this.firstPage
            const visible = this.visible
            const length = this.pages.length
            const style = {}
            if (index === firstPage) {
                return
            }
            if (this.isVisible(index, firstPage)) {
                const perIndex =
                    index - firstPage > 0
                        ? index - firstPage
                        : index - firstPage + length
                style.zIndex = visible - perIndex
                style.transition = 'transform ease 700ms'
                if (this.isRefresh) {
                    style.transform =
                        'translate(' +
                        this.firstwidth +
                        'px,' +
                        this.firstheight +
                        'px)'
                } else {
                    style.transform =
                        'translate3D(0,0,' +
                        -1 * 200 * (perIndex - this.offsetRatio) +
                        'px' +
                        ')'
                }
            } else {
                style.zIndex = -1
                style.opacity = 0
                style.transform = 'translate3D(0px,0px,-120px)'
            }
            return style
        },
        onTransitionEnd(index) {
            if (this.isRefresh) {
                this.firstwidth = 0 - this.firstwidth
                this.firstheight = 0 - this.firstheight
                this.isRefresh = !this.isRefresh
            }
        },
        Refresh(index, centerX, centerY) {
            this.isRefresh = true
            let posneg = 1
            if (index === 1 || index === 4) {
                posneg = 3 - index > 0 ? 1 : -1
                this.firstheight = posneg * centerY
            } else {
                this.firstwidth = (index % 3 === 0 ? 1 : -1) * centerX
                this.firstheight = (index % 2 === 0 ? 1 : -1) * centerY
            }
        }
    }
}
</script>
<style>
.cardgroup {
    position: relative;
    width: 250px;
    height: 180px;
    perspective: 1000px;
    perspective-origin: 50% 150%;
    -webkit-perspective: 1000px;
    -webkit-perspective-origin: 50% 150%;
}
.cardgroup li {
    position: absolute;
}
</style>
