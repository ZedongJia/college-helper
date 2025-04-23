
/**
 * 校验器
 */
export class Validator {
    constructor() {
        this.funCall = {
            password: this.__validatePW__,
            email: this.__validateEmail__,
            phone: this.__validatePhone__
        }
    }

    __validatePW__ (password) {
        const re = /^(?![0-9a-zA-Z]+$)(?![0-9\W]+$)(?![a-zA-Z\W]+$)[0-9A-Za-z\W]{8,16}$/
        if (!re.test(password)) {
            return {
                result: false,
                error: '密码必须是8-16位, 包含字母、数字和字符'
            }
        } else {
            return {
                result: true
            }
        }
    }

    __validateEmail__ (email) {
        const re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (re.test(email)) {
            return {
                result: true
            }
        } else {
            return {
                result: false,
                error: '邮箱格式不正确'
            }
        }
    }

    __validatePhone__ (phone) {
        const re = /^(1[3|4|5|6|7|8|9])\d{9}$/
        if (re.test(phone)) {
            return {
                result: true
            }
        } else {
            return {
                result: false,
                error: '手机号格式不正确'
            }
        }
    }

    /**
     * 检验的键值
     * email,phone,password
     * @param {{k:v}} kv
     * @returns {{k:{result:boolean, error:String}}}
     */
    validate (kv) {
        const ret = {}
        Object.keys(kv).forEach(k => {
            const _ret = this.funCall[k](kv[k])
            ret[k] = _ret
        })
        return ret
    }
}
