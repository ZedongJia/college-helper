<template>
    <div
        v-if="dealPhone"
        id="account-form"
        style="width: 500px"
    >
        <h1>忘记密码</h1>
        <p>请输入你的手机号</p>
        <div class="input-group">
            <span class="error-prompt"></span>
            <input
                type="text"
                maxlength="1"
                v-for="(c, index) in 11"
                :key="c"
                @input="handleInput($event, index, 11)"
                @keydown="handleKeyDown($event, index, 11)"
            />
        </div>
        <Button
            style="margin-top: 20px; width: 150px; height: 40px; line-height: 40px"
            @click="confirm"
            >确认
        </Button>
        <p>
            <router-link :to="{ name: 'login' }">返回</router-link>
        </p>
    </div>
    <div
        v-if="dealCode"
        id="account-form"
        style="width: 500px"
    >
        <h1>忘记密码</h1>
        <p>我们已经向你的手机发送了验证码, 请输入验证码</p>
        <div class="input-group">
            <input
                type="text"
                maxlength="1"
                v-for="(c, index) in 6"
                :key="c"
                @input="handleInput($event, index, 6)"
                @keydown="handleKeyDown($event, index, 6)"
            />
        </div>
        <Button
            style="margin-top: 20px; width: 150px; height: 40px; line-height: 40px"
            @click="confirm"
            >确认
        </Button>
        <p>
            <router-link :to="{ name: 'login' }">返回</router-link>
        </p>
    </div>
    <PopFrame v-if="dealPW">
        <div id="account-form">
            <h1>修改密码</h1>
            <p>请输入您想要修改的密码</p>
            <div class="form-group">
                <span class="icon">
                    <ion-icon name="key-outline"></ion-icon>
                </span>
                <input
                    id="password"
                    type="password"
                    v-model="reset.password"
                    required
                />
                <span class="error-prompt"></span>
                <label for="password">密码(8~16位，包含字符、数字和符号)</label>
                <span class="line"></span>
            </div>
            <div class="form-group">
                <span class="icon">
                    <ion-icon name="key-outline"></ion-icon>
                </span>
                <input
                    id="confirm"
                    type="password"
                    v-model="reset.confirm"
                    required
                />
                <span class="error-prompt"></span>
                <label for="confirm">确认密码</label>
                <span class="line"></span>
            </div>
            <Button
                style="margin-top: 20px; width: 150px; height: 40px; line-height: 40px"
                @click="confirm"
                >确认
            </Button>
            <p>
                <router-link :to="{ name: 'login' }">返回</router-link>
            </p>
        </div>
    </PopFrame>
</template>
<script>
import { quickGET, codeGET, pwPOST } from '@/api/user'
import { nextTick } from 'vue'
import { jumpTo } from '@/utils/callback.js'
import { Validator } from '@/utils/validation.js'
export default {
    data() {
        return {
            ID: '',
            phone: '',
            code: '',
            inputList: [],
            dealPhone: true,
            dealCode: false,
            dealPW: false,
            reset: {
                password: '',
                confirm: ''
            },
            validator: new Validator()
        }
    },
    methods: {
        handleInput(e, index, len) {
            this.inputList[index + 1 < len ? index + 1 : index].focus()
        },
        handleKeyDown(e, index, len) {
            if (e.key === 'Backspace') {
                this.inputList[index].value = ''
                this.inputList[index - 1 > 0 ? index - 1 : 0].focus()
                e.preventDefault()
            }
        },
        confirm() {
            if (this.dealPhone) {
                // 验证手机号
                this.inputList.forEach((item) => {
                    this.phone += item.value
                })
                const ret = this.validator.validate({
                    phone: this.phone
                })
                if (!ret.phone.result) {
                    document.querySelector('.error-prompt').innerHTML = ret.phone.error
                    this.phone = ''
                    return
                }
                // 发送验证码
                codeGET()
                    .then(() => {
                        this.dealPhone = false
                        this.dealCode = true
                        nextTick(() => {
                            this.inputList = document.querySelectorAll('#account-form input')
                        })
                    })
                    .catch((error) => {
                        this.$store.commit('prompt/trigger', {
                            msg: error,
                            level: 'warning'
                        })
                    })
                return
            }
            if (this.dealCode) {
                // 验证验证码
                this.inputList.forEach((item) => {
                    this.code += item.value
                })
                if (this.code === '') {
                    document.querySelector('.error-prompt').innerHTML = '验证码不能为空'
                    this.code = ''
                    return
                }
                quickGET({
                    phone: this.phone,
                    code: this.code
                })
                    .then((userInfo) => {
                        this.ID = userInfo.ID
                        this.dealCode = false
                        this.dealPW = true
                    })
                    .catch((error) => {
                        this.$store.commit('prompt/trigger', {
                            msg: error,
                            level: 'warning'
                        })
                    })
                // todo, 错误重定向回login页面
                return
            }
            if (this.dealPW) {
                // todo, 打包ID和密码
                pwPOST({
                    ID: this.ID,
                    password: this.reset.password
                })
                    .then((info) => {
                        this.$store.commit('prompt/trigger', info)
                        // 跳转
                        jumpTo(() => {
                            this.$router.push({
                                name: 'login'
                            })
                        })
                    })
                    .catch((error) => {
                        this.$store.commit('prompt/trigger', {
                            msg: error,
                            level: 'warning'
                        })
                    })
            }
        }
    },
    mounted() {
        this.inputList = document.querySelectorAll('#account-form input')
    }
}
</script>
<style>
.input-group {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}
.input-group input {
    padding: 10px 0;
    width: 30px;
    font-size: 24px;
    text-align: center;
    border-bottom: 1px solid grey;
}
.input-group input:focus {
    border-bottom: 3px solid var(--item-bg-color);
}
</style>
