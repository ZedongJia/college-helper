<template>
    <NavBar></NavBar>
    <div id="main">
        <Menu :data="menuData"></Menu>
        <div id="view">
            <RouteNav></RouteNav>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import NavBar from '@/components/nav/NavBar.vue'
import Menu from '@/components/Menu.vue'
import RouteNav from '@/components/RouteNav.vue'
import { mapState } from 'vuex'
export default {
    components: {
        NavBar,
        Menu,
        RouteNav
    },
    computed: {
        ...mapState({
            menuData: (state) => state.menu.menuList,
            showMenu: (state) => state.menu.showMenu
        })
    }
}
</script>
<style>
#main {
    position: relative;
    padding-bottom: 32px;
    display: flex;
    flex-flow: row nowrap;
    overflow-x: hidden;
}
#main > * {
    transition: 0.5s;
}
#main > :nth-child(1) {
    flex: 0 0 15%;
}
#main > :nth-child(2) {
    flex: 0 0 85%;
    padding: 0 20px 0 20px;
    color: var(--font-color);
}
</style>
