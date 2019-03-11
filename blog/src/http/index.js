
import {BASEURL} from "./url";

class Http {
  get(url, data = {}, loading = false, loadingText = 'Loading...') {
    return this._convertPromise(url, data, loading, loadingText)
  }

  _loading(loading = false, loadingText = 'Loading...', mask = false) {
    if (loading == true) {
      mpvue.showLoading({
        title : loadingText,
        mask : mask
      })
    }
  }

  _convertPromise(url, data = {}, type = 'GET', loading = false, loadingText = 'Loading...', mask = false) {
    url = this._convertURL(url)
    this._loading(loading, loadingText)
    return new Promise((resolve, reject) => {
      mpvue.request({
        url: url,
        data: data,
        method: type,
        success(res) {
          // console.log(res)
          if (res != undefined && res.statusCode == 200) {
            if (res.data != undefined && res.data.code == 0) {
              resolve(res.data.data)
            }else {
              reject(res.data.msg || '请求失败')
            }
          }else {
            reject(res.data)
          }
        },
        fail(err) {
          console.log('请示失败')
          reject(err)
        },
        complete() {
          wx.hideLoading()
          wx.hideToast()
        }
      })
    })
  }

  _convertURL(url) {
    // 先判断是否是完整的url不是的话拼接baseurl
    if (url == undefined || typeof url != 'string') return
    if (url.substr(0, 5) == 'https' || url.substr(0, 4) === 'http') {
      // Do nothing
    }else {
      // 如果开头是 / 去掉
      if(url.substr(0, 1) == '/') {
        url = url.substr(1)
      }
      url = BASEURL + url
    }

    return encodeURI(url)
  }

  post(url, data = {} , loading = false, loadingText = 'Loading...', mask = false) {
    return this._convertPromise(url, data, 'POST', loading, loadingText, mask)
  }

}

export default new Http()
