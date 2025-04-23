<template>
    <div class="wrapper fade-in">
        <Board>
            <Title title="查询条件: "></Title>
        </Board>
        <Board class="flex-row-center">
            <input
                class="inputItem"
                style="width: 70%"
                v-model="entity"
                placeholder="输入大学或专业名称"
            />
            <Button
                @clickIt="performSearch"
                style="width: 15%"
            >
                查询
            </Button>
        </Board>
        <br />
        <Board>
            <Title title="关系图"></Title>
        </Board>
        <RelationGraph
            :isLoading="isLoading"
            :data="data"
            :link="relation_link"
            isDraggable
            isAnimation
        >
        </RelationGraph>
        <br />
        <Board>
            <Title title="实体图表"></Title>
        </Board>
        <Table
            :colWidth="[40, 35, 25]"
            :isLoading="isLoading"
            :header="['实体', '类别']"
            :link="entity_link"
            isShowButton
            disableSort
            ButtonName="详情"
            @detail="detail"
        >
        </Table>
        <br />
        <Board>
            <Title title="关系图表"></Title>
        </Board>
        <div
            class="container"
            style="padding: 0"
        >
            <div class="table-unfold">
                <Table
                    :colWidth="[35, 20, 35, 10]"
                    :isLoading="isLoading"
                    :header="['实体1', '关系', '实体2']"
                    :link="relation_link"
                    disableSort
                ></Table>
            </div>
        </div>
    </div>
</template>
<script>
import { loading } from '@/utils/callback'
import { IntelligentQuery } from '@/api/entity'
import { addBrowseInfo } from '@/api/user'
export default {
    data() {
        return {
            entity: '',
            isLoading: false,
            /**
             * data: [
             *  {name: String, symbolSize: int, c:int}
             * ]
             * @summary {name是节点名字, symbolSize是节点大小, c是节点颜色}
             */
            data: [],
            relation_link: [],
            entity_link: [],
            noRecord: false
        }
    },
    methods: {
        performSearch() {
            // todo
            this.isLoading = true

            // waiting for data
            loading(() => {
                IntelligentQuery({
                    entity: this.entity
                })
                    .then((response) => {
                        const node = JSON.parse(response.data)
                        this.data = node.data
                        this.relation_link = node.relation_link
                        this.entity_link = node.entity_link
                        this.isLoading = false
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            // 添加历史记录
            if (!this.noRecord) {
                addBrowseInfo({
                    type: '大学专业智能查询',
                    content: this.entity
                })
                    .then((response) => {
                        console.log(response)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        },
        detail(item) {
            const name = item.name
            // todo
            this.$router.push({
                name: 'detailContent',
                query: {
                    name: name,
                    label: item.type
                }
            })
        }
    },
    created() {
        if (this.$route.query.content !== undefined) {
            this.noRecord = true
            const payload = this.$route.query.content.split('-')
            this.entity = payload[0]
            this.performSearch()
        }
    }
}
</script>
<style>
/* 表格样式 */
.table-unfold::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: var(--bg-color);
}
.table-unfold::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: var(--item-bg-color);
}
.table-unfold::-webkit-scrollbar-button {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: var(--item-bg-color);
}
.table-unfold {
    overflow-y: auto;
    max-height: 430px;
}
</style>
