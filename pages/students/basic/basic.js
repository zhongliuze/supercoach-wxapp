// pages/students/basic/basic.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util')
const md5 = require('../../../vendor/md5/md5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: '',
    birthdayFormat: '请选择',
    birthdayRemind: false,
    sourceName: '', // 来源名称
    sourceId: 0, // 来源ID
    coachInfo: [], // 教练信息
    aliasName: '', // 备注信息
    studentName: '', // 学员姓名
    studentMobile: '', // 学员手机号
    studentRemark: '', // 学员备注信息
    student_id: '', // 学员ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 组建生日日期列表
    if(options.student_id) {
      var _this = this;
      let timestamp = moment().valueOf();
      $.get(
        'coachStudent', {
          'coachid': wx.getStorageSync('coachid'),
          'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
          'timestamp': timestamp, // 时间戳
          'coachStudentId': options.student_id, // 学员ID
        },
        function (res) {
          console.log(res.data);
          if (res.data.code == 0) {
            // 获取成功
            var studentInfo = res.data.data.coachStudent;
            _this.setData({
              'studentInfo': studentInfo,
              'sourceName': studentInfo.sourceName, // 学员来源
              'birthdayRemind': studentInfo.birthdayRemind ? true : false, // 生日提醒
              'birthday': studentInfo.birthday ? moment.unix(studentInfo.birthday).format('YYYY-MM-DD') : '',
              'birthdayFormat': studentInfo.birthday ? moment.unix(studentInfo.birthday).format('YYYY年MM月DD日') : '请选择',
              'aliasName': studentInfo.alias,  // 学员备注名
              'studentName': studentInfo.name, // 学员姓名
              'studentMobile': studentInfo.mobile, // 学员手机号
              'studentRemark': studentInfo.remark, // 学员备注信息
              'sourceId': studentInfo.sourceId, // 学员来源
            });
          } else {
            wx.showToast({
              title: '基本信息获取失败',
              icon: 'none'
            })
          }
        }
      )
      var coachInfo = wx.getStorageSync('coach');
      _this.setData({
        'coachInfo': coachInfo,
        'student_id': options.student_id,
      });
    }
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
    console.log('页面隐藏');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('页面卸载');
    var studentInfo = this.data.studentInfo;
    if (this.data.studentName == studentInfo.name && this.data.aliasName == studentInfo.alias && this.data.studentMobile == studentInfo.mobile && this.data.sourceId == studentInfo.sourceId && this.data.birthday == (studentInfo.birthday ? moment.unix(studentInfo.birthday).format('YYYY-MM-DD') : '') && (this.data.birthdayRemind ? 1 : 0) == studentInfo.birthdayRemind && this.data.studentRemark == studentInfo.remark) {
      console.log('无需修改');
      return;
    }
    var _this = this;
    let timestamp = moment().valueOf();
    var requestList = {
      'coachid': wx.getStorageSync('coachid'),
      'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
      'timestamp': timestamp, // 时间戳
      'coachStudentId': this.data.student_id, // 学员ID
      'alias': this.data.aliasName, // 学员备注名
      'birthday': this.data.birthday, // 学员生日（格式 yyyy-MM-dd）
      'birthdayRemind': this.data.birthdayRemind ? 1 : 0, // 学员生日提醒（0不提醒，1提醒）
      'mobile': this.data.studentMobile, // 学员手机号
      'name': this.data.studentName, // 学员姓名
      'remark': this.data.studentRemark, // 备注信息
      'sourceId': this.data.sourceId ? this.data.sourceId : '', // 学员来源ID
    };
    console.log(requestList);
    $.put(
      'coachStudent', requestList,
      function (res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          wx.showToast({
            title: '保存成功',
            icon: 'success',
          })
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'none'
          })
        }
      }
    )
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
   * 打开/关闭生日提醒
   */
  switchChange: function(event) {
    console.log(event);
    this.setData({
      birthdayRemind: event.detail.value,
    });
  },

  /**
   * 选择生日日期
   */
  birthdayPickerChange: function(event) {
    this.setData({
      birthdayFormat: moment(event.detail.value).format('YYYY年MM月DD日'),
      birthday: event.detail.value,
    });
  },

  /**
   * 选择学员来源
   */
  selectStudentSource: function (event) {
    wx.navigateTo({
      url: '../source/source?selectSourceName=' + this.data.sourceName,
    })
  },

  /**
   * 输入备注名称
   */
  inputAliasName: function(event) {
    this.setData({
      'aliasName' : event.detail.value,
    });
  },

  /**
   * 输入学员姓名
   */
  inputStudentName: function(event) {
    this.setData({
      'studentName': event.detail.value,
    });
  },

  /**
   * 输入学员手机号
   */
  inputStudentMobile: function (event) {
    this.setData({
      'studentMobile': event.detail.value,
    });
  },

  /**
   * 输入备注信息
   */
  inputStudentRemark: function (event) {
    this.setData({
      'studentRemark': event.detail.value,
    });
  }
})