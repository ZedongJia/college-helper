import { axios, STATE } from './index.js'
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
 * 登录请求API
 * @param {{account: String,password: String,use:String}} params
 * @returns {Promise}
 */
export function loginGET(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/account',
            method: 'GET',
            params
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.userInfo)
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
 * 快速登陆API
 * @param {{phone: str, code: str}} params
 * @returns {Promise}
 */
export function quickGET(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/quick',
            method: 'GET',
            params
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.userInfo)
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
 * 注册请求API
 * @param {{account: str,password: str}} params
 * @returns {Promise}
 */
export function registerPOST(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/account',
            method: 'POST',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.info)
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
 * 验证码获取API
 * @returns {Promise}
 */
export function codeGET() {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/code',
            method: 'GET'
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.info)
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
 * 修改密码
 * @param {{ID:int, password: String}} params
 * @returns {Promise}
 */
export function pwPOST(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/modifyPW',
            method: 'POST',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.info)
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
 * 查看状态
 * @param {{logout:boolean}} params
 * @param {function} error
 * @returns {Promise}
 */
export function stateGET(params, error) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/state',
            method: 'GET',
            params
        })
            .then((response) => {
                if (response.data - STATE.NOT_FOUND === 0) {
                    reject(response)
                } else {
                    resolve(response)
                }
            })
            .catch(() => {
                if (error === undefined) {
                    raise('网络故障，请重试')
                } else {
                    error()
                }
            })
    })
}

// ----------------------------------个人信息----------------------------
/**
 * @returns {Promise}
 */
export function getUserInfo(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/userInfo',
            method: 'GET',
            params
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.userInfo)
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
 * @param {{userInfo:{}}} params
 * @returns {Promise}
 */
export function updateUserInfo(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/userInfo',
            method: 'POST',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.userInfo)
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
 * @returns {Promise}
 */
export function getPrivacyInfo(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/privacyInfo',
            method: 'GET',
            params
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.privacyInfo)
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
 * @param {{k:v}} params
 * @returns
 */
export function updatePrivacyInfo(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/privacyInfo',
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
                    reject(data.error)
                }
            })
            .catch(() => {
                raise('网络故障，请重试')
            })
    })
}
/**
 * @param {{ID:int}} params
 * @returns {Promise}
 * then((openDict)=>{})
 */
export function getOpenInfo(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/getOpenInfo',
            method: 'GET',
            params
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.openDict)
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
 * @returns {Promise}
 * then((browseInfo)=>{})
 */
export function getBrowseInfo(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/getBrowseInfo',
            method: 'GET',
            params
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.browseInfo)
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
 * 注意时间需要和分组的时间进行拼接再返回
 * @param {{browse_id: String}} params
 * @returns {Promise}
 */
export function deleteBrowseInfo(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/getBrowseInfo',
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
 * @returns {Promise}
 * then((collectionInfo)=>{})
 */
export function getCollectionInfo(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/getCollectionInfo',
            method: 'GET',
            params
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.collectionInfo)
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
 * @param {{collection_id: String}} params
 * @returns {Promise}
 */
export function deleteCollectionInfo(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/getCollectionInfo',
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
 * @param {{browse_id:String, state:String}} params
 */
export function star(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/star',
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
 * @param {{type: String, content: String}} params
 */
export function addBrowseInfo(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/addBrowseInfo',
            method: 'POST',
            data: params,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.browse_id)
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
 * @returns {Promise}
 */
export function getSession() {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/getSession',
            method: 'GET'
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.sessionInfo)
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
 * @param {{session_id:Number}} params
 * @returns {Promise}
 */
export function dropSession(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/dropSession',
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
 * @param {{query_id:String}} params
 * @returns {Promise}
 */
export function queryFollow(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/queryFollow',
            method: 'GET',
            params
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.msg)
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
 * @returns {Promise}
 */
export function queryFollowList() {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/queryFollowList',
            method: 'GET'
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.followList)
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
 * @param {{query_id:String}} params
 * @returns {Promise}
 */
export function querySession(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/querySession',
            method: 'GET',
            params
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.msg)
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
 * @param {{follow_id:Number}} params
 * @returns {Promise}
 */
export function follow(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/follow',
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
                    reject(data.error)
                }
            })
            .catch(() => {
                raise('网络故障，请重试')
            })
    })
}

/**
 * @param {{follow_id:Number}} params
 * @returns {Promise}
 */
export function addSession(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/addSession',
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
                    reject(data.error)
                }
            })
            .catch(() => {
                raise('网络故障，请重试')
            })
    })
}

/**
 * @returns {Promise}
 */
export function queryFeedback() {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/queryFeedback',
            method: 'GET'
        })
            .then((response) => {
                const data = response.data
                if (data.status) {
                    resolve(data.feedbackDict)
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
 * @param {{type:String, question:String, advice:String, imgSrc:File}} params
 * @returns {Promise}
 */
export function addFeedback(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'user/addFeedback',
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
