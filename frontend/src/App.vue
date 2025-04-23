<template>
    <router-view></router-view>
    <div id="bg"></div>
    <GlobalPrompt />
</template>
<script>
import GlobalPrompt from '@/components/GlobalPrompt.vue'
export default {
    components: {
        GlobalPrompt
    }
}
</script>
<style>
#bg {
    z-index: -100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-color);
    transition: 0.5s;
}
</style>
