<template>
    <Board
        v-if="isShow"
        class="fade-in"
    >
        <Loading v-if="isLoading"></Loading>
        <EmptyHint v-if="isEmpty && !isLoading"></EmptyHint>
        <div v-if="!isEmpty && !isLoading">
            {{ data }}
            <slot name="extend"></slot>
        </div>
    </Board>
</template>
<script>
export default {
    name: 'AnswerBoard',
    props: {
        extend: Boolean,
        isShow: Boolean,
        isLoading: Boolean,
        data: {
            type: String,
            default: ''
        }
    },
    computed: {
        isEmpty() {
            return this.data === '' && !this.extend
        }
    }
}
</script>
