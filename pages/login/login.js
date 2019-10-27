// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '', // 手机号码
    verifyCode: '', // 验证码
    getVerifyCode: false, // 是否已获取过验证码
    getVerifyTime: 60, // 获取倒计时
    verifyLogin: false,
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
   * 获取验证码
   */
  getVerfiyCode: function(event) {
    var _this = this;
    // 手机号码格式判断

    if (this.data.phoneNumber.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
      })
      return;
    }
    _this.setData({
      getVerifyCode: true,
      getVerifyTime: 60,
    });
    _this.countDown();
  },

  /**
   * 验证码倒计时
   */
  countDown: function () {
    var _this = this;
    var currentTime = _this.data.getVerifyTime;
    var interval = setInterval(function () {
      _this.setData({
        getVerifyTime: (currentTime - 1),
      })
      currentTime--;
      if (currentTime <= 0) {
        clearInterval(interval)
      }
    }, 1000)
  },

  /**
   * 输入手机号码
   */
  inputPhoneNumber: function (event) {
    this.setData({
      'phoneNumber': event.detail.value,
    })
  },

  /**
   * 切换登录方式
   */
  changeLoginType: function(event) {
    this.setData({
      'verifyLogin': !this.data.verifyLogin,
    })
  },

  /**
   * 输入验证码
   */
  inputVerify: function (event) {
    this.setData({
      'verifyCode': event.detail.value,
    })
  },
})