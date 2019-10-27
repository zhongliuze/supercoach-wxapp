// pages/course/students/students.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentList: [
      { nameStr: '泽中', name: '刘泽中', phone: '18020220001', times: '05', isTouchMove: false },
      { nameStr: '商量', name: '商量', phone: '18598632214', times: '13', isTouchMove: false },
      { nameStr: '晓东', name: '周晓东', phone: '', times: '05', isTouchMove: false },
      { nameStr: '龙哥', name: '龙哥', phone: '18020220001', times: '00', isTouchMove: false },
      { nameStr: '老公', name: '山东老公', phone: '', times: '', isTouchMove: false },
      { nameStr: '盖伦', name: '德玛西亚之力', phone: '18020220001', times: '05', isTouchMove: false },

    ],
    customIndex: 0,
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

  navigateToAdd: function () {
    wx.navigateTo({
      url: '../add/add',
    })
  }
})