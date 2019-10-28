// pages/students/subject/detail/detail.js
const moment = require('../../../../vendor/moment/moment.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '',
    timeFormat: '请选择购课时间',
    fixedBottomButtonMargin: 0, // 吸底按钮的自适应高度
    detailType: 0, // 页面类型：0为新建，1为编辑
    priceList: [],
    courseList: [],
    pricePicker: 300, // 选中客单价下标
    pricePickerFormat: '请选择课程单价', // 选中客单价值
    sumPicker: 20, // 选中总课时数下标
    sumPickerFormat: '请选择总课时数',
    alreadyPicker: 0, // 选中已上课时下标
    alreadyPickerFormat: '请选择已上课时',
    lastPicker: 0, // 选中剩余课时下标
    lastPickerFormat: '请选择剩余课时',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var detailType = options.detailType; // 页面类型：0为新建，1为编辑
    if (detailType == 0) {
      wx.setNavigationBarTitle({
        title: '新建课程',
      })
    }

    var priceList = [];
    var courseList = [];
    for (var i = 0; i < 2000; i++) {
      priceList[i] = i + '元';
      courseList[i] = i + '节';
    }

    this.setData({
      'fixedBottomButtonMargin': wx.getStorageSync('fixedBottomButtonMargin'), // 设置吸底按钮自适应高度
      'detailType': detailType, // 页面类型：0为新建，1为编辑
      'priceList': priceList,
      'courseList': courseList,
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
   * 选择购课时间
   */
  timePickerChange: function(event) {
    this.setData({
      timeFormat: moment(event.detail.value).format('YYYY年MM月DD日'),
      time: event.detail.value,
    });
  },

  /**
   * 选择客单价
   */
  pricePickerChange: function(event) {
    this.setData({
      pricePicker: event.detail.value,
      pricePickerFormat: this.data.priceList[event.detail.value],
    });
  },

  /**
   * 选择总课时数
   */
  sumCoursePickerChange: function(event) {
    // 新建课程时，辅助填写已上课时和剩余课时数
    if (this.data.detailType == 0 && this.data.alreadyPickerFormat == '请选择已上课时' && this.data.lastPickerFormat == '请选择剩余课时') {
      // 新建课程页
      this.setData({
        alreadyPicker: 0,
        alreadyPickerFormat: this.data.courseList[0],
        lastPicker: event.detail.value,
        lastPickerFormat: this.data.courseList[event.detail.value],
      });
    }
    if (this.data.alreadyPickerFormat != '请选择已上课时') {
      this.setData({
        lastPicker: parseInt(event.detail.value - this.data.alreadyPicker),
        lastPickerFormat: this.data.courseList[parseInt(event.detail.value - this.data.alreadyPicker)],
      });
    }
    this.setData({
      sumPicker: event.detail.value,
      sumPickerFormat: this.data.courseList[event.detail.value],
    });
  },

  /**
   * 选择已上课时数
   */
  alreadyCoursePickerChange: function(event) {
    if (this.data.sumPickerFormat != '请选择总课时数') {
      // 总课时数已选择
      this.setData({
        lastPicker: parseInt(this.data.sumPicker - event.detail.value),
        lastPickerFormat: this.data.courseList[parseInt(this.data.sumPicker - event.detail.value)],
      });
    }
    this.setData({
      alreadyPicker: event.detail.value,
      alreadyPickerFormat: this.data.courseList[event.detail.value],
    });
  },

  /**
   * 选择剩余课时数
   */
  lastCoursePickerChange: function(event) {
    this.setData({
      lastPicker: event.detail.value,
      lastPickerFormat: this.data.courseList[event.detail.value],
    });
  },

  bindSave: function(event) {
    if (this.data.detailType == 0) {
      this.setData({
        detailType: 1,
      });
    } else if (this.data.detailType == 1) {
      this.setData({
        detailType: 0,
      });
    }
  }
})