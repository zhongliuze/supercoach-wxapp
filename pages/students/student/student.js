// pages/students/student/student.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    student_id: 0, // 学员ID
    studentData:[], // 学员数据信息
    displayStudentAlias: 0, // 优先展示学员备注名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.student_id);
    console.log(options.displayStudentAlias);
    this.setData({
      'student_id': options.student_id,
      'displayStudentAlias': options.displayStudentAlias,
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
    var _this = this;
    let timestamp = moment().valueOf();

    $.get(
      'coachStudent', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, //时间戳
        'coachStudentId': this.data.student_id, // 教练与学员关系ID
      },
      function (res) {
        console.log(res.data);
        if (res.data.code == 0) {
          // 获取成功
          var studentInfo = res.data.data.coachStudent;
          studentInfo['nameStr'] = studentInfo['name'].substring(studentInfo['name'].length - 2);
          studentInfo['aliasStr'] = studentInfo['alias'].substring(studentInfo['alias'].length - 2);
          _this.setData({
            'studentInfo': studentInfo,
            'studentData': res.data.data.courseData,
          });
        } else {
          wx.showToast({
            title: '学员信息获取失败',
            icon: 'none'
          })
        }
      }
    )
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
   * 拨打电话
   */
  makePhoneCall: function(event) {
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.phone,
    })
  },

  /**
 * 点击进入二级页面
 */
  bindButton: function (event) {
    var otherData = '';
    if (event.currentTarget.dataset.type == 3) {
      // 其它信息
      otherData = '&follow=' + this.data.studentInfo['follow'];
    }
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.url + '?student_id=' + this.data.student_id + otherData,
    })
  },

  
})