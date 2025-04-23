<template>
    <div style="transform: scale(0.5);">
        <div class="toggle-switch">
            <label class="switch-label">
                <input
                    type="checkbox"
                    class="checkbox"
                    v-model="check"
                />
                <span class="slider"></span>
            </label>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ThemeCheck',
    props: {
        modelValue: Boolean
    },
    data() {
        return {
            check: this.modelValue
        }
    },
    watch: {
        check() {
            this.$emit('update:modelValue', this.check)
        }
    }
}
</script>
<style scoped>
.toggle-switch {
    position: relative;
    width: 100px;
    height: 50px;
}

.switch-label {
    position: absolute;
    width: 100%;
    height: 50px;
    background-color: var(--font-color);
    border-radius: 25px;
    cursor: pointer;
    border: 3px solid var(--font-color);
}

.checkbox {
    position: absolute;
    display: none;
}

.slider {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    -webkit-transition: 0.3s;
    transition: 0.3s;
}

.checkbox:checked ~ .slider {
    background-color: var(--bg-color);
}

.slider::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    -webkit-box-shadow: inset 12px -4px 0px 0px var(--bg-color);
    box-shadow: inset 12px -4px 0px 0px var(--bg-color);
    background-color: var(--font-color);
    -webkit-transition: 0.3s;
    transition: 0.3s;
}

.checkbox:checked ~ .slider::before {
    -webkit-transform: translateX(50px);
    -ms-transform: translateX(50px);
    transform: translateX(50px);
    -webkit-box-shadow: none;
    box-shadow: none;
}
</style>
