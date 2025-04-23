<template>
    <div class="info-box flex-row-between">
        <div style="flex: 0 0 75%; padding-left: 64px">
            <InfoForm
                v-if="pointer === 0"
                style="width: 70%"
                title="信息修改"
                :inputs="infoInputs"
                @receive="r"
            ></InfoForm>
            <InfoForm
                v-if="pointer === 1"
                style="width: 60%"
                title="密码修改"
                :inputs="pwInputs"
                @receive="r"
            ></InfoForm>
            <InfoForm
                v-if="pointer === 2"
                style="width: 70%"
                title="隐私设置"
                :inputs="privInputs"
                @receive="r"
            ></InfoForm>
        </div>
        <ul class="info-options">
            <li
                v-for="(option, index) in options"
                :key="index"
                :class="{ active: pointer === index }"
            >
                <div class="icon">
                    <ion-icon
                        style="transform: scale(2)"
                        name="build-outline"
                    ></ion-icon>
                </div>
                <a @click="to(index)">{{ option }}</a>
            </li>
        </ul>
    </div>
</template>
<script>
import { getUserInfo, updateUserInfo, pwPOST, getPrivacyInfo, updatePrivacyInfo } from '@/api/user'
import { Validator } from '@/utils/validation'
export default {
    data() {
        return {
            infoInputs: [
                {
                    type: 'file',
                    title: '头像图片',
                    symbol: 'imgUrl',
                    accept: 'image/*'
                },
                {
                    type: 'text',
                    title: '用户名',
                    symbol: 'nickname',
                    icon: 'person-circle-outline'
                },
                {
                    type: 'checkbox',
                    title: '性别',
                    options: ['男', '女', '未知'],
                    labels: ['male', 'female', 'unknown'],
                    symbol: 'gender'
                },
                {
                    type: 'text',
                    title: '电话',
                    symbol: 'phone',
                    icon: 'call-outline'
                },
                {
                    type: 'text',
                    title: '邮件地址',
                    symbol: 'email',
                    icon: 'mail-outline'
                },
                {
                    type: 'text',
                    title: 'QQ',
                    symbol: 'QQ',
                    icon: 'paw-outline'
                },
                {
                    type: 'text',
                    title: '微信',
                    symbol: 'weChat',
                    icon: 'logo-wechat'
                }
            ],
            pwInputs: [
                {
                    type: 'password',
                    title: '密码',
                    symbol: 'password',
                    icon: 'key-outline'
                },
                {
                    type: 'password',
                    title: '确认密码',
                    symbol: 'confirm',
                    icon: 'key-outline'
                }
            ],
            privInputs: [
                {
                    type: 'checkbox',
                    title: '是否显示电话',
                    options: ['是', '否'],
                    labels: ['true', 'false'],
                    symbol: 'telephone_priv'
                },
                {
                    type: 'checkbox',
                    title: '是否显示性别',
                    options: ['是', '否'],
                    labels: ['true', 'false'],
                    symbol: 'gender_priv'
                },
                {
                    type: 'checkbox',
                    title: '是否显示邮件地址',
                    options: ['是', '否'],
                    labels: ['true', 'false'],
                    symbol: 'email_priv'
                },
                {
                    type: 'checkbox',
                    title: '是否显示QQ',
                    options: ['是', '否'],
                    labels: ['true', 'false'],
                    symbol: 'QQ_priv'
                },
                {
                    type: 'checkbox',
                    title: '是否显示微信',
                    options: ['是', '否'],
                    labels: ['true', 'false'],
                    symbol: 'weChat_priv'
                },
                {
                    type: 'checkbox',
                    title: '是否显示收藏',
                    options: ['是', '否'],
                    labels: ['true', 'false'],
                    symbol: 'collection_priv'
                }
            ],
            pointer: 0,
            options: ['基本信息修改', '密码修改', '隐私设置'],
            validator: new Validator()
        }
    },
    methods: {
        r(receive) {
            switch (this.pointer) {
                case 0: {
                    // 验证email, phone
                    const ret = this.validator.validate({
                        phone: receive.phone,
                        email: receive.email
                    })
                    let isValid = true
                    if (!ret.phone.result) {
                        document.querySelector('#id_phone').innerHTML = ret.phone.error
                        isValid = false
                    }
                    if (!ret.email.result) {
                        document.querySelector('#id_email').innerHTML = ret.email.error
                        isValid = false
                    }
                    if (isValid) {
                        updateUserInfo({
                            ...receive
                        }).then((userInfo) => {
                            this.$store.commit('prompt/trigger', '修改成功')
                            // 更新
                            this.$store.commit('userInfo/update', userInfo)
                            this.loadData()
                        })
                    }
                    break
                }
                case 1: {
                    const ret = this.validator.validate({
                        password: receive.password
                    })
                    let isValid = true
                    if (!ret.password.result) {
                        document.querySelector('#id_password').innerHTML = ret.password.error
                        isValid = false
                    }
                    if (String(receive.confirm) !== String(receive.password)) {
                        document.querySelector('#id_confirm').innerHTML = '确认密码必须与密码相同'
                        isValid = false
                    }
                    if (isValid) {
                        // todo
                        pwPOST({
                            password: receive.password
                        })
                            .then((info) => {
                                this.$store.commit('prompt/trigger', info)
                            })
                            .catch((error) => {
                                this.$store.commit('prompt/trigger', {
                                    msg: error,
                                    level: 'warning'
                                })
                            })
                    }
                    break
                }
                case 2: {
                    updatePrivacyInfo({
                        ...receive
                    })
                        .then(() => {
                            this.$store.commit('prompt/trigger', '修改成功')
                            this.loadData()
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
        loadData() {
            // require
            getUserInfo()
                .then((userInfo) => {
                    Object.values(userInfo).forEach((item, index) => {
                        this.infoInputs[index + 1].value = item
                    })
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
            getPrivacyInfo()
                .then((privacyInfo) => {
                    Object.values(privacyInfo).forEach((item, index) => {
                        this.privInputs[index].value = item
                    })
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        },
        to(index) {
            this.pointer = index
        }
    },
    created() {
        this.loadData()
    }
}
</script>
<style>
.info-box {
    align-items: start;
    padding: 15px 100px;
}
.info-options {
    position: relative;
    width: 25%;
    padding: 0 15px;
    border-left: 5px solid grey;
    border-radius: 10px;
}
.info-options .active::after {
    z-index: 100;
    content: '\2605';
    position: absolute;
    right: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 50%;
    color: var(--item-bg-color);
}
.info-options > * {
    display: flex;
    align-items: center;
    margin: 15px 0;
    height: 32px;
}
.info-options .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    width: 32px;
    height: 32px;
}
.info-options a {
    height: 32px;
    line-height: 32px;
}
</style>
