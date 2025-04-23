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
 * 关系查询
 * @param { entity1: String, option: String, entity2: String } params
 * @returns { Promise }
 */
export function RelationQuery(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'entity/relation/',
            method: 'GET',
            params
        })
            .then((response) => {
                if (response) {
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

/**
 * 获取某一省份下所有的年份信息
 * @param { provinceName: String } params
 * @returns { Promise }
 */
export function getProYearsInfo(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'entity/getProYearsInfo/',
            method: 'GET',
            params
        })
            .then((response) => {
                if (response) {
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
 * 获取某一省份下某一年的所有的 category 与 degree 信息
 * @param { provinceName: String, year: String } params
 * @returns { Promise }
 */
export function getCateDegreeInfo(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'entity/getCateDegreeInfo/',
            method: 'GET',
            params
        })
            .then((response) => {
                if (response) {
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
 * 获取某一省份下某一年下category 与 degree 下对应的分数信息
 * @param { provinceName: String, year: String, category: String, degree: String } params
 * @returns { Promise }
 */
export function getScoreInfo(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'entity/getScoreInfo/',
            method: 'GET',
            params
        })
            .then((response) => {
                if (response) {
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
 *大学专业智能查询
 * @param {{entity: String}} params
 * @returns {Promise}
 */
export function IntelligentQuery(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'entity/intelligentQuery',
            method: 'GET',
            params
        })
            .then((response) => {
                if (response) {
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
 *智能推荐
 * @param {{status: String}} params
 * @returns {Promise}
 */
export function Recommendation(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'entity/recommendation',
            method: 'GET',
            params
        })
            .then((response) => {
                const data = response.data
                if (response) {
                    resolve(data.recommdList)
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
 * 根据分数推荐大学
 * @param {{provinceName: String, myScore: String, branch: String}} params
 * @returns {Promise}
 */
export function ScoreRecommend(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'entity/scoreRecommend',
            method: 'GET',
            params
        })
            .then((response) => {
                if (response) {
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
 * AiChat
 * @param {{ sentence: String }} params
 * @returns {Promise}
 */
export function AiChat(params) {
    return new Promise((resolve, reject) => {
        axios({
            url: 'entity/AIChat/',
            method: 'GET',
            params
        })
            .then((response) => {
                if (response) {
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
