<template>
  <div class="singer" ref="singer">
    <list-view :data="singerList" @select="selectSinger" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingers } from 'api/singer'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'
import { playlistMixin } from 'common/js/mixin'


const HOT_NAME = '热门'
const hot_length = 10

export default {
  mixins: [playlistMixin],
  data() {
    return {
      singerList: []
    }
  },
  components: {
    ListView
  },
  created() {
    this._getSingers()
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    _getSingers() {
      getSingers().then((res) => {
        this.singerList = this.handData(res.data.list)
      })
    },
    selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
    handData(list) {
      let map = {
        hot: {
          'title': HOT_NAME,
          items: []
        }
      }

      list.forEach((item, index) => {
        if (index < hot_length) {
          map.hot.items.push(new Singer({ id: item.Fsinger_mid, name: item.Fsinger_name }))
        }

        if (!map[item.Findex]) {
          map[item.Findex] = {
            'title': item.Findex,
            items: []
          }
        }
        map[item.Findex].items.push(new Singer({ id: item.Fsinger_mid, name: item.Fsinger_name }))
      })

      const hot = []
      const ret = []

      //把对象汇总成数组
      for (let k in map) {
        let val = map[k]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }

      //把ret数组按字母顺序排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(ret)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer
      position: fixed
      top: 88px
      bottom: 0
      width: 100%
</style>
