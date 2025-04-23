<template>
    <div
        class="review-write flex-row-center"
        style="flex-wrap: wrap"
    >
        <div
            class="flex-row"
            style="width: 40%"
        >
            <span class="avator">
                <img
                    :src="image"
                    alt=""
                />
            </span>
            <span
                class="review-nickname"
                style="margin-left: 1em;max-width: 100px; height: 24px; line-height: 24px"
            >
                {{ nickname }}
            </span>
        </div>
        <textarea
            style="width: 50%; height: 64px"
            class="textareaItem"
            v-model="content"
            placeholder="这里可以输入你想要发表的评论"
        ></textarea>
        <Button
            @click="send"
            style="min-width: 0; width: 10%; height: 64px"
        >
            <span class="flex-row-center"
                ><ion-icon
                    style="transform: scale(2)"
                    name="paper-plane-outline"
                ></ion-icon
            ></span>
        </Button>
    </div>
    <EmptyHint
        v-if="reviewList.length === 0"
        hint="空空如也，期待你的评论~"
    ></EmptyHint>
    <div
        v-else
        class="review-list"
    >
        <div
            v-for="r in reviewList"
            :key="r.id"
            class="review"
        >
            <div class="review-time">{{ r.time.replace('T', ' ') }}</div>
            <div class="review-content">
                <div class="flex-row avator-box">
                    <span class="avator">
                        <img
                            :src="r.image"
                            alt=""
                        />
                        <div class="avator-popover flex-column">
                            <span class="flex-column">
                                <br />
                                <h3>去他(她)的主页瞧一瞧</h3>
                                <h4 style="color: grey"><i>也许你会有别样收获</i></h4>
                                <br />
                            </span>
                            <Button
                                style="line-height: 32px; height: 32px"
                                @click="toPersonHome(r.id)"
                                >点击传送</Button
                            >
                        </div>
                    </span>
                    <span class="review-nickname flex-row">
                        <ion-icon
                            style="margin-right: 1em"
                            name="planet-outline"
                        ></ion-icon>
                        <span>{{ r.nickname }}</span>
                    </span>
                </div>
                <p style="color: black">
                    {{ r.content }}
                </p>
            </div>
            <Button
                v-if="id === r.id"
                class="review-del"
                @clickIt="del(r.review_id)"
                >删除</Button
            >
        </div>
    </div>
</template>
<script>
import { addReview, getReview, removeReview } from '@/api/review'
import { mapState } from 'vuex'

export default {
    props: {
        name: String,
        label: String
    },
    computed: {
        ...mapState({
            id: (state) => state.userInfo.ID,
            image: (state) => state.userInfo.image,
            nickname: (state) => state.userInfo.nickname
        })
    },
    data() {
        return {
            reviewList: [],
            content: ''
        }
    },
    methods: {
        queryReview() {
            getReview({
                name: this.name,
                label: this.label
            })
                .then((reviewList) => {
                    this.reviewList = reviewList
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        },
        toPersonHome(id) {
            // todo
            this.$router.push({
                name: 'page',
                query: {
                    id: id
                }
            })
        },
        send() {
            if (this.content === '') {
                // warning
                this.$store.commit('prompt/trigger', {
                    msg: '文本不能为空哦',
                    level: 'attention'
                })
            }
            // todo
            addReview({
                name: this.name,
                label: this.label,
                content: this.content
            }).then(() => {
                this.$store.commit('prompt/trigger', {
                    msg: '评论成功',
                    level: 'info'
                })
                this.queryReview()
            })
            this.content = ''
        },
        del(id) {
            removeReview({
                review_id: id
            }).then(() => {
                this.$store.commit('prompt/trigger', {
                    msg: '删除成功',
                    level: 'info'
                })
                this.queryReview()
            })
        }
    },
    created() {
        this.queryReview()
    }
}
</script>
<style>
.review-write {
    margin-bottom: 50px;
    width: 100%;
}

.review {
    margin-bottom: 50px;
    position: relative;
    width: 100%;
    border-radius: 20px;
}

.review-time {
    z-index: 1;
    position: absolute;
    right: 2em;
    top: -12px;
    padding: 0 20px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background-color: var(--item-bg-color);
    color: white;
    border-radius: 20px;
}

.review-content {
    /* edit the width to fit review */
    width: 100%;
    min-height: 68px;
    padding: 10px 20px;
    background-color: white;
    border-radius: 0 20px 0 20px;
    border-bottom: 5px solid var(--item-bg-color);
}
.review-write .avator,
.review .avator {
    position: relative;
    width: 48px;
    height: 48px;
}
.review-write .avator img,
.review .avator img {
    z-index: 200;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transition: 0.5s;
}

.review-write .avator img {
    width: 48px;
    height: 48px;
}

.review .avator:hover img {
    z-index: 400;
    width: 48px;
    height: 48px;
}

.review .avator-popover {
    z-index: 300;
    position: absolute;
    left: -100px;
    top: 24px;
    padding: 10px 5px;
    width: 250px;
    display: none;
    opacity: 0;
    border-radius: 10px;
    overflow: hidden;
}

.review .avator-popover span {
    z-index: 1;
    width: 100%;
    color: #013350;
}

.review .avator:hover .avator-popover {
    display: flex;
    animation: show 0.5s forwards;
}

.review-nickname {
    padding-left: 1em;
    overflow: hidden;
    color: var(--item-bg-color);
    border-bottom: 2px solid var(--item-bg-color);
    border-bottom-left-radius: 5px;
}

.review-content p {
    margin-left: 48px;
    padding: 10px 0;
    text-indent: 2em;
}

.avator-popover::before {
    content: '';
    position: absolute;
    width: 300px;
    background-image: linear-gradient(180deg, var(--item-bg-color), purple);
    height: 80%;
    animation: rotBGimg 3s linear infinite;
    transition: all 0.2s linear;
}

@keyframes rotBGimg {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.avator-popover::after {
    content: '';
    position: absolute;
    background: #d8d0bc;
    inset: 4px;
    border-radius: 10px;
}

.review-del {
    position: absolute;
    display: none;
    width: 64px;
    height: 32px;
    line-height: 32px;
    right: 0;
    bottom: 0;
    border-radius: 20px 0 0 0;
}

.review-del {
    display: inline-block;
    animation: show 0.5s forwards;
}
</style>
