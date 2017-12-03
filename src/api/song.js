import { commonParams, options } from './config.js'
import axios from 'axios'

export function getLyric(mid) {
    const url = 'api/lyric'
    let data = Object.assign({}, commonParams, {
        format:'json',
        songmid:mid,
        platform:'yqq',
        hostUin:0,
        needNewCode:0,
        categoryId:10000000,
        pcachetime: +new Date(),
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}