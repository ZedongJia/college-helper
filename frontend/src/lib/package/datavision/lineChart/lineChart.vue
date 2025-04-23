<template>
    <Loading v-if="isLoading" fixHeight="100px"></Loading>
        <EmptyHint v-if="isEmpty && !isLoading"></EmptyHint>
        <div
            v-if="!isEmpty && !isLoading"
            ref="graph"
            :style="{
                height: fixHeight,
                width: '100%'
            }"
        ></div>
</template>
<script>
import { generateLineChart } from './lineChart'
import { nextTick } from 'vue'
export default {
    name: 'lineChart',
    props: {
        fixHeight: {
            type: String,
            default: '400px'
        },
        isLoading: Boolean,
        dataX: Array,
        dataY: Array
    },
    computed: {
        isEmpty() {
            const isEmpty =
                this.dataX === undefined ||
                this.dataX === null ||
                this.dataX.length === 0
            if (!isEmpty && !this.isLoading) {
                nextTick(() => {
                    generateLineChart(
                        this.$refs.graph,
                        this.dataX,
                        this.dataY
                    )
                })
            }
            return isEmpty
        }
    }
}
</script>
