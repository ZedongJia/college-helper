// window.onload = () => {
//     const s = new Segmentor(document.querySelector('#injection'))
//     document.querySelector('#injection').append(...s.render(createElement))
//     addEventListener('mousemove', (e) => {
//         const body = document.querySelector('body')
//         s.move(e.clientX, e.clientY, body.clientWidth, body.clientHeight)
//     })
// }

class Segmentor {
    __MOVEPACE__ = 0.005
    SEG = [
        { size: { w: 40, h: 40 }, position: { t: 0, l: 0 }, zIndex: 20 },
        { size: { w: 60, h: 65 }, position: { t: 5, l: 15 }, zIndex: 100 },
        { size: { w: 35, h: 65 }, position: { t: 25, l: 60 }, zIndex: 20 },
        { size: { w: 35, h: 65 }, position: { t: 80, l: 10 }, zIndex: 20 }
    ]

    __reRender__ = (styleList, el) => {
        el.childNodes.forEach((e, index) => {
            e.style = styleList[index]
        })
    }

    /**
     * 渲染函数
     * @param {function(tag, attr)} h 渲染函数
     * @return {h[]}
     */
    render = (h) => {
        const { SEG, defineStyle } = this
        const segs = []
        SEG.forEach(e => {
            const div = h('div', { class: 'segment', style: defineStyle(e) })
            segs.push(div)
        })
        return segs
    }

    /**
     * 监听鼠标移动，移动segment
     * @param {Number} mouseX
     * @param {Number} mouseY
     * @param {Number} wHeight
     * @param {Number} wWidth
     * @param {Element} el
     */
    move = (mouseX, mouseY, el) => {
        const { __MOVEPACE__, SEG, __reRender__, redefineStyle } = this
        const dl = (mouseX - el.clientWidth / 2) * __MOVEPACE__
        const dt = (mouseY - el.clientHeight / 2) * __MOVEPACE__
        const styleList = SEG.map(e => {
            const newPostion = {
                l: e.position.l + dl,
                t: e.position.t + dt
            }
            return redefineStyle(e, newPostion)
        })
        __reRender__(styleList, el)
    }

    /**
    * 定义大小
    * @param {int} x
    * @param {int} y
    * @returns width: `x`vw;height:`x`vh
    */
    defineSize = (x, y) => 'width:' + x + 'vw;' + 'height:' + y + 'vh;'
    /**
     * 定义位置
     * @param {int} t top
     * @param {int} l left
     * @returns top: `t`%; left: `l`%;
     */
    definePosition = (t, l) => 'top:' + t + '%;' + 'left:' + l + '%;'
    /**
     * 定义层叠
     * @param {int} x z-index
     * @returns z-index: `x`;
     */
    defineZIndex = (x) => 'z-index:' + x + ';'
    /**
     * 定义样式
     * @param {{size, position, zIndex}} style
     */
    defineStyle = (style) => {
        const { defineSize, definePosition, defineZIndex } = this
        const { size, position, zIndex } = style
        return [
            defineSize(size.w, size.h),
            definePosition(position.t, position.l),
            defineZIndex(zIndex)
        ].join('')
    }

    redefineStyle = (style, newPosition) => {
        const { defineSize, definePosition, defineZIndex } = this
        const { size, zIndex } = style
        return [
            defineSize(size.w, size.h),
            definePosition(newPosition.t, newPosition.l),
            defineZIndex(zIndex)
        ].join('')
    }
}
export { Segmentor }
