// pages/students/other/other.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    follow: false, // 是否关注
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'follow': (options.follow == 1) ? true : false,
      'student_id': options.student_id,
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
   * 点击删除按钮
   */
  deleteStudent: function() {
    wx.showModal({
      title: '确认要删除吗？',
      content: '该操作将清空学员的所有信息',
      cancelText: '删除',
      cancelColor: '#000000',
      confirmText: '取消',
      confirmColor: '#5FCD64',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')

        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.showToast({
            title: '已删除',
            icon: 'success'
          })
        }
      }
    })
  },

  /**
   * 更改状态
   */
  changeFollow: function(event) {
    console.log(event.detail.value);
    var _this = this;
    let timestamp = moment().valueOf();
    $.put(
      'follow', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
        'coachStudentId': this.data.student_id,
        'follow': event.detail.value ? 1 : 0,
      },
      function (res) {
        console.log(res.data);
      }
    )
    _this.setData({
      'follow': event.detail.value,
    });
  }
})