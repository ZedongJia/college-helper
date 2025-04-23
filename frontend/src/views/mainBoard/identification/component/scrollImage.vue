<template>
    <div
        class="detail-content"
        style="height: 400px"
    >
        <div
            class="img-to-left"
            @click="imgPointer > 0 ? (imgPointer -= 1) : (imgPointer = imageUrls.length - 1)"
        >
            <ion-icon
                style="transform: scale(2)"
                name="caret-back-circle"
            ></ion-icon>
        </div>
        <Transition
            name="img-fade"
            mode="out-in"
        >
            <img
                :src="imgShow"
                alt="该条目无图片"
                class="image"
                :key="imgShow"
            />
        </Transition>
        <div
            class="img-to-right"
            @click="imgPointer < imageUrls.length - 1 ? (imgPointer += 1) : (imgPointer = 0)"
        >
            <ion-icon
                style="transform: scale(2)"
                name="caret-forward-circle"
            ></ion-icon>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        imageUrls: Array
    },
    data() {
        return {
            imgPointer: 0
        }
    },
    computed: {
        imgShow() {
            return this.imageUrls[this.imgPointer]
        }
    }
}
</script>
