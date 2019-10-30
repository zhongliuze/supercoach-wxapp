// pages/mine/setting/account/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
   * 更换手机号页
   */
  navigateToChange: function(event) {
    wx.navigateTo({
      url: '../change/change',
    })
  },

  /**
   * 退出登录
   */
  loginOut: function(event) {
    wx.showActionSheet({
      itemList: ['退出登录'],
      itemColor: '#FF3D3D',
      success(res) {
        if (res.tapIndex == 0) {
          wx.navigateBack({
            delta: 2,
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})