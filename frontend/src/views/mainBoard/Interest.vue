<template>
    <div class="wrapper">
        <br />
        <div
            class="card-layout"
            id="cardOffset"
        >
            <div
                class="group"
                v-for="(list, index) in someList"
                :key="index"
            >
                <CardGroup
                    ref="CardGroup"
                    :pages="list"
                ></CardGroup>
            </div>
        </div>
        <Button
            @click="Refresh"
            class="interest-button"
        >
            <span>换一换</span>
        </Button>
        <div
            v-for="q in showQuestion"
            :key="q.id"
        >
            <br />
            <div style="margin: 0 auto; width: 90%">
                <Card
                    style="
                        max-height: 60px;
                        padding: 1em;
                        text-align: center;
                        cursor: pointer;
                    "
                    @click="turnTo(q)"
                >
                    <span>{{ q }}</span>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            Question: [
                '南开大学有什么专业',
                '天津大学 对 江西 有 什么 招生政策',
                '安徽省有什么大学',
                '北京大学有什么特色',
                '安徽省的合肥工业大学怎么样',
                '我来自山西省，我排名4235名，我想去南京大学',
                '武汉大学的食宿环境',
                '电子科技大学有什么专业',
                '复旦大学 对 河南省 有 什么 招生政策',
                '清华大学 的计算机科学与技术怎么样',
                '河北省有什么大学',
                '北京大学有什么特色',
                '中南大学怎么样'
            ],
            showQuestion: []
        }
    },
    computed: {
        ...mapGetters({
            someList: 'interest/getSomeList'
        })
    },
    mounted() {
        const all = []
        for (let i = 0; i < 3; i++) {
            let num = Math.floor(Math.random() * this.Question.length)
            while (all[num] != null) {
                num = Math.floor(Math.random() * this.Question.length)
            }
            all.push(num)
            const question = this.Question[num]
            this.showQuestion.push(question)
        }
    },
    methods: {
        Refresh() {
            const centerX =
                document.getElementById('cardOffset').clientWidth / 2 - 125
            const centerY =
                document.getElementById('cardOffset').clientHeight / 2 - 90
            this.$refs.CardGroup.forEach((child, index) => {
                child.Refresh(index, centerX, centerY)
            })
            this.$store.dispatch('interest/update')
            // 问题转换
            this.showQuestion = []
            const all = []
            for (let i = 0; i < 3; i++) {
                let num = Math.floor(Math.random() * this.Question.length)
                while (all[num] != null) {
                    num = Math.floor(Math.random() * this.Question.length)
                    console.log(num)
                }
                all.push(num)
                const question = this.Question[num]
                this.showQuestion.push(question)
            }
        },
        turnTo(q) {
            console.log(q)
            this.$router.push({
                name: 'chatAI',
                query: {
                    content: q
                }
            })
        }
    }
}
</script>
<style>
.card-layout {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
}

.card-layout > div {
    flex: 0 0 30%;
    margin-bottom: 50px;
}

.interest-button {
    position: absolute;
    top: 20px;
    right: -40px;
    min-width: 0;
    width: 40px;
    writing-mode: vertical-lr;
    align-items: center;
}

.group {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
