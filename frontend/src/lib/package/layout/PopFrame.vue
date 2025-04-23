<template>
    <div>
        <div class="full-screen pop-frame">
            <slot></slot>
        </div>
        <div class="full-screen cover"></div>
    </div>
</template>
<script>
export default {
    name: 'PopFrame'
}
</script>
<style>
.full-screen {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
.cover {
    z-index: 100;
    opacity: 0.5;
    background-color: black;
}
.pop-frame {
    z-index: 200;
    animation: fade 0.5s forwards;
}
</style>
