<template>
    <div :class="{ container: true, inset: inset }">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Board',
    props: {
        inset: Boolean
    }
}
</script>
<style>
.container {
    padding: 10px;
    background-color: var(--bg-color);
    box-shadow: 0px 1px 5px var(--shade-color);
    transition: 0.25s;
}
.inset {
    padding: 0;
    box-shadow: none;
}
</style>
