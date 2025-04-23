<template>
    <div class="wrapper fade-in">
        <Board>
            <keep-alive>
                <ChatBoard title="" :info="userInfo" AImode />
            </keep-alive>
        </Board>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo: {
                username: '小度',
                image: require('@/assets/头像.jpg')
            }
        }
    }
}
</script>
