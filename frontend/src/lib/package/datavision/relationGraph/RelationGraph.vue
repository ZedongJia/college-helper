<template>
    <Board
        :inset="inset"
        class="fade-in"
    >
        <Loading
            v-if="isLoading"
            fixHeight="100px"
        ></Loading>
        <EmptyHint v-if="isEmpty && !isLoading"></EmptyHint>
        <div
            v-if="!isEmpty && !isLoading"
            ref="graph"
            :style="{
                height: fixHeight,
                width: '100%'
            }"
        ></div>
    </Board>
</template>
<script>
import { generateRelationGraph } from './relationGraph.js'
import { nextTick } from 'vue'
export default {
    name: 'RelationGraph',
    props: {
        fixHeight: {
            type: String,
            default: '400px'
        },
        inset: Boolean,
        isLoading: Boolean,
        data: Array,
        link: Array,
        isDraggable: Boolean,
        isAnimation: Boolean
    },
    computed: {
        isEmpty() {
            const isEmpty =
                this.data === undefined ||
                this.data === null ||
                this.data.length === 0
            if (!isEmpty && !this.isLoading) {
                nextTick(() => {
                    generateRelationGraph(
                        this.$refs.graph,
                        this.data,
                        this.link,
                        this.isDraggable,
                        this.isAnimation
                    )
                })
            }
            return isEmpty
        }
    }
}
</script>
