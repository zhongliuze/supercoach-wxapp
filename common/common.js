import config from 'config.js';
export default {
  'post': function (url, data, successcallback) {
    wx.request({
      url: config.server + url,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: successcallback,
    });
  },

  'get': function (url, data, successcallback) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: config.server + url,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: successcallback,
      complete: function () {
        wx.hideLoading();
      }
    });
  },

  'put': function (url, data, successcallback) {
    wx.request({
      url: config.server + url,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'PUT',
      success: successcallback
    });
  },

  'delete': function (url, data, successcallback) {
    wx.request({
      url: config.server + url,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'DELETE',
      success: successcallback
    });
  },
}