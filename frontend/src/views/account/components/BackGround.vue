<script>
import { Segmentor } from '@/assets/bg/script.js'
import '@/assets/bg/style.css'
import { h } from 'vue'
export default {
    name: 'BackGround',
    data() {
        return {
            s: new Segmentor()
        }
    },
    methods: {
        moveEvent(e) {
            const el = document.querySelector('#injection')
            this.s.move(e.clientX, e.clientY, el)
        }
    },
    render() {
        return h('div', { id: 'injection' }, this.s.render(h))
    },
    mounted() {
        addEventListener('mousemove', this.moveEvent)
    },
    unmounted() {
        removeEventListener('mousemove', this.moveEvent)
    }
}
</script>
