<template>
    <div class="frame fade-in">
        <Title
            v-if="title !== ''"
            class="input-title"
        >
            {{ title }}
        </Title>
        <div
            class="input-box"
            v-for="input in inputs"
            :key="input"
        >
            <form
                class="flex-row-left form-box"
                :id="input.symbol"
                v-if="input.options !== undefined"
            >
                <span class="form-title">{{ input.title }}</span>
                <label
                    class="flex-row-center"
                    v-for="option, index in input.options"
                    :key="option"
                >
                    <input
                        type="radio"
                        name="check"
                        :checked="input.labels[index] === input.value"
                        @change="choice(input.symbol, input.labels[index])"
                    />
                    {{ option }}
                </label>
            </form>
            <div
                class="flex-row-left file-box"
                v-else-if="input.type === 'file'"
            >
                <span class="file-label">{{ input.title }}</span>
                <input
                    :id="input.symbol"
                    :type="input.type"
                    :accept="input.accept"
                />
            </div>
            <div
                class="flex-row"
                v-else-if="input.type === 'valid'"
            >
                <Input
                    :title="input.title"
                    type="text"
                    v-model="inputsF[input.symbol]"
                />
                <Button
                    @clickIt="send(this, input.callback)"
                    :disabled="notAllowed"
                    >{{ sendPrompt }}</Button
                >
            </div>
            <Input
                v-else
                :icon="input.icon"
                :title="input.title"
                :type="input.type"
                v-model="inputsF[input.symbol]"
            />
            <span
                :id="'id_' + input.symbol"
                class="error-prompt"
            ></span>
        </div>
        <Button
            style="margin-top: 32px; flex: 0 0 180px"
            @clickIt="handleClick"
            >提交</Button
        >
        <div class="tip">
            <slot name="tip"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'InfoForm',
    props: {
        title: {
            type: String,
            default: ''
        },
        inputs: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            inputsF: {},
            checkBox: [],
            fileBox: [],
            sendPrompt: '点击发送',
            notAllowed: false
        }
    },
    methods: {
        send(e, callback) {
            this.sendPrompt = '已发送'
            this.notAllowed = true
            let count = 60
            const wait = setInterval(() => {
                this.sendPrompt = count
                count -= 1
                if (count === 0) {
                    clearInterval(wait)
                    this.sendPrompt = '点击发送'
                    this.notAllowed = false
                }
            }, 1000)
            callback(this.inputsF.account)
        },
        handleClick() {
            // deal form
            this.decodeFile()
            this.$emit('receive', this.inputsF)
        },
        choice(symbol, label) {
            this.inputsF[symbol] = label
        },
        decodeFile() {
            const fileNode = this.fileBox.map((e) =>
                document.querySelector('#' + e)
            )
            fileNode.forEach((e, index) => {
                this.inputsF[this.fileBox[index]] = e.files[0]
            })
        },
        loadData() {
            for (let i = 0; i < this.inputs.length; i++) {
                const value =
                    this.inputs[i].value === undefined
                        ? ''
                        : this.inputs[i].value
                this.inputsF[this.inputs[i].symbol] = value
                if (this.inputs[i].type === 'checkbox') {
                    this.checkBox.push(this.inputs[i].symbol)
                }
                if (this.inputs[i].type === 'file') {
                    this.fileBox.push(this.inputs[i].symbol)
                }
            }
        }
    },
    mounted() {
        this.loadData()
    },
    watch: {
        inputs: {
            handler() {
                this.loadData()
            },
            deep: true
        }
    }
}
</script>
<style>
.frame {
    padding: 32px 0;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
}

.frame > * {
    flex: 0 0 100%;
}
/* title */
.input-title {
    margin-bottom: 32px;
    font-size: 26px;
    text-align: center;
}

.input-box {
    margin-top: 32px;
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
}

.form-box {
    width: 100%;
    height: 64px;
    color: var(--item-bg-color);
    border-bottom: 2px solid var(--item-bg-color);
}

.form-box .form-title {
    margin: 0 5px;
    font-weight: bold;
    font-size: 16px;
}

/* 表单样式 */
.file-box {
    width: 100%;
    color: var(--item-bg-color);
}
.file-box .file-label {
    pointer-events: none;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 96px;
    line-height: 48px;
    color: var(--item-bg-color);
    transition: all ease 0.5s;
}

.file-box input[type='file'] {
    font-weight: bold;
}

.file-box input[type='file']::file-selector-button {
    cursor: pointer;
    overflow: hidden;
    text-align: center;
    min-width: 120px;
    margin-right: 2em;
    height: 48px;
    line-height: 48px;
    font-weight: bold;
    transition: 0.4s;
    color: var(--item-font-color);
    background-color: var(--item-bg-color);
    border-radius: 5px;
    border: none;
}

.file-box input[type='file']::file-selector-button:hover {
    color: var(--item-font-rev-color);
    background-color: var(--item-bg-rev-color);
}

.tip {
    margin: 5px 0;
    text-align: center;
}

.warning-text {
    margin: 0 auto;
    width: 80%;
    font-size: 18px;
    font-weight: bold;
    color: red;
}

.error-prompt {
    z-index: 200;
    position: absolute;
    top: -30px;
    right: 0;
    padding: 10px 0;
    min-width: 1px;
    height: 20px;
    font-size: 12px;
    color: red;
}
</style>
