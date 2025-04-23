<template lang="">
    <Board
        class="info"
        inset
    >
        <div class="info-bg"></div>
        <div class="info-avatar">
            <img
                :src="userInfo.image"
                alt="....."
            />
        </div>
        <div class="info-title">{{ userInfo.nickname }}</div>
        <div
            v-if="id !== undefined && id - home_id !== 0"
            class="flex-row-evenly"
            style="width: 200px"
        >
            <Button
                @clickIt="mailTo"
                :disabled="disallowMail"
                >{{ disallowMail ? '已添加私信' : '私信' }}</Button
            >
            <Button
                @clickIt="followTo"
                :disabled="disallowFollow"
                >{{ disallowFollow ? '已关注' : '关注' }}</Button
            >
        </div>
        <br />
        <div class="info-block flex-row-left">
            <span class="icon"
                ><ion-icon
                    style="transform: scale(2)"
                    name="share-social-outline"
                ></ion-icon
            ></span>
            <span> 基本信息 </span>
        </div>
        <br />
        <Board
            style="padding: 0 32px"
            inset
        >
            <ul class="info-content">
                <li
                    class="flex-row-evenly"
                    v-for="msg in userInfo.publicMsg"
                    :key="msg.title"
                >
                    <span class="icon"
                        ><ion-icon
                            style="transform: scale(1.5)"
                            :name="msg.icon"
                        ></ion-icon
                    ></span>
                    <span style="width: 100px; font-weight: bold">{{ msg.title }}</span>
                    <span style="width: 20px">~</span>
                    <span style="width: 250px">{{ msg.value }}</span>
                    <i class="hover-fill"></i>
                </li>
            </ul>
        </Board>
        <br />
        <div class="info-block flex-row-left">
            <span class="icon"
                ><ion-icon
                    style="transform: scale(2)"
                    name="share-social-outline"
                ></ion-icon
            ></span>
            <span> 收藏 </span>
        </div>
        <br />
        <Board
            style="padding: 0 32px; width: 80%"
            inset
        >
            <EmptyHint
                v-if="isEmpty"
                :hint="userInfo.hint"
            ></EmptyHint>
            <MessageList
                v-else
                style="width: 100%"
                :messageDict="userInfo.collectionDict"
                :headers="['时间', '查询分类', '内容']"
                :colWidth="[30, 20, 50]"
                @query="turnTo"
                nodel
            ></MessageList>
        </Board>
        <br />
    </Board>
</template>
<script>
import { addSession, follow, getOpenInfo, queryFollow, querySession } from '@/api/user'
import { mapState } from 'vuex'
export default {
    props: {
        id: String
    },
    data() {
        return {
            userInfo: {
                nickname: 'zhngsan',
                image: '',
                publicMsg: [
                    {
                        title: '性别',
                        label: 'gender',
                        value: '',
                        icon: 'transgender-outline'
                    },
                    {
                        title: '邮箱',
                        label: 'email',
                        value: '',
                        icon: 'mail-outline'
                    },
                    {
                        title: '电话',
                        label: 'phone',
                        value: '',
                        icon: 'call-outline'
                    },
                    {
                        title: 'QQ',
                        label: 'QQ',
                        value: '',
                        icon: 'paw-outline'
                    },
                    {
                        title: '微信',
                        label: 'weChat',
                        value: '',
                        icon: 'logo-wechat'
                    }
                ],
                collectionDict: {},
                hint: '未公开'
            },
            disallowMail: false,
            disallowFollow: false
        }
    },
    methods: {
        turnTo(group, index) {
            const { type, content } = this.userInfo.collectionDict[group][index]
            let name = ''
            switch (type) {
                case '实体查询':
                    name = 'identification'
                    break
                case '查关系':
                    name = 'relationSearch'
                    break
                case '大学专业智能查询':
                    name = 'entitySearch'
                    break
            }
            this.$store.commit('menu/toMainMenu')
            this.$router.push({
                name: name,
                query: {
                    content: content
                }
            })
        },
        mailTo() {
            addSession({
                follow_id: this.id
            })
                .then(() => {
                    this.$store.commit('prompt/trigger', {
                        msg: '成功加入会话',
                        level: 'info'
                    })
                    this.loadData()
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        },
        followTo() {
            // todo
            follow({
                follow_id: this.id
            })
                .then(() => {
                    this.$store.commit('prompt/trigger', {
                        msg: '关注成功',
                        level: 'info'
                    })
                    this.loadData()
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        },
        loadData() {
            // request, filter, get public
            let queryId = this.id
            if (queryId === undefined) {
                queryId = this.$store.state.userInfo.ID
            }
            getOpenInfo({
                ID: queryId
            })
                .then((openDict) => {
                    // 获取名字
                    this.userInfo.nickname = openDict.nickname
                    const { publicMsg } = this.userInfo
                    // 获取基本信息
                    for (let i = 0; i < publicMsg.length; i++) {
                        if (publicMsg[i].label === 'gender') {
                            let value = openDict[publicMsg[i].label]
                            switch (value) {
                                case 'male':
                                    value = '男'
                                    break
                                case 'female':
                                    value = '女'
                                    break
                                default:
                                    value = '未知'
                                    break
                            }
                            publicMsg[i].value = value
                        } else {
                            let value = openDict[publicMsg[i].label]
                            value = value === '' ? '暂无信息' : value
                            publicMsg[i].value = value
                        }
                    }
                    // 获取头像
                    this.userInfo.image = openDict.image
                    // 获取收藏
                    if (openDict.collectionDict === '未公开') {
                        this.userInfo.hint = '未公开'
                        this.userInfo.collectionDict = {}
                    } else {
                        this.userInfo.hint = '暂无记录'
                        this.userInfo.collectionDict = openDict.collectionDict
                    }
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
            queryFollow({
                query_id: this.id
            })
                .then((msg) => {
                    if (msg === 'exist') {
                        // todo
                        this.disallowFollow = true
                    }
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })

            querySession({
                query_id: this.id
            })
                .then((msg) => {
                    if (msg === 'exist') {
                        // todo
                        this.disallowMail = true
                    }
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        }
    },
    computed: {
        isEmpty() {
            return JSON.stringify(this.userInfo.collectionDict) === '{}'
        },
        ...mapState({
            home_id: (state) => state.userInfo.ID
        })
    },
    created() {
        this.loadData()
    }
}
</script>
<style>
.info {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info-bg {
    width: 100%;
    height: 200px;
    background-color: var(--item-bg-color);
}

.info-avatar {
    position: absolute;
    width: 192px;
    height: 192px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 104px;
    background-color: black;
}

.info-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}

.info-title {
    margin-top: 96px;
    padding: 5px 0;
    height: 60px;
    font-weight: bold;
    font-size: 30px;
}

.info-block {
    width: 90%;
    font-weight: bold;
    font-size: 20px;
    border-bottom: 2px solid grey;
}

.info-block .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
}

.info-content {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    width: 80%;
}

.info-content li {
    z-index: 100;
    position: relative;
    width: 50%;
}

.info-content li .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
}

.info-content span {
    cursor: default;
    font-size: 18px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: var(--item-bg-color);
    transition: 0.25s;
}

.info-content li:hover span {
    color: var(--item-font-color);
}

.info-content .hover-fill {
    pointer-events: none;
    z-index: -100;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    background: var(--item-bg-color);
    border-radius: 5px;
    transition: 0.5s;
}

.info-content li:hover .hover-fill {
    height: 48px;
    border-radius: 5px;
}
</style>
