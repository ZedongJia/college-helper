export default {
    path: 'userCenter',
    redirect: 'userCenter/homePage',
    component: () => import('@/views/userCenter/UserCenter.vue'),
    children: [
        {
            name: 'homePage',
            path: 'homePage',
            component: () => import('@/views/userCenter/views/Home.vue')
        },
        {
            path: 'infoBoard',
            component: () => import('@/views/userCenter/views/InfoBoard.vue')
        },
        {
            path: 'historyBoard',
            component: () => import('@/views/userCenter/views/HistoryBoard.vue')
        },
        {
            path: 'collectBoard',
            component: () => import('@/views/userCenter/views/CollectBoard.vue')
        },
        {
            path: 'contactBoard',
            component: () => import('@/views/userCenter/views/ContactBoard.vue')
        }
    ]
}
