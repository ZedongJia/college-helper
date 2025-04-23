import { queryFollowList } from '@/api/user'
import store from '@/store/index.js'
const defaultUser = {
    ID: -1,
    nickname: '张三',
    image: 'http://localhost:8000/gallery/match/?ID=5',
    followList: []
}

export default {
    namespaced: true,
    state: {
        ID: -1,
        nickname: '张三',
        image: 'http://localhost:8000/gallery/match/?ID=5'
    },
    mutations: {
        update(state, userInfo) {
            state.ID = userInfo.id
            state.nickname = userInfo.nickname
            state.image = userInfo.image
            store.commit('interest/fetch', {
                status: 'origin'
            })
            // 持久化存储
            localStorage.setItem('userInfo', JSON.stringify(state))
        },
        refresh(state) {
            state.ID = defaultUser.ID
            state.nickname = defaultUser.nickname
            state.image = defaultUser.image
            localStorage.clear()
        },
        queryFollowList(state) {
            queryFollowList().then((followList) => {
                state.followList = followList
            })
        }
    }
}
