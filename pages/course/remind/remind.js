// pages/course/remind/remind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remindArray: [
      {
        name: '无提醒',
        selected: true,
      },
      {
        name: '开始时',
        selected: false,
      },
      {
        name: '30分钟前',
        selected: false,
      },
      {
        name: '1小时前',
        selected: false,
      },
      {
        name: '3小时前',
        selected: false,
      },
      {
        name: '6小时前',
        selected: false,
      },
      {
        name: '1天前',
        selected: false,
      },
    ],
    remindIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var remindArray = this.data.remindArray;
    for (let i = 0; i < remindArray.length; i++) {
      if (i == parseInt(options.remindType)) {
        remindArray[i]['selected'] = true;
      } else {
        remindArray[i]['selected'] = false;
      }
    }
    this.setData({
      remindIndex: options.remindType,
      remindArray: remindArray,
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

  // 选择提醒类型
  selectRemind: function (event) {
    var index = event.currentTarget.dataset.index;
    var remindArray = this.data.remindArray;
    if (index == this.data.remindIndex) {
      return;
    }

    for (let i = 0; i < remindArray.length; i++) {
      if (i == index) {
        remindArray[i]['selected'] = true;
      } else {
        remindArray[i]['selected'] = false;
      }
    }

    // 向前一页赋值
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; // 上一页
    prevPage.setData({
      remindType: index
    });


    // 返回上一页
    wx.navigateBack({
      delta: '1'
    })
  }
})