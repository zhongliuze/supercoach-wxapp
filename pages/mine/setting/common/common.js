// pages/mine/setting/common/common.js
import $ from '../../../../common/common.js';
const moment = require('../../../../vendor/moment/moment.js');
const util = require('../../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    displayStudentAlias: false, // 优先展示学员备注名
    autoCompleteTask: false, // 自定完成课程
    surplusPickerArrayFormart: ['剩余1课时', '剩余3课时', '剩余5课时', '剩余10课时', '剩余15课时', '剩余20课时', '剩余30课时', '剩余50课时'], // 课时剩余数提醒字典
    surplusPickerArray: [1, 3, 5, 10, 15, 20, 30, 50],
    surplusPickerIndex: 1, // 选中剩余提醒规则下标

    // taskTimePickerArrayFormart: ['30分钟', '1小时', '2小时', '3小时', '5小时'], // 单节课默认时长
    // taskTimePickerArray: [1800, 3600, 7200, 10800, 18000], // 单节课默认时长原始数据
    // taskTimePickerIndex: 1, // 默认选中原始数据

    taskTimePickerArrayFormart: ['1小时'], // 单节课默认时长
    taskTimePickerArray: [3600], // 单节课默认时长原始数据
    taskTimePickerIndex: 0, // 默认选中原始数据

    subtitlePickerArrayFormart: ['剩余课时数', '手机号码', '备注信息'], // 学员列表副标题展示内容列表
    subtitlePickerArray: [0, 1, 2], // 学员列表副标题展示内容原始数据列表
    subtitlePickerIndex: 0, // 默认选中副标题展示

    messagePickerArrayFormart: ['不通知', '微信通知', '短信通知', '微信+短信通知'], // 学员通知方式字典
    messagePickerArray: [0, 1, 2, 3], // 学员通知方式原始数据字典
    messagePickerIndex: 1, // 默认通知方式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var _this = this;
    let timestamp = moment().valueOf();
    $.get(
      'settings/settings', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
      },
      function(res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          var generalSettings = res.data.data.generalSettings;
          _this.setData({
            'autoCompleteTask': generalSettings.autoCompleteTask ? true : false, // 自定完成课程
            'displayStudentAlias': generalSettings.displayStudentAlias ? true : false, // 优先展示学员备注名
            'surplusPickerIndex': _this.data.surplusPickerArray.indexOf(generalSettings.surplusTaskRemind), // 课时提醒规则
            'taskTimePickerIndex': _this.data.taskTimePickerArray.indexOf(generalSettings.defaultTaskTime), // 单节课默认时长
            'subtitlePickerIndex': _this.data.subtitlePickerArray.indexOf(generalSettings.displayStudentSubtitle), // 学员列表副标题展示
            'messagePickerIndex': _this.data.messagePickerArray.indexOf(generalSettings.notificationStudentMethod), // 通知学员方式
          });
        } else {
          wx.showToast({
            title: '网络错误',
            icon: 'none'
          })
        }
      }
    )
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
   * 切换优先展示备注名
   */
  switchStudentAliasChange: function(event) {
    var _this = this;
    let timestamp = moment().valueOf();
    $.put(
      'settings/displayStudentAlias', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
        'displayStudentAlias': event.detail.value ? 1 : 0,
      },
      function(res) {
        console.log(res.data);
      }
    )
    _this.setData({
      'displayStudentAlias': event.detail.value,
    });
  },

  /**
   * 切换优先展示备注名
   */
  switchAutoCompleteChange: function(event) {
    var _this = this;
    let timestamp = moment().valueOf();
    $.put(
      'settings/autoCompleteTask', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
        'autoCompleteTask': event.detail.value ? 1 : 0,
      },
      function(res) {
        console.log(res.data);
      }
    )
    _this.setData({
      'autoCompleteTask': event.detail.value,
    });
  },

  /**
   * 修改课时提醒规则
   */
  bindSurplusPickerChange: function(event) {
    var _this = this;
    let timestamp = moment().valueOf();
    $.put(
      'settings/surplusTaskRemind', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
        'surplusTaskRemind': this.data.surplusPickerArray[event.detail.value],
      },
      function(res) {
        console.log(res.data);
      }
    )
    _this.setData({
      'surplusPickerIndex': event.detail.value
    })
  },

  /**
   * 修改单节课默认时长
   */
  bindTaskTimePickerChange: function(event) {
    var _this = this;
    let timestamp = moment().valueOf();
    $.put(
      'settings/defaultTaskTime', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
        'defaultTaskTime': this.data.taskTimePickerArray[event.detail.value],
      },
      function(res) {
        console.log(res.data);
      }
    )
    _this.setData({
      'taskTimePickerIndex': event.detail.value
    })
  },

  /**
   * 修改学员列表副标题展示内容
   */
  bindSubtitlePickerChange: function(event) {
    var _this = this;
    let timestamp = moment().valueOf();
    $.put(
      'settings/displayStudentSubtitle', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
        'displayStudentSubtitle': this.data.subtitlePickerArray[event.detail.value],
      },
      function(res) {
        console.log(res.data);
      }
    )
    _this.setData({
      'subtitlePickerIndex': event.detail.value
    })
  },

  /**
   * 修改学员通知方式
   */
  bindMessagePickerChange: function(event) {
    var _this = this;
    let timestamp = moment().valueOf();
    $.put(
      'settings/notificationStudentMethod', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
        'notificationStudentMethod': this.data.messagePickerArray[event.detail.value],
      },
      function(res) {
        console.log(res.data);
      }
    )
    _this.setData({
      'messagePickerIndex': event.detail.value
    })
  },
})