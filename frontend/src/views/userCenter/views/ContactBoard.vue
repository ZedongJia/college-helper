<template lang="">
    <div
        class="flex-row-between"
        style="width: 100%; height: 500px"
    >
        <MessageList
            style="flex: 0 0 35%; height: 100%"
            bigIcon="chatbox-ellipses-outline"
            :messageDict="temperoaryDict"
            :headers="['时间', '昵称']"
            :colWidth="[40, 60]"
            @query="talkTo"
            @del="del"
        ></MessageList>
        <div style="flex: 0 0 3px; height: 100%; background-color: grey; border-radius: 10%"></div>
        <div style="flex: 0 0 63%; height: 100%">
            <EmptyHint v-if="JSON.stringify(personInfo) === '{}'"></EmptyHint>
            <keep-alive
                :max="10"
                v-else
            >
                <ChatBoard
                    style="height: 100%"
                    :title="personInfo.username"
                    :info="personInfo"
                    :session_id="session_id"
                    :key="personInfo.username"
                ></ChatBoard>
            </keep-alive>
        </div>
        <PromptBox
            v-if="needConfirm"
            title="确认删除？"
            @confirm="confirmDel"
            @back="reback"
        />
    </div>
</template>
<script>
import { getSession, dropSession } from '@/api/user'
export default {
    data() {
        return {
            temperoaryDict: {
                临时会话: [],
                好友: []
            },
            sessionDict: {
                临时会话: [],
                好友: []
            },
            personInfo: {},
            session_id: -1,
            needConfirm: false,
            preDel: {},
            updateSession: ''
        }
    },
    methods: {
        talkTo(group, index) {
            console.log(this.temperoaryDict)
            // 请求人员数据
            const talkToPerson = this.temperoaryDict[group][index]
            this.personInfo = talkToPerson.info
            this.session_id = this.sessionDict[group][index]
        },
        del(group, index) {
            // todo
            this.needConfirm = true
            this.preDel = {
                group: group,
                index: index
            }
        },
        confirmDel() {
            const { group, index } = this.preDel
            dropSession({
                session_id: this.sessionDict[group][index]
            }).then(() => {
                this.clear()
                this.loadData()
            })
            this.needConfirm = false
        },
        reback() {
            this.needConfirm = false
        },
        updateTime() {
            getSession()
                .then((sessionInfo) => {
                    sessionInfo['临时会话'].forEach((element, index) => {
                        this.temperoaryDict['临时会话'][index].time = element.time
                    })
                    sessionInfo['好友'].forEach((element, index) => {
                        this.temperoaryDict['好友'][index].time = element.time
                    })
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        },
        loadData() {
            getSession()
                .then((sessionInfo) => {
                    sessionInfo['临时会话'].forEach((element) => {
                        this.temperoaryDict['临时会话'].push({
                            time: element.time,
                            info: element.info
                        })
                        this.sessionDict['临时会话'].push(element.session_id)
                    })
                    sessionInfo['好友'].forEach((element) => {
                        this.temperoaryDict['好友'].push({
                            time: element.time,
                            info: element.info
                        })
                        this.sessionDict['好友'].push(element.session_id)
                    })
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        },
        clear() {
            this.temperoaryDict = {
                临时会话: [],
                好友: []
            }
            this.sessionDict = {
                临时会话: [],
                好友: []
            }
        }
    },
    created() {
        this.loadData()
    },
    mounted() {
        this.updateSession = setInterval(() => {
            this.updateTime()
        }, 3000)
    },
    unmounted() {
        clearInterval(this.updateSession)
    }
}
</script>
<style>
.t {
    align-items: baseline;
}
</style>
