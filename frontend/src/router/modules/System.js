import identification from './modules/identification'
import userCenter from './modules/userCenter.js'

export default {
    name: 'system',
    path: '/system',
    redirect: '/system/interest',
    component: () => import('@/views/System.vue'),
    children: [
        identification,
        {
            name: 'entitySearch',
            path: 'entitySearch',
            component: () => import('@/views/mainBoard/EntitySearch.vue')
        },
        {
            name: 'relationSearch',
            path: 'relationSearch',
            component: () => import('@/views/mainBoard/RelationSearch.vue')
        },
        {
            path: 'overview',
            component: () => import('@/views/mainBoard/overview/Overview.vue')
        },
        {
            path: 'interest',
            component: () => import('@/views/mainBoard/Interest.vue')
        },
        {
            name: 'chatAI',
            path: 'chatAI',
            component: () => import('@/views/mainBoard/ChatAI.vue')
        },
        {
            path: 'scoreVisual',
            component: () => import('@/views/mainBoard/ScoreVisual.vue')
        },
        {
            path: 'feedback',
            component: () => import('@/views/mainBoard/Feedback.vue')
        },
        {
            path: 'feedback',
            component: () => import('@/views/mainBoard/Feedback.vue')
        },
        userCenter
    ]
}
