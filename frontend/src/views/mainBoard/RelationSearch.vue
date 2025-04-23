<template>
    <div class="wrapper fade-in" id="toTop">
        <!-- 查询主界面 -->
        <board>
            <Title title="查询条件："></Title>
        </board>
        <board class="flex-row-center">
            <!-- 实体1 -->
            <input
                style="width: 30%"
                type="text"
                class="inputItem"
                placeholder="实体1"
                v-model="entity1"
            />
            <!-- 关系选择 -->
            <Option
                :data="options"
                :default="selectRel"
                @choice="receiveOption"
            ></Option>
            <!-- 实体2 -->
            <input
                style="width: 30%"
                type="text"
                class="inputItem"
                placeholder="实体2"
                v-model="entity2"
            />
            <!-- 按钮 -->
            <Button
                style="margin: 0 10px; padding: 0 20px"
                @clickIt="performSearch"
                id="btn"
            >
                搜索
            </Button>
        </board>
        <!-- 关系图 -->
        <br />
        <Board>
            <Title title="关系图"></Title>
        </Board>
        <RelationGraph
            :data="data"
            :link="link"
            isDraggable
            isAnimation
            :isLoading="isLoading"
        >
        </RelationGraph>
        <br />
        <Board>
            <Title title="关系图表"></Title>
        </Board>
        <Table
            :colWidth="[35, 20, 35, 10]"
            :isLoading="isLoading"
            :link="link"
            :header="['实体1', '关系', '实体2']"
            isShowButton
            ButtonName="详情"
            @detail="detail"
            disableSort
        ></Table>
    </div>
</template>
<script>
import { loading } from '@/utils/callback'
import { RelationQuery } from '@/api/entity'
import { addBrowseInfo } from '@/api/user'
// import { nextTick } from 'vue'

export default {
    data() {
        return {
            isLoading: false,
            data: [],
            link: [],
            options: ['选择关系', '属于', '拥有', '制定', '任职', '参考', '相关', '位置', '毕业'],
            map: { 选择关系: '', 属于: 'BELONG_TO', 拥有: 'HAS', 制定: 'SET', 任职: 'TEACH_IN', 参考: 'REFER', 相关: 'RELATED_TO', 位置: 'LOCATE', 毕业: 'GRADUATED_FEOM' },
            mapReverse: { BELONG_TO: '属于', HAS: '拥有', SET: '制定', TEACH_IN: '任职', REFER: '参考', RELATED_TO: '相关', LOCATE: '位置', GRADUATED_FEOM: '毕业' },
            option: '',
            entity1: '',
            entity2: '',
            noRecord: false,
            selectRel: '选择关系'
        }
    },
    methods: {
        receiveOption(option) {
            this.option = this.map[option]
        },
        performSearch() {
            console.log(this.entity1)
            console.log(this.entity2)
            console.log(this.option)
            if (this.entity1 === '' && this.entity2 === '' && this.option === '') {
                this.$store.commit('prompt/trigger', {
                    msg: '请至少输入一个实体！',
                    level: 'warning'
                })
            } else {
                // todo
                this.isLoading = true
                // waiting for data
                loading(() => {
                    RelationQuery({
                        entity1: this.entity1,
                        option: this.option,
                        entity2: this.entity2
                    }).then((response) => {
                        this.data = JSON.parse(response.data).data
                        this.link = JSON.parse(response.data).link
                        for (let i = 0; i < this.link.length; i++) {
                            const t = this.link[i].label
                            this.link[i].label = this.mapReverse[t]
                        }
                        this.isLoading = false
                    }).catch(() => {
                        this.isLoading = false
                        })
                    })
                    let content = ''
                    // 将搜索记录插入到历史记录表中
                    if (this.entity1 === '') {
                        content = this.entity2 + '-' + this.option
                    } else {
                        content = this.entity1 + '-' + this.option + '-' + this.entity2
                    }
                    addBrowseInfo({
                        type: '查关系',
                        content: content
                    })
            }
        },
        detail(item) {
            this.entity1 = item.source
            this.option = this.map[item.label]
            this.entity2 = item.target
            this.selectRel = item.label
            window.scrollTo(0, 500)
            this.performSearch()
        }
    },
    created() {
        // 向后端请求，得到data，link
        if (this.$route.query.content !== undefined) {
            this.noRecord = true
            const payload = this.$route.query.content.split('-')
            this.entity1 = payload[0]
            this.option = payload[1]
            this.entity2 = payload[2]
            if (payload[1] === '') {
                this.selectRel = '选择关系'
            } else {
                this.selectRel = this.option
            }
            this.performSearch()
        }
    }
}
</script>
