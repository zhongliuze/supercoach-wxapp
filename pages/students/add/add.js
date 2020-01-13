// pages/students/add/add.js
const moment = require('../../../vendor/moment/moment.js');
import $ from '../../../common/common.js';
const util = require('../../../utils/util')
const md5 = require('../../../vendor/md5/md5.min.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputMore: false,
    fixedBottomButtonMargin: 0, // 吸底按钮的自适应高度
    name: '', // 输入姓名
    sourceName:'', // 来源名称
    sourceId: 0, // 学员来源ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fixedBottomButtonMargin: wx.getStorageSync('fixedBottomButtonMargin'), // 设置吸底按钮自适应高度
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

  /**
   * 展开填写更多信息
   */
  inputMoreInfo: function(event) {
    console.log(event);
    this.setData({
      inputMore: true,
    });
  },

  /**
   * 输入姓名
   */
  inputName: function(event) {
    this.setData({
      'name': event.detail.value,
    });
  },

  /**
   * 新增学员
   */
  addStudent: function (event) {
    console.log(event);
    var _this = this;
    let timestamp = moment().valueOf();
    if (!event.detail.value.name) {
      wx.showToast({
        title: '请输入学员姓名',
        icon: 'none',
      })
      return ;
    }
    if (event.detail.value.mobile && event.detail.value.mobile.length < 11) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
      })
      return;
    }

    if (event.detail.value.mobile) {
      var mobile = event.detail.value.mobile;
    }else {
      var mobile = '';
    }

    if (event.detail.value.courseTypeId) {
      var courseTypeId = event.detail.value.courseTypeId;
    } else {
      var courseTypeId = '';
    }

    if (event.detail.value.courseNumber) {
      var courseNumber = event.detail.value.courseNumber;
    } else {
      var courseNumber = 0;
    }

    $.post(
      'coachStudent', {
        'coachid': wx.getStorageSync('coachid'),
        'sign': util.getSign(timestamp), // 签名（coachid + token + timestamp 的 MD5值）
        'timestamp': timestamp, // 时间戳
        'name': event.detail.value.name, // 学员姓名
        'mobile': mobile, // 学员手机号
        'courseTypeId': courseTypeId, // 课程类型
        'courseNumber': courseNumber, // 总课时数
        'sourceId': this.data.sourceId ? this.data.sourceId : '', // 学员来源ID
        'remark': '', // 备注信息
      },
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
  },

  /**
   * 选择学员来源
   */
  selectStudentSource: function(event) {
    wx.navigateTo({
      url: '../source/source?selectSourceName=' + this.data.sourceName,
    })
  }
})