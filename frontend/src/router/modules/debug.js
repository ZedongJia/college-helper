export default {
    path: '/test',
    // component: () => import('@/views/debug/BackendTest.vue'),
    children: [
        {
            path: '/newTest',
            component: () => import('@/views/debug/newTest.vue')
        },
        {
            path: '/newOverview',
            component: () => import('@/views/debug/newOverview.vue')
        }
    ]
}
