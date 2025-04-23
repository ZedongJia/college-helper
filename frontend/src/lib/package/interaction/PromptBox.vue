<template>
    <PopFrame v-if="!noConfirm">
        <Board class="prompt-box p-center">
            <Title
                :title="title"
                center
            ></Title>
            <br />
            <div class="flex-row-evenly">
                <Button @clickIt="confirm"> 确定 </Button>
                <Button @clickIt="back"> 取消 </Button>
            </div>
        </Board>
    </PopFrame>
    <Board
        v-else
        :class="{
            'prompt-box': true,
            'p-top': true,
            info: level === 'info',
            warning: level === 'warning',
            attention: level === 'attention'
        }"
    >
        <Title
            :title="title"
            center
        ></Title>
    </Board>
</template>
<script>
export default {
    name: 'PromptBox',
    props: {
        title: String,
        noConfirm: Boolean,
        isShow: Boolean,
        level: {
            type: String,
            default: 'info'
        }
    },
    methods: {
        confirm(e) {
            this.$emit('confirm', e)
        },
        back(e) {
            this.$emit('back', e)
        },
        switchState() {
            if (this.isShow) {
                const node = document.querySelector('.prompt-box.p-top')
                if (node === undefined) {
                    return
                }
                node.style.display = 'block'
                setTimeout(() => {
                    node.style.opacity = 1
                    node.style.top = '10%'
                }, 100)
            } else {
                const node = document.querySelector('.prompt-box.p-top')
                if (node === undefined) {
                    return
                }
                node.style.opacity = 0
                node.style.top = '-10%'
                setTimeout(() => {
                    node.style.display = 'none'
                }, 100)
            }
        }
    },
    watch: {
        isShow() {
            this.switchState()
        }
    },
    mounted() {
        this.switchState()
    }
}
</script>
<style scoped>
.prompt-box {
    z-index: 1000;
    position: fixed;
    padding: 16px 0;
    width: 300px;
    border-radius: 10px;
    box-shadow: 0 7px 10px 3px grey;
    transition: 0.25s;
}
.p-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.p-top {
    display: none;
    opacity: 0;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.info {
    background-color: rgb(66, 217, 134) !important;
}
.warning {
    background-color: rgb(255, 66, 66) !important;
}
.attention {
    background-color: rgb(245, 210, 83) !important;
}
</style>
