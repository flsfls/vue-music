<template>
  <div class="recommend" ref="recommend">
    <scroll :data="discList" class="recommend-content" ref="scroll">
      <div>
        <slider v-if="recommends.length">
          <!--这里要先判断是否有数据-->
          <div v-for="item in recommends">
            <a>
              <img :src="item.picUrl" alt="" class="needsclick" @load="loadImg">
            </a>
          </div>
        </slider>
        <div class="recommend-list">
          <h2 class="list-title">热门歌单推荐</h2>
          <ul v-if="discList.length" class="list">
            <li v-for="(item, index) in discList" class="item">
              <div class="icon">
                <img :src="item.imgurl" alt="">
              </div>
              <div class="text">
                <h2 class="name">景气</h2>
                <p class="desc">意象民谣集丨来分析一下这首歌蕴藏的情思吧</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getRecommend, getDiscList } from 'api/recommend.js'
import { ERR_OK } from 'api/config'
import Slider from 'base/slider/slider'

export default {
  components: {
    Slider,
    Scroll
  },
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    setTimeout(() => {
      this._getRecommend()

    }, 4000);
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then(res => {
        this.discList = res.data.list
      })
    },
    loadImg() {
      if (!this.checkImg) {
        this.$refs.scroll.refresh()
        this.checkImg = true
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        // flex-direction: row
        // justify-content :center
        box-sizing: border-box;
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
          img
            width: 60px
            height: 60px
        .text
          font-size : $font-size-medium
          display: flex
          flex-direction: column
          flex: 1
          line-height: 20px    //少了这个
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
</style>
