<template>
  <div class="singer-detail">
    <music-list :title="title" :songs="songs" :bgImage="bgImage"></music-list>
   </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import MusicList from 'components/music-list/music-list'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  components: {
    MusicList
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    }
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSingerDetail()
    console.log(this.singer)
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this.normalizeData(res.data.list)
          console.log(this.songs)

        }
      })
    },
    normalizeData(list) {
      // debugger
      let ret = []
      list.forEach(item => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

    .singer-detail
        position: fixed
        z-index: 100
        top: 0
        left: 0
        right: 0
        bottom: 0
        background: $color-background
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>