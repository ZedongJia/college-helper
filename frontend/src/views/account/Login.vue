<template>
    <div id="account-form">
        <h1>Login</h1>
        <div class="form-group">
            <span class="icon">
                <ion-icon name="person-circle-outline"></ion-icon>
            </span>
            <input
                id="account"
                type="text"
                v-model="loginForm.account"
                required
            />
            <span class="error-prompt"></span>
            <label for="account">手机号或邮箱</label>
            <span class="line"></span>
        </div>
        <div class="form-group">
            <span class="icon">
                <ion-icon name="key-outline"></ion-icon>
            </span>
            <input
                id="password"
                type="password"
                v-model="loginForm.password"
                required
            />
            <span class="error-prompt"></span>
            <label for="password">密码(8~16位，包含字符、数字和符号)</label>
            <span class="line"></span>
        </div>
        <p>
            <router-link
                style="float: left"
                :to="{ name: 'quickLogin' }"
                >验证码登陆</router-link
            >
            <router-link
                style="float: right"
                :to="{ name: 'forget' }"
                >忘记密码?</router-link
            >
        </p>
        <Button
            @click="signIn"
            style="
                margin-top: 40px;
                width: 80%;
                height: 40px;
                line-height: 40px;
            "
            >登录</Button
        >
        <p>还没有账号? <a @click="toRegister">去注册</a></p>
    </div>
</template>
<script>
import { loginGET } from '@/api/user.js'
import { jumpTo } from '@/utils/callback.js'
import { Validator } from '@/utils/validation.js'
export default {
    data() {
        return {
            loginForm: {
                account: '',
                password: ''
            },
            validator: new Validator(),
            use: 'phone'
        }
    },
    methods: {
        signIn() {
            if (!this.validate()) {
                return
            }
            loginGET({
                account: this.loginForm.account,
                password: this.loginForm.password,
                use: this.use
            })
                .then((userInfo) => {
                    this.$store.commit('userInfo/update', userInfo)
                    // 产生提示框
                    this.$store.commit('prompt/trigger', '登录成功')
                    // 跳转
                    jumpTo(() => {
                        this.$router.push({
                            name: 'system'
                        })
                    })
                })
                .catch((error) => {
                    // '没有该用户的信息'
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        },
        toRegister() {
            this.$router.push({
                name: 'register'
            })
        },
        validate() {
            // 清空警告
            document.querySelectorAll('.error-prompt').forEach((e) => {
                e.innerHTML = ''
            })

            const res = this.validator.validate({
                email: this.loginForm.account,
                phone: this.loginForm.account,
                password: this.loginForm.password
            })
            let isValid = true
            if (!res.password.result) {
                document.querySelector('#password~.error-prompt').innerHTML =
                    res.password.error
                isValid = false
            }
            if (res.email.result) {
                this.use = 'email'
            }
            if (res.phone.result) {
                this.use = 'phone'
            }
            if (!res.email.result && !res.phone.result) {
                document.querySelector('#account~.error-prompt').innerHTML =
                    '请输入正确的手机号或邮箱'
                isValid = false
            }
            return isValid
        }
    }
}
</script>
