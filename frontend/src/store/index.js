import { createStore } from 'vuex'
import GlobalPrompt from './modules/globalPrompt.js'
import UserInfo from './modules/userInfo.js'
import Tree from './modules/tree.js'
import Menu from './modules/menu.js'
import Identification from './modules/Identification.js'
import Interest from './modules/interest.js'
export default createStore({
    modules: {
        tree: Tree,
        prompt: GlobalPrompt,
        userInfo: UserInfo,
        menu: Menu,
        identification: Identification,
        interest: Interest
    }
})
