import { axios } from './index.js'
import store from '@/store/index.js'
/**
 * @param {String} msg 报错信息
 */
function raise(msg) {
    store.commit('prompt/trigger', {
        msg: msg,
        level: 'warning'
    })
}

/**
 * 查询实体
 * @param {{name: String, label: String}} params
 * @returns {Promise}
 */
export function queryEntity(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'entity/query',
            method: 'GET',
            params
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.data)
                } else {
                    reject(data.error)
                }
            })
            .catch(() => {
                raise('网络故障，请重试')
            })
    })
}

/**
 * 查询实体
 * @param {{sentence: String}} params
 * @returns {Promise}
 */
export function cutSentence(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'entity/cut',
            method: 'POST',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.cut_result)
                } else {
                    reject(data.error)
                }
            })
            .catch(() => {
                raise('网络故障，请重试')
            })
    })
}