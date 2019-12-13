// pages/members/index/index.js
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