<template>
    <div
        :class="{
            normal: true,
            static: Static,
            dynamic: Dynamic,
            shade: !noShade
        }"
    >
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'MenuItem',
    props: {
        Static: Boolean,
        Dynamic: Boolean,
        noShade: Boolean
    }
}
</script>
<style>
.normal {
    background-color: var(--item-bg-color);
    color: var(--item-font-color);
    border-radius: 2px;
    transition: 0.5s;
    overflow: hidden;
}
.shade {
    box-shadow: 0 1px 4px 0.5px var(--shade-color);
}
.dynamic:hover {
    transform: translate(10%, 0);
    background-color: var(--item-bg-rev-color);
    color: var(--item-font-rev-color);
}
.static:hover {
    background-color: var(--item-bg-rev-color);
    color: var(--item-font-rev-color);
}
</style>
