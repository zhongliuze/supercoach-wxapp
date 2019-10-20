// pages/students/basic/basic.js
const moment = require('../../../vendor/moment/moment.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: '',
    birthdayFormat: '请选择',
    birthdayRemind: false,
    studentName: '刘泽中',
    coachName: '常文静',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 组建生日日期列表

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
   * 打开/关闭生日提醒
   */
  switchChange: function(event) {
    console.log(event);
    this.setData({
      birthdayRemind: event.detail.value,
    });
  },

  /**
   * 选择生日日期
   */
  birthdayPickerChange: function(event) {
    this.setData({
      birthdayFormat: moment(event.detail.value).format('YYYY年MM月DD日'),
      birthday: event.detail.value,
    });
  }
})