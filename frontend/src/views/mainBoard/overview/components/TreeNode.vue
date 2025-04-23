<template>
    <ul
        v-for="(mo, index) in model"
        :key="index"
    >
        <li>
            <!-- 当前节点 -->
            <div class="tree-node">
                <div class="tree-line"></div>
                <div
                    class="flex-row"
                    style="justify-content: left"
                >
                    <div
                        class="flex-row-center"
                        style="padding: 0 5px"
                        @click="toggle(index)"
                        v-if="isShow[index] || !isFolder(index)"
                    >
                        <ion-icon
                            style="transform: scale(1.5)"
                            name="remove-circle-outline"
                        ></ion-icon>
                    </div>
                    <div
                        class="flex-row-center"
                        style="padding: 0 5px"
                        @click="toggle(index)"
                        v-else
                    >
                        <ion-icon
                            style="transform: scale(1.5)"
                            name="add-circle-outline"
                        ></ion-icon>
                    </div>
                    <p style="cursor: default; white-space: nowrap">
                        {{ mo.name }}
                    </p>
                </div>
            </div>
            <ul v-if="isShow[index]">
                <!--
        一个可以通过其“name”选项递归渲染自己的组件，
        (如果使用单文件组件，则从文件名推断)
      -->
                <TreeNode
                    :parent="mo.name"
                    :model="mo.children"
                >
                </TreeNode>
            </ul>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        parent: String,
        model: Array
    },
    data() {
        return {
            isShow: []
        }
    },
    methods: {
        toggle(index) {
            if (this.isFolder(index)) {
                this.isShow[index] = !this.isShow[index]
            }
            if (this.isShow[index]) {
                this.$store.commit('tree/updateStack', {
                    parent: this.parent,
                    children: this.model[index].children,
                    name: this.model[index].name
                })
            }
        },
        isFolder(index) {
            return this.model[index].children !== undefined
        }
    },
    created() {
        console.log(this.model)
        for (let i = 0; i < this.model.length; i++) {
            this.isShow[i] = false
        }
    }
}
</script>
<style>
.tree-node {
    z-index: 1000;
    position: relative;
    min-width: 100px;
    height: 32px;
    line-height: 32px;
}
.tree-node ion-icon {
    cursor: pointer;
    color: var(--item-bg-color);
}
.tree-line {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-100%, -50%);
    width: 2em;
    height: 1px;
    background-color: var(--item-bg-color);
}
</style>
