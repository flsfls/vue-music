<template>
  <scroll @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" :data="data" class="listview" ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item"
              @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
      <ul>
        <li v-for="(item, index) in shortcutList" class="item" :data-index="index" :class="{'current':currentIndex===index}">{{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getData } from 'common/js/dom'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30


export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: 0,
      diff: 0
    }
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.probeType = 3
    this.listGroupHeight = []
  },
  computed: {
    shortcutList() {
      return this.data.map(item => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  watch: {
    data(val) {
      //这里很重要，如果没有定时器，执行_caculateHeight就会因为加载不了dom而报错
      setTimeout(() => {
        this._caculateHeight()
      }, 20);
    },
    scrollY(newY) {
      const listGroupHeight = this.listGroupHeight

      //顶部
      if (newY > 0) {
        this.currentIndex = 0
        return
      }

      for (let i = 0; i < listGroupHeight.length - 1; i++) {
        let height1 = listGroupHeight[i]
        let height2 = listGroupHeight[i + 1]

        //中间
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i;

          this.diff = height2 + newY;

          return
        }

      }

      //底部,且大于最后一个元素的上限
      this.currentIndex = listGroupHeight.length - 2


    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0

      //避免dom多次渲染，性能优化
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')

      //记录开始滑动的pageY,为了算出touchmove的偏移
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex


      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0

      //最初index+delta, 等于偏移的锚点的索引
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta

      this._scrollTo(anchorIndex)
    },
    _scrollTo(index) {

      //点击第一个和最后一个空白处
      if (!index && index !== 0) {
        index = 0
        return
      }

      if (index < 0) {
        index = 0
      } else if (index > this.listGroupHeight - 2) {
        index = this.listGroupHeight - 2
      }
      this.scrollY = -this.listGroupHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    scroll(pos) {
      this.scrollY = pos.y

    },
    _caculateHeight() {
      this.listGroupHeight = []
      let height = 0
      const list = this.$refs.listGroup
      this.listGroupHeight.push(height)

      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listGroupHeight.push(height)
      }
    },
    selectItem(item) {
      this.$emit('select', item)
    },
    refresh() {
      this.$refs.listview.refresh()
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
