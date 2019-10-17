// pages/order/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refuseReasonList: ['此时间已有课程安排', '今天身体不太舒服', '抱歉！此时间段有其他安排，请更换时间'],
    refuseReason: '', // 拒绝理由
    refusePopup: false, // 拒绝弹窗
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

  catchtouchmove: function () { },

  /**
   * 关闭弹窗
   */
  closePopup: function () {
    this.setData({
      'refusePopup': false,
    });
  },

  /**
   * 点击填充拒绝理由
   */
  autoFillReason: function (event) {
    this.setData({
      'refuseReason': this.data.refuseReason + this.data.refuseReasonList[event.currentTarget.dataset.index],
    });
  },

  /**
   * 输入框内输入拒绝理由
   */
  inputRefuseReason: function (event) {
    this.setData({
      'refuseReason': event.detail.value,
    });
  },

  /**
   * 提交拒绝信息
   */
  submitRefuse: function (event) {
    var _this = this;
    var refuseReason = this.data.refuseReason;
    console.log('拒绝理由：' + refuseReason);
    if (!refuseReason || refuseReason == '') {
      wx.showToast({
        title: '请填写拒绝原因',
        icon: 'none',
      })
      return;
    }
    wx.showToast({
      title: '已拒绝',
      icon: 'success',
      success: function () {
        setTimeout(function () {
          // 关闭弹窗
          _this.setData({
            'refusePopup': false,
          });
        }, 1500);
      }
    })
  },

  /**
   * 点击拒绝按钮
   */
  refuseButton: function () {
    this.setData({
      'refusePopup': true,
    });
  },

  /**
   * 点击同意按钮
   */
  agreeButton: function() {
    wx.showModal({
      title: '请再次确认上课时间',
      content: '2019年07月15日 16:30~18:30',
      confirmColor:'#5FCD64',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '已同意',
            icon: 'success',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  navigateToDetail: function() {
    wx.navigateTo({
      url: '../detail/detail',
    })
  }
})