import treeData from '@/views/mainBoard/overview/tree.json'
export default {
    namespaced: true,
    state: {
        currNode: {
            parent: '省份',
            children: [],
            name: ''
        },
        isShow: false,
        treeStack: [],
        treeData: treeData
    },
    mutations: {
        updateNode(state, params) {
            state.currNode = params
            state.treeStack.push(state.currNode)
        },
        updateStack(state, params) {
            if (params.updown === 'down') {
                state.treeStack.push(params.stacknode)
                console.log(state.treeStack)
            } else if (params.updown === 'up') {
                console.log(state.treeStack.length)
                for (let i = state.treeStack.length - 2; i >= 0; i--) {
                    if (state.treeStack[i].name === params.nodename) {
                        state.currNode = state.treeStack[i]
                    }
                }
                // state.treeStack.pop(params.stacknode)
            } else {
                state.treeStack.push(params)
            }
        },
        show(state) {
            state.isShow = !state.isShow
        },
        hide(state) {
            state.isShow = !state.isShow
        }
    }
}
