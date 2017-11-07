import originJsonp from 'jsonp'

export default function(url, data, opt) {
    url += (url.indexOf('?') > 0 ? '&' : '?') + stringParams(data)
    return new Promise((resolve, reject) => {
        originJsonp(url, opt, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

function stringParams(data) {
    let url = ''
    for (let k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}