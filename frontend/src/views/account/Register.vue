<template lang="">
    <div id="account-form">
        <h1>register</h1>
        <div class="form-group">
            <span class="icon">
                <ion-icon name="person-circle-outline"></ion-icon>
            </span>
            <input
                id="nickname"
                type="text"
                v-model="registForm.nickname"
                required
            />
            <span class="error-prompt"></span>
            <label for="nickname">用户名</label>
            <span class="line"></span>
        </div>
        <div class="form-group">
            <span class="icon">
                <ion-icon name="mail-outline"></ion-icon>
            </span>
            <input
                id="email"
                type="text"
                v-model="registForm.email"
                required
            />
            <span class="error-prompt"></span>
            <label for="email">邮箱</label>
            <span class="line"></span>
        </div>
        <div class="form-group">
            <span class="icon">
                <ion-icon name="call-outline"></ion-icon>
            </span>
            <input
                id="phone"
                type="text"
                v-model="registForm.phone"
                required
            />
            <span class="error-prompt"></span>
            <label for="phone">电话</label>
            <span class="line"></span>
        </div>
        <div class="form-group">
            <span class="icon">
                <ion-icon name="key-outline"></ion-icon>
            </span>
            <input
                id="password"
                type="password"
                v-model="registForm.password"
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
                v-model="registForm.confirm"
                required
            />
            <span class="error-prompt"></span>
            <label for="confirm">确认密码</label>
            <span class="line"></span>
        </div>
        <div class="form-group">
            <span class="icon">
                <ion-icon name="code-working-outline"></ion-icon>
            </span>
            <input
                style="width: 50%"
                id="code"
                type="text"
                v-model="registForm.code"
                required
            />
            <span
                style="right: 50%"
                class="error-prompt"
            ></span>
            <label for="code">验证码</label>
            <span class="line"></span>
            <Button
                @click="sendCode"
                style="width: 50%; height: 40px; line-height: 40px"
                >点击发送验证码
            </Button>
        </div>
        <Button
            @click="signUp"
            style="
                margin-top: 40px;
                width: 80%;
                height: 40px;
                line-height: 40px;
            "
            >注册</Button
        >
        <p>已有账号？<a @click="toLogin">去登录</a></p>
    </div>
</template>
<script>
import { Validator } from '@/utils/validation.js'
import { registerPOST, codeGET } from '@/api/user.js'
import { jumpTo } from '@/utils/callback'
export default {
    data() {
        return {
            registForm: {
                nickname: '',
                email: '',
                phone: '',
                password: '',
                confirm: '',
                code: ''
            },
            validator: new Validator()
        }
    },
    methods: {
        signUp() {
            if (!this.validate()) {
                return
            }
            registerPOST({
                nickname: this.registForm.nickname,
                email: this.registForm.email,
                phone: this.registForm.phone,
                password: this.registForm.password,
                code: this.registForm.code
            })
                .then((info) => {
                    this.$store.commit('prompt/trigger', info)
                    jumpTo(() => {
                        this.toLogin()
                    })
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        },
        sendCode(e) {
            if (!this.validate(false)) {
                return
            }
            codeGET()
                .then((info) => {
                    this.$store.commit('prompt/trigger', info)
                    this.countDown(e)
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        },
        toLogin() {
            this.$router.push({
                name: 'login'
            })
        },
        validate(checkCode = true) {
            // 清空警告
            document.querySelectorAll('.error-prompt').forEach((e) => {
                e.innerHTML = ''
            })

            const res = this.validator.validate({
                email: this.registForm.email,
                phone: this.registForm.phone,
                password: this.registForm.password
            })
            let isValid = true
            if (this.registForm.nickname === '') {
                document.querySelector('#nickname~.error-prompt').innerHTML =
                    '用户名不能为空'
                isValid = false
            }
            if (!res.password.result) {
                document.querySelector('#password~.error-prompt').innerHTML =
                    res.password.error
                isValid = false
            }
            if (!res.email.result) {
                document.querySelector('#email~.error-prompt').innerHTML =
                    res.email.error
                isValid = false
            }
            if (!res.phone.result) {
                document.querySelector('#phone~.error-prompt').innerHTML =
                    res.phone.error
                isValid = false
            }
            if (this.registForm.confirm !== this.registForm.password) {
                document.querySelector('#confirm~.error-prompt').innerHTML =
                    '确认密码必须与密码相同'
                isValid = false
            }
            if (checkCode && this.registForm.code === '') {
                document.querySelector('#code~.error-prompt').innerHTML =
                    '验证码不能为空'
                isValid = false
            }
            return isValid
        },
        countDown(e) {
            // 倒计时
            e.target.disabled = true
            e.target.style.cursor = 'not-allowed'
            let time = 60
            e.target.innerHTML = '已发送(' + time + ')'
            const cdEvent = setInterval(() => {
                time -= 1
                if (time <= 0) {
                    e.target.innerHTML = '点击发送验证码'
                    e.target.disabled = false
                    e.target.style.cursor = 'pointer'
                    clearInterval(cdEvent)
                } else {
                    e.target.innerHTML = '已发送(' + time + ')'
                }
            }, 1000)
        }
    }
}
</script>
<style lang=""></style>
