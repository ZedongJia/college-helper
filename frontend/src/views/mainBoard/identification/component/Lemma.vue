<template>
    <br />
    <Loading v-if="isEmpty"></Loading>
    <div
        v-else
        class="wrapper fade-in detail-layout"
    >
        <!-- 左列 -->
        <Board style="position: relative">
            <!-- 第一部分：标题 + 词条 -->
            <!-- 页面标题 -->
            <div
                :class="{ star: !isStar, 'flex-row': true, hasStar: isStar }"
                @click="star"
            >
                <ion-icon
                    style="transform: scale(2)"
                    name="star-outline"
                ></ion-icon>
            </div>
            <br />
            <div class="flex-row detail-header">
                <div class="icon">
                    <ion-icon
                        style="transform: scale(1.5)"
                        name="pricetags-outline"
                    ></ion-icon>
                </div>
                <Title style="font-size: 32px"> {{ data.name }} </Title>
            </div>
            <br />
            <div class="itemLabel">
                {{ data.tag }}
            </div>
            <hr class="line" />
            <br />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="call-outline"></ion-icon></div>
                <Title>词条信息</Title>
            </div>
            <div
                class="flex-row detail-content"
                style="justify-content: left; flex-flow: row wrap"
            >
                <div
                    class="flex-row"
                    v-for="keyItem in Object.keys(data.infoDict)"
                    :key="keyItem"
                >
                    <span class="detail-key">{{ keyItem }}:</span>
                    <span class="detail-value">
                        <span
                            style="font-size: 14px"
                            v-if="Array.isArray(data.infoDict[keyItem])"
                        >
                            <span
                                v-for="(item, index) in data.infoDict[keyItem]"
                                :key="index"
                            >
                                {{ item }};
                            </span>
                        </span>
                        <span
                            style="font-size: 14px"
                            v-else
                            >{{ data.infoDict[keyItem] }}</span
                        >
                    </span>
                </div>
            </div>
            <br />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="pricetag-outline"></ion-icon></div>
                <Title>词条简介</Title>
            </div>
            <div class="detail-content">
                <p>
                    {{ data.intro }}
                </p>
            </div>
            <br />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="chatbox-ellipses-outline"></ion-icon></div>
                <Title>评论区</Title>
            </div>
            <div class="detail-content">
                <Review
                    :name="name"
                    :label="label"
                ></Review>
            </div>
            <br />
            <hr class="line" />
        </Board>
        <!-- 右列 -->
        <div>
            <Board
                v-if="label === 'person'"
                style="padding: 20px"
            >
                <Title title="所属院校"></Title>
                <hr class="line" />
                <div>{{ data.university.name }}</div>
            </Board>
            <br v-if="label === 'person'" />
            <Board style="padding: 20px">
                <Title>{{ label === 'person' ? '同校优秀校友、老师' : '相关概念' }}</Title>
                <hr class="line" />
                <RelationGraph
                    fixHeight="200px"
                    :data="data.related"
                    inset
                    isDraggable
                    isAnimation
                ></RelationGraph>
            </Board>
        </div>
    </div>
</template>
<script>
import { queryEntity } from '@/api/entity'
import { star } from '@/api/user'
import Review from './Review.vue'
export default {
    components: {
        Review
    },
    props: {
        name: String,
        label: String,
        browse_id: String
    },
    data() {
        return {
            data: {
                name: '',
                identity: '',
                tag: '',
                infoDict: {},
                intro: [],
                university: {},
                related: []
            },
            isStar: false
        }
    },
    computed: {
        isEmpty() {
            return this.data.name === ''
        }
    },
    methods: {
        receiveOption(option) {
            this.option = option
        },
        star() {
            if (this.isStar) {
                return
            }
            star({
                browse_id: this.browse_id,
                state: 'true'
            }).then(() => {
                this.$store.commit('prompt/trigger', {
                    msg: '收藏成功',
                    level: 'info'
                })
                this.isStar = true
            })
        }
    },
    created() {
        if (String(this.browse_id) === '-1') {
            this.isStar = true
        }
        queryEntity({
            name: this.name,
            label: this.label
        })
            .then((data) => {
                this.data = data
                // symbolSize: 0, c: 1
                if (this.label === 'person') {
                    // 是人
                    for (let i = 0; i < this.data.related.length; i++) {
                        const { name, identity } = this.data.related[i]
                        this.data.related[i] = {
                            name: name,
                            symbolSize: 30,
                            c: identity === '知名校友' ? 0 : 1,
                            identity: identity
                        }
                    }
                } else {
                    // 统一模板
                    for (let i = 0; i < this.data.related.length; i++) {
                        const { name } = this.data.related[i]
                        this.data.related[i] = {
                            name: name,
                            symbolSize: 80,
                            c: 0
                        }
                    }
                }
            })
            .catch((error) => {
                this.$store.commit('prompt/trigger', {
                    msg: error,
                    level: 'warning'
                })
            })
    }
}
</script>
