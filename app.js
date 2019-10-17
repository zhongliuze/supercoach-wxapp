//app.js
import $ from 'common/common.js';
App({
  data: {
  },
  onLaunch: function () {
    // 获取手机系统信息
    wx.getSystemInfo({
      success(res) {
        // 吸底按钮自适应,设置吸底按钮距离
        wx.setStorageSync('fixedBottomButtonMargin', (res.screenHeight - res.safeArea.bottom)*2);
      }
    })


    //登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res.code);
    //     $.post(
    //       'code2Session', {
    //         code: res.code,
    //       },
    //       function (res) {
    //         console.log(res);
    //         if (res.data.code == 0) {
    //           wx.setStorageSync('coachid', res.data.data.coachid)
    //           wx.setStorageSync('token', res.data.data.token)
    //         } else {
    //           wx.showToast({
    //             title: res.data.message,
    //             icon: 'none',
    //           })
    //           wx.setStorageSync('coachid', '')
    //           wx.setStorageSync('token', '')
    //         }
    //       }
    //     )
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    startTime: 8, // 日程开始时间
    endTime: 22, // 日程结束时间
  }
})