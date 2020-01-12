// pages/mine/index/index.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerPhone: '10010', // 客服电话
    tgcAppId: "wx8abaf00ee8c3202e",  // 吐个槽小程序ID
    tgcExtraData : {
      // 把1221数字换成你的产品ID，否则会跳到别的产品
      id: "98007",
    },
    coachInfo: [], // 教练个人信息
    coachMonthData: [], // 教练月数据
    authorizationUserInfo: false, // 授权微信信息
    coachLogin: false, // 登录态
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      'customerPhone': '+8618020220001', // 客服电话
    });
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
    if (!app.globalData.checkLogin) {
      app.checkLoginReadyCallback = () => {
        // 回调等待login登录成功后执行
        _this.getCoachInfo();
      };
    } else {
      _this.getCoachInfo();
    }
    _this.setData({
      'authorizationUserInfo': wx.getStorageSync('authorizationUserInfo'),
      'coachLogin': wx.getStorageSync('coachLogin'),
    });
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
   * 点击进入二级页面
   */
  bindButton: function(event) {
    if (this.data.coachLogin) {
      wx.navigateTo({
        url: '../' + event.currentTarget.dataset.url,
      })
    } else {
      wx.showModal({
        title: '陛下，您还未登录',
        content: '请先登录/注册再进行此操作',
        confirmText: '立即登录',
        cancelText: '朕再看看',
        confirmColor: '#5FCD64',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../login/login',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  /**
   * 拨打客服电话
   */
  makePhoneCall: function(event) {
    wx.makePhoneCall({
      phoneNumber: this.data.customerPhone,
    })
  },

    /**
   * 提示窗
   */
  bindPopupTips: function (event) {
    wx.showModal({
      title: '启奏陛下',
      content: event.currentTarget.dataset.message,
      showCancel: false,
      confirmText: '爱卿平身',
      confirmColor: '#5FCD64',
    })
  },

  /**
   * 登录
   */
  bindToLogin: function(event) {
    wx.navigateTo({
      url: '../../login/login',
    })
  },

  /**
   * 获取教练信息
   */
  getCoachInfo:function() {
    var _this = this;
    let timestamp = moment().valueOf();
    $.get(
      'coach', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
      },
      function (res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          var coachInfo = res.data.data.coach;
          if (!coachInfo['vipExpired']) {
            coachInfo['vip'] = false;
            coachInfo['vipTime'] = 0;
          } else if (coachInfo['vipExpired'] && !moment(moment().subtract(1, 'days').format('YYYY-MM-DD')).isBefore(moment.unix(coachInfo['vipExpired']).format('YYYY-MM-DD'))) {
            // 开通过，已过期
            coachInfo['vip'] = false;
            coachInfo['vipTime'] = 1;
          } else if (coachInfo['vipExpired'] && moment(moment().subtract(1, 'days').format('YYYY-MM-DD')).isBefore(moment.unix(coachInfo['vipExpired']).format('YYYY-MM-DD'))) {
            // 开通过，未过期
            coachInfo['vip'] = true;
            coachInfo['vipTime'] = moment.unix(coachInfo['vipExpired']).format('YYYY-MM-DD');
          }
          _this.setData({
            'coachInfo': coachInfo,
            'coachMonthData': res.data.data.currentMonthData,
          });
        } else {
          wx.showToast({
            title: '个人信息获取失败',
            icon: 'none'
          })
        }
      }
    )
  }
})