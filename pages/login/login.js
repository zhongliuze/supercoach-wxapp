// pages/login/login.js
const moment = require('../../vendor/moment/moment.js');
import $ from '../../common/common.js';
const util = require('../../utils/util')
const md5 = require('../../vendor/md5/md5.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '', // 手机号码
    verifyCode: '', // 验证码
    getVerifyCode: false, // 是否已获取过验证码
    getVerifyTime: 60, // 获取倒计时
    verifyLogin: false,
    authorizationUserInfo: false, // 身份信息未授权
    authorizationPhone:false,// 身份信息已授权
    coachLogin: false, // 是否登录

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    let timestamp = moment().valueOf();

    $.get(
      'coach', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
      },
      function (res) {
        if (res.data.code == 0) {
          // 获取成功
          // 判断是否授权微信
          var authorizationUserInfo = res.data.data.coach.wxNickname ? true : false;
          // 判断是否授权手机号码
          var authorizationPhone = res.data.data.coach.mobile ? true : false;
          wx.setStorageSync('authorizationUserInfo', authorizationUserInfo);
          wx.setStorageSync('authorizationPhone', authorizationPhone);
          // 若全都授权则返回上一页
          _this.setData({
            'authorizationUserInfo': authorizationUserInfo,
            'authorizationPhone': authorizationPhone,
          });
          
        } else {
          wx.showToast({
            title: '个人信息获取失败',
            icon: 'none'
          })
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取验证码
   */
  getVerfiyCode: function (event) {
    var _this = this;
    // 手机号码格式判断

    if (this.data.phoneNumber.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
      })
      return;
    }
    _this.setData({
      getVerifyCode: true,
      getVerifyTime: 60,
    });
    _this.countDown();
  },

  /**
   * 验证码倒计时
   */
  countDown: function () {
    var _this = this;
    var currentTime = _this.data.getVerifyTime;
    var interval = setInterval(function () {
      _this.setData({
        getVerifyTime: (currentTime - 1),
      })
      currentTime--;
      if (currentTime <= 0) {
        clearInterval(interval)
      }
    }, 1000)
  },

  /**
   * 输入手机号码
   */
  inputPhoneNumber: function (event) {
    this.setData({
      'phoneNumber': event.detail.value,
    })
  },

  /**
   * 切换登录方式
   */
  changeLoginType: function (event) {
    wx.showToast({
      title: '暂未开放，请使用微信快速验证',
      icon: 'none',
    })
    // this.setData({
    //   'verifyLogin': !this.data.verifyLogin,
    // })
  },

  /**
   * 输入验证码
   */
  inputVerify: function (event) {
    this.setData({
      'verifyCode': event.detail.value,
    })
  },

  /**
   * 获取授权信息
   */
  bindGetUserInfo(e) {
    var _this = this;
    let timestamp = moment().valueOf();
    var userInfo = e.detail.userInfo;
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
      function (res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          wx.showToast({
            title: '微信授权成功',
            icon: 'success',
          })
          _this.onShow();
        } else {
          wx.showToast({
            title: '微信授权失败',
            icon: 'none'
          })
        }
      }
    )
  },

  /**
   * 获取手机号码
   */
  getPhoneNumber: function(event) {
    var _this = this;
    let timestamp = moment().valueOf();

    //登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        $.post(
          'getPhoneNumber', {
            'coachid': wx.getStorageSync('coachid'),
            'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
            'timestamp': timestamp, // 时间戳
            'code': res.code, // 调用 wx.login() 获得的 code
            'encryptedData': event.detail.encryptedData, // 加密数据
            'iv': event.detail.iv, // 偏移量
          },
          function (res) {
            console.log(res.data);
            if (res.data.code == 0) {
              // 获取成功
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                success: function () {
                  wx.setStorageSync('coachLogin', true);
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: '1'
                    })
                  }, 1500);
                }
              })
            } else {
              wx.showToast({
                title: '登录失败',
                icon: 'none'
              })
            }
          }
        )
      }
    })
    
  }
})