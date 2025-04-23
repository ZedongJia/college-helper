<template>
    <RouterView></RouterView>
    <BackGround></BackGround>
</template>
<script>
import './style/account.css'
import BackGround from './components/BackGround.vue'
export default {
    components: {
        BackGround
    },
    mounted() {
        if (this.$store.state.userInfo.ID !== -1) {
            this.$router.push({
                name: 'system'
            })
        }
    }
}
</script>
