<template>
  <div id="singer">
    singer
  </div>
</template>

<script>  
import { getSingers } from 'api/singer'
import Singer from 'common/js/singer'

const HOT_NAME = '热门'
const hot_length = 10

export default {
  data() {
    return {
      singerList: []
    }
  },
  created() {
    this._getSingers()
  },
  methods: {
    _getSingers() {
      getSingers().then((res) => {
       const list = this.handData(res.data.list)
       console.log(list)
      })
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
          map.hot.items.push(new Singer({ id: item.Fsinger_id, name: item.Fsinger_name }))
        }

        if (!map[item.Findex]) {
          map[item.Findex] = {
            'title': item.Findex,
            items: []
          }
        }
        map[item.Findex].items.push(new Singer({ id: item.Fsinger_id, name: item.Fsinger_name }))
      })

      const hot = []
      const ret = []

      //把对象汇总成数组
      for (let k in map) {
        let val = map[k]
        if(val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if(val.title === HOT_NAME) {
          hot.push(val)
        }
      }

      //把ret数组按字母顺序排序
      ret.sort((a,b)=>{
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })

      return hot.concat(ret)
    }
  }
}
</script>
  
<style>

</style>
