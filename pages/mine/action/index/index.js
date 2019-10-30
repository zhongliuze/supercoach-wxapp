// pages/mine/action/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectModule: 0, // 选中模块下标
    addModulePopup: false, // 新增模块弹窗
    deleteButton: false, // 是否打开删除按钮
    addModuleName: '', // 新增模块输入内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowHeight: wx.getSystemInfoSync().windowHeight,
      windowWidth: wx.getSystemInfoSync().windowWidth
    })
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
   * 选择模块
   */
  selectModule: function(event) {
    console.log(event);
    this.setData({
      selectModule: event.currentTarget.dataset.module,
    });
  },

  /**
   * 打开确认弹窗
   */
  openConirmPopup: function (event) {
    this.setData({
      addModulePopup: true,
    });
  },

  /**
   * 关闭确认弹窗
   */
  closeConirmPopup: function (event) {
    this.setData({
      addModulePopup: false,
    });
  },

  /**
   * 弹窗后禁止滚动
   */
  catchtouchmove: function () { },

  /**
   * 进入新增动作页面
   */
  navigateToAdd: function(event) {
    // 携带模块ID过去
    wx.navigateTo({
      url: '../add/add?module=' + event.currentTarget.dataset.module,
    })
  },

  /**
   * 打开或关闭删除按钮
   */
  switchDeleteButton: function(event) {
    this.setData({
      'deleteButton': !this.data.deleteButton,
    });
  },

  /**
   * 删除动作按钮
   */
  deleteAction: function(event) {
    wx.showToast({
      title: '已删除',
      icon: 'success',
    })
  },

  /**
   * 新增模块名称
   */
  addModule: function(event) {
    var _this = this;
    wx.showToast({
      title: '创建成功',
      icon: 'success',
      success: function (res) {
        setTimeout(function () {
          _this.setData({
            'addModulePopup': false,
            'addModuleName': '',
          });
        }, 1500);
      }
    })
  },

  /**
   * 新增模块名称
   */
  inputModuleName: function(event) {
    this.setData({
      'addModuleName': event.detail.value,
    });
  }
})