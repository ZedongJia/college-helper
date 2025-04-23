<template>
    <component
        :is="getComponent"
        :name="name"
        :label="label"
        :browse_id="browse_id"
    ></component>
</template>
<script>
import './style/detail.css'
import Lemma from './component/Lemma.vue'
import University from './component/University.vue'
import Major from './component/Major.vue'
import { addBrowseInfo } from '@/api/user.js'
export default {
    props: {
        name: String,
        label: String
    },
    data() {
        return {
            browse_id: ''
        }
    },
    computed: {
        getComponent() {
            switch (this.label) {
                case 'person':
                case 'main_branch':
                case 'sub_branch':
                case 'special':
                    return 'lemma'
                default:
                    return this.label
            }
        }
    },
    components: {
        lemma: Lemma,
        university: University,
        major: Major
    },
    created() {
        // record
        if (!this.$route.query.noRecord) {
            addBrowseInfo({
                type: '实体查询',
                content: this.name + '-' + this.label
            }).then((id) => {
                this.browse_id = id
            })
        } else {
            if (this.$route.query.browse_id !== undefined) {
                this.browse_id = this.$route.query.browse_id
            } else {
                this.browse_id = '-1'
            }
        }
    }
}
</script>
