<template>
    <ul
        class="select"
        @mouseenter="openOption"
        @mouseleave="closeOption"
    >
        <MenuItem class="selected" noShade>
            {{ selected }}
        </MenuItem>
        <li
            ref="option"
            class="option"
        >
            <MenuItem
                v-for="item in data"
                :key="item"
                @click="handleOptionClick(item)"
                Static
            >
                {{ item }}
            </MenuItem>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'Option',
    props: {
        data: Array,
        default: String
    },
    data() {
        return {
            selected: 'default',
            open: false
        }
    },
    methods: {
        openOption() {
            this.open = !this.open
            if (this.open) {
                this.$refs.option.style.display = 'block'
            } else {
                this.$refs.option.style.display = 'none'
            }
        },
        handleOptionClick(item) {
            this.selected = item
            this.openOption()
            this.$emit('choice', this.selected)
        },
        closeOption() {
            if (this.open) {
                this.openOption()
            }
        }
    },
    created() {
        this.selected = this.default
    },
    watch: {
        default() {
            this.selected = this.default
        }
    }
}
</script>
<style>
.select {
    cursor: pointer;
    position: relative;
    display: inline-block;
    width: 150px;
    height: 48px;
    text-align: center;
    text-transform: uppercase;
}
.selected {
    width: 100%;
    height: 48px;
    line-height: 48px;
    border-radius: 4px;
}
.option {
    z-index: 100;
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, 0);
    display: none;
    width: 100%;
    height: 48px;
    animation: slide-from-top 0.25s linear forwards;
}
.option > * {
    cursor: pointer;
    height: 32px;
    line-height: 32px;
}

@keyframes slide-from-top {
    0% {
        opacity: 0;
        transform: translate(-50%, -100%);
    }
    80% {
        opacity: 0.2;
    }
    100% {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}
</style>
