<template>
    <div class="wrapper fade-in">
        <Board>
            <Title title="输入问题:"></Title>
        </Board>
        <Board>
            <div class="flex-row-center">
                <input
                    class="inputItem"
                    style="width: 70%"
                    v-model="searchQuestion"
                    placeholder="Enter Text..."
                />&nbsp;
                <Button
                    @clickIt="performSearch"
                    style="width: 15%"
                >
                    提交
                </Button>
            </div>
            <!-- 热门搜索 -->
            <div class="hotLinks">
                <p>
                    热门搜索:
                    <a
                        class="itemLink"
                        v-for="itemLink in hotLinks"
                        :key="itemLink"
                        @click="linkQuestion(itemLink.name)"
                    >
                        {{ itemLink.name }}
                    </a>
                </p>
            </div>
        </Board>
        <br />
        <div class="flex-row-between" style="align-items: start;">
            <div style="flex: 0 0 45%;">
                <Board>
                    <Title title="答案："></Title>
                </Board>
                <AnswerBoard
                    :isLoading="isLoading"
                    isShow="true"
                    :data="answer"
                >
                </AnswerBoard>
            </div>
            <div style="flex: 0 0 50%;">
                <Board>
                    <Title title="图谱显示："></Title>
                </Board>
                <RelationGraph
                    :isLoading="isLoading"
                    :data="data"
                    :link="link"
                    isDraggable
                    isAnimation
                >
                </RelationGraph>
            </div>
        </div>
    </div>
</template>
<script>
import { loading } from '@/utils/callback'

export default {
    data() {
        return {
            entity: '',
            data: [],
            link: [],
            hotLinks: [
                { id: 0, name: '崇明县适合种植什么植物？' },
                { id: 1, name: '胡萝卜汁含有哪些营养成分?' },
                { id: 2, name: '中国首都的天气类型是什么？' }
            ],
            searchQuestion: '',
            isLoading: false,
            answer: ''
        }
    },
    methods: {
        performSearch() {
            // todo
            // 判断问题不为空
            // 像后端发送数据
            this.isLoading = true

            // waiting for data
            loading(() => {
                this.isLoading = false
                this.data = []
                this.link = []
            })
        },
        linkQuestion(name) {
            // todo
            this.searchQuestion = name
            this.performSearch()
        }
    },
    created() {
        // 向后端请求，得到data，link
        this.data = [
            { name: '张三', symbolSize: 20, c: 1 },
            { name: '李四', symbolSize: 30, c: 1 },
            { name: '王五', symbolSize: 40, c: 1 },
            { name: '赵六', symbolSize: 30, c: 1 },
            { name: '小七', symbalSize: 40, c: 1 },
            { name: '小明', symbolSize: 30, c: 0 },
            { name: '小红', symbalSize: 40, c: 0 }
        ]
        this.link = [
            { source: '张三', target: '李四', label: '朋友' },
            { source: '李四', target: '王五', label: '同事' },
            { source: '王五', target: '小七', label: '同学' },
            { source: '张三', target: '小明', label: '朋友' },
            { source: '小明', target: '小红', label: '同事' },
            { source: '小红', target: '小七', label: '同学' }
        ]
    }
}
</script>

<style>
/* 热门搜索 */
.hotLinks {
    margin-left: 7%;
    margin-top: 1%;
    color: var(--headline-color);
    font-size: 10px;
}

.itemLink {
    margin-left: 1%;
    color: orange;
    transition: 0.5s;
}
.itemLink:hover {
    color: var(--item-bg-color);
    font-size: 18px;
    cursor: pointer;
    transition: 0.5s;
}
</style>
