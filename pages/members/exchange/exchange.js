// pages/members/exchange/exchange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmPopup: false, // 确认兑换弹窗
    inputCode: '', // 输入兑换码
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
   * 打开确认弹窗
   */
  openConirmPopup: function (event) {
    this.setData({
      confirmPopup: true,
    });
  },

  /**
   * 关闭确认弹窗
   */
  closeConirmPopup: function (event) {
    this.setData({
      confirmPopup: false,
    });
  },

  /**
   * 弹窗后禁止滚动
   */
  catchtouchmove: function () { },

  /**
   * 输入验证码
   */
  inputCode: function (event) {
    this.setData({
      inputCode: event.detail.value,
    });
  },

  /**
   * 兑换VIP会员
   */
  exchangeVIP: function (event) {
    wx.showToast({
      title: '兑换成功',
      icon: 'success',
      success: function (res) {
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          });
        }, 1500);
      }
    })
  }
})