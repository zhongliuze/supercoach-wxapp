// pages/mine/message/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderPopup: false, // 确认弹窗
    fixedBottomButtonMargin: 0, // 吸底按钮的自适应高度
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
   * 打开模板页
   */
  navigateToTemplate: function() {
    wx.navigateTo({
      url: '../template/template',
    })
  },

  /**
   * 打开保存模板页
   */
  navigateToAdd: function () {
    wx.navigateTo({
      url: '../add/add',
    })
  },

  /**
   * 打开群发记录
   */
  navigateToRecord: function () {
    wx.navigateTo({
      url: '../record/record',
    })
  },

  /**
   * 打开会员中心
   */
  navigateToMember: function () {
    wx.navigateTo({
      url: '../../../members/index/index',
    })
  },
})