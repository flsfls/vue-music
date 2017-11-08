<template>
  <div class="recommend">
    <slider v-if="recommends.length">
      <!--这里要先判断是否有数据-->
      <div v-for="item in recommends">
        <a >
          <img :src="item.picUrl" alt="" class="needsclick">
        </a>
      </div>
    </slider>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from 'api/recommend.js'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'

  export default {
    components: {
      Slider
    },
    data() {
      return {
        recommends: []
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend() {
        getRecommend().then(res=>{
          if(res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then(res=>{
          console.log(res)
        })
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
      .slider-wrapper
        position: relative
        width: 100%
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
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
