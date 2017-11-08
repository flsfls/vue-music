import { commonParams, options } from './config.js'
import jsonp from 'common/js/jsonp.js'
import axios from 'axios'

export function getRecommend() {
    let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    let data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return jsonp(url, data, options)
}

// export function getDiscList() {
//     var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
//     let data = Object.assign({}, commonParams, {
//       platform: 'yqq',
//       hostUin: 0,
//       sin: 0,
//       ein: 29,
//       sortId: 5,
//       needNewCode: 0,
//       categoryId: 10000000,
//       rnd: Math.random()
//     })
//     return jsonp(url, data, options)
// }

export function getDiscList() {
  const url = '/api/getDiscList'
  let data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res)=> {
    return Promise.resolve(res.data)
  })
}
