// pages/mine/invit/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuButtonInfoData: [],
    systemInfo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /**
     * 获取手机系统信息
     */
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          'systemInfo': res,
          'menuButtonInfoData': wx.getMenuButtonBoundingClientRect()
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 返回上级页面
   */
  bindReturn: function() {
    wx.navigateBack({
      delta: 1
    })
  },
})