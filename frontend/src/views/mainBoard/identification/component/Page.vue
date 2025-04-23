<template>
    <div class="wrapper">
        <HomePage :id="id"></HomePage>
    </div>
</template>
<script>
import HomePage from '@/components/HomePage.vue'
export default {
    props: {
        id: String
    },
    components: {
        HomePage
    }
}
</script>
