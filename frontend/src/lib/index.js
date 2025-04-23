/**
 * 注册一个组件，你需要先引入你的组件
 * 然后加入到installList中
 */
// datavision
import LinkText from './package/datavision/LinkText.vue'
import MessageList from './package/datavision/MessageList.vue'
import RelationGraph from './package/datavision/relationGraph/RelationGraph.vue'
import lineChart from './package/datavision/lineChart/lineChart.vue'
import Table from './package/datavision/Table.vue'
// interaction
import AnswerBoard from './package/interaction/AnswerBoard.vue'
import Button from './package/interaction/Button.vue'
import ChatBoard from './package/interaction/ChatBoard.vue'
import EmptyHint from './package/interaction/EmptyHint.vue'
import InfoForm from './package/interaction/InfoForm.vue'
import Input from './package/interaction/Input.vue'
import Option from './package/interaction/Option.vue'
import PromptBox from './package/interaction/PromptBox.vue'
// layout
import CardGroup from './package/layout/cardGroup/CardGroup.vue'
import Card from './package/layout/cardGroup/Card.vue'
import Board from './package/layout/Board.vue'
import PopFrame from './package/layout/PopFrame.vue'
import Title from './package/layout/Title.vue'
// menu
import MenuItem from './package/menu/MenuItem.vue'
// transition
import Loading from './package/transition/Loading.vue'
const installDict = {
    datavision: [
        LinkText,
        MessageList,
        RelationGraph,
        lineChart,
        Table
    ],
    interaction: [
        AnswerBoard,
        Button,
        ChatBoard,
        EmptyHint,
        InfoForm,
        Input,
        Option,
        PromptBox
    ],
    layout: [
        CardGroup,
        Card,
        Board,
        PopFrame,
        Title
    ],
    menu: [
        MenuItem
    ],
    transition: [
        Loading
    ]
}

export default {
    install (vue) {
        const installList = [].concat(...Object.values(installDict))
        installList.forEach(e => vue.component(e.name, e))
    }
}
