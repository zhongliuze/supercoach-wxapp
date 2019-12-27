// pages/mine/index/index.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util');

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
          console.log(moment().subtract(1, 'days').format('YYYY-MM-DD'));
          console.log(moment.unix(coachInfo['vipExpired']).format('YYYY-MM-DD'));
          console.log(moment(moment().subtract(1, 'days').format('YYYY-MM-DD')).isBefore(moment.unix(coachInfo['vipExpired']).format('YYYY-MM-DD')));
          if (!coachInfo['vipExpired']) {
              // 未开通过
            // console.log(coachInfo['createTime']);
            // console.log(moment().add(1, 'days').format('YYYY-MM-DD'));
            // console.log(moment.unix(coachInfo['createTime']).format('YYYY-MM-DD'));
            console.log();
            // console.log(moment(coachInfo['createTime']).isBefore('2019-09-25'));
            // console.log(moment(coachInfo['createTime']).isSame('2019-09-24'));
            // console.log(moment(coachInfo['createTime']).isSame());
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
            title: '个人信息失败',
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
   * 点击进入二级页面
   */
  bindButton: function(event) {
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.url,
    })
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
})