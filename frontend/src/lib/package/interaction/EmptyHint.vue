<template>
    <h2 class="empty-hint fade-in">{{ hint === '' ? '暂无结果' :hint }}</h2>
</template>
<script>
export default {
    name: 'EmptyHint',
    props: {
        hint: {
            type: String,
            default: ''
        }
    }
}
</script>
<style>
.empty-hint {
    color: grey;
    text-align: center;
}
</style>
