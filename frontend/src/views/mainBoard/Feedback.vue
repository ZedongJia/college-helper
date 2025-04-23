<template>
    <div class="wrapper">
        <Board class="feedback">
            <br />
            <fieldset class="feedbackform">
                <legend>反馈ACTIVE</legend>
                <InfoForm
                    style="width: 50%"
                    :inputs="infoInputs"
                    @receive="r"
                ></InfoForm>
            </fieldset>
            <br />
            <br />
            <fieldset>
                <legend>处理ACTIVE</legend>
                <MessageList
                    style="width: 100%"
                    bigIcon="mail-open-outline"
                    :messageDict="feedbackDict"
                    :headers="['时间', '反馈ID', '状态', '问题', '建议']"
                    :colWidth="[30, 10, 10, 25, 25]"
                    nodel
                    nocursor
                ></MessageList>
            </fieldset>
            <br />
        </Board>
    </div>
</template>
<script>
import { queryFeedback, addFeedback } from '@/api/user'
export default {
    data() {
        return {
            infoInputs: [
                {
                    type: 'file',
                    title: '相关图片',
                    symbol: 'imgSrc',
                    accept: 'image/*'
                },
                {
                    type: 'checkbox',
                    title: '反馈类别',
                    options: ['实体', '关系', '新增'],
                    labels: ['entity', 'relation', 'addNew'],
                    symbol: 'type',
                    value: 'entity'
                },
                {
                    type: 'text',
                    title: '反馈问题',
                    symbol: 'question',
                    icon: 'document-outline'
                },
                {
                    type: 'text',
                    title: '建议',
                    symbol: 'advice',
                    icon: 'document-outline'
                }
            ],
            feedbackDict: {}
        }
    },
    methods: {
        r(formData) {
            // todo
            if (formData.imgSrc === undefined) {
                formData.imgSrc = ''
            }
            if (formData.question === '') {
                this.$store.commit('prompt/trigger', {
                    msg: '反馈问题不能为空哦',
                    level: 'attention'
                })
                return
            }
            addFeedback(formData).then(() => {
                this.$store.commit('prompt/trigger', {
                    msg: '提交成功',
                    level: 'info'
                })
                this.loadFeedback()
            })
        },
        loadFeedback() {
            queryFeedback()
                .then((feedbackDict) => {
                    this.feedbackDict = feedbackDict
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        }
    },
    created() {
        this.loadFeedback()
    }
}
</script>
<style>
.feedback fieldset {
    margin: 0 auto;
    width: 90%;
    padding: 2em;
    border: none;
    box-shadow: -10px -10px var(--item-bg-color), 5px 5px 10px var(--item-bg-color);
    border-radius: 20px;
}
.feedback legend {
    transform: translate(0, -15%);
    padding: 5px 10px;
    font-size: 1.2em;
    font-weight: 700;
    border-radius: 10px;
    background-color: var(--item-bg-color);
    color: var(--item-font-color);
}
</style>
