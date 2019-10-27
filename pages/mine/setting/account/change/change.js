// pages/mine/setting/account/change/change.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '', // 手机号码
    verifyCode: '', // 验证码
    verifyOld: false, // 原号码已验证
    getVerifyCode: false, // 是否已获取过验证码
    getVerifyTime: 60, // 获取倒计时
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phoneNumber: '18020220001',
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
    if (this.data.verifyOld) {
      wx.setNavigationBarTitle({
        title: '绑定新手机号',
      })
      this.setData({
        phoneNumber: '',
        verifyCode: '',
      });
    }
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
   * 输入手机号码
   */
  inputPhoneNumber: function (event) {
    this.setData({
      'phoneNumber': event.detail.value,
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

  /**
   * 验证原手机号
   */
  verifyOldPhone: function (event) {
    console.log('验证原手机号码');
    if (this.data.phoneNumber.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
      })
      return;
    }

    if (this.data.verifyCode.length != 4) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
      })
      return;
    }
    
    var _this = this;
    this.setData({
      'verifyOld': true,
    })
    
    wx.showToast({
      title: '原手机号验证成功',
      icon: 'none',
      success(res) {
        setTimeout(function () {
          _this.onShow();
        }, 1500);
      }
    })

  },

  /**
   * 验证新手机号
   */
  verifyNewPhone: function (event) {
    console.log('验证新手机号码');
    if (this.data.phoneNumber.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
      })
      return;
    }

    if (this.data.verifyCode.length != 4) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
      })
      return;
    }

    var _this = this;
    this.setData({
      'verifyOld': true,
    })
    wx.showToast({
      title: '新手机号绑定成功',
      icon: 'none',
      success(res) {
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1500);
      }
    })
  },

  /**
   * 获取短信验证码
   */
  getVerifyCode: function (event) {
    var _this = this;
    // 手机号码格式判断

    if(this.data.phoneNumber.length != 11) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon:'none',
      })
      return ;
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
})