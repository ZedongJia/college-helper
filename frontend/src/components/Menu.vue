<template>
    <TransitionGroup
        class="menu"
        tag="div"
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
    >
        <MenuItem
            v-for="(item, index) in data"
            :key="item.name"
            @click="turnTo(item)"
            :data-index="index"
            Dynamic
        >
            <div class="flex-row">
                <div class="icon">
                    <ion-icon :name="item.icon"></ion-icon>
                </div>
                <span class="text">{{ item.name }}</span>
            </div>
        </MenuItem>
    </TransitionGroup>
</template>
<script>
import gsap from 'gsap'
import { mapState } from 'vuex'
import { nextTick } from 'vue'
export default {
    props: {
        data: Array
    },
    computed: {
        ...mapState({
            showMenu: (state) => state.menu.showMenu
        })
    },
    methods: {
        turnTo(item) {
            if (item.option !== undefined) {
                this.$store.commit(item.option)
            }
            if (item.routerName !== undefined) {
                this.$router.push({
                    name: item.routerName
                })
            } else {
                this.$router.push({
                    path: item.href
                })
            }
        },
        onBeforeEnter(el) {
            el.style.opacity = 0
            el.style.height = 0
        },
        onEnter(el, done) {
            gsap.to(el, {
                opacity: 1,
                height: '48px',
                delay: el.dataset.index * 0.05,
                onComplete: done
            })
        },
        onLeave(el, done) {
            gsap.to(el, {
                opacity: 0,
                height: 0,
                delay: 0,
                onComplete: done
            })
        },
        hideOrshow() {
            const menu = document.querySelector('.menu')
            const spans = menu.querySelectorAll('span')
            const view = document.querySelector('#view')
            if (this.showMenu) {
                menu.style.flex = '0 0 15%'
                view.style.flex = '0 0 85%'
                setTimeout(() => {
                    for (let i = 0; i < spans.length; i++) {
                        spans[i].style.display = 'inline-block'
                    }
                }, 200)
            } else {
                menu.style.flex = '0 0 64px'
                view.style.flex = '0 0 ' + (document.querySelector('body').clientWidth - 64) + 'px'
                for (let i = 0; i < spans.length; i++) {
                    spans[i].style.display = 'none'
                }
            }
        }
    },
    mounted() {
        this.$store.commit('menu/checkState')
    },
    watch: {
        showMenu() {
            // 判断菜单栏加载
            this.hideOrshow()
        },
        data: {
            handler() {
                nextTick(() => {
                    this.hideOrshow()
                })
            },
            deep: true
        }
    }
}
</script>
<style>
.menu {
    margin-left: 5px;
    width: 100%;
    transition: 0.5s;
}
.menu > * {
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 10px;
    height: 48px;
    line-height: 48px;
    font-weight: bold;
    border-radius: 50px;
}
.menu .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 64px;
    height: 48px;
    transform: scale(1.5);
}
.menu .text {
    height: 48px;
}
</style>
