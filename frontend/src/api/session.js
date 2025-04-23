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
 * @param {{session_id: Number}} params
 * @returns {Promise}
 */
export function getMessageList(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/getMessageList',
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
 * @param {{session_id:Number, time: String, content: String}} params
 * @returns {Promise}
 */
export function addMessage(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/addMessage',
            method: 'POST',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(response)
                } else {
                    reject(response)
                }
            })
            .catch(() => {
                raise('网络故障，请重试')
            })
    })
}
