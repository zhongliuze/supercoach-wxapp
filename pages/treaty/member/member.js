// pages/treaty/member/member.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    treatyContent: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.treatyType == 0) {
      // 用户协议
      wx.setNavigationBarTitle({
        title: '用户协议',
      })
      this.setData({
        'treatyType' : 0,
      });
    } else if (options.treatyType == 1) {
      // 隐私协议
      wx.setNavigationBarTitle({
        title: '隐私政策',
      })
      this.setData({
        'treatyType': 1,
      });
    } else if (options.treatyType == 2) {
      // 会员协议
      wx.setNavigationBarTitle({
        title: '会员服务协议',
      })
      this.setData({
        'treatyType': 2,
      });
    }
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
    console.log(this.data.treatyType);
    if (this.data.treatyType == 0) {
      // 用户协议
      $.get(
        'userProtocol', {},
        function (res) {
          console.log(res.data);
          if (res.data.code == 0) {
            // 获取成功          
            _this.setData({
              treatyContent: res.data.data.userProtocol,
            });
          } else {
            wx.showToast({
              title: '网络错误',
              icon: 'none'
            })
          }
        }
      )
    } else if (this.data.treatyType == 1) {
      // 隐私政策
      $.get(
        'privacyPolicy', {},
        function (res) {
          console.log(res.data);
          if (res.data.code == 0) {
            // 获取成功          
            _this.setData({
              treatyContent: res.data.data.privacyPolicy,
            });
          } else {
            wx.showToast({
              title: '网络错误',
              icon: 'none'
            })
          }
        }
      )
    } else if (this.data.treatyType == 2) {
      // 会员服务协议
      $.get(
        'privacyPolicy', {},
        function (res) {
          console.log(res.data);
          if (res.data.code == 0) {
            // 获取成功          
            _this.setData({
              treatyContent: res.data.data.privacyPolicy,
            });
          } else {
            wx.showToast({
              title: '网络错误',
              icon: 'none'
            })
          }
        }
      )
    }
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

  }
})