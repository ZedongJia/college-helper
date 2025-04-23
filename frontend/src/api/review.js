import { axios } from './index.js'
import store from '@/store/index.js'
// ------------------------------登录注册-------------------------
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
 * @param {{name:String, label:String}} params
 * @returns {Promise}
 */
export function getReview(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/getReview',
            method: 'GET',
            params
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.reviewList)
                } else {
                    reject(response)
                }
            })
            .catch(() => {
                raise('网络故障，请重试')
            })
    })
}

/**
 * @param {{name:String, label:String, content:String}} params
 * @returns {Promise}
 */
export function addReview(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/addReview',
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

/**
 * @param {{review_id:Number}} params
 * @returns {Promise}
 */
export function removeReview(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/removeReview',
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
