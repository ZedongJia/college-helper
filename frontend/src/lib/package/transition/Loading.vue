<template>
    <div
        class="flex-column-center"
        :style="{
            height: fixHeight,
            width: '100%'
        }"
        style="animation: fade 0.25s ease-in forwards"
    >
        <div class="loading"></div>
        <span style="display: flex; margin-top: 8px; font-weight: bold">
            Loading <span class="dot">...</span>
        </span>
    </div>
</template>
<script>
export default {
    name: 'Loading',
    props: {
        fixHeight: {
            type: String,
            default: '400px'
        }
    }
}
</script>
<style>
.loading {
    margin: 0 auto;
    width: 50px;
    height: calc(50px * 0.866);
    position: relative;
    transform-origin: 50% 50%;
    background: conic-gradient(
        from 120deg at 50% 64%,
        #0000,
        rgb(21, 219, 255) 1deg 120deg,
        #0000 121deg
    );
    transform-origin: 50% 50%;
    animation: sp7-0 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
}
.loading:before,
.loading:after {
    content: '';
    position: absolute;
    inset: 0;
    background: inherit;
    transform-origin: 50% 66%;
    animation: sp7-1 1.5s infinite;
}
.loading:after {
    --s: -1;
}

@keyframes sp7-0 {
    0%,
    30% {
        transform: rotate(0);
    }
    70% {
        transform: rotate(120deg);
    }
    70.01%,
    100% {
        transform: rotate(360deg);
    }
}

@keyframes sp7-1 {
    0% {
        transform: rotate(calc(var(--s, 1) * 120deg)) translate(0);
    }
    30%,
    70% {
        transform: rotate(calc(var(--s, 1) * 120deg))
            translate(calc(var(--s, 1) * -5px), 10px);
    }
    100% {
        transform: rotate(calc(var(--s, 1) * 120deg)) translate(0);
    }
}
.dot {
    /*让点垂直居中*/
    height: 1em;
    line-height: 1;
    /*让点垂直排列*/
    display: flex;
    flex-direction: column;
    /*溢出部分的点隐藏*/
    overflow: hidden;
}
.dot::before {
    /*三行三种点，需要搭配white-space:pre使用才能识别\A字符*/
    content: '...\A..\A.';
    white-space: pre-wrap;
    animation: dot 3s infinite step-end; /*step-end确保一次动画结束后直接跳到下一帧而没有过渡*/
}
@keyframes dot {
    33% {
        transform: translateY(-2em);
    }
    66% {
        transform: translateY(-1em);
    }
}
</style>
