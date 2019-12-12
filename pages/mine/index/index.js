// pages/mine/index/index.js
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
    }
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