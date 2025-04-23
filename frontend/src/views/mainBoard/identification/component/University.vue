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
            <div
                class="itemLabel"
                v-for="tag in data.honorTags"
                :key="tag"
            >
                {{ tag }}
            </div>
            <hr class="line" />
            <div
                v-if="data.imageUrls.length !== 0"
                class="flex-row detail-title"
            >
                <div class="icon"><ion-icon name="logo-instagram"></ion-icon></div>
                <Title>学校风景</Title>
            </div>
            <ScrollImage
                v-if="data.imageUrls.length !== 0"
                :imageUrls="data.imageUrls"
            />
            <br v-if="data.imageUrls.length !== 0" />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="call-outline"></ion-icon></div>
                <Title>学校信息</Title>
            </div>
            <div
                class="flex-row public-info-list detail-content"
                style="justify-content: left; flex-flow: row wrap"
            >
                <div
                    class="flex-row"
                    v-for="keyItem in Object.keys(universityInfo)"
                    :key="keyItem"
                >
                    <span class="detail-key">{{ keyItem }}:</span>
                    <span
                        class="detail-value"
                        style="font-size: 14px"
                        v-if="Array.isArray(universityInfo[keyItem])"
                    >
                        <span
                            v-for="(item, index) in universityInfo[keyItem]"
                            :key="index"
                        >
                            {{ item }};
                        </span>
                    </span>
                    <span
                        style="font-size: 14px"
                        v-else
                        >{{ universityInfo[keyItem] }}</span
                    >
                </div>
            </div>
            <br />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="pricetag-outline"></ion-icon></div>
                <Title>饮食条件</Title>
            </div>
            <div class="detail-content">
                <p
                    v-for="(item, index) in data.living_condition"
                    :key="index"
                >
                    {{ item.canteen }}
                </p>
            </div>
            <br />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="pricetag-outline"></ion-icon></div>
                <Title>住宿条件</Title>
            </div>
            <div class="detail-content">
                <p
                    v-for="(item, index) in data.living_condition"
                    :key="index"
                >
                    {{ item.domitory }}
                </p>
            </div>
            <br />
            <div
                v-if="lcImgUrls.length !== 0"
                class="flex-row detail-title"
            >
                <div class="icon"><ion-icon name="logo-instagram"></ion-icon></div>
                <Title>生活环境风景</Title>
            </div>
            <ScrollImage
                v-if="lcImgUrls.length !== 0"
                :imageUrls="lcImgUrls"
            />
            <br v-if="lcImgUrls.length !== 0" />
            <div
                v-if="JSON.stringify(data.recommend) !== '{}'"
                class="flex-row detail-title"
            >
                <div class="icon"><ion-icon name="pricetag-outline"></ion-icon></div>
                <Title>专业详情</Title>
            </div>
            <MessageList
                v-if="JSON.stringify(data.recommend) !== '{}'"
                style="width: 100%"
                bigIcon="recording-outline"
                :messageDict="data.recommend"
                :headers="['主类别', '子类别', '专业']"
                :colWidth="[15, 30, 55]"
                nodel
                nocursor
            ></MessageList>
            <br v-if="JSON.stringify(data.recommend) !== '{}'" />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="pricetag-outline"></ion-icon></div>
                <Title>学校简介</Title>
            </div>
            <div class="detail-content">
                <p
                    v-for="text in data.intro"
                    :key="text"
                >
                    {{ text }}
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
            <Board style="padding: 20px">
                <Title>{{ '相关概念图云' }}</Title>
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
            <br />
            <Board style="padding: 20px">
                <Title title="基本信息"></Title>
                <hr class="line" />
                <div
                    class="flex-row info-list"
                    style="justify-content: left; flex-flow: row wrap"
                >
                    <div
                        class="flex-row-left"
                        style="width: 100%"
                        v-for="keyItem in Object.keys(data.educationInfo)"
                        :key="keyItem"
                    >
                        <span>{{ keyItem }}</span>
                        <span
                            v-if="typeof data.educationInfo[keyItem] === 'string'"
                            style="font-size: 14px"
                        >
                            {{ data.educationInfo[keyItem] }}个
                        </span>
                        <span
                            v-else
                            style="font-size: 14px"
                            v-for="subKey in Object.keys(data.educationInfo[keyItem])"
                            :key="subKey"
                        >
                            <span>
                                <b>{{ subKey }}:</b>
                            </span>
                            <span> {{ data.educationInfo[keyItem][subKey] }} {{ data.educationInfo[keyItem][subKey] === '--' ? '' : '个' }} </span>
                        </span>
                    </div>
                </div>
            </Board>
            <br />
            <Board style="padding: 20px">
                <Title title="排名信息"></Title>
                <hr class="line" />
                <div
                    class="flex-row info-list"
                    style="justify-content: left; flex-flow: row wrap"
                >
                    <div
                        class="flex-row-left"
                        style="width: 100%"
                        v-for="keyItem in Object.keys(data.rankInfo)"
                        :key="keyItem"
                    >
                        <span>{{ keyItem }}</span>
                        <span>{{ data.rankInfo[keyItem] }}名</span>
                    </div>
                </div>
            </Board>
        </div>
    </div>
</template>
<script>
import { queryEntity } from '@/api/entity'
import ScrollImage from './scrollImage.vue'
import Review from './Review.vue'
import { star } from '@/api/user'
export default {
    components: {
        ScrollImage,
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
                educationInfo: {},
                establishTime: '',
                honorTags: [],
                imageUrls: [],
                intro: [],
                officialEmail: '',
                officialPhoneNumber: [],
                officialWebsite: [],
                rankInfo: []
            },
            isStar: false
        }
    },
    computed: {
        isEmpty() {
            return this.data.name === ''
        },
        universityInfo() {
            return {
                官方电话: this.data.officialPhoneNumber,
                官方网站: this.data.officialWebsite,
                官方邮箱: this.data.officialEmail.split('：')[1]
            }
        },
        lcImgUrls() {
            return JSON.parse(this.data.living_condition[0].imageUrls)
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
            })
            .catch((error) => {
                this.$store.commit('prompt/trigger', {
                    msg: error,
                    level: 'warning'
                })
                setTimeout(() => {
                    this.$router.push({
                        name: 'identification'
                    })
                }, 2000)
            })
    }
}
</script>
