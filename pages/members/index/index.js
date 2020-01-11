// pages/members/index/index.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputMore: false,
    fixedBottomButtonMargin: 0, // 吸底按钮的自适应高度
    selectPrice: 2, // 选择套餐类型
    agreement: true, // 勾选服务协议
    orderPopup: false, // 确认弹窗
    coachInfo: [], // 教练信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fixedBottomButtonMargin: wx.getStorageSync('fixedBottomButtonMargin'), // 设置吸底按钮自适应高度
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
            coachInfo: res.data.data.coach,
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
   * 选择套餐
   */
  selectPrice: function (event) {
    this.setData({
      selectPrice: event.currentTarget.dataset.price,
    });
  },

  /**
   * 勾选服务协议
   */
  bindRadio: function (event) {
    this.setData({
      agreement: !this.data.agreement,
    });
  },

  catchtouchmove: function () { },

  closePopup: function (event) {
    console.log(event);
    this.setData({
      'orderPopup': false,
    });
  },

  openPopup: function (event) {
    this.setData({
      'orderPopup': true,
    });
  },

  /**
   * 打开协议页面
   */
  bindTreaty: function (event) {
    wx.navigateTo({
      url: '../../treaty/member/member?treatyType=2',
    })
  },

  /**
   * 打开开通记录页面
   */
  navigateToRecord: function(event) {
    wx.navigateTo({
      url: '../record/record',
    })
  },

  /**
   * 打开兑换码页面
   */
  navigateToExchange: function (event) {
    wx.navigateTo({
      url: '../exchange/exchange',
    })
  },

  /**
   * 打开会员服务协议页
   */

  bindTreaty: function(event) {
    console.log('dddd');
    wx.navigateTo({
      url: '../../treaty/member/member',
    })
  }
})