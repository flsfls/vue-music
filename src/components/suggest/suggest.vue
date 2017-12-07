<template>
  <scroll class="suggest"
          ref="suggest"
          :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll">
        <ul class="suggest-list">
            <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
      <div v-show="!hasMore && !result.length" class="no-result-wrapper">
        <no-result title="抱歉，暂无搜索结果"></no-result>
      </div>
  </scroll>
</template>

<script>
import { search } from 'api/search'
import { ERR_OK } from 'api/config'
import { filterSinger } from 'common/js/song'
import { createSong } from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'
import NoResult from 'base/no-result/no-result'



const TYPE_SINGER = 'singer'
const perpage = 20


export default {
    components: {
      Scroll,
      Loading,
      NoResult
    },
    props: {
        query: {
            type: String,
            default: ''
        },
        showSinger: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        query() {
            this._search()
        }
    },
    data() {
        return {
            result: [],
            page: 1,
            pullup: true,
            hasMore: true,
            beforeScroll: true
        }
    },
    methods: {
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ]),
        _search() {
          //解决当searchMore后, query改变后引起的冲突, 需要重置参数
          this.page = 1
          this.hasMore = true
          this.$refs.suggest.scrollTo(0, 0)

          search(this.query, this.page, this.showSinger, perpage).then(res => {
              if (res.code === ERR_OK) {
                  this.result = this.normalizeData(res.data)
                  this._checkMore(res.data.song)
              }
          })
        },
        normalizeData(data) {
            let ret = []
            if (data.zhida && data.zhida.singerid) {
                ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
            }
            return ret = ret.concat(this._normalizeSongs(data.song.list))
        },
        getIconCls(item) {
            if (item.type === TYPE_SINGER) {
                return 'icon-mine'
            } else {
                return 'icon-music'
            }
        },
        getDisplayName(item) {
            if(item.type === TYPE_SINGER) {
                return `${item.singername}`
            }else {
                return `${item.name}-${(item.singer)}`
            }
        },
        _normalizeSongs(list) {
          let ret = []
          list.forEach(item => {
            if (item.songid && item.albummid) {
              ret.push(createSong(item))
            }
          })
          return ret
        },
        searchMore() {
          if(!this.hasMore) {
            return
          }
          this.page++
          search(this.query, this.page, this.showSinger, perpage).then(res => {
              if (res.code === ERR_OK) {
                  this.result = this.result.concat(this.normalizeData(res.data))
                  this._checkMore(res.data.song)
              }
          })
        },
        _checkMore(song) {
          if(!song.list.length || (song.curnum + song.curpage * perpage) > song.tatalnum) {
            this.hasMore = false
          }
        },
        selectItem(item) {
          if(item.type === TYPE_SINGER) {
            const singer = new Singer({
              id: item.singermid,
              name: item.singername
            })
            this.$router.push({
              path: `/search/${singer.id}`
            })
            this.setSinger(singer)
          } else {
            this.insertSong({
              song: item
            })
          }
          this.$emit('select', item)
        },
        listScroll() {
          this.$emit('blurScroll')
        },
        refresh() {
          this.$refs.suggest.refresh()
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
