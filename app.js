//app.js
import $ from 'common/common.js';
const moment = require('vendor/moment/moment.js');
const util = require('utils/util')
const md5 = require('vendor/md5/md5.min.js');
App({
  data: {},
  onLaunch: function() {
    var _this = this;
    // 获取手机系统信息
    wx.getSystemInfo({
      success(res) {
        // 吸底按钮自适应,设置吸底按钮距离
        wx.setStorageSync('fixedBottomButtonMargin', (res.screenHeight - res.safeArea.bottom) * 2);
      }
    })

    //登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code);
        $.post(
          'code2Session', {
            code: res.code,
          },
          function(res) {
            console.log('***2020***');
            console.log(res);
            if (res.data.code == 0) {
              // 登录态获取成功
              var coachData = res.data.data;
              var generalSettings = {
                'autoCompleteTask': coachData.coach.autoCompleteTask,
                'coachId': coachData.coach.coachId,
                'defaultTaskTime': coachData.coach.defaultTaskTime,
                'displayStudentAlias': coachData.coach.displayStudentAlias,
                'displayStudentSubtitle': coachData.coach.displayStudentSubtitle,
                'notificationStudentMethod': coachData.coach.notificationStudentMethod,
                'surplusTaskRemind': coachData.coach.surplusTaskRemind,
              };
              wx.setStorageSync('generalSettings', generalSettings);
              wx.setStorageSync('coachid', coachData.coachid);
              wx.setStorageSync('token', coachData.token);
              wx.setStorageSync('coach', coachData.coach);
              wx.setStorageSync('authorizationUserInfo', coachData.coach.wxNickname ? true : false);
              wx.setStorageSync('authorizationPhone', coachData.coach.mobile ? true : false);
              // 若已获取到手机号，默认设置为已登录
              if (res.data.data.coach.mobile) {
                wx.setStorageSync('coachLogin', true);
              } else {
                wx.setStorageSync('coachLogin', false);
              }
            } else {
              wx.showToast({
                title: res.data.message,
                icon: 'none',
              })
              wx.setStorageSync('coachid', '');
              wx.setStorageSync('token', '');
              wx.setStorageSync('coach', '')
              wx.setStorageSync('authorizationUserInfo', false);
              wx.setStorageSync('authorizationPhone', false);
              wx.setStorageSync('coachLogin', false);
            }
            //由于这里是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            _this.globalData.checkLogin = true;
            if (_this.checkLoginReadyCallback) {
              _this.checkLoginReadyCallback(res);
            }

          }
        )

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              let timestamp = moment().valueOf();
              var userInfo = res.userInfo;
              $.put(
                'coach', {
                  'coachid': wx.getStorageSync('coachid'),
                  'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
                  'timestamp': timestamp, // 时间戳
                  'avatarUrl': userInfo.avatarUrl, // 微信返回的用户头像
                  'city': userInfo.city, // 微信返回的用户所在城市
                  'country': userInfo.country, // 微信返回的用户所在国家
                  'gender': userInfo.gender, // 微信返回的用户性别（0未知，1男，2女）
                  'language': userInfo.language, // 微信返回的 country，province，city 所用的语言（en，zh_CN，zh_TW）
                  'nickName': userInfo.nickName, // 微信返回的用户昵称
                  'province': userInfo.province, // 微信返回的用户所在省份
                },
                function(res) {
                  console.log(res.data);
                }
              )
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
    checkLogin: false,
    startTime: 8, // 日程开始时间
    endTime: 22, // 日程结束时间
  }
})