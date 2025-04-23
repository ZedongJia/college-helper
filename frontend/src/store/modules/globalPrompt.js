export default {
    namespaced: true,
    state: {
        isShow: false,
        msg: '',
        level: 'info',
        durationTime: 1000
    },
    mutations: {
        trigger (state, param) {
            /**
             * param, 信号,类型为Object{
             *  msg: String,
             *  level: Enum('info', 'warning')
             * }
             */
            state.isShow = true
            if (typeof param === 'object') {
                state.msg = param.msg
                state.level = param.level
            } else {
                state.msg = param
            }
            setTimeout(() => {
                state.isShow = false
                state.msg = ''
                state.level = 'info'
            }, state.durationTime)
        }
    }
}
