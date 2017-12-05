import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config.js'
import axios from 'axios'
import qs from 'qs'


export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonp(url, data, options)
}



export function getMusicuUrl() {
  let url = 'api/getMusicuUrl'

  // let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  let date = +new Date()
  url += `?_=${date}`

  let comm = {
    "g_tk": 5381,
    "uin": 0,
    "format": "json",
    "inCharset": "utf-8",
    "outCharset": "utf-8",
    "notice": 0,
    "platform": "h5",
    "needNewCode": 1
  }
 let ids = [ 212044855,
                200519549,
                212044848,
                211992358,
                212030264,
                109717925,
                212044858,
                201534193,
                211844407,
                212046553,
                204583470,
                4933887,
                212044849,
                211249198,
                212046376,
                211996034,
                208358404,
                211991205,
                210059469,
                212039304,
                210892496,
                205358993,
                211968915,
                212044850,
                204275873,
                212034720,
                204462318,
                212051674,
                204672198,
                205127505,
                207422365,
                212002608,
                212040567,
                211997756,
                209097689,
                212045091,
                211998358,
                205648365,
                207171109,
                211891677,
                200607053,
                203695470,
                108988867,
                212046379,
                102700305,
                97745,
                105602724,
                6595300,
                212046382,
                103260015]

 let data_id = {
   "module": "track_info.UniformRuleCtrlServer",
    "method": "GetTrackInfo",
   param: {
     ids: ids,
     types: [ 0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0]
   }
 }
 let query = {
   comm,
   data_id
 }
  // const data2 = {
  //   "comm":{
  //     "g_tk":5381,
  //     "uin":0,
  //     "format":"json",
  //     "inCharset":"utf-8",
  //     "outCharset":"utf-8",
  //     "notice":0,
  //     "platform":"h5",
  //     "needNewCode":1
  //   },
  //   "data_id":{
  //     "module":"track_info.UniformRuleCtrlServer",
  //     "method":"GetTrackInfo",
  //     "param":{
  //       "ids":[212044855,200519549,212044848,211992358,212030264,109717925,212044858,201534193,211844407,212046553,204583470,4933887,212044849,211249198,212046376,211996034,208358404,211991205,210059469,212039304,210892496,205358993,211968915,212044850,204275873,212034720,204462318,212051674,204672198,205127505,207422365,212002608,212040567,211997756,209097689,212045091,211998358,205648365,207171109,211891677,200607053,203695470,108988867,212046379,102700305,97745,105602724,6595300,212046382,103260015],
  //       "types":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  //     }
  //   }
  //
  // }

  // const data = Object.assign({}, {
  //    query
  // })
  axios.defaults.withCredentials = true;
  return axios.post(url, query).then((res) => {
      return Promise.resolve(res.data)
  })

}
