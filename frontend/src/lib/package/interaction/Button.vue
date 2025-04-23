<template>
    <button
        :class="{
            btn: true,
            disabled: disabled,
            warning: warn
        }"
        @click.stop="handleClick"
        :disabled="disabled"
    >
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'Button',
    props: {
        warn: Boolean,
        disabled: Boolean
    },
    data() {
        return {
            isClick: false
        }
    },
    methods: {
        handleClick(e) {
            // 防抖, 0.5s一次
            if (!this.isClick) {
                this.$emit('clickIt', e)
                this.isClick = true
                setTimeout(() => {
                    this.isClick = false
                }, 500)
            }
        }
    }
}
</script>
<style>
.btn {
    z-index: 1;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-align: center;
    padding: 0 8px;
    min-width: 96px;
    height: 48px;
    line-height: 48px;
    font-weight: bold;
    text-transform: uppercase;
    transition: 0.4s;
    color: var(--item-font-color);
    background-color: var(--item-bg-color);
    border-radius: 5px;
}

.btn::before {
    content: '';
    width: 0;
    height: 1000%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: var(--item-bg-rev-color);
    transition: 0.5s ease;
    display: block;
    z-index: -1;
}

.btn:hover::before {
    width: 300%;
}

.btn:hover {
    color: var(--item-font-rev-color);
}

.warning {
    background-color: rgb(255, 66, 66) !important;
}
.warning::before {
    background-color: rgb(250, 129, 129) !important;
}

.disabled {
    cursor: not-allowed;
}
</style>
