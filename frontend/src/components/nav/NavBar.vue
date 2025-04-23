<template>
    <div id="nav-bar">
        <div style="display: flex; flex: row nowrap">
            <span
                class="menuToggle"
                @click="switchMenu"
            ></span>
            <span id="logo"><i>College Helper</i></span>
        </div>
        <div class="flex-row-evenly">
            <div id="nav-avator">
                <img
                    :src="$store.state.userInfo.image"
                    alt="无法显示图片"
                />
                <ul id="nav-popover">
                    <Title style="text-align: center; margin: 1em 0">关注的人</Title>
                    <li
                        class="flex-row follow"
                        v-for="person in followList"
                        :key="person.id"
                        @click="toHome(person.id)"
                    >
                        <span>
                            <img
                                :src="person.image"
                                alt=""
                            />
                        </span>
                        <span>{{ person.nickname }}</span>
                    </li>
                </ul>
            </div>
            <div class="nav-nickname">
                <i>{{ $store.state.userInfo.nickname }}</i>
            </div>
            <ThemeCheck
                id="theme-switch"
                v-model="isLight"
            ></ThemeCheck>
            <span id="log-menu">
                <div class="icon">
                    <ion-icon
                        style="transform: scale(1.5)"
                        name="settings-outline"
                    ></ion-icon>
                </div>
                更多
                <span id="popover">
                    <MenuItem
                        v-for="item in popoverData"
                        :key="item.name"
                        @click="handlePopoverClick(item)"
                        Static
                    >
                        {{ item.name }}
                    </MenuItem>
                </span>
            </span>
        </div>
    </div>
</template>
<script>
import { stateGET } from '@/api/user'
import Theme from '@/assets/theme'
import ThemeCheck from './components/ThemeCheck.vue'
import { mapState } from 'vuex'
export default {
    components: {
        ThemeCheck
    },
    data() {
        return {
            popoverData: [
                {
                    name: '个人中心'
                },
                {
                    name: '登出'
                },
                {
                    name: '关于'
                }
            ],
            isLight: true
        }
    },
    computed: {
        ...mapState({
            followList: (state) => state.userInfo.followList
        })
    },
    methods: {
        handlePopoverClick(item) {
            // todo
            switch (item.name) {
                case '个人中心':
                    this.$store.commit('menu/toSubMenu')
                    this.$router.push({
                        name: 'homePage'
                    })
                    break
                case '登出':
                    // todo
                    stateGET({
                        logout: true
                    })
                        .then(() => {
                            this.$store.commit('prompt/trigger', '登出成功')
                            setTimeout(() => {
                                // turn style to light
                                // 清空本地存储
                                this.$store.commit('userInfo/refresh')
                                this.isLight = true
                                this.$router.push('/')
                            }, 1500)
                        })
                        .catch(() => {
                            this.$store.commit('prompt/trigger', {
                                msg: '登出失败，请重试',
                                level: 'warning'
                            })
                        })
                    break
                case '关于':
                    break
            }
        },
        changeTheme(isLight) {
            let newTheme
            if (isLight) {
                newTheme = Theme.light
            } else {
                newTheme = Theme.dark
            }
            const root = document.querySelector(':root')
            for (const k in newTheme) {
                root.style.setProperty(k, newTheme[k])
            }
        },
        switchMenu() {
            this.$store.commit('menu/switchMenu')
            document.querySelector('.menuToggle').classList.toggle('active')
        },
        toHome(id) {
            this.$router.push({
                name: 'page',
                query: {
                    id: id
                }
            })
        }
    },
    created() {
        this.$store.commit('userInfo/queryFollowList')
    },
    watch: {
        isLight() {
            this.changeTheme(this.isLight)
        }
    }
}
</script>
<style>
#nav-bar {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
    height: 64px;
    line-height: 64px;
    color: var(--font-color);
    font-weight: bold;
    box-shadow: 0 1px 10px var(--shade-color);
}

#logo {
    font-size: 26px;
    font-weight: bold;
}

#logo i {
    font-family: 'logo', Times, serif;
}

#theme-switch {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

#nav-avator {
    position: relative;
    width: 64px;
    height: 64px;
}
#nav-avator > img {
    z-index: 2500;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: 0.25s;
}

#nav-avator .follow {
    cursor: pointer;
    margin: 0 20px;
    margin-bottom: 1em;
    overflow: hidden;
    border-radius: 10px;
    border-bottom: 2px solid grey;
    transition: 0.5s;
}

#nav-avator .follow:hover {
    background-color: var(--item-bg-color);
    color: var(--item-font-color);
}

#nav-avator .follow img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

#nav-avator .follow span:nth-child(1) {
    position: relative;
    width: 48px;
    height: 48px;
}

#nav-avator .follow span:nth-child(2) {
    position: relative;
    height: 48px;
    line-height: 48px;
    width: 150px;
    text-align: center;
}

#nav-avator:hover > img {
    width: 48px;
    height: 48px;
    top: calc(50% + 12px);
}

#nav-avator #nav-popover {
    z-index: 2000;
    position: absolute;
    display: none;
    left: 50%;
    top: 48px;
    transform: translate(-50%, 0);
    min-width: 150px;
    background-color: var(--bg-color);
    box-shadow: -5px 5px 10px var(--item-bg-color);
    border-radius: 10px;
}

#nav-avator:hover #nav-popover {
    display: inline-block;
}

.nav-nickname {
    display: inline-block;
    color: grey;
    max-width: 80px;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
}

#log-menu {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: left;
    margin: 0 40px 0 0;
    width: 100px;
    text-align: center;
}

#log-menu .icon {
    width: 48px;
    height: 64px;
}

#popover {
    z-index: 100;
    position: absolute;
    left: 50%;
    top: 64px;
    transform: translate(-50%, 0);
    display: none;
    animation: slide-from-top 0.25s linear forwards;
}
#popover > * {
    cursor: pointer;
    height: 36px;
    line-height: 36px;
    min-width: 150px;
    font-weight: bold;
}
#log-menu:hover > #popover {
    display: inline-block;
    animation: show 0.5s forwards;
}
@keyframes slide-from-top {
    0% {
        opacity: 0;
        transform: translate(-50%, -50%);
    }
    80% {
        opacity: 0.2;
    }
    100% {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}
.menuToggle {
    min-width: 60px;
    height: 64px;
    background: transparent;
    z-index: 1000;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.menuToggle::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 3px;
    background-color: var(--item-bg-color);
    transform: translateY(-9px);
    transition: 0.5s;
    box-shadow: 0 9px 0 var(--item-bg-color);
}
.menuToggle::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 3px;
    background-color: var(--item-bg-color);
    transform: translateY(9px);
    transition: 0.5s;
}
.menuToggle.active::before {
    transform: translateY(0px) rotate(45deg);
    box-shadow: 0 0 0 var(--item-bg-color);
}
.menuToggle.active::after {
    transform: translateY(0px) rotate(-45deg);
}
</style>
