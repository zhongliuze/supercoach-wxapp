// pages/course/repeat/repeat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    repeatArray: [
      {
        name: '不重复',
        selected: true,
      },
      {
        name: '每天',
        selected: false,
      },
      {
        name: '每周',
        selected: false,
      },
      {
        name: '每月',
        selected: false,
      },
    ],
    repeatIndex: 0,  // 默认选中重复数
    resCourse: 0, // 剩余课时数
    repeatPickerIndex: 0, // picker默认选中
    repeatPickerArray: [], // picker列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var resCourse = 15; // 剩余课程数
    var repeatPickerArray = [];
    if (resCourse == 0) {
      // 无剩余课时
      repeatPickerArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    } else {
      // 有剩余课时
      for (let i = 1; i <= resCourse; i++) {
        repeatPickerArray.push(i);
      }
    }
    
    this.setData({
      repeatPickerArray: repeatPickerArray,
      resCourse: resCourse,
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

  // 选择重复类型
  selectRepeat: function (event) {
    var index = event.currentTarget.dataset.index;
    if (index == this.data.repeatIndex) {
      return;
    }
    var repeatArray = this.data.repeatArray;
    for (let i = 0; i < repeatArray.length; i++) {
      if (i == index) {
        repeatArray[i]['selected'] = true;
      } else {
        repeatArray[i]['selected'] = false;
      }
    }
    this.setData({
      repeatArray: repeatArray,
      repeatIndex: index,
    });
  },

  bindPickerChange: function(event) {
    this.setData({
      repeatIndex: event.detail.value,
    })
  }
})