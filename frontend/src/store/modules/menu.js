const MainMenu = [
    {
        name: '智能推荐',
        href: '/system/interest',
        icon: 'telescope-outline'
    },
    {
        name: '文本智能分析',
        href: '/system/identification',
        icon: 'reader-outline'
    },
    {
        name: '大学专业智能查询',
        href: '/system/entitySearch',
        icon: 'search-circle-outline'
    },
    {
        name: '查关系',
        href: '/system/relationSearch',
        icon: 'search-outline'
    },
    {
        name: '大学专业概览',
        href: '/system/overview',
        icon: 'podium-outline'
    },
    {
        name: 'AI问答',
        href: '/system/chatAI',
        icon: 'chatbubbles-outline'
    },
    {
        name: '分数智能分析',
        href: '/system/scoreVisual',
        icon: 'bar-chart-outline'
    },
    {
        name: '反馈',
        href: '/system/feedback',
        icon: 'cafe-outline'
    },
    {
        name: '用户中心',
        routerName: 'homePage',
        option: 'menu/toSubMenu',
        icon: 'person-outline'
    }
]

const SubMenu = [
    {
        name: '个人主页',
        href: '/system/userCenter/homePage',
        icon: 'home-outline'
    },
    {
        name: '信息修改',
        href: '/system/userCenter/infoBoard',
        icon: 'reader-outline'
    },
    {
        name: '查看历史记录',
        href: '/system/userCenter/historyBoard',
        icon: 'recording-outline'
    },
    {
        name: '查看收藏',
        href: '/system/userCenter/collectBoard',
        icon: 'star-outline'
    },
    {
        name: '私信',
        href: '/system/userCenter/contactBoard',
        icon: 'mail-unread-outline'
    },
    {
        name: '返回',
        href: '/system',
        option: 'menu/toMainMenu',
        icon: 'return-down-back-outline'
    }
]

export default {
    namespaced: true,
    state: {
        menuList: MainMenu,
        state: 'main',
        showMenu: true
    },
    mutations: {
        toSubMenu (state) {
            state.menuList = SubMenu
            state.state = 'sub'
        },
        toMainMenu (state) {
            state.menuList = MainMenu
            state.state = 'main'
        },
        checkState (state) {
            if (window.location.href.includes('userCenter')) {
                this.commit('menu/toSubMenu')
            } else {
                this.commit('menu/toMainMenu')
            }
        },
        switchMenu (state) {
            state.showMenu = !state.showMenu
        }
    }
}
