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
                <div
                    class="icon"
                    style="width: 64px"
                >
                    <ion-icon
                        style="transform: scale(1.5)"
                        name="pricetags-outline"
                    ></ion-icon>
                </div>
                <Title style="font-size: 32px"> {{ data.name }} </Title>
            </div>
            <br />
            <hr class="line" />
            <br />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="call-outline"></ion-icon></div>
                <Title>专业信息</Title>
            </div>
            <div
                class="flex-row detail-content"
                style="justify-content: left; flex-flow: row wrap"
            >
                <div
                    class="flex-row"
                    v-for="keyItem in Object.keys(infoDict)"
                    :key="keyItem"
                >
                    <span class="detail-key">{{ keyItem }}:</span>
                    <span class="detail-value">
                        {{ infoDict[keyItem] }}
                    </span>
                </div>
            </div>
            <br />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="pricetag-outline"></ion-icon></div>
                <Title>专业就业介绍</Title>
            </div>
            <div class="detail-content">
                <p>
                    {{ data.careerInfo }}
                </p>
            </div>
            <br />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="pricetag-outline"></ion-icon></div>
                <Title>相关大学专业推荐</Title>
            </div>
            <MessageList
                style="width: 100%"
                bigIcon="recording-outline"
                :messageDict="data.recommend"
                :headers="['主类别', '子类别', '专业']"
                :colWidth="[15, 30, 55]"
                nodel
                nocursor
            ></MessageList>
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
            <Board style="padding: 20px">
                <Title>相关概念图云</Title>
                <hr class="line" />
                <RelationGraph
                    fixHeight="200px"
                    :data="data.related"
                    :link="data.link"
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
                mainBranch: '',
                subBranch: '',
                duration: '',
                careerInfo: '',
                related: '',
                link: '',
                recommend: ''
            },
            isStar: false
        }
    },
    computed: {
        isEmpty() {
            return this.data.name === ''
        },
        infoDict() {
            return {
                主类别: this.data.mainBranch,
                子类别: this.data.subBranch,
                修读时间: this.data.duration
            }
        }
    },
    methods: {
        receiveOption(option) {
            this.option = option
        },
        turnTo() {
            // todo
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
                /**
                 *                "name": data["name"],
                "mainBranch": data["mainBranch"],
                "subBranch": data["subBranch"],
                "duration": data["duration"],
                "careerInfo": data["careerInfo"],
                "related": rel,
                 */
                this.data = data
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
