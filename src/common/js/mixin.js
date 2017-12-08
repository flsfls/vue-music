import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')

    }
  }
}

export const playerMixin = {
  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList'
    ]),
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    }
  },
  methods: {
    ...mapMutations({
      'setFullScreen': 'SET_FULL_SCREEN',
      'setPLAYINGSTATE': 'SET_PLAYING_STATE',
      'setCURRENTINDEX': 'SET_CURRENT_INDEX',
      'setPLAYMODE': 'SET_PLAY_MODE',
      'setPLAYLIST': 'SET_PLAYLIST'
    }),
    changeMode() {
      let mode = (this.mode + 1) % 3
      this.setPLAYMODE(mode)

      let list = null
      if (mode === playMode.random) {
        //执行洗牌函数
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrent(list)
      this.setPLAYLIST(list)
    },
    resetCurrent(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCURRENTINDEX(index)
    }
  }
}

export const searchMixin = {
  data() {
    return {
      query: ''
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ]),
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    onQueryChange(query) {
      this.query = query
    },
    blurScroll() {
      this.$refs.searchBox.blur()
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
  }
}
