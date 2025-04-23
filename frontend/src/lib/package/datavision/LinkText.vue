<script>
import { h } from 'vue'
import EmptyHint from '../interaction/EmptyHint.vue'
export default {
    name: 'LinkText',
    props: {
        text: String,
        /**
         * @summary {
         *  pos: {
         *      name: String,
         *      label: String
         *  }
         * }
         */
        entity: Object
    },
    data() {
        return {
            renderContent: []
        }
    },
    computed: {
        entityMap() {
            const mapping = {}
            const keys = Object.keys(this.entity)
            for (let i = 0; i < keys.length; i++) {
                const { name, label } = this.entity[keys[i]]
                mapping[name] = label
            }
            return mapping
        }
    },
    methods: {
        checkLinkAndReplace() {
            let lastStopPos = 0
            const keys = Object.keys(this.entity)
            keys.sort((a, b) => a - b)
            for (let i = 0; i < keys.length; i++) {
                // cut & push
                const { name } = this.entity[keys[i]]
                const startPos = Number(keys[i])
                const endPos = Number(startPos) + Number(name.length)
                this.renderContent.push(this.text.substring(lastStopPos, startPos))
                this.renderContent.push(h('a', { onclick: this.turnToDetail }, name))
                lastStopPos = endPos
            }
            if (lastStopPos < this.text.length) {
                this.renderContent.push(this.text.substring(lastStopPos, this.text.length))
            }
        },
        turnToDetail(e) {
            const name = e.target.innerHTML
            this.$router.push({
                name: 'detailContent',
                query: {
                    name: name,
                    label: this.entityMap[name]
                }
            })
        }
    },
    render() {
        if (this.renderContent.length !== 0) {
            return h(
                'div',
                { class: 'link-text' },
                this.renderContent.map((item) => item)
            )
        }
        return h(EmptyHint)
    },
    mounted() {
        this.checkLinkAndReplace()
    },
    watch: {
        text() {
            this.checkLinkAndReplace()
        }
    }
}
</script>
<style>
.link-text a {
    cursor: pointer;
    color: orangered;
    transition: 0.25s;
}
.link-text a:hover {
    color: var(--item-bg-color);
}
</style>
