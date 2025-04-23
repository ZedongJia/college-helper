<template>
    <Board
        class="flex-row-center wrapper"
        style="justify-content: left; background-color: var(--item-bg-color)"
    >
        <transition-group name="slide-l">
            <router-link
                class="link"
                v-for="(p, index) in pathList"
                :key="index"
                :to="p.href"
            >
                <span class="icon"><ion-icon :name="p.icon"></ion-icon></span>
                <span class="text">{{ p.name }} /</span>
            </router-link>
        </transition-group>
    </Board>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'RouteNav',
    data() {
        return {
            pathList: [],
            exclude: ['system'],
            include: [
                {
                    name: '详情页面',
                    base: 'detailContent',
                    icon: 'reader-outline'
                },
                {
                    name: '好友页面',
                    base: 'page',
                    icon: 'earth-outline'
                },
                {
                    name: '大学专业智能查询',
                    base: 'entitySearch',
                    icon: 'search-circle-outline'
                },
                {
                    name: '查关系',
                    base: 'relationSearch',
                    icon: 'search-outline'
                },
                {
                    name: 'AI问答',
                    base: 'chatAI',
                    icon: 'chatbubbles-outline'
                }
            ]
        }
    },
    computed: {
        ...mapState({
            menuList: (state) => state.menu.menuList
        })
    },
    methods: {
        recalculatePath() {
            this.pathList = []
            const fullPath = this.$route.fullPath
            const currPathList = fullPath.split('/')
            currPathList.forEach((item) => {
                if (!this.exclude.includes(item)) {
                    if (item !== '') {
                        if (item.includes('?')) {
                            const newItem = item.substring(0, item.indexOf('?'))
                            this.include.forEach((e) => {
                                if (e.base === newItem) {
                                    const href = fullPath.substring(0, fullPath.indexOf(item) + item.length)
                                    this.pathList.push({
                                        name: e.name,
                                        href: href,
                                        icon: e.icon
                                    })
                                }
                            })
                        } else {
                            for (let i = 0; i < this.menuList.length; i++) {
                                // 匹配正常路径
                                if (this.menuList[i].href.endsWith(item)) {
                                    this.pathList.push(this.menuList[i])
                                    break
                                }
                            }
                        }
                    }
                }
            })
        }
    },
    mounted() {
        this.recalculatePath()
    },
    watch: {
        '$route.fullPath'() {
            this.recalculatePath()
        }
    }
}
</script>
<style>
.link {
    display: flex;
    align-items: center;
    margin-right: 1em;
    height: 32px;
    color: var(--item-font-color);
    transition: 1s;
}
.link .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
}
.link .text {
    padding-left: 0.02em;
    height: 32px;
    line-height: 32px;
}
.link:last-child {
    font-weight: bold;
}
.link:hover {
    color: var(--item-font-rev-color);
    animation: bounce 0.25s;
}
</style>
