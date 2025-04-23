<template>
    <transition-group
        tag="ul"
        name="list"
        :class="{ list: true, nocursor: nocursor }"
    >
        <span
            class="group"
            v-for="group in Object.keys(messageDict)"
            :key="group"
        >
            <div class="group-block flex-row-left">
                <span class="icon"
                    ><ion-icon
                        style="transform: scale(2)"
                        :name="bigIcon"
                    ></ion-icon
                ></span>
                <span> {{ group }} </span>
            </div>
            <br />
            <div class="group-item">
                <li class="flex-row header">
                    <span
                        v-for="(v, index) in headers"
                        :key="v"
                        :style="'flex: 0 0 ' + colWidth[index] + '%;'"
                    >
                        {{ v }}
                    </span>
                </li>
                <li
                    class="flex-row"
                    v-for="(item, index) in Object.values(messageDict[group])"
                    :key="item"
                    @click="query(group, index)"
                >
                    <span
                        v-for="(v, index) in Object.values(item)"
                        :key="v"
                        :style="'flex: 0 0 ' + colWidth[index] + '%;'"
                        class="flex-row-left"
                    >
                        <span
                            v-if="!!v.img || !!v.icon"
                            class="prefix"
                            ><img
                                v-if="!!v.img"
                                style="width: 32px; height: 32px; border-radius: 50%"
                                :src="v.img"
                                alt=""
                            />
                            <ion-icon
                                v-if="!!v.icon"
                                style="transform: scale(1.5)"
                                name="person-outline"
                            ></ion-icon>
                        </span>
                        <span>{{ !!v.content ? v.content : v }}</span>
                    </span>
                    <Button
                        v-if="!nodel"
                        @clickIt="del(group, index)"
                        warn
                        >Delete<i>!</i></Button
                    >
                    <i class="hover-fill"></i>
                </li>
            </div>
        </span>
    </transition-group>
</template>
<script>
export default {
    name: 'MessageList',
    props: {
        bigIcon: {
            type: String,
            default: 'stats-chart-outline'
        },
        messageDict: Object,
        colWidth: Array,
        headers: Array,
        nodel: Boolean,
        nocursor: Boolean
    },
    methods: {
        query(group, index) {
            this.$emit('query', group, index)
        },
        del(group, index) {
            this.$emit('del', group, index)
        }
    }
}
</script>
<style>
.list::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: var(--bg-color);
}

.list::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: var(--item-bg-color);
}

.list::-webkit-scrollbar-button {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: var(--item-bg-color);
}

.list {
    max-height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
}

.list .group {
    display: block;
    margin-bottom: 1em;
}

.list li {
    z-index: 1;
    position: relative;
    overflow: hidden;
}
.list li > span {
    flex: 0 0 55%;
    padding: 0 1em;
    min-height: 48px;
    line-height: 48px;
    overflow: hidden;
    transition: 0.25s;
}

.list li:hover span,
.list li:hover .btn {
    cursor: pointer;
    color: var(--item-font-color);
}

.nocursor li:hover span {
    cursor: default;
}

.group-block {
    width: 100%;
    font-weight: bold;
    font-size: 18px;
    border-bottom: 2px solid grey;
}

.group-block .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
}

.group-item {
    padding: 0 32px;
}

.list .header {
    border-bottom: 1px solid grey;
}

.list .header span {
    color: grey;
    font-weight: bold;
}

.list .header:hover span {
    cursor: default;
    color: grey;
}

.list li .hover-fill {
    z-index: -100;
    pointer-events: none;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    width: 100%;
    height: 0px;
    background: var(--item-bg-color);
    border-radius: 5px;
    transition: 0.75s;
}

.list li:hover .hover-fill {
    height: 100%;
    border-radius: 5px;
}

.list .btn {
    z-index: 200;
    position: absolute;
    right: 0;
    top: 50%;
    display: none;
    transform: translate(0, -50%);
    min-width: 0;
    color: var(--font-color);
    background-color: transparent;
}

.list li:hover .btn {
    display: inline-block;
    animation: slide 0.25s ease-in-out forwards;
}

@keyframes slide {
    0% {
        opacity: 0;
        transform: translate(20%, -50%);
    }
    100% {
        opacity: 1;
        transform: translate(0, -50%);
    }
}

.list .group .prefix {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
    width: 32px;
    height: 48px;
}
</style>
