<template>
    <EmptyHint v-if="isEmpty"></EmptyHint>
    <MessageList
        v-else
        style="width: 100%"
        bigIcon="recording-outline"
        :messageDict="historyDict"
        :headers="['时间', '查询分类', '内容']"
        :colWidth="[15, 20, 65]"
        @query="turnTo"
        @del="del"
    ></MessageList>
    <PromptBox
        v-if="needConfirm"
        title="确认删除？"
        @confirm="confirmDel"
        @back="reback"
    />
</template>
<script>
import { getBrowseInfo, deleteBrowseInfo } from '@/api/user'
export default {
    data() {
        return {
            historyDict: {},
            preDel: {},
            needConfirm: false
        }
    },
    computed: {
        isEmpty() {
            return JSON.stringify(this.historyDict) === '{}'
        }
    },
    methods: {
        turnTo(group, index) {
            const { type, content } = this.historyDict[group][index]
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
                    content: content,
                    browse_id: this.historyDict[group][index].browse_id
                }
            })
        },
        del(group, index) {
            // todo
            this.needConfirm = true
            this.preDel = {
                group: group,
                index: index
            }
        },
        loadData() {
            // require
            getBrowseInfo()
                .then((browseInfo) => {
                    this.historyDict = browseInfo
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        },
        confirmDel() {
            const { group, index } = this.preDel
            deleteBrowseInfo({
                browse_id: this.historyDict[group][index].browse_id
            })
                .then(() => {
                    this.$store.commit('prompt/trigger', '删除成功')
                    this.loadData()
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
            this.needConfirm = false
        },
        reback() {
            this.needConfirm = false
        }
    },
    created() {
        this.loadData()
    }
}
</script>
