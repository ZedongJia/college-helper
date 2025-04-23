const LOADINGTIME = 1000
const JUMPWAITING = 1500

/**
 * 执行数据加载的包装函数
 * @param {*} callback 回调函数
 */
function loading(callback) {
    setTimeout(callback, LOADINGTIME)
}
export { loading }

/**
 * 执行页面跳转的包装函数
 * @param {*} callback 回调函数
 */
function jumpTo(callback) {
    setTimeout(callback, JUMPWAITING)
}
export { jumpTo }
