export default {
    path: 'identification',
    children: [
        {
            name: 'identification',
            path: '',
            component: () => import('@/views/mainBoard/identification/Identification.vue')
        },
        {
            name: 'detailContent',
            path: 'detailContent',
            component: () => import('@/views/mainBoard/identification/Detail.vue'),
            props(route) {
                return {
                    name: route.query.name,
                    label: route.query.label
                }
            }
        },
        {
            name: 'page',
            path: 'page',
            component: () => import('@/views/mainBoard/identification/component/Page.vue'),
            props(route) {
                return {
                    id: route.query.id
                }
            }
        }
    ]
}
