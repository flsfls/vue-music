var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function(req, res) {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})

apiRoutes.get('/lyric', function(req, res) {
    let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

    axios.get(url, {
      headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response)=>{
      let ret = response.data
      if (typeof ret === 'string') {
        let reg = /^\w+\(({[^()]+})\)$/
        let matches = ret.match(reg)
        if (matches) {
          ret = JSON.parse(matches[1])
        }
      }
      res.json(ret)
    }).catch((e)=>{
      console.log(e)
    })
})

apiRoutes.get('/getSongList', function(req, res) {
  let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    var ret = response.data
    if (typeof(ret) === 'string') {
      ret = JSON.parse(ret.substring(21, ret.length -1 ))
    }
    res.json(ret)
  }).catch((e)=>{
    console.log(e)
  })
})

apiRoutes.post('/getMusicuUrl', function(req, res) {
  let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  axios.post(url, req.query, {
    headers: {
      referer: 'https://u.y.qq.com/',
      host: 'u.y.qq.com'
    }
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

// const uri = 'http://192.168.1.101:' + port

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})