<template>
    <h3 :class="{title:true, center: center}">
        {{ title }}
        <slot></slot>
    </h3>
</template>
<script>
export default {
    name: 'Title',
    props: {
        title: String,
        center: Boolean
    }
}
</script>
<style>
.title {
    cursor: default;
    height: 32px;
    line-height: 32px;
}
.center {
    text-align: center;
}
</style>
