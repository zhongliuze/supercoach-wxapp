// pages/mine/setting/about/about.js
import $ from '../../../../common/common.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    superCoachInfo: [],
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

    $.get(
      'about', {},
      function (res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          _this.setData({
            superCoachInfo: res.data.data,
          });
        } else {
          wx.showToast({
            title: '网络错误',
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
   * 打开协议页面
   */
  bindTreaty: function (event) {
    wx.navigateTo({
      url: '../../../treaty/member/member?treatyType=' + event.currentTarget.dataset.type,
    })
  }
})