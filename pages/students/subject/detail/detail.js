// pages/students/subject/detail/detail.js
const moment = require('../../../../vendor/moment/moment.js');
import $ from '../../../../common/common.js';
const util = require('../../../../utils/util');
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

    student_id: 0, // 学员ID

    courseName: '', // 课程名称
    courseNameId: 0, // 课程名称ID
    courseType: '', // 课程类型
    courseTypeId: 0, // 课程类型ID
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
      'student_id': options.student_id,
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

  /**
   * 保存课程信息
   */
  bindSave: function(event) {
    
    if (this.data.detailType == 0) {
      // 创建课程
      var _this = this;
      let timestamp = moment().valueOf();
      if(!this.data.courseNameId) {
        wx.showToast({
          title: '请填写课程名称',
          icon: 'none',
        })
        return ;
      }
      var requestData = {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, // 时间戳
        'coachStudentId': this.data.student_id, // 学员ID
        'courseNameId': this.data.courseNameId, //课程名称 ID
        'courseTypeId': this.data.courseTypeId, //课程类型 ID
        'perTicketPrice': this.data.pricePicker * 100, // 客单价（单位: 分）
        'totalNumber': this.data.sumPicker, // 总课时数
        'usageNumber': this.data.alreadyPicker, // 已上课时
        'remark': '', // 备注
        'buyTime': this.data.time, // 购课时间（单位: 秒）
        //'buyTime': this.data.time ? moment(this.data.time).unix() : '', // 购课时间（单位: 秒）
      };
      
      $.post(
        'studentCourseRecord', requestData,
        function (res) {
          console.log(res.data);
          if (res.data.code == 0) {
            // 获取成功
            wx.showToast({
              title: '创建成功',
              icon: 'success',
              success: function () {
                setTimeout(function () {
                  wx.navigateBack({
                    delta: '1'
                  })
                }, 1500);
              }
            })
          } else {
            wx.showToast({
              title: '创建失败',
              icon: 'none'
            })
          }
        }
      )
      
    } else if (this.data.detailType == 1) {
      
    }
  },

  /**
   * 选择课程名称
   */
  bindSelect: function(event) {
    var selectType = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../../../common/select/select?selectName=' + (selectType == 1 ? this.data.courseName : this.data.courseType) + '&selectContentType=' + selectType,
    })
  }
})