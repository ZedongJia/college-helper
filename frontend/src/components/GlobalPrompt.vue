<template>
    <PromptBox
        :title="prompt"
        noConfirm
        :isShow="isShow"
        :level="level"
    ></PromptBox>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            isShow: state => state.prompt.isShow,
            prompt: state => state.prompt.msg,
            level: state => state.prompt.level
        })
    }
}
</script>
<style></style>
